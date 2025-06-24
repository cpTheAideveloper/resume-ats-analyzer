// File validation utility for resume uploads
import type { 
    FileValidationResult, 
    FileValidationOptions, 
    QuickValidationResult,
    ResumeFileAnalysis,
    FileInfo,
    SupportedFileType,
    SupportedFileExtension
  } from '~/types/fileValidation'
  
  // Default validation options
  const DEFAULT_OPTIONS: Required<Omit<FileValidationOptions, 'customRules'>> & { customRules: never[] } = {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ] as SupportedFileType[],
    allowedExtensions: ['.pdf', '.docx'] as SupportedFileExtension[],
    strictTypeChecking: true,
    checkFilename: true,
    customRules: []
  }
  
  /**
   * Validate uploaded file for resume processing
   */
  export function validateResumeFile(
    file: File, 
    options: FileValidationOptions = {}
  ): FileValidationResult {
    const opts = { ...DEFAULT_OPTIONS, ...options }
    const errors: string[] = []
    const warnings: string[] = []
    
    // Extract file info
    const fileInfo: FileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: getFileExtension(file.name),
      formattedSize: formatFileSize(file.size),
      typeDescription: getFileTypeDescription(file),
      lastModified: file.lastModified
    }
  
    // 1. Check file size
    if (file.size === 0) {
      errors.push('File appears to be empty')
    } else if (file.size > opts.maxSizeBytes) {
      const maxSizeMB = Math.round(opts.maxSizeBytes / (1024 * 1024))
      errors.push(`File size (${formatFileSize(file.size)}) exceeds maximum allowed size of ${maxSizeMB}MB`)
    }
  
    // 2. Check file extension
    const extension = fileInfo.extension.toLowerCase()
    if (!opts.allowedExtensions.includes(extension)) {
      errors.push(`File extension "${extension}" is not allowed. Supported formats: ${opts.allowedExtensions.join(', ')}`)
    }
  
    // 3. Check MIME type (if strict checking is enabled)
    if (opts.strictTypeChecking) {
      if (!file.type) {
        warnings.push('File type could not be determined')
      } else if (!opts.allowedTypes.includes(file.type)) {
        errors.push(`File type "${file.type}" is not supported. Supported types: PDF, DOCX`)
      }
    }
  
    // 4. Check file name
    if (file.name.length > 255) {
      errors.push('File name is too long (maximum 255 characters)')
    }
  
    if (containsSpecialCharacters(file.name)) {
      warnings.push('File name contains special characters that may cause issues')
    }
  
    // 5. Additional resume-specific checks
    if (file.size < 1024) { // Less than 1KB
      warnings.push('File seems very small for a resume')
    }
  
    if (file.size > 5 * 1024 * 1024) { // Larger than 5MB
      warnings.push('File is quite large for a resume - consider optimizing')
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fileInfo
    }
  }
  
  /**
   * Quick validation for file upload components
   */
  export function quickValidateFile(file: File): QuickValidationResult {
    const result = validateResumeFile(file)
    
    if (!result.isValid) {
      return {
        isValid: false,
        message: result.errors[0] // Return first error
      }
    }
    
    return { isValid: true }
  }
  
  /**
   * Validate multiple files (for future batch upload)
   */
  export function validateMultipleFiles(
    files: File[], 
    options: FileValidationOptions = {}
  ): FileValidationResult[] {
    return files.map(file => validateResumeFile(file, options))
  }
  
  /**
   * Check if file type matches common resume formats
   */
  export function isResumeFormat(file: File): boolean {
    const result = validateResumeFile(file)
    return result.isValid
  }
  
  // Helper functions
  
  /**
   * Get file extension from filename
   */
  function getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.')
    if (lastDot === -1) return ''
    return filename.slice(lastDot).toLowerCase()
  }
  
  /**
   * Check if filename contains problematic special characters
   */
  function containsSpecialCharacters(filename: string): boolean {
    // Allow letters, numbers, spaces, hyphens, underscores, periods, parentheses
    const allowedPattern = /^[a-zA-Z0-9\s\-_.()\[\]]+$/
    return !allowedPattern.test(filename)
  }
  
  /**
   * Format file size for human reading
   */
  export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  /**
   * Get human-readable file type description
   */
  export function getFileTypeDescription(file: File): string {
    const ext = getFileExtension(file.name)
    
    switch (ext) {
      case '.pdf':
        return 'PDF Document'
      case '.docx':
        return 'Microsoft Word Document'
      case '.doc':
        return 'Legacy Microsoft Word Document'
      default:
        return file.type || 'Unknown File Type'
    }
  }
  
  /**
   * Estimate if file might be a scanned resume (larger file size for PDF)
   */
  export function isLikelyScannedResume(file: File): boolean {
    if (getFileExtension(file.name) === '.pdf' && file.size > 2 * 1024 * 1024) {
      return true // PDF over 2MB might be scanned
    }
    return false
  }
  
  // Type guards and constants
  export const RESUME_FILE_TYPES = {
    PDF: 'application/pdf',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  } as const
  
  export const RESUME_EXTENSIONS = ['.pdf', '.docx'] as const
  
  export const MAX_RESUME_SIZE = 10 * 1024 * 1024 // 10MB
  export const RECOMMENDED_MAX_SIZE = 5 * 1024 * 1024 // 5MB