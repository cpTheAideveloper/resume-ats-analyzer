// ATS-Only Analysis API - server/api/analyze/ats.post.ts
import { generateContent } from '~/utils/gemini/client'

interface ATSAnalysisRequest {
  resumeText: string
  options?: {
    strictMode?: boolean
    includeWarnings?: boolean
  }
}

interface ATSAnalysisResult {
  atsScore: number
  jobMatchScore: number  // Generic job compatibility without specific job description
  strengths: string[]
  missing: string[]
  recommendations: string[]
  keywordAnalysis: {
    matchedKeywords: string[]
    missingKeywords: string[]
    matchPercentage: number
  }
  formatIssues: string[]
  industrySpecific: string[]
}

interface ATSApiResponse {
  success: boolean
  data?: ATSAnalysisResult
  error?: string
  processingTime?: number
}

export default defineEventHandler(async (event): Promise<ATSApiResponse> => {
  const startTime = Date.now()
  
  try {
    // Only allow POST requests
    assertMethod(event, 'POST')

    // Get request body
    const body = await readBody<ATSAnalysisRequest>(event)

    // Validate required fields
    if (!body.resumeText) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing resumeText in request body'
      })
    }

    // Validate text length
    if (body.resumeText.length < 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Resume text too short (minimum 100 characters)'
      })
    }

    if (body.resumeText.length > 50000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Resume text too long (maximum 50,000 characters)'
      })
    }

    // Check for API key
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Google API key not configured'
      })
    }

    console.log('🔍 Starting ATS-only analysis...', {
      textLength: body.resumeText.length,
      strictMode: body.options?.strictMode || false,
      includeWarnings: body.options?.includeWarnings || false
    })

    // ATS-focused system instruction
    const systemInstruction = `You are an expert ATS (Applicant Tracking System) compatibility analyzer with deep knowledge of how modern ATS platforms (Workday, Taleo, Greenhouse, iCIMS, BambooHR, Lever) actually function.

CRITICAL ATS KNOWLEDGE (2024-2025):
- 98.4% of Fortune 500 companies use ATS systems
- Modern ATS use AI and semantic understanding, not just keyword matching
- 90-95% of resumes are actually reviewed by humans after ATS ranking
- ATS parsing accuracy varies significantly based on formatting choices
- Optimal keyword density is 1.5-2.5% of total text (not keyword stuffing)
- Skills-based hiring is now used by 81% of employers
- Most ATS systems can handle PDF and DOCX files effectively
- Headers/footers, tables, and graphics still cause parsing issues

RESPONSE FORMAT: You must respond with valid JSON only. No additional text, markdown, or formatting.

Required JSON structure:
{
  "atsScore": 85,
  "jobMatchScore": 78,
  "strengths": ["Strong technical skills", "Clean formatting", "Industry keywords"],
  "missing": ["Contact information in header", "Skills section", "Quantified achievements"],
  "recommendations": ["Move contact info to main body", "Add dedicated skills section", "Include specific metrics"],
  "keywordAnalysis": {
    "matchedKeywords": ["JavaScript", "Project Management", "Leadership"],
    "missingKeywords": ["Technical Skills", "Certifications", "Industry Terms"],
    "matchPercentage": 65
  },
  "formatIssues": ["Contact info may be in header/footer", "Use standard section headers"],
  "industrySpecific": ["Include relevant certifications", "Add industry-specific terminology"]
}

Scoring Guidelines:
- atsScore: 0-100 (ATS parsing and compatibility)
- jobMatchScore: 0-100 (general employability and keyword optimization)
- Arrays: 3-6 items each, specific and actionable`

    // ATS-focused analysis prompt
    const prompt = `Perform comprehensive ATS compatibility analysis of this resume. Focus on parsing success, keyword optimization, and general employability WITHOUT requiring a specific job description.

RESUME TO ANALYZE:
${body.resumeText}

ANALYSIS REQUIREMENTS:

1. ATS COMPATIBILITY SCORE (atsScore 0-100):
   - Formatting compatibility with major ATS platforms
   - Parsing success likelihood (fonts, layout, structure)
   - Section header recognition (Experience, Education, Skills, etc.)
   - Contact information placement and accessibility
   - Date format consistency and recognition
   - Avoidance of ATS-breaking elements (complex tables, graphics, unusual fonts)
   - File structure optimization for automated parsing

2. GENERAL JOB MATCH SCORE (jobMatchScore 0-100):
   - Industry keyword presence and density (1.5-2.5% optimal)
   - Skills section completeness and relevance
   - Professional terminology usage
   - Experience progression and growth indicators
   - Educational background presentation
   - Achievement quantification and impact metrics
   - Overall professional presentation quality

3. RESUME STRENGTHS:
   - Well-formatted sections that parse correctly
   - Strong keyword usage and professional terminology
   - Quantified achievements and measurable impacts
   - Relevant skills and experience presentation
   - Proper use of industry-standard terms
   - Clear career progression and growth

4. MISSING CRITICAL ELEMENTS:
   - Essential ATS-friendly formatting improvements needed
   - Missing standard resume sections (Skills, Summary, etc.)
   - Lack of keyword optimization in key areas
   - Absent quantified achievements or metrics
   - Missing industry-relevant terminology
   - Structural improvements for better parsing

5. ACTIONABLE RECOMMENDATIONS:
   - Specific formatting changes for better ATS compatibility
   - Keyword integration suggestions with natural placement
   - Section organization improvements
   - Content enhancement recommendations
   - Industry-standard terminology additions
   - Quantification opportunities for achievements

6. KEYWORD ANALYSIS:
   - matchedKeywords: Professional terms, skills, and industry keywords found
   - missingKeywords: Common professional terms that could strengthen the resume
   - matchPercentage: Overall keyword density and professional terminology usage

7. FORMAT ISSUES:
   - Specific ATS parsing problems (headers/footers, tables, graphics)
   - Font and layout compatibility concerns
   - Section header standardization needs
   - Contact information accessibility issues
   - Date format inconsistencies

8. INDUSTRY-SPECIFIC INSIGHTS:
   - Relevant certification recommendations
   - Industry keyword trends and terminology
   - Sector-specific formatting best practices
   - Professional development suggestions
   - Skills gap identification for career growth

ANALYSIS APPROACH:
- Focus on ATS parsing optimization and general employability
- Provide specific, actionable recommendations
- Consider modern ATS AI capabilities and semantic understanding
- Balance keyword optimization with natural language flow
- Emphasize formatting for maximum compatibility across ATS platforms
- Avoid outdated ATS myths while addressing real technical limitations

Remember: This is ATS-only analysis focusing on parsing success and general professional optimization, not job-specific matching.`

    // Call Gemini API with enhanced configuration
    const result = await generateContent(apiKey, {
      model: "gemini-2.5-flash",
      contents: prompt,
      systemInstruction,
      generationConfig: {
        temperature: 0.3,  // Lower temperature for more consistent analysis
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    })

    if (!result.success) {
      console.error('Gemini API call failed:', result.error)
      throw createError({
        statusCode: 500,
        statusMessage: `AI analysis failed: ${result.error}`
      })
    }

    // Parse and validate the JSON response
    let analysisData: ATSAnalysisResult
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanText = result.text!
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^[^{]*/, '') // Remove any text before the first {
        .replace(/[^}]*$/, '') // Remove any text after the last }
        .trim()
      
      console.log('🔧 Parsing Gemini response...', {
        originalLength: result.text!.length,
        cleanedLength: cleanText.length
      })
      
      analysisData = JSON.parse(cleanText)
      
      // Validate required fields and structure
      const requiredFields = ['atsScore', 'jobMatchScore', 'strengths', 'missing', 'recommendations', 'keywordAnalysis']
      for (const field of requiredFields) {
        if (!(field in analysisData)) {
          throw new Error(`Missing required field: ${field}`)
        }
      }
      
      // Validate score ranges
      if (analysisData.atsScore < 0 || analysisData.atsScore > 100) {
        analysisData.atsScore = Math.max(0, Math.min(100, analysisData.atsScore))
      }
      
      if (analysisData.jobMatchScore < 0 || analysisData.jobMatchScore > 100) {
        analysisData.jobMatchScore = Math.max(0, Math.min(100, analysisData.jobMatchScore))
      }
      
      // Validate keyword analysis structure
      if (!analysisData.keywordAnalysis ||
          !Array.isArray(analysisData.keywordAnalysis.matchedKeywords) ||
          !Array.isArray(analysisData.keywordAnalysis.missingKeywords) ||
          typeof analysisData.keywordAnalysis.matchPercentage !== 'number') {
        throw new Error('Invalid keywordAnalysis structure')
      }
      
      // Ensure keyword match percentage is within range
      if (analysisData.keywordAnalysis.matchPercentage < 0 || analysisData.keywordAnalysis.matchPercentage > 100) {
        analysisData.keywordAnalysis.matchPercentage = Math.max(0, Math.min(100, analysisData.keywordAnalysis.matchPercentage))
      }
      
      // Limit array lengths for consistency
      analysisData.strengths = analysisData.strengths.slice(0, 6)
      analysisData.missing = analysisData.missing.slice(0, 6)
      analysisData.recommendations = analysisData.recommendations.slice(0, 6)
      analysisData.formatIssues = (analysisData.formatIssues || []).slice(0, 5)
      analysisData.industrySpecific = (analysisData.industrySpecific || []).slice(0, 5)
      analysisData.keywordAnalysis.matchedKeywords = analysisData.keywordAnalysis.matchedKeywords.slice(0, 15)
      analysisData.keywordAnalysis.missingKeywords = analysisData.keywordAnalysis.missingKeywords.slice(0, 10)
      
      console.log('✅ Analysis completed successfully:', {
        atsScore: analysisData.atsScore,
        jobMatchScore: analysisData.jobMatchScore,
        keywordMatches: analysisData.keywordAnalysis.matchedKeywords.length,
        recommendationsCount: analysisData.recommendations.length
      })
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', {
        error: parseError,
        rawResponse: result.text?.substring(0, 500) + '...'
      })
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse analysis results - invalid AI response format'
      })
    }

    const processingTime = Date.now() - startTime

    // Return successful response matching store expectations
    return {
      success: true,
      data: analysisData,
      processingTime
    }

  } catch (error) {
    const processingTime = Date.now() - startTime
    
    console.error('ATS Analysis API Error:', {
      error: error.message || error,
      statusCode: error.statusCode || 500,
      processingTime
    })
    
    // Handle known errors (with status codes)
    if (error.statusCode) {
      throw error
    }
    
    // Handle unknown errors with user-friendly message
    return {
      success: false,
      error: error.message || 'ATS analysis failed. Please try again.',
      processingTime
    }
  }
})

/*
🔗 HOW THIS ATS API WORKS:

📋 PURPOSE:
- Dedicated ATS-only analysis endpoint
- Focuses on parsing compatibility and general employability
- No job description required (unlike job comparison analysis)
- Optimized for the ATS Scanner page workflow

📊 KEY DIFFERENCES FROM ORIGINAL API:
- Removed job description requirement
- Enhanced ATS-specific system instruction
- More focused on parsing and formatting issues
- General employability score instead of job-specific matching
- Stronger validation and error handling
- Consistent response format matching store expectations

🔧 REQUEST FORMAT:
POST /api/analyze/ats
{
  "resumeText": string,
  "options": {
    "strictMode": boolean,      // Optional: More strict analysis
    "includeWarnings": boolean  // Optional: Include warning messages
  }
}

📈 RESPONSE FORMAT:
{
  "success": true,
  "data": {
    "atsScore": 85,              // ATS compatibility (0-100)
    "jobMatchScore": 78,         // General employability (0-100)
    "strengths": string[],       // 3-6 items
    "missing": string[],         // 3-6 items
    "recommendations": string[], // 3-6 items
    "keywordAnalysis": {
      "matchedKeywords": string[],    // Up to 15 items
      "missingKeywords": string[],    // Up to 10 items
      "matchPercentage": number       // 0-100
    },
    "formatIssues": string[],    // Up to 5 items
    "industrySpecific": string[] // Up to 5 items
  },
  "processingTime": 1250
}

🎯 ANALYSIS FOCUS AREAS:

1. ATS COMPATIBILITY (atsScore):
   - Formatting that parses correctly
   - Standard section headers
   - Contact info accessibility
   - Font and layout compatibility
   - Date format consistency

2. GENERAL JOB MATCH (jobMatchScore):
   - Professional keyword density
   - Skills section completeness
   - Achievement quantification
   - Industry terminology usage
   - Career progression indicators

3. KEYWORD ANALYSIS:
   - Professional terms found in resume
   - Common terms that could strengthen resume
   - Overall keyword density (targeting 1.5-2.5%)

4. ACTIONABLE RECOMMENDATIONS:
   - Specific formatting improvements
   - Content enhancement suggestions
   - Industry-standard terminology additions
   - Quantification opportunities

🔒 VALIDATION & ERROR HANDLING:
- Request validation (required fields, text length)
- API key verification
- Response parsing and structure validation
- Score range validation (0-100)
- Array length limits for consistency
- Comprehensive error logging
- User-friendly error messages

🎬 INTEGRATION WITH STORE:
- Matches ATSAnalysisResponse interface exactly
- Returns success/error format expected by store
- Includes processingTime for UX feedback
- Consistent error handling approach

📱 USAGE IN ATS SCANNER PAGE:
const analysisStore = useAnalysisStore()
const success = await analysisStore.analyzeATS(resumeText)

// This calls: POST /api/analyze/ats
// Store handles the response and updates state accordingly

🚫 WHAT THIS API DOESN'T DO:
- Job-specific comparison (that's /api/analyze/comparison)
- File upload handling (that's /api/upload)
- Resume text extraction (handled before API call)
- Theme or UI management (frontend only)

This API provides focused ATS analysis without requiring job descriptions, 
perfect for the ATS Scanner workflow in Phase 6!
*/