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
  const startTime = Date.now()
  
  try {
    console.log('📤 Upload API called at:', new Date().toISOString())
    
    // Parse multipart form data
    const form = await readMultipartFormData(event)
    
    // Validate form data exists
    if (!form || form.length === 0) {
      console.log('❌ No form data found')
      return createErrorResponse('No file uploaded', 400)
    }

    // Extract file from form data
    const fileData = form.find(item => item.name === 'file')
    
    if (!fileData?.data || !fileData.filename) {
      console.log('❌ Invalid file data:', { hasData: !!fileData?.data, hasFilename: !!fileData?.filename })
      return createErrorResponse('Invalid file data', 400)
    }

    // Create a server-compatible File-like object
    const fileBuffer = fileData.data
    
    console.log('📄 File buffer info:', {
      bufferLength: fileBuffer.length,
      bufferType: typeof fileBuffer,
      isBuffer: Buffer.isBuffer(fileBuffer),
      filename: fileData.filename,
      mimeType: fileData.type
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
    console.log('🔍 Starting file validation...')
    const validation = validateResumeFile(serverFile as File)
    
    if (!validation.isValid) {
      console.log('❌ File validation failed:', validation.errors)
      return createErrorResponse('File validation failed', 400, {
        details: validation.errors,
        warnings: validation.warnings
      })
    }
    console.log('✅ File validation passed')

    // Step 2: Extract text using our document processor (cast to File)
    console.log('📝 Starting text extraction...')
    const extractionStartTime = Date.now()
    
    const extraction = await extractTextFromFile(serverFile as File)
    const extractionTime = Date.now() - extractionStartTime
    
    console.log(`📝 Text extraction completed in ${extractionTime}ms`)
    
    if (!extraction.success) {
      console.log('❌ Text extraction failed:', extraction.errors)
      return createErrorResponse('Text extraction failed', 422, {
        details: extraction.errors,
        warnings: extraction.warnings
      })
    }

    // Step 3: Return success response in format expected by store
    const processingTime = Date.now() - startTime
    
    console.log('✅ Text extraction successful:', {
      wordCount: extraction.wordCount,
      textLength: extraction.text.length,
      processingTime: `${processingTime}ms`
    })

    // IMPORTANT: Return response in format expected by store
    // Store expects: { success: boolean, text: string, wordCount: number, charCount: number }
    const response = {
      success: true,
      text: extraction.text,           // Store expects 'text', not 'extractedText'
      wordCount: extraction.wordCount,
      charCount: extraction.text.length,
      
      // Additional metadata (optional)
      fileName: serverFile.name,
      fileSize: serverFile.size,
      fileType: serverFile.type,
      processingTime,
      warnings: [...validation.warnings, ...extraction.warnings].length > 0 
        ? [...validation.warnings, ...extraction.warnings] 
        : undefined,
      timestamp: new Date().toISOString()
    }

    console.log('📤 Sending response:', {
      success: response.success,
      textLength: response.text.length,
      wordCount: response.wordCount,
      charCount: response.charCount,
      hasWarnings: !!response.warnings
    })

    return response

  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('❌ Upload API error:', error)
    console.error('❌ Processing time before error:', `${processingTime}ms`)
    
    // Return error response in format expected by store
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      processingTime
    }
  }
})

// Helper functions

/**
 * Create standardized error response in format expected by store
 */
function createErrorResponse(error: string, statusCode: number = 400, additional: any = {}) {
  const response = {
    success: false,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
    ...additional
  }

  console.log('❌ Creating error response:', response)

  // Always return error responses for client to handle
  // Don't throw unless it's a critical server error
  return response
}

/*
🔗 HOW THIS FIXED API WORKS:

📋 KEY FIXES:
- Response format matches what store expects
- 'extractedText' renamed to 'text' for store compatibility  
- Flattened response structure (no nested 'data' object)
- Better error handling that returns errors instead of throwing
- Enhanced logging to track the complete flow

📤 RESPONSE FORMAT:
Success response:
{
  success: true,
  text: "extracted text content",
  wordCount: 350,
  charCount: 2450,
  fileName: "resume.pdf",
  fileSize: 204800,
  fileType: "application/pdf",
  processingTime: 150,
  warnings?: ["warning message"],
  timestamp: "2024-01-01T12:00:00.000Z"
}

Error response:
{
  success: false,
  error: "error message",
  statusCode: 400,
  details?: ["validation error"],
  timestamp: "2024-01-01T12:00:00.000Z"
}

🔍 DEBUGGING FEATURES:
- Detailed console logging at each step
- Processing time tracking
- Response format logging
- Error context preservation

🎯 STORE COMPATIBILITY:
The response format now matches exactly what your store expects:
- response.success ✅
- response.text ✅ (was response.data.extractedText)
- response.wordCount ✅ (was response.data.wordCount)
- response.charCount ✅ (was response.data.characterCount)

This should resolve the "Upload Status: error" issue in your debug panel.
*/