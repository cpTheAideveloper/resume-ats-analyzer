<!-- 
  Page: ats-scanner.vue
  Route: /ats-scanner
  Purpose: ATS resume analysis with 5 state components and auto-start functionality
-->
<template>
    <div class="container-section space-component">
      <!-- State 1: No File Uploaded -->
      <PagesAtsscannerUploadPrompt v-if="!resumeStore.isFileUploaded" />
  
      <!-- State 2: File Ready, Not Analyzed -->
      <PagesAtsscannerReadyInterface 
        v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasATSResults"
        :fileName="resumeStore.fileName" 
        :wordCount="resumeStore.wordCount"
        :extractedText="resumeStore.extractedText" 
        :isAnalyzing="analysisStore.isAnalyzing"
        @clearFile="handleClearFile" 
        @startAnalysis="startAnalysis" 
      />
  
      <!-- State 3: Analyzing (Loading) -->
      <PagesAtsscannerAnalysisLoading v-else-if="analysisStore.isAnalyzing" />
  
      <!-- State 4: Results Ready -->
      <PagesAtsscannerResultsDisplay 
        v-else-if="analysisStore.hasATSResults" 
        :results="analysisStore.atsResults"
        @startOver="handleStartOver" 
        @exportResults="exportResults" 
      />
  
      <!-- State 5: Error State -->
      <PagesAtsscannerErrorState 
        v-else-if="analysisStore.analysisError" 
        :error="analysisStore.analysisError"
        @retry="retryAnalysis" 
        @startOver="handleStartOver" 
      />
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
  
  // Analysis actions
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
  
  // Auto-start analysis logic
  onMounted(async () => {
    const route = useRoute()
    const autoStartQuery = route.query.autoStart
    const shouldAutoStart = autoStartQuery === 'true' || autoStartQuery === true || autoStartQuery === 1 || autoStartQuery === '1'
    
    console.log('🔍 Auto-start debugging:', {
      routeQuery: route.query,
      shouldAutoStart,
      hasFile: resumeStore.isFileUploaded,
      hasResults: analysisStore.hasATSResults,
      isAnalyzing: analysisStore.isAnalyzing
    })
    
    // Auto-start analysis if conditions are met
    if (resumeStore.isFileUploaded && !analysisStore.hasATSResults && !analysisStore.isAnalyzing) {
      if (shouldAutoStart) {
        console.log('🎯 Auto-starting analysis from homepage navigation...')
        await nextTick()
        await startAnalysis()
      } else {
        console.log('📄 Resume ready for manual analysis')
      }
    }
  })
  
  // Score helper functions
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
  
  // Export results functionality
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
  
  <!-- 
    PAGE INFO:
    - Functionality: 5-state ATS analysis flow with component composition
    - Store Usage: useResumeStore (file data), useAnalysisStore (analysis state/results)
    - Navigation: Auto-start from homepage, manual analysis, error recovery
    - Dependencies: 5 page-specific components, existing analysis components
  -->