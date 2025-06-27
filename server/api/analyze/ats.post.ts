// Technically Accurate ATS Parsing Analysis API - server/api/analyze/ats.post.ts
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
  jobMatchScore: number  // Professional content quality based on existing content
  strengths: string[]
  missing: string[]      // Missing structural elements, not keywords
  recommendations: string[]
  keywordAnalysis: {
    matchedKeywords: string[]     // Only keywords found in resume
    missingKeywords: string[]     // Will be empty array - not used
    matchPercentage: number       // Parsing success rate
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

    console.log('🔍 Starting technical ATS parsing simulation...', {
      textLength: body.resumeText.length,
      strictMode: body.options?.strictMode || false,
      includeWarnings: body.options?.includeWarnings || false
    })

    // Technically accurate ATS system instruction
    const systemInstruction = `You are a technical ATS (Applicant Tracking System) parsing engine simulator with deep knowledge of actual ATS processing workflows: OCR → Text Extraction → Parsing → Data Validation → Ranking.

TECHNICAL ATS PROCESSING WORKFLOW:
1. PREPROCESSING (Normalization): Convert resume to plain-text/XML representation, remove styling
2. TEXT EXTRACTION: Strip non-text elements (images, graphics, styling), extract raw text
3. SEGMENTATION: Use NLP to identify logical sections (Personal Info, Experience, Education, Skills)
4. FIELD DATA EXTRACTION: Extract specific data points using regex patterns and entity recognition
5. DATA STRUCTURING: Organize into JSON/XML fields for database storage
6. VALIDATION & ERROR HANDLING: Check parsing accuracy and flag inconsistencies

CRITICAL ATS TECHNICAL LIMITATIONS:
- Single-column layouts: 95% parsing success vs multi-column: significant data loss
- Tables/text boxes: Often read left-to-right causing scrambled content or ignored entirely
- Headers/footers: Many ATS skip header/footer content completely
- File formats: .docx (best), PDF text-based (good), images (unreadable without OCR)
- Section recognition: Requires standard headers ("Work Experience" vs "Career Journey")
- Date parsing: Inconsistent formats cause timeline errors and gap detection failures

RESPONSE FORMAT: Valid JSON only. No explanations or markdown.

Required JSON structure:
{
  "atsScore": 85,
  "jobMatchScore": 78,
  "strengths": ["Standard section headers", "Single-column layout", "Consistent date format"],
  "missing": ["Contact in body text", "Standard section dividers", "Clear section boundaries"],
  "recommendations": ["Move contact from header to body", "Standardize date format to MM/YYYY", "Use conventional section headers"],
  "keywordAnalysis": {
    "matchedKeywords": ["Software Engineer", "Python", "Project Management"],
    "missingKeywords": [],
    "matchPercentage": 85
  },
  "formatIssues": ["Multi-column layout detected", "Contact info likely in header", "Table formatting present"],
  "industrySpecific": ["Technical skills well-structured", "Experience chronologically organized", "Education clearly formatted"]
}

Scoring Guidelines:
- atsScore: 0-100 (Technical parsing success probability based on actual ATS limitations)
- jobMatchScore: 0-100 (Professional content structure quality)
- matchPercentage: 0-100 (Estimated percentage of content successfully extractable by ATS)`

    // Technically accurate ATS parsing prompt
    const prompt = `TECHNICAL ATS PARSING SIMULATION: Analyze this resume exactly as modern ATS systems process documents through their 5-stage workflow.

RESUME TEXT TO ANALYZE:
${body.resumeText}

SIMULATE ATS PROCESSING WORKFLOW:

1. PREPROCESSING & TEXT EXTRACTION ANALYSIS (atsScore primary factor):
   
   DOCUMENT STRUCTURE ASSESSMENT:
   - Layout type: Single-column (optimal) vs multi-column (problematic)
   - Text flow: Linear top-to-bottom vs complex layouts that break parsing order
   - Contact placement: Main body (parseable) vs header/footer (often skipped)
   - Section organization: Clear boundaries vs ambiguous content flow
   
   FORMAT COMPATIBILITY SIMULATION:
   - File format implications: Assume .docx format advantages vs PDF limitations
   - Text extraction success: What content would survive the "strip styling" process?
   - Non-text elements: Identify any tables, graphics, or special formatting that would be lost
   - Character encoding: Detect unusual characters or symbols that might render incorrectly

2. SECTION SEGMENTATION SIMULATION:
   
   SECTION HEADER RECOGNITION:
   - Standard headers: "Work Experience", "Education", "Skills", "Summary" (easily recognized)
   - Non-standard headers: Creative titles that might confuse segmentation algorithms
   - Section boundaries: Clear vs unclear transitions between sections
   - Missing sections: Standard resume sections that appear to be absent
   
   ALGORITHMIC SECTION DETECTION:
   - Use NLP-like analysis to identify where sections begin/end
   - Assess if section content would be correctly categorized
   - Identify potential mis-segmentation issues (content assigned to wrong section)

3. FIELD DATA EXTRACTION SIMULATION:
   
   CONTACT INFORMATION PARSING:
   - Name extraction: Position and clarity for algorithmic recognition
   - Email/phone detection: Standard formats vs unusual formatting
   - Address parsing: Standard vs non-standard location formats
   - LinkedIn/URL recognition: Proper formatting for automatic detection
   
   EMPLOYMENT HISTORY EXTRACTION:
   - Job title recognition: Standard vs creative/unclear titles
   - Company name identification: Clear company names vs ambiguous references
   - Date format consistency: MM/YYYY standard vs mixed/inconsistent formats
   - Employment timeline: Chronological order and gap detection
   - Achievement parsing: Bullet points vs paragraph format impact
   
   EDUCATION DATA EXTRACTION:
   - Degree recognition: Standard degree formats vs abbreviated/unclear
   - Institution identification: University names vs informal references
   - Graduation date parsing: Consistent format vs parsing challenges
   - GPA detection: Standard format vs non-standard presentation

4. KEYWORD EXTRACTION & INDEXING (keywordAnalysis):
   
   NATURAL LANGUAGE PROCESSING SIMULATION:
   - Technical skills identification: Programming languages, tools, software
   - Professional terminology: Industry-standard terms and certifications
   - Action verbs: Leadership and achievement indicators
   - Contextual understanding: Skills mentioned in context vs isolated lists
   
   INDEXED CONTENT ANALYSIS:
   - matchedKeywords: Professional terms, skills, technologies clearly extractable
   - matchPercentage: Estimated percentage of resume content successfully parsed and indexed
   - Leave missingKeywords empty (focus only on parsing existing content)

5. DATA VALIDATION & ERROR DETECTION (formatIssues & missing):
   
   PARSING ERROR IDENTIFICATION:
   - Multi-column scrambling: Content read in wrong order
   - Table extraction failures: Information in tables that would be lost/scrambled
   - Header/footer content loss: Critical info placed where ATS can't access
   - Date format inconsistencies: Timeline parsing failures
   - Special character encoding: Symbols that would render as unknown characters
   - Section misclassification: Content categorized in wrong fields
   
   STRUCTURAL COMPLETENESS ASSESSMENT:
   - Missing standard sections that affect ATS profile completeness
   - Inconsistent formatting patterns that reduce parsing reliability
   - Contact accessibility issues that would create incomplete profiles
   - Timeline gaps or overlaps that would be flagged by validation systems

6. TECHNICAL OPTIMIZATION RECOMMENDATIONS (recommendations):
   
   PARSING IMPROVEMENT PRIORITIES:
   - Layout simplification: Single-column structure recommendations
   - Contact placement: Move from headers/footers to main body
   - Section standardization: Use conventional headers for better recognition
   - Date format consistency: Standardize to MM/YYYY throughout
   - Table elimination: Convert tables to simple text lists
   - Font/formatting: Simple, standard fonts and formatting
   
   DATA EXTRACTION OPTIMIZATION:
   - Content structure improvements for better field extraction
   - Timeline presentation for accurate employment history parsing
   - Skills presentation format for optimal keyword extraction

7. CONTENT STRUCTURE EVALUATION (jobMatchScore):
   
   PROFESSIONAL CONTENT QUALITY:
   - Achievement quantification and metrics
   - Professional terminology usage
   - Experience progression clarity
   - Skills presentation effectiveness
   - Educational background structure
   - Overall professional presentation within parsing constraints

8. INDUSTRY-SPECIFIC ANALYSIS (industrySpecific):
   
   EXISTING CONTENT STRUCTURE ASSESSMENT:
   - Technical skills organization and presentation
   - Experience descriptions clarity for ATS parsing
   - Certification and education formatting
   - Industry terminology proper usage and formatting

CRITICAL SIMULATION RULES:
- Analyze ONLY what's present in the resume text
- Focus on technical parsing success probability
- Identify specific format-related parsing challenges
- Simulate actual ATS data extraction limitations
- Provide actionable technical formatting recommendations
- Score based on parsing compatibility, not content completeness

SCORING METHODOLOGY:
- atsScore: Technical parsing success probability (0-100)
  - 90-100: Optimal ATS format, minimal parsing issues
  - 70-89: Good parsing with minor format challenges
  - 50-69: Moderate parsing issues, some data loss likely
  - 30-49: Significant parsing problems, major data loss
  - 0-29: Poor parsing compatibility, extensive extraction failures

- jobMatchScore: Professional content quality within parsing constraints (0-100)
- matchPercentage: Estimated successful content extraction rate

Remember: You are simulating the technical limitations and capabilities of actual ATS parsing engines, not providing career advice. Focus on what the ATS can technically extract and process from this specific resume format.`

    // Call Gemini API with technical parsing focus
    const result = await generateContent(apiKey, {
      model: "gemini-2.5-flash",
      contents: prompt,
      systemInstruction,
      config: {
        temperature: 0.1,  // Very low for consistent technical analysis
        topP: 0.6,         // Focused responses
        topK: 20,          // Highly focused
        maxOutputTokens: 2048
      }
    })

    if (!result.success) {
      console.error('Gemini API call failed:', result.error)
      throw createError({
        statusCode: 500,
        statusMessage: `ATS parsing simulation failed: ${result.error}`
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
      
      console.log('🔧 Parsing technical ATS analysis response...', {
        originalLength: result.text!.length,
        cleanedLength: cleanText.length
      })
      
      analysisData = JSON.parse(cleanText)
      
      // Validate required fields and structure
      const requiredFields = ['atsScore', 'jobMatchScore', 'strengths', 'missing', 'recommendations', 'keywordAnalysis', 'formatIssues', 'industrySpecific']
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
          typeof analysisData.keywordAnalysis.matchPercentage !== 'number') {
        throw new Error('Invalid keywordAnalysis structure')
      }
      
      // Force missingKeywords to be empty (as per requirement)
      analysisData.keywordAnalysis.missingKeywords = []
      
      // Ensure parsing percentage is within range
      if (analysisData.keywordAnalysis.matchPercentage < 0 || analysisData.keywordAnalysis.matchPercentage > 100) {
        analysisData.keywordAnalysis.matchPercentage = Math.max(0, Math.min(100, analysisData.keywordAnalysis.matchPercentage))
      }
      
      // Ensure arrays exist and limit lengths for consistency
      analysisData.strengths = (analysisData.strengths || []).slice(0, 6)
      analysisData.missing = (analysisData.missing || []).slice(0, 6)
      analysisData.recommendations = (analysisData.recommendations || []).slice(0, 6)
      analysisData.formatIssues = (analysisData.formatIssues || []).slice(0, 6)
      analysisData.industrySpecific = (analysisData.industrySpecific || []).slice(0, 6)
      analysisData.keywordAnalysis.matchedKeywords = (analysisData.keywordAnalysis.matchedKeywords || []).slice(0, 15)
      
      console.log('✅ Technical ATS parsing simulation completed:', {
        atsScore: analysisData.atsScore,
        jobMatchScore: analysisData.jobMatchScore,
        extractedKeywords: analysisData.keywordAnalysis.matchedKeywords.length,
        formatIssuesFound: analysisData.formatIssues.length,
        recommendationsCount: analysisData.recommendations.length,
        parsingSuccessRate: analysisData.keywordAnalysis.matchPercentage
      })
      
    } catch (parseError) {
      console.error('Failed to parse technical ATS analysis response:', {
        error: parseError,
        rawResponse: result.text?.substring(0, 500) + '...'
      })
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse ATS technical analysis - invalid response format'
      })
    }

    const processingTime = Date.now() - startTime

    // Return successful response
    return {
      success: true,
      data: analysisData,
      processingTime
    }

  } catch (error) {
    const processingTime = Date.now() - startTime
    
    console.error('ATS Technical Parsing Error:', {
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
      error: error.message || 'ATS technical parsing analysis failed. Please try again.',
      processingTime
    }
  }
})

/*
🔗 TECHNICALLY ACCURATE ATS PARSING API

📋 CORE TECHNICAL WORKFLOW SIMULATION:
1. Preprocessing (Normalization) - Convert to plain-text, remove styling
2. Text Extraction - Strip non-text elements, extract raw text
3. Segmentation - NLP section identification
4. Field Data Extraction - Regex patterns + entity recognition
5. Data Structuring - JSON/XML database storage
6. Validation & Error Handling - Parsing accuracy checks

🔧 REAL ATS TECHNICAL LIMITATIONS:
- Single-column: 95% success vs Multi-column: significant data loss
- Tables/text boxes: Read left-to-right causing scrambled content
- Headers/footers: Often completely skipped by parsing engines
- File formats: .docx optimal, PDF acceptable, images unreadable
- Section headers: Standard required for algorithmic recognition
- Date formats: Inconsistency causes timeline parsing failures

📊 TECHNICAL ANALYSIS FOCUS:
✅ Layout compatibility (single vs multi-column impact)
✅ Text flow simulation (linear vs complex parsing)
✅ Section segmentation accuracy
✅ Field extraction success probability
✅ Data validation error detection
✅ Format-specific parsing challenges

🎯 PARSING SUCCESS FACTORS:
- Contact placement (body vs header accessibility)
- Section header standardization for NLP recognition
- Date format consistency for timeline parsing
- Table elimination for content preservation
- Character encoding compatibility
- Chronological structure for data validation

📈 SCORING METHODOLOGY:
- atsScore: Technical parsing success probability
- jobMatchScore: Professional content structure quality
- matchPercentage: Estimated content extraction success rate
- Identifies specific parsing failures and technical fixes

This API now accurately simulates the 5-stage ATS workflow with real technical limitations and processing capabilities!
*/