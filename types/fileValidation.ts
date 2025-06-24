// File validation types for resume upload system

/**
 * Result of file validation containing validation status and details
 */
export interface FileValidationResult {
    /** Whether the file passed all validation checks */
    isValid: boolean
    /** Array of validation error messages (blocking issues) */
    errors: string[]
    /** Array of validation warning messages (non-blocking suggestions) */
    warnings: string[]
    /** Detailed information about the validated file */
    fileInfo: FileInfo
  }
  
  /**
   * Detailed information about an uploaded file
   */
  export interface FileInfo {
    /** Original filename */
    name: string
    /** File size in bytes */
    size: number
    /** MIME type of the file */
    type: string
    /** File extension (with dot, lowercase) */
    extension: string
    /** Human-readable file size (e.g., "2.5 MB") */
    formattedSize?: string
    /** Human-readable file type description */
    typeDescription?: string
    /** Timestamp when file was last modified */
    lastModified?: number
  }
  
  /**
   * Configuration options for file validation
   */
  export interface FileValidationOptions {
    /** Maximum file size in bytes (default: 10MB) */
    maxSizeBytes?: number
    /** Array of allowed MIME types */
    allowedTypes?: string[]
    /** Array of allowed file extensions (with dots) */
    allowedExtensions?: string[]
    /** Whether to perform strict MIME type checking */
    strictTypeChecking?: boolean
    /** Whether to check for problematic filename characters */
    checkFilename?: boolean
    /** Custom validation rules */
    customRules?: FileValidationRule[]
  }
  
  /**
   * Custom validation rule for files
   */
  export interface FileValidationRule {
    /** Unique identifier for the rule */
    id: string
    /** Human-readable description of the rule */
    description: string
    /** Validation function that returns error message if validation fails */
    validate: (file: File, info: FileInfo) => string | null
    /** Whether this rule should block file acceptance */
    isBlocking: boolean
  }
  
  /**
   * Quick validation result for simple use cases
   */
  export interface QuickValidationResult {
    /** Whether the file is valid */
    isValid: boolean
    /** Error message if validation failed */
    message?: string
  }
  
  /**
   * File upload status for tracking upload progress
   */
  export interface FileUploadStatus {
    /** Current status of the upload */
    status: 'idle' | 'validating' | 'uploading' | 'processing' | 'completed' | 'error'
    /** Upload progress percentage (0-100) */
    progress: number
    /** Current operation being performed */
    currentOperation?: string
    /** Error message if status is 'error' */
    error?: string
    /** Validation result if available */
    validation?: FileValidationResult
  }
  
  /**
   * Resume file analysis metadata
   */
  export interface ResumeFileAnalysis {
    /** Whether the file appears to be a scanned document */
    isLikelyScanned: boolean
    /** Estimated text extraction difficulty */
    extractionComplexity: 'low' | 'medium' | 'high'
    /** File optimization suggestions */
    optimizationSuggestions: string[]
    /** Estimated processing time in seconds */
    estimatedProcessingTime: number
  }
  
  // Predefined constants as types
  export type SupportedFileType = 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  export type SupportedFileExtension = '.pdf' | '.docx'
  export type FileValidationError = 'INVALID_TYPE' | 'FILE_TOO_LARGE' | 'FILE_EMPTY' | 'INVALID_EXTENSION' | 'FILENAME_TOO_LONG' | 'SPECIAL_CHARACTERS'
  
  /**
   * File validation error codes with messages
   */
  export const FILE_VALIDATION_ERRORS = {
    INVALID_TYPE: 'File type is not supported',
    FILE_TOO_LARGE: 'File size exceeds maximum limit',
    FILE_EMPTY: 'File appears to be empty',
    INVALID_EXTENSION: 'File extension is not allowed',
    FILENAME_TOO_LONG: 'Filename is too long',
    SPECIAL_CHARACTERS: 'Filename contains problematic characters'
  } as const
  
  /**
   * Supported resume file formats with metadata
   */
  export const RESUME_FORMATS = {
    PDF: {
      mimeType: 'application/pdf' as const,
      extension: '.pdf' as const,
      description: 'PDF Document',
      maxRecommendedSize: 5 * 1024 * 1024, // 5MB
      processingComplexity: 'medium' as const
    },
    DOCX: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' as const,
      extension: '.docx' as const,
      description: 'Microsoft Word Document',
      maxRecommendedSize: 3 * 1024 * 1024, // 3MB
      processingComplexity: 'low' as const
    }
  } as const