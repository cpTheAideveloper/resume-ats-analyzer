<!-- File: pages/index.vue -->
<template>
    <div class="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- App Header -->
      <div class="w-full max-w-4xl mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Resume ATS Analyzer</h1>
        <p class="text-xl text-gray-600">Upload your resume and job description for AI-powered ATS analysis</p>
      </div>
  
      <!-- Upload Section -->
      <div class="w-full max-w-lg mb-8">
        <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 text-center">1. Upload Your Resume</h2>
          
          <UiFileUpload 
            :max-size="10"
            @file-selected="handleFileSelected"
            @file-cleared="handleFileCleared"
            @validation-error="handleValidationError"
          />
          
          <!-- Extract Text Button -->
          <div v-if="selectedFile && !extractedText && !isProcessing" class="mt-6 text-center">
            <button 
              @click="extractText"
              class="inline-flex items-center px-6 py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
              Extract Text
            </button>
          </div>
        </div>
      </div>
  
      <!-- Processing Status -->
      <div v-if="isProcessing" class="flex items-center w-full max-w-lg p-4 mb-6 space-x-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex-shrink-0 w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-blue-800">{{ processingMessage }}</span>
      </div>
  
      <!-- Job Description Section (shown after text extraction) -->
      <div v-if="extractedText && !analysisResult" class="w-full max-w-2xl mb-8">
        <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 text-center">2. Add Job Description</h2>
          
          <UiJobDescriptionInput 
            v-model="jobDescription"
            @change="handleJobDescriptionChange"
          />
          
          <!-- Analyze Button -->
          <div v-if="jobDescription.trim().length > 50" class="mt-6 text-center">
            <button 
              @click="analyzeResume"
              :disabled="isAnalyzing"
              class="inline-flex items-center px-8 py-3 text-white font-medium bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="heroicons:sparkles" class="w-5 h-5 mr-2" />
              {{ isAnalyzing ? 'Analyzing...' : 'Analyze Resume' }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Text Extraction Results -->
      <div v-if="extractionResult" class="w-full max-w-4xl mb-6">
        <!-- Success Result -->
        <div v-if="extractionResult.success" class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:check-circle" class="flex-shrink-0 w-5 h-5 text-green-600" />
            <h3 class="font-semibold text-green-900">✅ Text Extraction Successful</h3>
          </div>
          <div class="mt-2 text-sm text-green-800">
            <p>File: {{ extractionResult.data.fileName }}</p>
            <p>Words: {{ extractionResult.data.wordCount }} | Characters: {{ extractionResult.data.characterCount }}</p>
          </div>
        </div>
  
        <!-- Error Result -->
        <div v-else class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center space-x-2 mb-2">
            <Icon name="heroicons:x-circle" class="flex-shrink-0 w-5 h-5 text-red-600" />
            <h3 class="font-semibold text-red-900">Extraction Failed</h3>
          </div>
          <p class="text-sm text-red-800">{{ extractionResult.error }}</p>
        </div>
      </div>
  
      <!-- Analysis Results -->
      <div v-if="analysisResult" class="w-full max-w-4xl space-y-6">
        <!-- Success Analysis -->
        <div v-if="analysisResult.success" class="space-y-6">
          <!-- Scores Section -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">ATS Compatibility</h3>
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 w-16 h-16 bg-blue-100 border-8 border-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-xl font-bold text-blue-700">{{ analysisResult.data.atsScore }}</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">ATS Score</p>
                  <p class="text-xs text-gray-500">Format & readability</p>
                </div>
              </div>
            </div>
  
            <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Job Match</h3>
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 w-16 h-16 bg-green-100 border-8 border-green-500 rounded-full flex items-center justify-center">
                  <span class="text-xl font-bold text-green-700">{{ analysisResult.data.jobMatchScore }}</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Match Score</p>
                  <p class="text-xs text-gray-500">Relevance to job</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Strengths -->
          <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">💪 Key Strengths</h3>
            <ul class="space-y-2">
              <li v-for="strength in analysisResult.data.strengths" :key="strength" class="flex items-start space-x-2">
                <Icon name="heroicons:check-circle" class="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                <span class="text-gray-700">{{ strength }}</span>
              </li>
            </ul>
          </div>
  
          <!-- Missing Skills -->
          <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">🎯 Missing Skills/Keywords</h3>
            <ul class="space-y-2">
              <li v-for="missing in analysisResult.data.missing" :key="missing" class="flex items-start space-x-2">
                <Icon name="heroicons:exclamation-triangle" class="flex-shrink-0 w-5 h-5 mt-0.5 text-yellow-500" />
                <span class="text-gray-700">{{ missing }}</span>
              </li>
            </ul>
          </div>
  
          <!-- Recommendations -->
          <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">🚀 Recommendations</h3>
            <ul class="space-y-2">
              <li v-for="rec in analysisResult.data.recommendations" :key="rec" class="flex items-start space-x-2">
                <Icon name="heroicons:light-bulb" class="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-500" />
                <span class="text-gray-700">{{ rec }}</span>
              </li>
            </ul>
          </div>
  
          <!-- Start Over Button -->
          <div class="text-center">
            <button 
              @click="startOver"
              class="inline-flex items-center px-6 py-3 text-gray-700 font-medium bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
              Analyze Another Resume
            </button>
          </div>
        </div>
  
        <!-- Analysis Error -->
        <div v-else class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center space-x-2 mb-2">
            <Icon name="heroicons:x-circle" class="flex-shrink-0 w-5 h-5 text-red-600" />
            <h3 class="font-semibold text-red-900">Analysis Failed</h3>
          </div>
          <p class="text-sm text-red-800">{{ analysisResult.error }}</p>
          <button 
            @click="retryAnalysis"
            class="mt-3 px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FileValidationResult } from '~/types/fileValidation'
  
  // Types
  interface ExtractionResult {
    success: boolean
    error?: string
    data?: {
      fileName: string
      fileSize: number
      fileType: string
      extractedText: string
      wordCount: number
      characterCount: number
    }
  }
  
  interface AnalysisResult {
    success: boolean
    error?: string
    data?: {
      atsScore: number
      jobMatchScore: number
      strengths: string[]
      missing: string[]
      recommendations: string[]
    }
  }
  
  // Reactive state
  const selectedFile = ref<File | null>(null)
  const extractedText = ref('')
  const jobDescription = ref('')
  const isProcessing = ref(false)
  const isAnalyzing = ref(false)
  const processingMessage = ref('')
  const extractionResult = ref<ExtractionResult | null>(null)
  const analysisResult = ref<AnalysisResult | null>(null)
  
  // Event handlers
  function handleFileSelected(file: File, validation: FileValidationResult) {
    selectedFile.value = file
    extractedText.value = ''
    jobDescription.value = ''
    extractionResult.value = null
    analysisResult.value = null
    console.log('File selected:', file.name)
  }
  
  function handleFileCleared() {
    selectedFile.value = null
    extractedText.value = ''
    jobDescription.value = ''
    extractionResult.value = null
    analysisResult.value = null
    console.log('File cleared')
  }
  
  function handleValidationError(errors: string[]) {
    console.error('File validation errors:', errors)
  }
  
  function handleJobDescriptionChange(value: string) {
    jobDescription.value = value
  }
  
  // Extract text from uploaded file
  async function extractText() {
    if (!selectedFile.value) return
    
    isProcessing.value = true
    processingMessage.value = 'Extracting text from your resume...'
    extractionResult.value = null
    
    try {
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      
      const response = await $fetch<ExtractionResult>('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      extractionResult.value = response
      
      if (response.success && response.data) {
        extractedText.value = response.data.extractedText
        console.log('Text extraction successful')
      } else {
        console.error('Text extraction failed:', response.error)
      }
      
    } catch (error) {
      console.error('Extraction error:', error)
      extractionResult.value = {
        success: false,
        error: 'Failed to extract text from file'
      }
    } finally {
      isProcessing.value = false
    }
  }
  
  // Analyze resume with AI
  async function analyzeResume() {
    if (!extractedText.value || !jobDescription.value) return
    
    isAnalyzing.value = true
    isProcessing.value = true
    processingMessage.value = 'AI is analyzing your resume...'
    analysisResult.value = null
    
    try {
      const response = await $fetch<AnalysisResult>('/api/analyze', {
        method: 'POST',
        body: {
          resumeText: extractedText.value,
          jobDescription: jobDescription.value
        }
      })
      
      analysisResult.value = response
      
      if (response.success) {
        console.log('Analysis successful:', response.data)
      } else {
        console.error('Analysis failed:', response.error)
      }
      
    } catch (error) {
      console.error('Analysis error:', error)
      analysisResult.value = {
        success: false,
        error: 'Failed to analyze resume. Please try again.'
      }
    } finally {
      isAnalyzing.value = false
      isProcessing.value = false
    }
  }
  
  // Retry analysis
  function retryAnalysis() {
    analyzeResume()
  }
  
  // Start over
  function startOver() {
    selectedFile.value = null
    extractedText.value = ''
    jobDescription.value = ''
    extractionResult.value = null
    analysisResult.value = null
  }
  
  // Page metadata
  useHead({
    title: 'Resume ATS Analyzer - AI-Powered Resume Analysis'
  })
  </script>