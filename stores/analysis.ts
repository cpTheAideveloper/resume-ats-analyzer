// stores/analysis.ts
import { defineStore } from 'pinia'

// 📊 ANALYSIS RESULT INTERFACES
export interface KeywordAnalysis {
  matchedKeywords: string[]
  missingKeywords: string[]
  matchPercentage: number
}

export interface Recommendation {
  text: string
  priority: 'high' | 'medium' | 'low'
  category: 'keywords' | 'format' | 'content' | 'skills'
  implementation: 'easy' | 'moderate' | 'complex'
}

export interface ATSResults {
  atsScore: number
  jobMatchScore: number
  strengths: string[]
  missing: string[]
  recommendations: string[]
  keywordAnalysis: KeywordAnalysis
  formatIssues?: string[]
  industrySpecific?: string[]
  analysisDate: string
  processingTime?: number
}

export interface JobComparisonResults {
  matchScore: number
  skillsMatch: string[]
  skillsGap: string[]
  experienceAlignment: number
  recommendations: string[]
  keywordAnalysis: KeywordAnalysis
  industryFit: number
  analysisDate: string
}

export interface AnalysisError {
  message: string
  code: string
  timestamp: string
  retryable: boolean
}

// 📊 API RESPONSE INTERFACES  
export interface ATSAnalysisResponse {
  success: boolean
  data?: ATSResults
  error?: string
  processingTime?: number
}

export interface JobComparisonResponse {
  success: boolean
  data?: JobComparisonResults
  error?: string
  processingTime?: number
}

export const useAnalysisStore = defineStore('analysis', () => {
  // 📱 STATE
  const isAnalyzingATS = ref(false)
  const isAnalyzingJob = ref(false)
  const atsResults = ref<ATSResults | null>(null)
  const jobComparisonResults = ref<JobComparisonResults | null>(null)
  const analysisError = ref<AnalysisError | null>(null)
  const currentAnalysisId = ref<string | null>(null)
  const analysisHistory = ref<ATSResults[]>([])

  // 🔍 COMPUTED PROPERTIES
  const isAnalyzing = computed(() => 
    isAnalyzingATS.value || isAnalyzingJob.value
  )

  const hasATSResults = computed(() => 
    atsResults.value !== null
  )

  const hasJobResults = computed(() => 
    jobComparisonResults.value !== null
  )

  const hasAnyResults = computed(() => 
    hasATSResults.value || hasJobResults.value
  )

  const lastAnalysisType = computed(() => {
    if (hasATSResults.value && hasJobResults.value) {
      const atsDate = new Date(atsResults.value!.analysisDate)
      const jobDate = new Date(jobComparisonResults.value!.analysisDate)
      return atsDate > jobDate ? 'ats' : 'job'
    }
    if (hasATSResults.value) return 'ats'
    if (hasJobResults.value) return 'job'
    return null
  })

  // 📊 ATS SCORE HELPERS
  const atsScoreColor = computed(() => {
    if (!atsResults.value) return 'text-content-tertiary'
    const score = atsResults.value.atsScore
    if (score >= 80) return 'text-success-dark'
    if (score >= 60) return 'text-warning-dark'
    return 'text-error-dark'
  })

  const atsScoreLabel = computed(() => {
    if (!atsResults.value) return 'No Score'
    const score = atsResults.value.atsScore
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  })

  const keywordMatchColor = computed(() => {
    if (!atsResults.value) return 'text-content-tertiary'
    const percentage = atsResults.value.keywordAnalysis.matchPercentage
    // Optimal range is 50-70%
    if (percentage >= 50 && percentage <= 70) return 'text-success-dark'
    if (percentage >= 40 && percentage <= 80) return 'text-warning-dark'
    return 'text-error-dark'
  })

  const keywordMatchLabel = computed(() => {
    if (!atsResults.value) return 'No Analysis'
    const percentage = atsResults.value.keywordAnalysis.matchPercentage
    if (percentage >= 50 && percentage <= 70) return 'Optimal Range'
    if (percentage >= 40 && percentage <= 80) return 'Acceptable'
    if (percentage < 40) return 'Too Low'
    return 'Too High'
  })

  // 🎬 ACTIONS

  /**
   * Analyze resume for ATS compatibility
   */
/**
   * Analyze resume for ATS compatibility using dedicated ATS endpoint
   */
const analyzeATS = async (resumeText: string, options?: { strictMode?: boolean, includeWarnings?: boolean }): Promise<boolean> => {
    try {
      console.log('🔍 Starting ATS-only analysis...', {
        textLength: resumeText.length,
        strictMode: options?.strictMode || false,
        includeWarnings: options?.includeWarnings || false
      })
      
      // Clear previous results and errors
      isAnalyzingATS.value = true
      analysisError.value = null
      
      // Generate analysis ID
      currentAnalysisId.value = `ats-${Date.now()}`

      // Prepare request payload for ATS-only analysis
      const payload = {
        resumeText,
        options: options || {}
      }

      console.log('📤 Sending ATS analysis request:', {
        resumeTextLength: resumeText.length,
        hasOptions: !!options,
        analysisId: currentAnalysisId.value
      })

      // Call new ATS-specific API endpoint
      const response = await $fetch<ATSAnalysisResponse>('/api/analyze/ats', {
        method: 'POST',
        body: payload
      })

      console.log('📥 ATS analysis response:', {
        success: response.success,
        hasData: !!response.data,
        processingTime: response.processingTime
      })

      if (response.success && response.data) {
        // Store successful results
        atsResults.value = {
          ...response.data,
          analysisDate: new Date().toISOString(),
          processingTime: response.processingTime
        }

        // Add to history (keep last 10)
        analysisHistory.value.unshift(atsResults.value)
        if (analysisHistory.value.length > 10) {
          analysisHistory.value = analysisHistory.value.slice(0, 10)
        }

        console.log('✅ ATS analysis successful:', {
          atsScore: atsResults.value.atsScore,
          jobMatchScore: atsResults.value.jobMatchScore,
          keywordMatch: atsResults.value.keywordAnalysis.matchPercentage,
          recommendationsCount: atsResults.value.recommendations.length,
          processingTime: response.processingTime
        })

        return true
      } else {
        // Handle API error
        throw new Error(response.error || 'ATS analysis failed without error message')
      }

    } catch (error) {
      console.error('❌ ATS analysis failed:', error)
      
      // Store error details with better categorization
      let errorMessage = 'Unknown analysis error'
      let errorCode = 'ATS_ANALYSIS_FAILED'
      let retryable = true

      if (error instanceof Error) {
        errorMessage = error.message
        
        // Categorize errors for better UX
        if (errorMessage.includes('Missing resumeText')) {
          errorCode = 'MISSING_RESUME_TEXT'
          retryable = false
        } else if (errorMessage.includes('too short')) {
          errorCode = 'RESUME_TOO_SHORT'
          retryable = false
        } else if (errorMessage.includes('too long')) {
          errorCode = 'RESUME_TOO_LONG'
          retryable = false
        } else if (errorMessage.includes('API key')) {
          errorCode = 'API_KEY_ERROR'
          retryable = false
        } else if (errorMessage.includes('Failed to parse')) {
          errorCode = 'PARSING_ERROR'
          retryable = true
        } else if (errorMessage.includes('AI analysis failed')) {
          errorCode = 'AI_SERVICE_ERROR'
          retryable = true
        } else if (errorMessage.includes('fetch')) {
          errorCode = 'NETWORK_ERROR'
          retryable = true
        }
      }
      
      analysisError.value = {
        message: errorMessage,
        code: errorCode,
        timestamp: new Date().toISOString(),
        retryable
      }

      return false
    } finally {
      isAnalyzingATS.value = false
    }
  }

  /**
   * Analyze job comparison (future implementation)
   */
  const analyzeJobComparison = async (resumeText: string, jobDescription: string): Promise<boolean> => {
    try {
      console.log('🔍 Starting job comparison analysis...')
      
      isAnalyzingJob.value = true
      analysisError.value = null
      currentAnalysisId.value = `job-${Date.now()}`

      // TODO: Implement job comparison API call
      // For now, return false as it's not implemented
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      analysisError.value = {
        message: 'Job comparison analysis not yet implemented',
        code: 'NOT_IMPLEMENTED',
        timestamp: new Date().toISOString(),
        retryable: false
      }

      return false
    } catch (error) {
      console.error('❌ Job comparison analysis failed:', error)
      
      analysisError.value = {
        message: error instanceof Error ? error.message : 'Job comparison failed',
        code: 'JOB_ANALYSIS_FAILED',
        timestamp: new Date().toISOString(),
        retryable: true
      }

      return false
    } finally {
      isAnalyzingJob.value = false
    }
  }

  /**
   * Retry the last failed analysis
   */
  const retryAnalysis = async (): Promise<boolean> => {
    if (!analysisError.value?.retryable) {
      console.warn('⚠️ Cannot retry - error is not retryable')
      return false
    }

    console.log('🔄 Retrying analysis...')
    
    // Get resume text from resume store
    const resumeStore = useResumeStore()
    if (!resumeStore.extractedText) {
      analysisError.value = {
        message: 'No resume text available for retry',
        code: 'NO_RESUME_TEXT',
        timestamp: new Date().toISOString(),
        retryable: false
      }
      return false
    }

    // Retry based on last analysis type
    if (currentAnalysisId.value?.startsWith('ats-')) {
      return await analyzeATS(resumeStore.extractedText)
    } else if (currentAnalysisId.value?.startsWith('job-')) {
      // Would need job description - for now just fail
      analysisError.value = {
        message: 'Cannot retry job comparison without job description',
        code: 'MISSING_JOB_DESCRIPTION',
        timestamp: new Date().toISOString(),
        retryable: false
      }
      return false
    }

    return false
  }

  /**
   * Clear all analysis results
   */
  const clearResults = () => {
    console.log('🗑️ Clearing analysis results')
    atsResults.value = null
    jobComparisonResults.value = null
    analysisError.value = null
    currentAnalysisId.value = null
  }

  /**
   * Clear only ATS results
   */
  const clearATSResults = () => {
    console.log('🗑️ Clearing ATS results')
    atsResults.value = null
    if (currentAnalysisId.value?.startsWith('ats-')) {
      currentAnalysisId.value = null
    }
  }

  /**
   * Clear only job comparison results
   */
  const clearJobResults = () => {
    console.log('🗑️ Clearing job comparison results')
    jobComparisonResults.value = null
    if (currentAnalysisId.value?.startsWith('job-')) {
      currentAnalysisId.value = null
    }
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    analysisError.value = null
  }

  /**
   * Get analysis from history by ID
   */
  const getAnalysisFromHistory = (id: string): ATSResults | null => {
    return analysisHistory.value.find(analysis => 
      analysis.analysisDate === id
    ) || null
  }

  /**
   * Debug function to inspect current state
   */
  const debugState = () => {
    console.log('🐞 Analysis Store State:', {
      isAnalyzing: isAnalyzing.value,
      isAnalyzingATS: isAnalyzingATS.value,
      isAnalyzingJob: isAnalyzingJob.value,
      hasATSResults: hasATSResults.value,
      hasJobResults: hasJobResults.value,
      currentAnalysisId: currentAnalysisId.value,
      lastAnalysisType: lastAnalysisType.value,
      analysisError: analysisError.value,
      historyCount: analysisHistory.value.length,
      atsScore: atsResults.value?.atsScore,
      jobMatchScore: atsResults.value?.jobMatchScore
    })
  }

  return {
    // 📖 STATE (readonly)
    isAnalyzingATS: readonly(isAnalyzingATS),
    isAnalyzingJob: readonly(isAnalyzingJob),
    atsResults: readonly(atsResults),
    jobComparisonResults: readonly(jobComparisonResults),
    analysisError: readonly(analysisError),
    currentAnalysisId: readonly(currentAnalysisId),
    analysisHistory: readonly(analysisHistory),

    // 🔍 COMPUTED
    isAnalyzing,
    hasATSResults,
    hasJobResults,
    hasAnyResults,
    lastAnalysisType,
    atsScoreColor,
    atsScoreLabel,
    keywordMatchColor,
    keywordMatchLabel,

    // 🎬 ACTIONS
    analyzeATS,
    analyzeJobComparison,
    retryAnalysis,
    clearResults,
    clearATSResults,
    clearJobResults,
    clearError,
    getAnalysisFromHistory,
    debugState
  }
})

/*
🔗 HOW THIS ANALYSIS STORE WORKS:

📋 PURPOSE:
- Manages all analysis state and operations
- Integrates with existing resume store
- Provides computed helpers for UI
- Handles both ATS and job comparison analysis
- Maintains analysis history and error states

📊 STATE MANAGEMENT:
- isAnalyzingATS/Job: Loading states for different analysis types
- atsResults/jobComparisonResults: Analysis data storage
- analysisError: Detailed error information with retry capability
- analysisHistory: Keeps last 10 analyses for reference
- currentAnalysisId: Tracks current analysis session

🔍 COMPUTED HELPERS:
- Score color coding (success/warning/error)
- Score label generation (Excellent/Good/Poor)
- Keyword match optimization (50-70% optimal range)
- Analysis state consolidation (hasResults, isAnalyzing)

🎬 ACTIONS:
- analyzeATS(): Main ATS analysis with comprehensive error handling
- analyzeJobComparison(): Future job comparison (placeholder)
- retryAnalysis(): Smart retry based on last analysis type
- Clear functions: Granular result clearing
- Debug helpers: State inspection for development

🔌 INTEGRATION:
- Works with useResumeStore() for resume text
- Calls /api/analyze endpoint with proper error handling
- Maintains analysis history for user reference
- Provides UI helpers for theming and display

📱 USAGE EXAMPLES:

// In components:
const analysisStore = useAnalysisStore()
const resumeStore = useResumeStore()

// Start ATS analysis
if (resumeStore.isReady) {
  const success = await analysisStore.analyzeATS(resumeStore.extractedText)
  if (success) {
    // Navigate to results
    navigateTo('/ats-scanner')
  }
}

// Check states
if (analysisStore.isAnalyzing) {
  // Show loading
}

if (analysisStore.hasATSResults) {
  // Show results
  const score = analysisStore.atsResults.atsScore
  const color = analysisStore.atsScoreColor
}

// Handle errors
if (analysisStore.analysisError?.retryable) {
  await analysisStore.retryAnalysis()
}

🎯 INTEGRATION WITH RESUME STORE:
- Reads extractedText from resume store
- Validates resume is ready before analysis
- Works alongside file upload flow
- Maintains separation of concerns

🚫 WHAT IT DOESN'T DO:
- Handle file uploads (that's resume store)
- Manage UI state like sidebar (that's layout)
- Store theme preferences (that's theme system)
- Handle navigation (that's done in components)

This store provides a complete analysis management system that integrates cleanly with your existing architecture!
*/