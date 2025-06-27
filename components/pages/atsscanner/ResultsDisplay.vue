<!-- 
  Component: ResultsDisplay.vue
  Location: /components/pages/ats-scanner/PagesAtsscannerResultsDisplay.vue
  Purpose: State 4 - Complete ATS analysis results display
-->
<template>
    <div class="w-full space-y-8">
      <!-- Manual Results Display for now -->
      <div class="space-y-6">
        <!-- Executive Summary -->
        <div class="bg-surface-secondary border border-border rounded-lg p-6">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-content-base mb-2">
              📊 ATS Analysis Results
            </h2>
            <p class="text-content-secondary">
              Analysis completed {{ formatAnalysisDate(results.analysisDate) }}
            </p>
          </div>
  
          <!-- Score Summary Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- ATS Compatibility Score -->
            <AnalysisScoreCard
              :score="results.atsScore"
              :max-score="100"
              title="ATS Compatibility"
              description="Format & Parsing"
              :color="getScoreColor(results.atsScore)"
              :label="getScoreLabel(results.atsScore)"
              icon="heroicons:document-check"
            />
  
            <!-- Job Match Score -->
            <AnalysisScoreCard
              :score="results.jobMatchScore"
              :max-score="100"
              title="Job Match"
              description="Role Relevance"
              :color="getScoreColor(results.jobMatchScore)"
              :label="getScoreLabel(results.jobMatchScore)"
              icon="heroicons:briefcase"
            />
  
            <!-- Keyword Match Percentage -->
            <AnalysisScoreCard
              :score="results.keywordAnalysis.matchPercentage"
              :max-score="100"
              title="Keyword Match"
              description="Term Alignment"
              :color="getKeywordColor(results.keywordAnalysis.matchPercentage)"
              :label="getKeywordLabel(results.keywordAnalysis.matchPercentage)"
              icon="heroicons:key"
              :is-percentage="true"
            />
          </div>
        </div>
  
        <!-- Detailed Analysis Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
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
                  v-for="strength in results.strengths" 
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
                  Found Keywords ({{ results.keywordAnalysis.matchedKeywords.length }})
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="keyword in results.keywordAnalysis.matchedKeywords" 
                    :key="keyword"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-success bg-success/10 rounded-full border border-success/20"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </div>
  
              <!-- Missing Keywords -->
              <div v-if="results.keywordAnalysis.missingKeywords.length > 0">
                <h4 class="text-sm font-medium text-error mb-2 flex items-center">
                  <NuxtIcon name="heroicons:x-circle" class="w-4 h-4 mr-1" />
                  Missing Keywords ({{ results.keywordAnalysis.missingKeywords.length }})
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="keyword in results.keywordAnalysis.missingKeywords" 
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
                  v-for="missing in results.missing" 
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
                  v-for="(recommendation, index) in results.recommendations" 
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
              v-if="results.formatIssues && results.formatIssues.length > 0"
              title="⚠️ ATS Format Issues"
              icon="heroicons:exclamation-triangle"
              icon-color="text-error"
            >
              <ul class="space-y-2">
                <li 
                  v-for="issue in results.formatIssues" 
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
              v-if="results.industrySpecific && results.industrySpecific.length > 0"
              title="🏢 Industry Insights"
              icon="heroicons:building-office-2"
              icon-color="text-content-secondary"
            >
              <ul class="space-y-2">
                <li 
                  v-for="insight in results.industrySpecific" 
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
            @click="$emit('startOver')"
            class="btn-secondary w-full sm:w-auto"
          >
            <NuxtIcon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
            Analyze Another Resume
          </button>
          
          <button 
            @click="handleExportResults"
            class="btn-primary w-full sm:w-auto"
          >
            <NuxtIcon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
            Export Analysis
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Props interface
  interface Props {
    results: {
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
      analysisDate: string
      processingTime?: number
    }
  }
  
  // Emits interface
  interface Emits {
    startOver: []
    exportResults: []
  }
  
  // Define props and emits
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
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
  
  // Export functionality
  function handleExportResults() {
    const results = props.results
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
    
    emit('exportResults')
  }
  </script>
  
  <!-- 
    COMPONENT INFO:
    - Functionality: Complete ATS analysis results display with score cards and sections
    - Dependencies: AnalysisScoreCard, AnalysisSection, AnalysisATSEducation, NuxtIcon
    - Store Connection: None - receives data via props, emits events to parent
    - Usage: <PagesAtsscannerResultsDisplay 
               :results="analysisStore.atsResults"
               @startOver="handleStartOver" 
               @exportResults="exportResults" 
             />
    
    INTEGRATION WITH MAIN PAGE:
    - Replaces the large v-else-if="analysisStore.hasATSResults" block
    - Receives results data via props instead of directly accessing stores
    - Emits events back to parent for actions
    - Uses existing AnalysisScoreCard and AnalysisSection components
    - Auto-imported by Nuxt as PagesAtsscannerResultsDisplay
  -->