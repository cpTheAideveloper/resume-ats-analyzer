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
  // State
  const resumeFile = ref<ResumeFile | null>(null)
  const extractedText = ref<string>('')
  const uploadStatus = ref<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle')
  const uploadError = ref<string | null>(null)
  const uploadProgress = ref<number>(0)
  
  // Computed properties
  const isFileUploaded = computed(() => resumeFile.value !== null)
  const isTextExtracted = computed(() => extractedText.value.length > 0)
  const isReady = computed(() => isFileUploaded.value && isTextExtracted.value)
  const wordCount = computed(() => {
    if (!extractedText.value) return 0
    return extractedText.value.split(/\s+/).filter(word => word.length > 0).length
  })
  const charCount = computed(() => extractedText.value.length)
  
  // Actions
  const setFile = (file: File) => {
    resumeFile.value = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
  }
  
  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      uploadStatus.value = 'uploading'
      uploadError.value = null
      uploadProgress.value = 0
      
      // Set file info immediately
      setFile(file)
      
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      
      uploadStatus.value = 'processing'
      
      // Upload to API
      const response = await $fetch<{
        success: boolean
        text?: string
        error?: string
        wordCount?: number
        charCount?: number
      }>('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.success && response.text) {
        extractedText.value = response.text
        uploadStatus.value = 'success'
        uploadProgress.value = 100
        
        return {
          success: true,
          text: response.text,
          wordCount: response.wordCount,
          charCount: response.charCount
        }
      } else {
        throw new Error(response.error || 'Upload failed')
      }
      
    } catch (error) {
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
    resumeFile.value = null
    extractedText.value = ''
    uploadStatus.value = 'idle'
    uploadError.value = null
    uploadProgress.value = 0
  }
  
  const retryUpload = async () => {
    if (resumeFile.value) {
      return await uploadFile(resumeFile.value.file)
    }
    return { success: false, error: 'No file to retry' }
  }
  
  return {
    // State (readonly to prevent direct mutation)
    resumeFile: readonly(resumeFile),
    extractedText: readonly(extractedText),
    uploadStatus: readonly(uploadStatus),
    uploadError: readonly(uploadError),
    uploadProgress: readonly(uploadProgress),
    
    // Computed
    isFileUploaded,
    isTextExtracted,
    isReady,
    wordCount,
    charCount,
    
    // Actions
    uploadFile,
    clearFile,
    retryUpload,
    setFile
  }
})