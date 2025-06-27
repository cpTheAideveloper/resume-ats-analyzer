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
        <div class="bg-surface-secondary border border-border rounded-lg p-6 mb-8">
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
              class="text-content-tertiary hover:text-error transition-colors"
              title="Remove file"
            >
              <NuxtIcon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
  
          <!-- Resume Text Preview -->
          <div class="bg-surface-tertiary border border-border-secondary rounded-lg p-4 mb-6">
            <p class="text-sm text-content-tertiary mb-2">Resume Preview:</p>
            <p class="text-content-secondary text-sm leading-relaxed line-clamp-4">
              {{ resumeStore.extractedText?.substring(0, 300) }}...
            </p>
          </div>
  
          <!-- Analysis Options -->
          <div class="bg-surface border border-border-accent rounded-lg p-6">
            <h4 class="font-semibold text-content-base mb-4">What we'll analyze:</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:document-check" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-content-base text-sm">ATS Compatibility</p>
                  <p class="text-content-tertiary text-xs">Formatting and parsing issues</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:hashtag" class="w-4 h-4 text-success" />
                </div>
                <div>
                  <p class="font-medium text-content-base text-sm">Keyword Analysis</p>
                  <p class="text-content-tertiary text-xs">Industry keyword optimization</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NuxtIcon name="heroicons:light-bulb" class="w-4 h-4 text-warning" />
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
            <div class="absolute inset-0 border-4 border-border rounded-full"></div>
            <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
              <NuxtIcon name="heroicons:document-chart-bar" class="w-8 h-8 text-primary" />
            </div>
          </div>
  
          <h2 class="text-2xl font-bold text-content-base mb-2">
            Analyzing Your Resume...
          </h2>
          <p class="text-content-secondary mb-6">
            Our AI is checking ATS compatibility, keywords, and formatting
          </p>
  
          <!-- Progress Steps -->
          <div class="bg-surface-secondary border border-border rounded-lg p-6 max-w-md mx-auto">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <NuxtIcon name="heroicons:check" class="w-3 h-3 text-success-content" />
                </div>
                <span class="text-sm text-content-secondary">Extracting text content</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-primary rounded-full animate-pulse"></div>
                <span class="text-sm text-content-base font-medium">Analyzing ATS compatibility</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-border rounded-full"></div>
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
          <div class="bg-surface-secondary border border-border rounded-lg p-6">
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
                icon-color="text-success"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="strength in analysisStore.atsResults.strengths" 
                    :key="strength"
                    class="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border border-success/20"
                  >
                    <NuxtIcon name="heroicons:check-circle" class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ strength }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Keyword Analysis Section -->
              <AnalysisSection
                title="🎯 Keyword Analysis"
                icon="heroicons:key"
                icon-color="text-primary"
              >
                <!-- Matched Keywords -->
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-success mb-2 flex items-center">
                    <NuxtIcon name="heroicons:check-circle" class="w-4 h-4 mr-1" />
                    Found Keywords ({{ analysisStore.atsResults.keywordAnalysis.matchedKeywords.length }})
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="keyword in analysisStore.atsResults.keywordAnalysis.matchedKeywords" 
                      :key="keyword"
                      class="inline-flex items-center px-2 py-1 text-xs font-medium text-success bg-success/10 rounded-full border border-success/20"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                </div>
  
                <!-- Missing Keywords -->
                <div v-if="analysisStore.atsResults.keywordAnalysis.missingKeywords.length > 0">
                  <h4 class="text-sm font-medium text-error mb-2 flex items-center">
                    <NuxtIcon name="heroicons:x-circle" class="w-4 h-4 mr-1" />
                    Missing Keywords ({{ analysisStore.atsResults.keywordAnalysis.missingKeywords.length }})
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="keyword in analysisStore.atsResults.keywordAnalysis.missingKeywords" 
                      :key="keyword"
                      class="inline-flex items-center px-2 py-1 text-xs font-medium text-error bg-error/10 rounded-full border border-error/20"
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
                icon-color="text-warning"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="missing in analysisStore.atsResults.missing" 
                    :key="missing"
                    class="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg border border-warning/20"
                  >
                    <NuxtIcon name="heroicons:exclamation-triangle" class="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ missing }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Recommendations Section -->
              <AnalysisSection
                title="🚀 Action Items"
                icon="heroicons:light-bulb"
                icon-color="text-primary"
              >
                <ul class="space-y-3">
                  <li 
                    v-for="(recommendation, index) in analysisStore.atsResults.recommendations" 
                    :key="recommendation"
                    class="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <div class="flex-shrink-0 w-6 h-6 text-xs font-bold text-primary-content bg-primary rounded-full flex items-center justify-center">
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
                icon-color="text-error"
              >
                <ul class="space-y-2">
                  <li 
                    v-for="issue in analysisStore.atsResults.formatIssues" 
                    :key="issue"
                    class="flex items-start space-x-3 p-3 bg-error/5 rounded-lg border border-error/20"
                  >
                    <NuxtIcon name="heroicons:exclamation-triangle" class="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
                    <span class="text-content-base">{{ issue }}</span>
                  </li>
                </ul>
              </AnalysisSection>
  
              <!-- Industry-Specific Insights -->
              <AnalysisSection
                v-if="analysisStore.atsResults.industrySpecific && analysisStore.atsResults.industrySpecific.length > 0"
                title="🏢 Industry Insights"
                icon="heroicons:building-office-2"
                icon-color="text-content-secondary"
              >
                <ul class="space-y-2">
                  <li 
                    v-for="insight in analysisStore.atsResults.industrySpecific" 
                    :key="insight"
                    class="flex items-start space-x-3 p-3 bg-surface-tertiary rounded-lg border border-border-secondary"
                  >
                    <NuxtIcon name="heroicons:star" class="w-5 h-5 text-content-secondary mt-0.5 flex-shrink-0" />
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
        <div class="bg-error/5 border border-error/20 rounded-lg p-8">
          <NuxtIcon name="heroicons:exclamation-triangle" class="w-12 h-12 text-error mx-auto mb-4" />
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
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-error'
  }
  
  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }
  
  // Keyword match helpers (50-70% is optimal)
  function getKeywordColor(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'text-success'
    if (percentage >= 40 && percentage <= 80) return 'text-warning'
    return 'text-error'
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
<!-- 
  🔗 HOW THIS COMPONENT WORKS:
  
  📋 PURPOSE:
  - Complete ATS analysis page with 5 distinct states
  - Auto-start functionality when coming from homepage
  - Semantic theme integration with consistent styling
  - Professional loading states and error handling
  - Integration with existing ATSResults component
  
  📊 STATE MANAGEMENT:
  - Uses useResumeStore() for file management
  - Uses useAnalysisStore() for analysis state and results
  - Reactive state changes based on upload and analysis status
  - Auto-start logic based on URL parameters
  
  🔌 CONNECTIONS:
  - stores/resume.ts: File upload status and extracted text
  - stores/analysis.ts: Analysis state, results, and error handling
  - components/analysis/ATSResults.vue: Complete results display
  - pages/index.vue: Homepage with auto-start navigation
  - /job-comparison: Alternative analysis flow
  
  🎯 AUTO-START LOGIC:
  - Detects ?autoStart=true URL parameter from homepage
  - Automatically begins analysis when file is uploaded
  - Eliminates extra "Ready to Analyze" click for better UX
  - Maintains manual analysis option for direct navigation
  - Console logging for debugging and flow tracking
  
  📱 FIVE DISTINCT STATES:
  
  STATE 1 - No File Uploaded:
  - Shows upload prompt with clear call-to-action
  - Links back to homepage for file upload
  - Uses semantic typography and icon system
  
  STATE 2 - File Ready, Not Analyzed:
  - Shows uploaded file information and preview
  - Analysis options with clear feature breakdown
  - Manual "Start ATS Analysis" button
  - Option to remove file and start over
  
  STATE 3 - Analyzing (Loading):
  - Professional animated loading spinner
  - Step-by-step progress indicators
  - Estimated completion time
  - Engaging visual feedback
  
  STATE 4 - Results Ready:
  - Complete ATSResults component integration
  - Handles start-over and job comparison actions
  - Full analysis display with scores and recommendations
  
  STATE 5 - Error State:
  - Professional error handling with clear messaging
  - Retry and start-over options
  - User-friendly error recovery flow
  
  🎨 SEMANTIC THEME COLORS USED:
  
  CONTENT COLORS (Text Hierarchy):
  - text-content-base: Headings, important content
  - text-content-secondary: Body text, descriptions
  - text-content-tertiary: Labels, metadata, supporting text
  
  COMPONENT UTILITIES:
  - btn-primary: Primary action buttons (theme-aware)
  - btn-secondary: Secondary action buttons (theme-aware)
  - card-base: Consistent card styling with borders
  - card-padding: Responsive padding for card content
  - text-hero: Responsive hero typography
  - text-subtitle: Responsive subtitle typography
  - container-section: Responsive container with semantic padding
  - space-component: Consistent component spacing
  
  STANDARD COLORS (Where semantic doesn't apply):
  - bg-gray-50/100: Neutral backgrounds for preview areas
  - bg-blue-100, text-blue-600: ATS compatibility indicators
  - bg-green-100, text-green-600: Keyword analysis indicators
  - bg-amber-100, text-amber-600: Recommendations indicators
  - bg-red-50, border-red-200: Error state styling
  
  📱 RESPONSIVE DESIGN:
  - Mobile-first approach with proper scaling
  - Touch-friendly button sizing and spacing
  - Proper text sizing across all breakpoints
  - Grid layouts that adapt to screen size
  - Optimized for both sidebar (desktop) and bottom sheet (mobile)
  
  🎯 ENHANCED FEATURES:
  - Professional loading animations with progress steps
  - File preview with text truncation
  - Analysis feature breakdown with icons
  - Error recovery with retry functionality
  - Navigation breadcrumbs and clear user flows
  - Console logging for debugging and development
  
  🎯 COMPONENT INTEGRATION:
  - ATSResults: Complete results display with events
  - ResumeUploader/ResumePreview: File management components
  - Icon system: Consistent iconography throughout
  - Navigation: Seamless routing between analysis flows
  
  🎯 USER EXPERIENCE OPTIMIZATIONS:
  - Auto-start eliminates unnecessary clicks
  - Clear state transitions with appropriate messaging
  - Professional loading states with time estimates
  - Error handling with helpful recovery options
  - Consistent navigation patterns
  - Theme-aware styling that adapts automatically
  
  🚫 WHAT IT DOESN'T DO:
  - File uploading (delegated to homepage/components)
  - Theme switching (handled by layout)
  - Actual AI analysis (delegated to store/API)
  - Job comparison analysis (separate page)
  - Results storage/persistence (handled by store)
  
  📋 TYPICAL USER FLOWS:
  
  FLOW 1 - Auto-start from Homepage:
  1. User uploads resume on homepage
  2. Clicks "Analyze Resume" button
  3. Navigates to /ats-scanner?autoStart=true
  4. Analysis automatically begins
  5. Loading state → Results display
  
  FLOW 2 - Direct Navigation:
  1. User navigates directly to /ats-scanner
  2. Shows appropriate state based on file upload status
  3. Manual analysis trigger if file exists
  4. Manual upload prompt if no file
  
  FLOW 3 - Error Recovery:
  1. Analysis fails with error message
  2. User can retry analysis or start over
  3. Clear error state management
  4. Helpful feedback and recovery options
  
  🎯 BEST PRACTICES FOLLOWED:
  - Semantic color naming for theme consistency
  - Component utility classes for reusability
  - Proper TypeScript typing and error handling
  - Comprehensive documentation and comments
  - Responsive design with mobile-first approach
  - Accessible design with proper contrast ratios
  - Progressive enhancement with auto-start feature
  - Clear separation of concerns and responsibilities
  - Professional loading states and error handling
  - Consistent navigation and user flow patterns
-->