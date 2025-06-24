<template>
    <!-- File: pages/index.vue -->
    <div class="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- App Header -->
      <div class="w-full max-w-4xl mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Resume ATS Analyzer</h1>
        <p class="text-xl text-gray-600">Upload your resume for AI-powered ATS compatibility analysis</p>
      </div>
  
      <!-- Upload Section -->
      <div class="w-full max-w-lg mb-8">
        <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 text-center">Upload Your Resume</h2>
          
          <UiFileUpload 
            :max-size="10"
            @file-selected="handleFileSelected"
            @file-cleared="handleFileCleared"
            @validation-error="handleValidationError"
          />
          
          <!-- Process Button -->
          <div v-if="selectedFile && !isProcessing" class="mt-6 text-center">
            <button 
              @click="processFile"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
              Extract & Analyze Text
            </button>
          </div>
        </div>
      </div>
  
      <!-- Processing Status -->
      <div v-if="isProcessing" class="flex items-center space-x-3 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <span class="text-blue-800">Processing your resume...</span>
      </div>
  
      <!-- Results Section -->
      <div v-if="processingResult" class="w-full max-w-4xl space-y-6">
        <!-- Success Result -->
        <div v-if="processingResult.success" class="space-y-6">
          <!-- Success Status -->
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600" />
              <h3 class="font-semibold text-green-900">Text Extraction Successful</h3>
            </div>
            <div class="mt-2 text-sm text-green-800">
              <p>File: {{ processingResult.data.fileName }}</p>
              <p>Words: {{ processingResult.data.wordCount }} | Characters: {{ processingResult.data.characterCount }}</p>
            </div>
          </div>
  
          <!-- Extracted Text Preview -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg shadow">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Extracted Text Preview</h3>
              <button 
                @click="copyToClipboard"
                class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Copy Text
              </button>
            </div>
            <div class="max-h-64 overflow-y-auto bg-gray-50 border border-gray-200 rounded p-4">
              <pre class="text-sm text-gray-800 whitespace-pre-wrap">{{ truncatedText }}</pre>
              <div v-if="isTextTruncated" class="mt-2 text-xs text-gray-500 italic">
                Text truncated for preview. Full text extracted successfully.
              </div>
            </div>
          </div>
  
          <!-- Next Steps -->
          <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 class="font-semibold text-yellow-900 mb-2">Next Steps:</h4>
            <p class="text-sm text-yellow-800">
              Text extraction complete! AI analysis feature coming in Phase 3.
            </p>
          </div>
        </div>
  
        <!-- Error Result -->
        <div v-else class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center space-x-2 mb-2">
            <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-600" />
            <h3 class="font-semibold text-red-900">Processing Failed</h3>
          </div>
          <p class="text-sm text-red-800 mb-2">{{ processingResult.error }}</p>
          <ul v-if="processingResult.details" class="text-sm text-red-700 space-y-1">
            <li v-for="detail in processingResult.details" :key="detail">• {{ detail }}</li>
          </ul>
        </div>
  
        <!-- Warnings -->
        <div v-if="processingResult.warnings && processingResult.warnings.length > 0" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 class="font-semibold text-yellow-900 mb-2">Warnings:</h4>
          <ul class="text-sm text-yellow-800 space-y-1">
            <li v-for="warning in processingResult.warnings" :key="warning">• {{ warning }}</li>
          </ul>
        </div>
      </div>
  
      <!-- Development Status -->
      <div class="w-full max-w-lg mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 class="text-sm font-semibold text-yellow-800 mb-2">Development Status:</h3>
        <ul class="text-xs text-yellow-700 space-y-1">
          <li>✅ File Upload & Validation</li>
          <li>✅ Text Extraction (DOCX supported)</li>
          <li>⏳ PDF Text Extraction (Coming Next)</li>
          <li>⏳ AI Analysis with Gemini</li>
          <li>⏳ ATS Scoring & Recommendations</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FileValidationResult } from '~/types/fileValidation'
  
  // Types for API response
  interface ProcessingResult {
    success: boolean
    error?: string
    details?: string[]
    warnings?: string[]
    data?: {
      fileName: string
      fileSize: number
      fileType: string
      extractedText: string
      wordCount: number
      characterCount: number
    }
  }
  
  // Reactive state
  const selectedFile = ref<File | null>(null)
  const isProcessing = ref(false)
  const processingResult = ref<ProcessingResult | null>(null)
  
  // Computed properties
  const truncatedText = computed(() => {
    if (!processingResult.value?.data?.extractedText) return ''
    const text = processingResult.value.data.extractedText
    return text.length > 1000 ? text.substring(0, 1000) + '...' : text
  })
  
  const isTextTruncated = computed(() => {
    if (!processingResult.value?.data?.extractedText) return false
    return processingResult.value.data.extractedText.length > 1000
  })
  
  // Event handlers
  function handleFileSelected(file: File, validation: FileValidationResult) {
    selectedFile.value = file
    processingResult.value = null // Clear previous results
    console.log('File selected:', file.name)
  }
  
  function handleFileCleared() {
    selectedFile.value = null
    processingResult.value = null
    console.log('File cleared')
  }
  
  function handleValidationError(errors: string[]) {
    console.error('File validation errors:', errors)
  }
  
  // Process the uploaded file
  async function processFile() {
    if (!selectedFile.value) return
    
    isProcessing.value = true
    processingResult.value = null
    
    try {
      console.log('Starting file processing...')
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      
      // Call our upload API
      const response = await $fetch<ProcessingResult>('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      processingResult.value = response
      
      if (response.success) {
        console.log('File processing successful:', {
          wordCount: response.data?.wordCount,
          charCount: response.data?.characterCount
        })
      } else {
        console.error('File processing failed:', response.error)
      }
      
    } catch (error) {
      console.error('Processing error:', error)
      processingResult.value = {
        success: false,
        error: 'Failed to process file',
        details: [error instanceof Error ? error.message : 'Unknown error occurred']
      }
    } finally {
      isProcessing.value = false
    }
  }
  
  // Copy text to clipboard
  async function copyToClipboard() {
    if (!processingResult.value?.data?.extractedText) return
    
    try {
      await navigator.clipboard.writeText(processingResult.value.data.extractedText)
      // Could add a toast notification here
      console.log('Text copied to clipboard')
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }
  
  // Page metadata
  useHead({
    title: 'Resume ATS Analyzer - AI-Powered Resume Analysis'
  })
  </script>