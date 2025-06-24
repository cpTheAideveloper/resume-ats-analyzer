// Enhanced ATS Analysis API - server/api/analyze.post.ts
import { generateContent } from '~/utils/gemini/client'

interface AnalyzeRequest {
  resumeText: string
  jobDescription: string
}

interface AnalysisResult {
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
  formatIssues: string[]
  industrySpecific: string[]
}

interface ApiResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    // Only allow POST requests
    

    // Get request body
    const body = await readBody<AnalyzeRequest>(event)

    // Validate required fields
    if (!body.resumeText || !body.jobDescription) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing resumeText or jobDescription'
      })
    }

    // Validate text length
    if (body.resumeText.length < 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Resume text too short'
      })
    }

    if (body.jobDescription.length < 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Job description too short'
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

    // Enhanced analysis prompt based on ATS research
    const systemInstruction = `You are an expert ATS (Applicant Tracking System) analyzer with deep knowledge of how modern ATS platforms (Workday, Taleo, Greenhouse, iCIMS, BambooHR) actually function.

CRITICAL KNOWLEDGE:
- 98.4% of Fortune 500 companies use ATS systems
- Modern ATS rank and organize candidates rather than automatically reject them
- 90-95% of resumes are actually reviewed by humans
- Optimal keyword match rate is 50-70% (not 100%)
- ATS parsing accuracy varies significantly based on formatting
- Skills-based hiring is now used by 81% of employers

RESPONSE FORMAT: You must respond with valid JSON only. No additional text or formatting.

Required JSON structure:
{
  "atsScore": 85,
  "jobMatchScore": 78,
  "strengths": ["Strong technical skills", "Relevant experience"],
  "missing": ["Python", "AWS certification"],
  "recommendations": ["Add Python projects", "Get AWS certification"],
  "keywordAnalysis": {
    "matchedKeywords": ["JavaScript", "React", "Node.js"],
    "missingKeywords": ["Python", "AWS", "Docker"],
    "matchPercentage": 65
  },
  "formatIssues": ["Contact info may be in header", "Use standard fonts"],
  "industrySpecific": ["Include relevant certifications", "Add quantified metrics"]
}

Scores: 0-100. Arrays: 3-7 items each.`

    const prompt = `Perform comprehensive ATS analysis of this resume against the job description:

RESUME:
${body.resumeText}

JOB DESCRIPTION:
${body.jobDescription}

ANALYSIS REQUIREMENTS:

1. ATS COMPATIBILITY SCORE (atsScore):
   - Evaluate formatting for parsing success (standard fonts, simple layout, no tables/graphics)
   - Check for ATS-breaking elements (headers/footers, complex formatting, unusual characters)
   - Assess file structure compatibility (sections, headers, date formats)
   - Consider contact information placement and formatting
   - Score based on likelihood of successful parsing by major ATS platforms

2. JOB MATCH SCORE (jobMatchScore):
   - Calculate keyword alignment (target 50-70% match rate, not 100%)
   - Evaluate skills relevance and experience match
   - Assess education and certification requirements
   - Consider industry-specific terminology usage
   - Analyze role level and responsibility alignment

3. STRENGTHS ANALYSIS:
   - Identify strong keyword matches with job requirements
   - Highlight relevant experience and achievements
   - Note proper use of industry terminology
   - Recognize quantified accomplishments and metrics
   - Point out certifications and technical skills alignment

4. MISSING ELEMENTS:
   - Critical keywords from job description not found in resume
   - Required skills, technologies, or certifications absent
   - Important soft skills or competencies missing
   - Industry-specific terms or qualifications needed
   - Experience gaps relative to job requirements

5. ACTIONABLE RECOMMENDATIONS:
   - Specific keyword integration suggestions with natural placement
   - Formatting improvements for better ATS parsing
   - Content additions to strengthen job match
   - Skills or experience emphasis adjustments
   - Industry-specific optimization strategies

6. KEYWORD ANALYSIS:
   - matchedKeywords: Exact and related terms found in both resume and job description
   - missingKeywords: Important terms from job description absent in resume
   - matchPercentage: Calculated keyword overlap (aim for 50-70%)

7. FORMAT ISSUES:
   - Specific ATS parsing problems (tables, graphics, headers/footers)
   - Font and formatting compatibility concerns
   - Date format inconsistencies or structural problems
   - Contact information placement issues

8. INDUSTRY-SPECIFIC INSIGHTS:
   - Sector-specific optimization recommendations
   - Relevant certification or skill priorities for the industry
   - Common ATS requirements for this field
   - Industry keyword trends and terminology preferences

EVALUATION CRITERIA:
- Modern ATS use AI and contextual understanding, not just keyword matching
- Focus on ranking optimization rather than "beating" the system
- Balance ATS optimization with human readability
- Consider specific industry requirements and trends
- Apply 2024-2025 ATS technology capabilities

Remember: Provide specific, actionable insights based on current ATS functionality, not outdated myths. Focus on helping candidates rank higher in legitimate screening processes.`

    // Call Gemini API
    const result = await generateContent(apiKey, {
      model: "gemini-2.5-flash",
      contents: prompt,
      systemInstruction
    })

    if (!result.success) {
      throw createError({
        statusCode: 500,
        statusMessage: `AI analysis failed: ${result.error}`
      })
    }

    // Parse the JSON response
    let analysisData: AnalysisResult
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanText = result.text!
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      
      analysisData = JSON.parse(cleanText)
      
      // Validate the response structure
      if (typeof analysisData.atsScore !== 'number' || 
          typeof analysisData.jobMatchScore !== 'number' ||
          !Array.isArray(analysisData.strengths) ||
          !Array.isArray(analysisData.missing) ||
          !Array.isArray(analysisData.recommendations) ||
          !analysisData.keywordAnalysis ||
          !Array.isArray(analysisData.keywordAnalysis.matchedKeywords) ||
          !Array.isArray(analysisData.keywordAnalysis.missingKeywords) ||
          typeof analysisData.keywordAnalysis.matchPercentage !== 'number') {
        throw new Error('Invalid response structure')
      }
      
      // Ensure arrays have reasonable lengths
      analysisData.strengths = analysisData.strengths.slice(0, 7)
      analysisData.missing = analysisData.missing.slice(0, 7)
      analysisData.recommendations = analysisData.recommendations.slice(0, 7)
      analysisData.formatIssues = (analysisData.formatIssues || []).slice(0, 5)
      analysisData.industrySpecific = (analysisData.industrySpecific || []).slice(0, 5)
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', result.text)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse analysis results'
      })
    }

    // Return successful response
    return {
      success: true,
      data: analysisData
    }

  } catch (error) {
    console.error('Analysis API Error:', error)
    
    // Handle known errors
    if (error.statusCode) {
      throw error
    }
    
    // Handle unknown errors
    return {
      success: false,
      error: 'Analysis failed. Please try again.'
    }
  }
})