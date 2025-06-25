<!-- pages/ats-scanner.vue -->
<template>
    <div class="container-section space-component">
      <!-- State 1: No File Uploaded -->
      <div v-if="!resumeStore.isFileUploaded" class="text-center py-16">
        <div class="max-w-2xl mx-auto">
          <NuxtIcon name="heroicons:document-chart-bar" class="w-16 h-16 text-content-tertiary mx-auto mb-6" />
          <h1 class="text-hero text-content-base mb-4">ATS Scanner</h1>
          <p class="text-subtitle text-content-secondary mb-8">
            Upload your resume to analyze ATS compatibility and get actionable feedback
          </p>
          <div class="space-y-4">
            <NuxtLink to="/" class="btn-primary inline-flex items-center space-x-2">
              <NuxtIcon name="heroicons:arrow-up-tray" class="w-5 h-5" />
              <span>Upload Resume</span>
            </NuxtLink>
            <p class="text-sm text-content-tertiary">
              Supports PDF and DOCX files • Free analysis • No signup required
            </p>
          </div>
        </div>
      </div>
  
      <!-- State 2: File Ready, Not Analyzed -->
      <div v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasATSResults" class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-hero text-content-base mb-4">Ready to Analyze</h1>
          <p class="text-subtitle text-content-secondary">
            Your resume is uploaded and ready for ATS compatibility analysis
          </p>
        </div>
  
        <!-- Resume Preview Card -->
        <div class="card-base card-padding mb-8">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-content-base mb-2">Resume Uploaded</h3>
              <div class="flex items-center space-x-4 text-sm text-content-secondary">
                <span class="flex items-center space-x-1">
                  <NuxtIcon name="heroicons:document-text" class="w-4 h-4" />
                  <span>{{ resumeStore.fileName || 'Resume' }}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <NuxtIcon name="heroicons:document" class="w-4 h-4" />
                  <span>{{ resumeStore.wordCount }} words</span>
                </span>
                <span class="flex items-center space-x-1">
                  <NuxtIcon name="heroicons:clock" class="w-4 h-4" />
                  <span>Just uploaded</span>
                </span>
              </div>
            </div>
            <button 
              @click="handleClearFile" 
              class="text-content-tertiary hover:text-red-600 transition-colors"
              title="Remove file"
            >
              <NuxtIcon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
  
          <!-- Resume Text Preview -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <p class="text-sm text-content-tertiary mb-2">Resume Preview:</p>
            <p class="text-content-secondary text-sm leading-relaxed line-clamp-4">
              {{ resumeStore.extractedText?.substring(0, 300) }}...
            </p>
          </div>
  
          <!-- Analysis Options -->
          <div class="bg-gray-100 rounded-lg p-6">
            <h4 class="font-semibold text-content-base mb-3">What we'll analyze:</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:document-check" class="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p class="font-medium text-content-base text-sm">ATS Compatibility</p>
                  <p class="text-content-tertiary text-xs">Formatting and parsing issues</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:hashtag" class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p class="font-medium text-content-base text-sm">Keyword Analysis</p>
                  <p class="text-content-tertiary text-xs">Industry keyword optimization</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:light-bulb" class="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p class="font-medium text-content-base text-sm">Recommendations</p>
                  <p class="text-content-tertiary text-xs">Actionable improvement tips</p>
                </div>
              </div>
            </div>
  
            <button 
              @click="startAnalysis" 
              :disabled="analysisStore.isAnalyzing"
              class="btn-primary w-full md:w-auto inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <NuxtIcon name="heroicons:play" class="w-5 h-5" />
              <span>Start ATS Analysis</span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- State 3: Analyzing (Loading) -->
      <div v-else-if="analysisStore.isAnalyzing" class="max-w-2xl mx-auto text-center py-16">
        <div class="mb-8">
          <!-- Animated Loading Spinner -->
          <div class="relative w-24 h-24 mx-auto mb-6">
            <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-4 bg-blue-100 rounded-full flex items-center justify-center">
              <NuxtIcon name="heroicons:document-chart-bar" class="w-8 h-8 text-blue-600" />
            </div>
          </div>
  
          <h2 class="text-2xl font-bold text-content-base mb-2">
            Analyzing Your Resume...
          </h2>
          <p class="text-content-secondary mb-6">
            Our AI is checking ATS compatibility, keywords, and formatting
          </p>
  
          <!-- Progress Steps -->
          <div class="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <NuxtIcon name="heroicons:check" class="w-3 h-3 text-white" />
                </div>
                <span class="text-sm text-content-secondary">Extracting text content</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-blue-600 rounded-full animate-pulse"></div>
                <span class="text-sm text-content-base font-medium">Analyzing ATS compatibility</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-gray-300 rounded-full"></div>
                <span class="text-sm text-content-tertiary">Generating recommendations</span>
              </div>
            </div>
          </div>
  
          <p class="text-sm text-content-tertiary mt-6">
            This usually takes 15-30 seconds
          </p>
        </div>
      </div>
  
      <!-- State 4: Results Ready -->
      <div v-else-if="analysisStore.hasATSResults" class="w-full space-y-8">
   
  
        <!-- Manual Results Display for now -->
        <div class="space-y-6">
          <!-- Executive Summary -->
          <div class="card-base card-padding">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-content-base mb-2">
                📊 ATS Analysis Results
              </h2>
              <p class="text-content-secondary">
                Analysis completed {{ formatAnalysisDate(analysisStore.atsResults.analysisDate) }}
              </p>
            </div>
  
            <!-- Score Summary Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-if="analysisStore.atsResults">
              <!-- ATS Compatibility Score -->
              <AnalysisScoreCard
                :score="analysisStore.atsResults.atsScore"
                :max-score="100"
                title="ATS Compatibility"
                description="Format & Parsing"
                :color="getScoreColor(analysisStore.atsResults.atsScore)"
                :label="getScoreLabel(analysisStore.atsResults.atsScore)"
                icon="heroicons:document-check"
              />
  
              <!-- Job Match Score -->
              <AnalysisScoreCard
                :score="analysisStore.atsResults.jobMatchScore"
                :max-score="100"
                title="Job Match"
                description="Role Relevance"
                :color="getScoreColor(analysisStore.atsResults.jobMatchScore)"
                :label="getScoreLabel(analysisStore.atsResults.jobMatchScore)"
                icon="heroicons:briefcase"
              />
  
              <!-- Keyword Match Percentage -->
              <AnalysisScoreCard
                :score="analysisStore.atsResults.keywordAnalysis.matchPercentage"
                :max-score="100"
                title="Keyword Match"
                description="Term Alignment"
                :color="getKeywordColor(analysisStore.atsResults.keywordAnalysis.matchPercentage)"
                :label="getKeywordLabel(analysisStore.atsResults.keywordAnalysis.matchPercentage)"
                icon="heroicons:key"
                :is-percentage="true"
              />
            </div>
          </div>
  
          <!-- Detailed Analysis Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="analysisStore.atsResults">
            
            <!-- Left Column -->
            <div class="space-y-6">
              
              <!-- Strengths Section -->
              <AnalysisSection
                title="💪 Key Strengths"
                icon="heroicons:check-circle"
                icon-color="text-green-600"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="strength in analysisStore.atsResults.strengths" 
                    :key="strength"
                    class="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <NuxtIcon name="heroicons:check-circle" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ strength }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Keyword Analysis Section -->
              <AnalysisSection
                title="🎯 Keyword Analysis"
                icon="heroicons:key"
                icon-color="text-blue-600"
              >
                <!-- Matched Keywords -->
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <NuxtIcon name="heroicons:check-circle" class="w-4 h-4 mr-1" />
                    Found Keywords ({{ analysisStore.atsResults.keywordAnalysis.matchedKeywords.length }})
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="keyword in analysisStore.atsResults.keywordAnalysis.matchedKeywords" 
                      :key="keyword"
                      class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full border border-green-200"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                </div>
  
                <!-- Missing Keywords -->
                <div v-if="analysisStore.atsResults.keywordAnalysis.missingKeywords.length > 0">
                  <h4 class="text-sm font-medium text-red-700 mb-2 flex items-center">
                    <NuxtIcon name="heroicons:x-circle" class="w-4 h-4 mr-1" />
                    Missing Keywords ({{ analysisStore.atsResults.keywordAnalysis.missingKeywords.length }})
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="keyword in analysisStore.atsResults.keywordAnalysis.missingKeywords" 
                      :key="keyword"
                      class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full border border-red-200"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                </div>
              </AnalysisSection>
            </div>
  
            <!-- Right Column -->
            <div class="space-y-6">
              
              <!-- Missing Elements Section -->
              <AnalysisSection
                title="🎯 Missing Elements"
                icon="heroicons:exclamation-triangle"
                icon-color="text-yellow-600"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="missing in analysisStore.atsResults.missing" 
                    :key="missing"
                    class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <NuxtIcon name="heroicons:exclamation-triangle" class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ missing }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Recommendations Section -->
              <AnalysisSection
                title="🚀 Action Items"
                icon="heroicons:light-bulb"
                icon-color="text-blue-600"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="(recommendation, index) in analysisStore.atsResults.recommendations" 
                    :key="recommendation"
                    class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div class="flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full flex items-center justify-center">
                      {{ index + 1 }}
                    </div>
                    <span class="text-content-base">{{ recommendation }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Format Issues Section -->
              <AnalysisSection
                v-if="analysisStore.atsResults.formatIssues && analysisStore.atsResults.formatIssues.length > 0"
                title="⚠️ ATS Format Issues"
                icon="heroicons:exclamation-triangle"
                icon-color="text-orange-600"
              >
                <ul class="space-y-2">
                  <li 
                    v-for="issue in analysisStore.atsResults.formatIssues" 
                    :key="issue"
                    class="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <NuxtIcon name="heroicons:exclamation-triangle" class="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ issue }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Industry-Specific Insights -->
              <AnalysisSection
                v-if="analysisStore.atsResults.industrySpecific && analysisStore.atsResults.industrySpecific.length > 0"
                title="🏢 Industry Insights"
                icon="heroicons:building-office-2"
                icon-color="text-purple-600"
              >
                <ul class="space-y-2">
                  <li 
                    v-for="insight in analysisStore.atsResults.industrySpecific" 
                    :key="insight"
                    class="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <NuxtIcon name="heroicons:star" class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ insight }}</span>
                  </li>
                </ul>
              </AnalysisSection>
            </div>
          </div>
  
          <!-- Educational Section -->
          <AnalysisATSEducation />
  
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              @click="handleStartOver"
              class="btn-secondary w-full sm:w-auto"
            >
              <NuxtIcon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
              Analyze Another Resume
            </button>
            
            <button 
              @click="exportResults"
              class="btn-primary w-full sm:w-auto"
            >
              <NuxtIcon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
              Export Analysis
            </button>
          </div>
        </div>
      </div>
  
      <!-- State 5: Error State -->
      <div v-else-if="analysisStore.analysisError" class="max-w-2xl mx-auto text-center py-16">
        <div class="bg-red-50 border border-red-200 rounded-lg p-8">
          <NuxtIcon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-content-base mb-2">Analysis Failed</h2>
          <p class="text-content-secondary mb-6">
            {{ analysisStore.analysisError.message }}
          </p>
          <div class="space-x-4">
            <button 
              v-if="analysisStore.analysisError.retryable"
              @click="retryAnalysis" 
              class="btn-primary"
            >
              Try Again
            </button>
            <button @click="handleStartOver" class="btn-secondary">
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Page metadata
  definePageMeta({
    title: 'ATS Scanner',
    description: 'Analyze your resume for ATS compatibility and get actionable feedback'
  })
  
  // Store management
  const resumeStore = useResumeStore()
  const analysisStore = useAnalysisStore()
  
  // 🔬 ANALYSIS ACTIONS
  const startAnalysis = async () => {
    if (!resumeStore.extractedText) {
      console.error('❌ No resume text available for analysis')
      return
    }
  
    try {
      console.log('🚀 Starting ATS analysis via store...')
      const success = await analysisStore.analyzeATS(resumeStore.extractedText)
      
      if (success) {
        console.log('✅ ATS analysis completed successfully')
      } else {
        console.error('❌ ATS analysis failed via store')
      }
    } catch (error) {
      console.error('❌ Unexpected error during analysis:', error)
    }
  }
  
  const retryAnalysis = async () => {
    console.log('🔄 Retrying analysis via store...')
    const success = await analysisStore.retryAnalysis()
    
    if (!success) {
      console.error('❌ Retry analysis failed')
    }
  }
  
  // File management actions
  const handleClearFile = () => {
    resumeStore.clearFile()
    analysisStore.clearResults()
    navigateTo('/')
  }
  
  const handleStartOver = () => {
    resumeStore.clearFile()
    analysisStore.clearResults()
    navigateTo('/')
  }
  
  const navigateToJobComparison = () => {
    navigateTo('/job-comparison')
  }
  
  // 🚀 AUTO-START ANALYSIS LOGIC (Enhanced with debugging)
  onMounted(async () => {
    const route = useRoute()
    
    // More flexible auto-start detection
    const autoStartQuery = route.query.autoStart
    const shouldAutoStart = autoStartQuery === 'true' || autoStartQuery === true || autoStartQuery === 1 || autoStartQuery === '1'
    
    console.log('🔍 Auto-start debugging:', {
      routeQuery: route.query,
      autoStartQuery,
      shouldAutoStart,
      hasFile: resumeStore.isFileUploaded,
      hasResults: analysisStore.hasATSResults,
      isAnalyzing: analysisStore.isAnalyzing
    })
    
    // If user has uploaded file but no results, auto-start analysis
    if (resumeStore.isFileUploaded && !analysisStore.hasATSResults && !analysisStore.isAnalyzing) {
      if (shouldAutoStart) {
        console.log('🎯 Auto-starting analysis from homepage navigation...')
        // Small delay to ensure everything is ready
        await nextTick()
        await startAnalysis()
      } else {
        console.log('📄 Resume ready for manual analysis')
      }
    } else {
      console.log('🔍 Auto-start conditions not met:', {
        hasFile: resumeStore.isFileUploaded,
        hasResults: analysisStore.hasATSResults,
        isAnalyzing: analysisStore.isAnalyzing,
        reason: !resumeStore.isFileUploaded ? 'No file uploaded' : 
                analysisStore.hasATSResults ? 'Already has results' :
                analysisStore.isAnalyzing ? 'Currently analyzing' : 'Unknown'
      })
    }
  })
  
  // 🔍 SCORE HELPERS
  function getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-700'
    if (score >= 60) return 'text-yellow-700'
    return 'text-red-700'
  }
  
  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }
  
  // Keyword match helpers (50-70% is optimal)
  function getKeywordColor(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'text-green-700'
    if (percentage >= 40 && percentage <= 80) return 'text-yellow-700'
    return 'text-red-700'
  }
  
  function getKeywordLabel(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'Optimal Range'
    if (percentage >= 40 && percentage <= 80) return 'Acceptable'
    if (percentage < 40) return 'Too Low'
    return 'Too High'
  }
  
  // Date formatting
  function formatAnalysisDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
    if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60)
      return `${hours} hour${hours === 1 ? '' : 's'} ago`
    }
    
    return date.toLocaleDateString()
  }
  
  // Export results
  function exportResults() {
    if (!analysisStore.atsResults) return
    
    const results = analysisStore.atsResults
    const exportText = `ATS Resume Analysis Results
  Generated: ${formatAnalysisDate(results.analysisDate)}
  ${results.processingTime ? `Processing Time: ${results.processingTime}ms` : ''}
  
  SCORES:
  • ATS Compatibility: ${results.atsScore}/100 (${getScoreLabel(results.atsScore)})
  • Job Match: ${results.jobMatchScore}/100 (${getScoreLabel(results.jobMatchScore)})
  • Keyword Match: ${results.keywordAnalysis.matchPercentage}% (${getKeywordLabel(results.keywordAnalysis.matchPercentage)})
  
  STRENGTHS:
  ${results.strengths.map(s => `• ${s}`).join('\n')}
  
  MISSING ELEMENTS:
  ${results.missing.map(m => `• ${m}`).join('\n')}
  
  ACTION ITEMS:
  ${results.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
  
  KEYWORD ANALYSIS:
  Found Keywords: ${results.keywordAnalysis.matchedKeywords.join(', ')}
  Missing Keywords: ${results.keywordAnalysis.missingKeywords.join(', ')}
  
  ${results.formatIssues && results.formatIssues.length > 0 ? `FORMAT ISSUES:
  ${results.formatIssues.map(f => `• ${f}`).join('\n')}
  
  ` : ''}${results.industrySpecific && results.industrySpecific.length > 0 ? `INDUSTRY INSIGHTS:
  ${results.industrySpecific.map(i => `• ${i}`).join('\n')}
  
  ` : ''}Generated by Resume ATS Analyzer
  Analysis Date: ${new Date().toISOString()}`
    
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ats-analysis-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  // SEO and meta
  useHead({
    title: 'ATS Scanner - Resume Analysis',
    meta: [
      {
        name: 'description',
        content: 'Analyze your resume for ATS compatibility. Get AI-powered insights on formatting, keywords, and optimization recommendations.'
      },
      {
        property: 'og:title',
        content: 'ATS Scanner - Resume Analysis'
      },
      {
        property: 'og:description',
        content: 'Upload your resume and get instant ATS compatibility analysis with actionable recommendations.'
      }
    ]
  })
  </script>
  
  <style scoped>
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>