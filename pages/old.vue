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
  
      <!-- Enhanced Analysis Results -->
      <div v-if="analysisResult" class="w-full max-w-6xl space-y-8">
        <!-- Success Analysis -->
        <div v-if="analysisResult.success" class="space-y-8">
          
          <!-- Executive Summary Card -->
          <div class="p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">📊 ATS Analysis Summary</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              <!-- ATS Compatibility Score -->
              <div class="text-center">
                <div class="relative w-24 h-24 mx-auto mb-3">
                  <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                    <circle cx="50" cy="50" r="40" :stroke="getScoreColor(analysisResult.data.atsScore)" 
                            stroke-width="8" fill="none" stroke-linecap="round"
                            :stroke-dasharray="`${analysisResult.data.atsScore * 2.51} 251`"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-900">{{ analysisResult.data.atsScore }}</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">ATS Compatibility</h3>
                <p class="text-sm text-gray-600">Format & Parsing</p>
                <p class="text-xs text-gray-500 mt-1">{{ getScoreLabel(analysisResult.data.atsScore) }}</p>
              </div>
  
              <!-- Job Match Score -->
              <div class="text-center">
                <div class="relative w-24 h-24 mx-auto mb-3">
                  <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                    <circle cx="50" cy="50" r="40" :stroke="getScoreColor(analysisResult.data.jobMatchScore)" 
                            stroke-width="8" fill="none" stroke-linecap="round"
                            :stroke-dasharray="`${analysisResult.data.jobMatchScore * 2.51} 251`"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-900">{{ analysisResult.data.jobMatchScore }}</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Job Match</h3>
                <p class="text-sm text-gray-600">Role Relevance</p>
                <p class="text-xs text-gray-500 mt-1">{{ getScoreLabel(analysisResult.data.jobMatchScore) }}</p>
              </div>
  
              <!-- Keyword Match Percentage -->
              <div class="text-center">
                <div class="relative w-24 h-24 mx-auto mb-3">
                  <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                    <circle cx="50" cy="50" r="40" :stroke="getKeywordColor(analysisResult.data.keywordAnalysis.matchPercentage)" 
                            stroke-width="8" fill="none" stroke-linecap="round"
                            :stroke-dasharray="`${analysisResult.data.keywordAnalysis.matchPercentage * 2.51} 251`"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-900">{{ analysisResult.data.keywordAnalysis.matchPercentage }}%</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Keyword Match</h3>
                <p class="text-sm text-gray-600">Term Alignment</p>
                <p class="text-xs text-gray-500 mt-1">{{ getKeywordLabel(analysisResult.data.keywordAnalysis.matchPercentage) }}</p>
              </div>
            </div>
          </div>
  
          <!-- Detailed Analysis Grid -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <!-- Left Column -->
            <div class="space-y-6">
              
              <!-- Strengths -->
              <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:check-circle" class="flex-shrink-0 w-6 h-6 mr-2 text-green-500" />
                  💪 Key Strengths
                </h3>
                <ul class="space-y-3">
                  <li v-for="strength in analysisResult.data.strengths" :key="strength" 
                      class="flex items-start p-3 space-x-3 bg-green-50 border border-green-200 rounded-lg">
                    <Icon name="heroicons:check-circle" class="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span class="text-gray-700">{{ strength }}</span>
                  </li>
                </ul>
              </div>
  
              <!-- Keyword Analysis -->
              <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:key" class="flex-shrink-0 w-6 h-6 mr-2 text-blue-500" />
                  🎯 Keyword Analysis
                </h3>
                
                <!-- Matched Keywords -->
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-green-700 mb-2">✅ Found Keywords ({{ analysisResult.data.keywordAnalysis.matchedKeywords.length }})</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="keyword in analysisResult.data.keywordAnalysis.matchedKeywords" :key="keyword"
                          class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full border border-green-200">
                      {{ keyword }}
                    </span>
                  </div>
                </div>
                
                <!-- Missing Keywords -->
                <div>
                  <h4 class="text-sm font-medium text-red-700 mb-2">❌ Missing Keywords ({{ analysisResult.data.keywordAnalysis.missingKeywords.length }})</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="keyword in analysisResult.data.keywordAnalysis.missingKeywords" :key="keyword"
                          class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full border border-red-200">
                      {{ keyword }}
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- Format Issues -->
              <div v-if="analysisResult.data.formatIssues && analysisResult.data.formatIssues.length > 0" 
                   class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:exclamation-triangle" class="flex-shrink-0 w-6 h-6 mr-2 text-yellow-500" />
                  ⚠️ ATS Format Issues
                </h3>
                <ul class="space-y-2">
                  <li v-for="issue in analysisResult.data.formatIssues" :key="issue" 
                      class="flex items-start p-3 space-x-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Icon name="heroicons:exclamation-triangle" class="flex-shrink-0 w-5 h-5 mt-0.5 text-yellow-500" />
                    <span class="text-gray-700">{{ issue }}</span>
                  </li>
                </ul>
              </div>
            </div>
  
            <!-- Right Column -->
            <div class="space-y-6">
              
              <!-- Missing Elements -->
              <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:exclamation-triangle" class="flex-shrink-0 w-6 h-6 mr-2 text-yellow-500" />
                  🎯 Missing Elements
                </h3>
                <ul class="space-y-3">
                  <li v-for="missing in analysisResult.data.missing" :key="missing" 
                      class="flex items-start p-3 space-x-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Icon name="heroicons:exclamation-triangle" class="flex-shrink-0 w-5 h-5 mt-0.5 text-yellow-500" />
                    <span class="text-gray-700">{{ missing }}</span>
                  </li>
                </ul>
              </div>
  
              <!-- Recommendations -->
              <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:light-bulb" class="flex-shrink-0 w-6 h-6 mr-2 text-blue-500" />
                  🚀 Action Items
                </h3>
                <ul class="space-y-3">
                  <li v-for="(rec, index) in analysisResult.data.recommendations" :key="rec" 
                      class="flex items-start p-3 space-x-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full flex items-center justify-center">
                      {{ index + 1 }}
                    </div>
                    <span class="text-gray-700">{{ rec }}</span>
                  </li>
                </ul>
              </div>
  
              <!-- Industry-Specific Insights -->
              <div v-if="analysisResult.data.industrySpecific && analysisResult.data.industrySpecific.length > 0" 
                   class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Icon name="heroicons:building-office-2" class="flex-shrink-0 w-6 h-6 mr-2 text-purple-500" />
                  🏢 Industry Insights
                </h3>
                <ul class="space-y-2">
                  <li v-for="insight in analysisResult.data.industrySpecific" :key="insight" 
                      class="flex items-start p-3 space-x-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <Icon name="heroicons:star" class="flex-shrink-0 w-5 h-5 mt-0.5 text-purple-500" />
                    <span class="text-gray-700">{{ insight }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <!-- ATS Education Section -->
          <div class="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl shadow-lg">
            <h3 class="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Icon name="heroicons:academic-cap" class="flex-shrink-0 w-6 h-6 mr-2 text-indigo-500" />
              📚 Understanding Your ATS Score
            </h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">💡 Good to Know</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• 90-95% of resumes are reviewed by humans</li>
                  <li>• ATS rank candidates, they don't auto-reject</li>
                  <li>• 50-70% keyword match is optimal (not 100%)</li>
                  <li>• Modern ATS understand context and synonyms</li>
                </ul>
              </div>
              <div class="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">🎯 Next Steps</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• Focus on the top 3 recommendations</li>
                  <li>• Add missing keywords naturally</li>
                  <li>• Fix format issues for better parsing</li>
                  <li>• Balance ATS optimization with readability</li>
                </ul>
              </div>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button 
              @click="startOver"
              class="inline-flex items-center w-full px-6 py-3 text-gray-700 font-medium bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors sm:w-auto"
            >
              <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
              Analyze Another Resume
            </button>
            <button 
              @click="exportResults"
              class="inline-flex items-center w-full px-6 py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors sm:w-auto"
            >
              <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
              Export Analysis
            </button>
          </div>
        </div>
  
        <!-- Analysis Error -->
        <div v-else class="p-6 bg-red-50 border border-red-200 rounded-xl shadow-lg">
          <div class="flex items-center space-x-3 mb-4">
            <Icon name="heroicons:x-circle" class="flex-shrink-0 w-6 h-6 text-red-600" />
            <h3 class="text-lg font-semibold text-red-900">Analysis Failed</h3>
          </div>
          <p class="text-sm text-red-800 mb-4">{{ analysisResult.error }}</p>
          <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button 
              @click="retryAnalysis"
              class="inline-flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button 
              @click="startOver"
              class="inline-flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4 mr-2" />
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FileValidationResult } from '~/types/fileValidation'
  
  // Types matching your enhanced API
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
      keywordAnalysis: {
        matchedKeywords: string[]
        missingKeywords: string[]
        matchPercentage: number
      }
      formatIssues?: string[]
      industrySpecific?: string[]
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
  
  // Export results as text
  function exportResults() {
    if (!analysisResult.value?.data) return
    
    const data = analysisResult.value.data
    const exportText = `ATS Resume Analysis Results
  
  SCORES:
  - ATS Compatibility: ${data.atsScore}/100
  - Job Match: ${data.jobMatchScore}/100
  - Keyword Match: ${data.keywordAnalysis.matchPercentage}%
  
  STRENGTHS:
  ${data.strengths.map(s => `• ${s}`).join('\n')}
  
  MISSING ELEMENTS:
  ${data.missing.map(m => `• ${m}`).join('\n')}
  
  RECOMMENDATIONS:
  ${data.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
  
  KEYWORD ANALYSIS:
  Found: ${data.keywordAnalysis.matchedKeywords.join(', ')}
  Missing: ${data.keywordAnalysis.missingKeywords.join(', ')}
  
  ${data.formatIssues?.length ? `FORMAT ISSUES:\n${data.formatIssues.map(f => `• ${f}`).join('\n')}\n` : ''}
  ${data.industrySpecific?.length ? `INDUSTRY INSIGHTS:\n${data.industrySpecific.map(i => `• ${i}`).join('\n')}` : ''}
  `
    
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ats-analysis-results.txt'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  // Helper functions for score visualization
  function getScoreColor(score: number): string {
    if (score >= 80) return '#10b981' // green-500
    if (score >= 60) return '#f59e0b' // amber-500
    return '#ef4444' // red-500
  }
  
  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }
  
  function getKeywordColor(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return '#10b981' // green-500 (optimal range)
    if (percentage >= 40) return '#f59e0b' // amber-500
    return '#ef4444' // red-500
  }
  
  function getKeywordLabel(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'Optimal Range'
    if (percentage >= 40) return 'Close'
    if (percentage < 25) return 'Too Low'
    if (percentage > 80) return 'Too High'
    return 'Needs Improvement'
  }
  
  // Page metadata
  useHead({
    title: 'Resume ATS Analyzer - AI-Powered Resume Analysis'
  })
  </script>