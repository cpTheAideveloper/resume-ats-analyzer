// File: utils/documentProcessor.ts
// Simple document text extraction utility for PDF and DOCX files

import type { FileInfo } from '~/types/fileValidation'

/**
 * Simple result for text extraction - reusing existing patterns
 */
export interface TextExtractionResult {
  success: boolean
  text: string
  errors: string[]
  warnings: string[]
  fileInfo: FileInfo
  wordCount: number
}

/**
 * Extract text from PDF or DOCX file
 */
export async function extractTextFromFile(file: File): Promise<TextExtractionResult> {
  const startTime = Date.now()
  const errors: string[] = []
  const warnings: string[] = []
  
  const fileInfo: FileInfo = {
    name: file.name,
    size: file.size,
    type: file.type,
    extension: getFileExtension(file.name),
    lastModified: file.lastModified
  }

  try {
    let extractedText = ''
    
    if (file.type === 'application/pdf') {
      extractedText = await extractFromPDF(file)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractedText = await extractFromDOCX(file)
    } else {
      errors.push('Unsupported file type for text extraction')
      return createFailureResult(fileInfo, errors, warnings)
    }

    const cleanedText = cleanExtractedText(extractedText)
    const wordCount = countWords(cleanedText)
    
    if (cleanedText.length === 0) {
      errors.push('No text could be extracted from the document')
      return createFailureResult(fileInfo, errors, warnings)
    }
    
    if (cleanedText.length < 100) {
      warnings.push('Very little text was extracted - document may be mostly images')
    }
    
    if (wordCount < 50) {
      warnings.push('Document appears to have very few words for a resume')
    }

    console.log(`Text extraction completed in ${Date.now() - startTime}ms`)
    
    return {
      success: true,
      text: cleanedText,
      errors,
      warnings,
      fileInfo,
      wordCount
    }

  } catch (error) {
    console.error('Text extraction failed:', error)
    errors.push(`Text extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return createFailureResult(fileInfo, errors, warnings)
  }
}

/**
 * Extract text from PDF file using pdf-parse
 */
async function extractFromPDF(file: File): Promise<string> {
  // 1. Import the real parser, bypassing index.js
  const pdfModule = await import('pdf-parse/lib/pdf-parse.js')
  // depending on your build you might need `.default`
  const pdfParse = (pdfModule as any).default || pdfModule

  // 2. Turn your browser/File arrayBuffer into a Node Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // 3. Extract text
  const data = await pdfParse(buffer)
  return data.text
}

/**
 * Extract text from DOCX file using mammoth
 */
async function extractFromDOCX(file: File): Promise<string> {
  const mammoth = await import('mammoth')
  
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const result = await mammoth.extractRawText({ buffer: buffer })
  
  if (result.messages.length > 0) {
    console.warn('DOCX extraction warnings:', result.messages)
  }
  
  return result.value
}

/**
 * Clean extracted text by removing extra whitespace and formatting issues
 */
function cleanExtractedText(text: string): string {
  if (!text) return ''
  return text
    .replace(/[\t\n\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[^a-zA-Z0-9\s.,;:!?@#$%&*\-–—'"`()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
  if (!filename) return ''
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) return ''
  return filename.slice(lastDot).toLowerCase()
}

/**
 * Create a failure result object
 */
function createFailureResult(
  fileInfo: FileInfo, 
  errors: string[], 
  warnings: string[]
): TextExtractionResult {
  return {
    success: false,
    text: '',
    errors,
    warnings,
    fileInfo,
    wordCount: 0
  }
}

/**
 * Quick check if file type is supported for extraction
 */
export function isTextExtractionSupported(file: File): boolean {
  return file.type === 'application/pdf' || 
         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

/**
 * Get estimated extraction difficulty
 */
export function getExtractionDifficulty(file: File): 'easy' | 'medium' | 'hard' {
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'easy'  // DOCX is structured and easy to extract
  }
  
  if (file.type === 'application/pdf') {
    // PDF difficulty depends on size - larger files might be scanned
    if (file.size > 5 * 1024 * 1024) { // > 5MB
      return 'hard'   // Likely scanned/image-based
    }
    return 'medium'   // Text-based PDF
  }
  
  return 'hard' // Unknown format
}