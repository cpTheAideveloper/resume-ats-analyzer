<!-- 
  📍 COMPONENT LOCATION: components/analysis/ATSResults.vue
  🎯 PURPOSE: Main container for ATS analysis results with semantic theme integration
  🔧 PHASE: Phase 6 - Analysis Pages
-->

<template>
    <div v-if="results" class="w-full space-y-8">
      <!-- Executive Summary Section -->
      <div class="card-base card-padding">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-content-base mb-2">
            📊 ATS Analysis Results
          </h2>
          <p class="text-content-secondary">
            Analysis completed {{ formatAnalysisDate(results.analysisDate) }}
            <span v-if="results.processingTime" class="text-content-tertiary">
              • Processed in {{ results.processingTime }}ms
            </span>
          </p>
        </div>
  
        <!-- Score Summary Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- ATS Compatibility Score -->
          <ScoreCard
            :score="results.atsScore"
            :max-score="100"
            title="ATS Compatibility"
            description="Format & Parsing"
            :color="getScoreColor(results.atsScore)"
            :label="getScoreLabel(results.atsScore)"
            icon="heroicons:document-check"
          />
  
          <!-- Job Match Score -->
          <ScoreCard
            :score="results.jobMatchScore"
            :max-score="100"
            title="Job Match"
            description="Role Relevance"
            :color="getScoreColor(results.jobMatchScore)"
            :label="getScoreLabel(results.jobMatchScore)"
            icon="heroicons:briefcase"
          />
  
          <!-- Keyword Match Percentage -->
          <ScoreCard
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
  
        <!-- Quick Insights -->
        <div class="mt-6 p-4 bg-surface-secondary rounded-lg border border-border-secondary">
          <div class="flex items-start space-x-3">
            <Icon name="heroicons:light-bulb" class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 class="text-sm font-medium text-content-base mb-1">Quick Insights</h3>
              <p class="text-sm text-content-secondary">
                {{ getQuickInsight() }}
              </p>
            </div>
          </div>
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
                class="flex items-start space-x-3 p-3 bg-success-light rounded-lg border border-success/20"
              >
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
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
              <h4 class="text-sm font-medium text-success-dark mb-2 flex items-center">
                <Icon name="heroicons:check-circle" class="w-4 h-4 mr-1" />
                Found Keywords ({{ results.keywordAnalysis.matchedKeywords.length }})
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in results.keywordAnalysis.matchedKeywords" 
                  :key="keyword"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-success-dark bg-success-light rounded-full border border-success/20"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
  
            <!-- Missing Keywords -->
            <div v-if="results.keywordAnalysis.missingKeywords.length > 0">
              <h4 class="text-sm font-medium text-error-dark mb-2 flex items-center">
                <Icon name="heroicons:x-circle" class="w-4 h-4 mr-1" />
                Missing Keywords ({{ results.keywordAnalysis.missingKeywords.length }})
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in results.keywordAnalysis.missingKeywords" 
                  :key="keyword"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-error-dark bg-error-light rounded-full border border-error/20"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </AnalysisSection>
  
          <!-- Format Issues Section -->
          <AnalysisSection
            v-if="results.formatIssues && results.formatIssues.length > 0"
            title="⚠️ ATS Format Issues"
            icon="heroicons:exclamation-triangle"
            icon-color="text-warning"
          >
            <ul class="space-y-2">
              <li 
                v-for="issue in results.formatIssues" 
                :key="issue"
                class="flex items-start space-x-3 p-3 bg-warning-light rounded-lg border border-warning/20"
              >
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <span class="text-content-base">{{ issue }}</span>
              </li>
            </ul>
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
                class="flex items-start space-x-3 p-3 bg-warning-light rounded-lg border border-warning/20"
              >
                <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
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
                class="flex items-start space-x-3 p-3 bg-primary-light rounded-lg border border-primary/20"
              >
                <div class="flex-shrink-0 w-6 h-6 text-xs font-bold text-primary-content bg-primary rounded-full flex items-center justify-center">
                  {{ index + 1 }}
                </div>
                <span class="text-content-base">{{ recommendation }}</span>
              </li>
            </ul>
          </AnalysisSection>
  
          <!-- Industry-Specific Insights -->
          <AnalysisSection
            v-if="results.industrySpecific && results.industrySpecific.length > 0"
            title="🏢 Industry Insights"
            icon="heroicons:building-office-2"
            icon-color="text-accent"
          >
            <ul class="space-y-2">
              <li 
                v-for="insight in results.industrySpecific" 
                :key="insight"
                class="flex items-start space-x-3 p-3 bg-accent-light rounded-lg border border-accent/20"
              >
                <Icon name="heroicons:star" class="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span class="text-content-base">{{ insight }}</span>
              </li>
            </ul>
          </AnalysisSection>
        </div>
      </div>
  
      <!-- Educational Section -->
      <ATSEducation />
  
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button 
          @click="$emit('start-over')"
          class="btn-secondary w-full sm:w-auto"
        >
          <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
          Analyze Another Resume
        </button>
        
        <button 
          @click="exportResults"
          class="btn-primary w-full sm:w-auto"
        >
          <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
          Export Analysis
        </button>
        
        <button 
          v-if="showJobComparison"
          @click="$emit('compare-job')"
          class="bg-accent hover:bg-accent-hover text-accent-content px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto inline-flex items-center justify-center"
        >
          <Icon name="heroicons:clipboard-document-check" class="w-5 h-5 mr-2" />
          Compare with Job
        </button>
      </div>
    </div>
  
    <!-- No Results State -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:document-magnifying-glass" class="w-16 h-16 text-content-tertiary mx-auto mb-4" />
      <h3 class="text-lg font-medium text-content-base mb-2">No Analysis Results</h3>
      <p class="text-content-secondary">Upload and analyze a resume to see results here.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { ATSResults } from '~/stores/analysis'
  
  // 🎛️ PROPS
  interface ATSResultsProps {
    results?: ATSResults | null
    showJobComparison?: boolean
  }
  
  const props = withDefaults(defineProps<ATSResultsProps>(), {
    results: null,
    showJobComparison: true
  })
  
  // 🎬 EMITS
  defineEmits<{
    'start-over': []
    'compare-job': []
    'export-results': [results: ATSResults]
  }>()
  
  // 🔍 COMPUTED PROPERTIES
  
  // Score color helpers
  function getScoreColor(score: number): string {
    if (score >= 80) return 'text-success-dark'
    if (score >= 60) return 'text-warning-dark'
    return 'text-error-dark'
  }
  
  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }
  
  // Keyword match helpers (50-70% is optimal)
  function getKeywordColor(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'text-success-dark'
    if (percentage >= 40 && percentage <= 80) return 'text-warning-dark'
    return 'text-error-dark'
  }
  
  function getKeywordLabel(percentage: number): string {
    if (percentage >= 50 && percentage <= 70) return 'Optimal Range'
    if (percentage >= 40 && percentage <= 80) return 'Acceptable'
    if (percentage < 40) return 'Too Low'
    return 'Too High'
  }
  
  // Quick insight generator
  function getQuickInsight(): string {
    if (!props.results) return ''
    
    const { atsScore, jobMatchScore, keywordAnalysis } = props.results
    const avgScore = Math.round((atsScore + jobMatchScore) / 2)
    
    if (avgScore >= 80) {
      return `Strong resume with ${avgScore}% overall compatibility. Focus on the top recommendations for maximum impact.`
    } else if (avgScore >= 60) {
      return `Good foundation with ${avgScore}% compatibility. Address missing keywords and format issues to improve ranking.`
    } else {
      return `Resume needs significant optimization (${avgScore}% compatibility). Focus on ATS format and keyword alignment first.`
    }
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
  
  // 🎬 FUNCTIONS
  function exportResults() {
    if (!props.results) return
    
    const exportData = {
      analysisDate: props.results.analysisDate,
      scores: {
        atsCompatibility: props.results.atsScore,
        jobMatch: props.results.jobMatchScore,
        keywordMatch: props.results.keywordAnalysis.matchPercentage
      },
      strengths: props.results.strengths,
      missingElements: props.results.missing,
      recommendations: props.results.recommendations,
      keywordAnalysis: props.results.keywordAnalysis,
      formatIssues: props.results.formatIssues || [],
      industryInsights: props.results.industrySpecific || []
    }
    
    const exportText = `ATS Resume Analysis Results
  Generated: ${formatAnalysisDate(props.results.analysisDate)}
  
  SCORES:
  • ATS Compatibility: ${props.results.atsScore}/100 (${getScoreLabel(props.results.atsScore)})
  • Job Match: ${props.results.jobMatchScore}/100 (${getScoreLabel(props.results.jobMatchScore)})
  • Keyword Match: ${props.results.keywordAnalysis.matchPercentage}% (${getKeywordLabel(props.results.keywordAnalysis.matchPercentage)})
  
  STRENGTHS:
  ${props.results.strengths.map(s => `• ${s}`).join('\n')}
  
  MISSING ELEMENTS:
  ${props.results.missing.map(m => `• ${m}`).join('\n')}
  
  ACTION ITEMS:
  ${props.results.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
  
  KEYWORD ANALYSIS:
  Found: ${props.results.keywordAnalysis.matchedKeywords.join(', ')}
  Missing: ${props.results.keywordAnalysis.missingKeywords.join(', ')}
  
  ${props.results.formatIssues?.length ? `FORMAT ISSUES:\n${props.results.formatIssues.map(f => `• ${f}`).join('\n')}\n\n` : ''}${props.results.industrySpecific?.length ? `INDUSTRY INSIGHTS:\n${props.results.industrySpecific.map(i => `• ${i}`).join('\n')}` : ''}`
    
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ats-analysis-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }
  </script>
  
  <!-- 
    🔗 HOW THIS ATS RESULTS COMPONENT WORKS:
    
    📋 PURPOSE:
    - Main container for displaying comprehensive ATS analysis results
    - Integrates with semantic theme system for consistent styling
    - Responsive design that works with sidebar layout
    - Modular structure using child components
    
    📊 COMPONENT STRUCTURE:
    - Executive Summary: Score cards with visual progress rings
    - Detailed Analysis: Two-column grid layout
    - Educational Content: ATS knowledge and best practices
    - Action Buttons: Export, retry, and next steps
    
    🎨 SEMANTIC THEME INTEGRATION:
    - Uses semantic text colors (content-base/secondary/tertiary)
    - Status colors for scores (success/warning/error)
    - Card-based layout with consistent padding
    - Responsive design that adapts to theme changes
    
    📱 RESPONSIVE BEHAVIOR:
    - Desktop: Two-column detailed analysis grid
    - Mobile: Single-column stacked layout
    - Works with sidebar layout (desktop) and bottom sheet (mobile)
    - Touch-friendly button sizing and spacing
    
    🔌 CHILD COMPONENTS USED:
    - ScoreCard: Individual score visualization with progress rings
    - AnalysisSection: Consistent section wrapper with icons
    - ATSEducation: Educational content about ATS systems
    
    🎯 FEATURES:
    - Smart score color coding (80+ green, 60+ yellow, <60 red)
    - Keyword match optimization (50-70% is optimal range)
    - Quick insights based on scores
    - Export functionality with formatted text
    - Time-aware analysis date formatting
    
    📊 DATA FLOW:
    - Receives ATSResults from analysis store
    - Emits events for parent component actions
    - Handles export functionality locally
    - Uses computed properties for score helpers
    
    🎨 VISUAL DESIGN:
    - Card-based layout with consistent spacing
    - Color-coded sections (green=good, yellow=warning, red=error)
    - Icons for visual hierarchy and quick scanning
    - Rounded corners and subtle shadows
    - Semantic color system for theme consistency
    
    🚫 WHAT IT DOESN'T DO:
    - Fetch analysis data (receives via props)
    - Handle analysis state management (parent handles)
    - Manage navigation (emits events to parent)
    - Handle file uploads (separate component)
    
    📋 USAGE PATTERN:
    <ATSResults 
      :results="analysisStore.atsResults"
      @start-over="handleStartOver"
      @compare-job="navigateToJobComparison"
      @export-results="handleExport"
    />
  -->