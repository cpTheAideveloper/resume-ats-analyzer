// File: server/api/upload.post.ts
// API endpoint for file upload and text extraction (Lambda-style)

import { extractTextFromFile } from '~/utils/documentProcessor'
import { validateResumeFile } from '~/utils/fileValidator'

// Server-side File-like interface
interface ServerFile extends Partial<File> {
  name: string
  size: number
  type: string
  lastModified: number
  buffer: Buffer
  arrayBuffer(): Promise<ArrayBuffer>
}

// Lambda-style handler function
export default defineEventHandler(async (event) => {
  try {
    // Parse multipart form data
    const form = await readMultipartFormData(event)
    
    // Validate form data exists
    if (!form || form.length === 0) {
      return createErrorResponse('No file uploaded', 400)
    }

    // Extract file from form data
    const fileData = form.find(item => item.name === 'file')
    
    if (!fileData?.data || !fileData.filename) {
      return createErrorResponse('Invalid file data', 400)
    }

    // Create a server-compatible File-like object
    const fileBuffer = fileData.data
    
    console.log('📄 File buffer info:', {
      bufferLength: fileBuffer.length,
      bufferType: typeof fileBuffer,
      isBuffer: Buffer.isBuffer(fileBuffer)
    })
    
    const serverFile: ServerFile = {
      name: fileData.filename,
      size: fileBuffer.length,
      type: fileData.type || 'application/octet-stream',
      lastModified: Date.now(),
      buffer: fileBuffer,
      arrayBuffer: async (): Promise<ArrayBuffer> => {
        // Create a proper ArrayBuffer from the Node.js Buffer
        const arrayBuffer = new ArrayBuffer(fileBuffer.length)
        const view = new Uint8Array(arrayBuffer)
        for (let i = 0; i < fileBuffer.length; i++) {
          view[i] = fileBuffer[i]
        }
        return arrayBuffer
      },
      // File interface stubs (not used in our processor)
      webkitRelativePath: '',
      slice: () => new Blob(),
      stream: () => new ReadableStream(),
      text: async () => '',
      bytes: async () => new Uint8Array()
    }

    console.log('📄 Processing file:', {
      name: serverFile.name,
      size: `${(serverFile.size / 1024).toFixed(1)}KB`,
      type: serverFile.type
    })

    // Step 1: Validate file (cast to File for validation)
    const validation = validateResumeFile(serverFile as File)
    
    if (!validation.isValid) {
      return createErrorResponse('File validation failed', 400, {
        details: validation.errors,
        warnings: validation.warnings
      })
    }

    // Step 2: Extract text using our document processor (cast to File)
    const extraction = await extractTextFromFile(serverFile as File)
    
    if (!extraction.success) {
      return createErrorResponse('Text extraction failed', 422, {
        details: extraction.errors,
        warnings: extraction.warnings
      })
    }

    // Step 3: Return success response
    console.log('✅ Text extraction successful:', {
      wordCount: extraction.wordCount,
      textLength: extraction.text.length
    })

    return createSuccessResponse({
      fileName: serverFile.name,
      fileSize: serverFile.size,
      fileType: serverFile.type,
      extractedText: extraction.text,
      wordCount: extraction.wordCount,
      characterCount: extraction.text.length,
      processingTime: Date.now() - Date.now() // Simplified timing
    }, [...validation.warnings, ...extraction.warnings])

  } catch (error) {
    console.error('❌ Upload API error:', error)
    
    // Handle unexpected errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    })
  }
})

// Helper functions (like Lambda utility functions)

/**
 * Create standardized success response
 */
function createSuccessResponse(data: any, warnings: string[] = []) {
  return {
    success: true,
    data,
    warnings: warnings.length > 0 ? warnings : undefined,
    timestamp: new Date().toISOString()
  }
}

/**
 * Create standardized error response
 */
function createErrorResponse(error: string, statusCode: number = 400, additional: any = {}) {
  const response = {
    success: false,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
    ...additional
  }

  // For 4xx errors, return the response (client errors)
  if (statusCode >= 400 && statusCode < 500) {
    return response
  }

  // For 5xx errors, throw (server errors)
  throw createError({
    statusCode,
    statusMessage: error,
    data: response
  })
}