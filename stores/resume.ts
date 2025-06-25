// stores/resume.ts
import { defineStore } from 'pinia'

export interface ResumeFile {
  file: File
  name: string
  size: number
  type: string
  lastModified: number
}

export interface UploadResult {
  success: boolean
  text?: string
  error?: string
  wordCount?: number
  charCount?: number
}

export const useResumeStore = defineStore('resume', () => {
  // 📱 STATE - Using reactive refs
  const resumeFile = ref<ResumeFile | null>(null)
  const extractedText = ref<string>('')
  const uploadStatus = ref<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle')
  const uploadError = ref<string | null>(null)
  const uploadProgress = ref<number>(0)

  // 🔍 COMPUTED PROPERTIES - Reactive computed values
  const isFileUploaded = computed(() => {
    console.log('🔍 Computing isFileUploaded:', !!resumeFile.value)
    return resumeFile.value !== null
  })

  const isTextExtracted = computed(() => {
    console.log('🔍 Computing isTextExtracted:', extractedText.value.length > 0, 'Length:', extractedText.value.length)
    return extractedText.value.length > 0
  })

  const isReady = computed(() => {
    const ready = isFileUploaded.value && isTextExtracted.value && uploadStatus.value === 'success'
    console.log('🔍 Computing isReady:', ready, {
      isFileUploaded: isFileUploaded.value,
      isTextExtracted: isTextExtracted.value,
      uploadStatus: uploadStatus.value
    })
    return ready
  })

  const wordCount = computed(() => {
    if (!extractedText.value) return 0
    const count = extractedText.value.split(/\s+/).filter(word => word.length > 0).length
    console.log('🔍 Computing wordCount:', count)
    return count
  })

  const charCount = computed(() => {
    const count = extractedText.value.length
    console.log('🔍 Computing charCount:', count)
    return count
  })

  // 🎬 ACTIONS
  const setFile = (file: File) => {
    console.log('📁 Setting file:', file.name, file.size, file.type)
    resumeFile.value = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
    console.log('📁 File set successfully:', resumeFile.value)
  }

  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      console.log('🚀 Starting upload for:', file.name)
      
      // Reset state
      uploadStatus.value = 'uploading'
      uploadError.value = null
      uploadProgress.value = 0
      extractedText.value = '' // Clear previous text

      // Set file info immediately
      setFile(file)

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)

      console.log('📤 Uploading to server...')
      uploadStatus.value = 'processing'

      // Upload to API
      const response = await $fetch<{
        success: boolean
        text?: string
        error?: string
        wordCount?: number
        charCount?: number
        fileName?: string
        fileSize?: number
        fileType?: string
        processingTime?: number
        warnings?: string[]
        statusCode?: number
      }>('/api/upload', {
        method: 'POST',
        body: formData
      })

      console.log('📥 Server response:', response)

      // Check if response indicates success
      if (response.success === true && response.text) {
        console.log('✅ Upload successful, setting extracted text')
        console.log('📊 Response details:', {
          textLength: response.text.length,
          wordCount: response.wordCount,
          charCount: response.charCount,
          processingTime: response.processingTime,
          hasWarnings: !!response.warnings
        })
        
        // Set extracted text - this should trigger reactivity
        extractedText.value = response.text
        uploadStatus.value = 'success'
        uploadProgress.value = 100

        console.log('✅ State updated:', {
          extractedTextLength: extractedText.value.length,
          uploadStatus: uploadStatus.value,
          wordCount: wordCount.value,
          charCount: charCount.value
        })

        return {
          success: true,
          text: response.text,
          wordCount: response.wordCount,
          charCount: response.charCount
        }
      } else {
        // Handle API error response
        const errorMessage = response.error || 'Upload failed - no error message provided'
        console.error('❌ API returned error:', {
          success: response.success,
          error: response.error,
          statusCode: response.statusCode,
          hasText: !!response.text
        })
        throw new Error(errorMessage)
      }

    } catch (error) {
      console.error('❌ Upload failed:', error)
      uploadStatus.value = 'error'
      uploadError.value = error instanceof Error ? error.message : 'Upload failed'
      uploadProgress.value = 0

      return {
        success: false,
        error: uploadError.value
      }
    }
  }

  const clearFile = () => {
    console.log('🗑️ Clearing file and state')
    resumeFile.value = null
    extractedText.value = ''
    uploadStatus.value = 'idle'
    uploadError.value = null
    uploadProgress.value = 0
    console.log('🗑️ State cleared')
  }

  const retryUpload = async () => {
    console.log('🔄 Retrying upload')
    if (resumeFile.value) {
      return await uploadFile(resumeFile.value.file)
    }
    return { success: false, error: 'No file to retry' }
  }

  // 🐞 DEBUG FUNCTION - Remove in production
  const debugState = () => {
    console.log('🐞 Current store state:', {
      resumeFile: resumeFile.value,
      extractedTextLength: extractedText.value.length,
      uploadStatus: uploadStatus.value,
      uploadError: uploadError.value,
      uploadProgress: uploadProgress.value,
      isFileUploaded: isFileUploaded.value,
      isTextExtracted: isTextExtracted.value,
      isReady: isReady.value,
      wordCount: wordCount.value,
      charCount: charCount.value
    })
  }

  return {
    // 📖 STATE (readonly to prevent direct mutation)
    resumeFile: readonly(resumeFile),
    extractedText: readonly(extractedText),
    uploadStatus: readonly(uploadStatus),
    uploadError: readonly(uploadError),
    uploadProgress: readonly(uploadProgress),

    // 🔍 COMPUTED
    isFileUploaded,
    isTextExtracted,
    isReady,
    wordCount,
    charCount,

    // 🎬 ACTIONS
    uploadFile,
    clearFile,
    retryUpload,
    setFile,
    
    // 🐞 DEBUG - Remove in production
    debugState
  }
})

/*
🔗 HOW THIS FIXED STORE WORKS:

📋 FIXES IMPLEMENTED:
- Added extensive logging to track state changes and computed property updates
- Clear extractedText before new upload to prevent stale data
- Better error handling with detailed logging
- Debug function to inspect current state
- Ensured all reactive properties are properly updated in sequence

🐞 DEBUGGING FEATURES:
- Console logs for all major state transitions
- Computed property recalculation tracking
- State inspection via debugState() method
- Upload flow tracking from start to finish

🔍 REACTIVITY IMPROVEMENTS:
- Explicit state clearing before new uploads
- Proper sequencing of state updates
- Better computed property dependencies
- Readonly state exposure to prevent mutations

📱 USAGE FOR DEBUGGING:
// In component or browser console:
const store = useResumeStore()
store.debugState() // Shows current state

🎯 EXPECTED BEHAVIOR:
1. File upload starts → uploadStatus becomes 'uploading'
2. Server processes → uploadStatus becomes 'processing'  
3. Success response → extractedText gets populated
4. State updates → uploadStatus becomes 'success'
5. Computed properties react → isReady becomes true
6. Component re-renders with new state

If the issue persists, check the console logs to see exactly where the state update chain breaks.
*/