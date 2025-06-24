# Resume ATS Analyzer MVP

An AI-powered resume analysis tool that evaluates resumes for ATS (Applicant Tracking System) compatibility using Google's Gemini AI. This application helps job seekers optimize their resumes to pass through automated screening systems.

## Project Overview

This MVP uses **Gemini AI** to intelligently analyze resume documents and provide actionable feedback on ATS compatibility, keyword optimization, and formatting improvements. The AI reads and understands the resume content to generate comprehensive scoring and recommendations by comparing it against specific job descriptions.

## Tech Stack

- **Frontend**: Nuxt 3 + TypeScript
- **Styling**: TailwindCSS v4
- **AI Integration**: Google Gemini API (`@google/genai`)
- **File Processing**: PDF/DOCX parsing with robust validation
- **Text Extraction**: mammoth (DOCX) + pdf-parse (PDF)
- **Backend**: Nuxt server API routes

## Project Structure

```
resume-ats-analyzer/
├── components/
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── FileUpload.vue ✅ (Enhanced with validation)
│   │   ├── LoadingSpinner.vue
│   │   ├── ScoreCard.vue
│   │   └── ProgressBar.vue
│   ├── ResumeUploader.vue
│   ├── AnalysisResults.vue
│   ├── ScoreBreakdown.vue
│   ├── JobDescriptionInput.vue (for job posting text)
│   └── AIInsights.vue
├── pages/
│   ├── index.vue ✅ (main analyzer page with upload & job description)
│   └── results/[id].vue (detailed results page)
├── server/api/
│   ├── analyze.post.ts (orchestrates AI analysis with job comparison)
│   ├── upload.post.ts ✅ (file upload + text extraction)
│   └── gemini/
│       ├── score.post.ts (AI scoring endpoint)
│       └── suggestions.post.ts (AI recommendations)
├── utils/
│   ├── fileValidator.ts ✅ (Comprehensive file validation)
│   ├── documentProcessor.ts ✅ (PDF/DOCX text extraction)
│   ├── gemini/
│   │   ├── client.ts (Gemini API client setup)
│   │   ├── prompts.ts (AI prompts for analysis)
│   │   └── responseParser.ts (parse AI responses)
│   ├── atsValidator.ts (basic ATS rules)
│   └── scoreCalculator.ts
├── types/
│   ├── fileValidation.ts ✅ (File validation type definitions)
│   ├── documentProcessor.ts ✅ (Text extraction types)
│   ├── resume.ts
│   ├── analysis.ts
│   ├── gemini.ts
│   └── ats.ts
├── lib/
│   └── prompts/
│       ├── atsAnalysis.ts
│       ├── scoreBreakdown.ts
│       └── improvements.ts
└── assets/css/main.css
```

## Core Features

### AI-Powered Analysis
- **Document Processing**: Upload PDF/DOCX resumes for AI analysis
- **Job Description Comparison**: Paste job posting text for targeted analysis
- **Gemini AI Integration**: Intelligent resume evaluation using structured prompts
- **Comprehensive Scoring**: AI generates scores with detailed reasoning
- **Smart Recommendations**: Context-aware improvement suggestions based on job requirements

### Enhanced File Processing ✅
- **Multi-Format Support**: PDF and DOCX text extraction
- **Server-Side Processing**: Robust file handling in Node.js environment
- **Smart Error Handling**: Detailed error messages with suggestions
- **File Analysis**: Detects scanned documents and provides optimization tips
- **TypeScript Safety**: Fully typed validation and processing system

### Analysis Categories
1. **ATS Compatibility Score** (0-100) - Format, structure, readability
2. **Job Match Score** - How well resume matches specific job requirements
3. **Keyword Optimization** - Industry-specific and job-specific keyword analysis
4. **Content Quality** - Experience descriptions and achievements
5. **Overall Presentation** - Professional formatting and clarity

### User Experience
- Simple file upload interface with drag & drop
- Job description text area for targeted analysis
- Real-time file validation with visual feedback
- Detailed error messages and improvement suggestions
- Clean, minimal UI design following TailwindCSS best practices

## MVP Development Tasks

### Phase 1: Core Setup ✅
- [x] Initialize Nuxt 3 project with TypeScript
- [x] Configure TailwindCSS v4
- [x] Install Google Gen AI SDK
- [x] Set up project structure

### Phase 2: File Upload & Processing ✅
- [x] Create basic FileUpload component
- [x] Implement comprehensive file validation (PDF/DOCX only)
- [x] Build file validation utility with TypeScript types
- [x] Add enhanced error handling and user feedback
- [x] Build document text extraction utility (PDF + DOCX)
- [x] Create upload API endpoint with server-side processing
- [x] Test both PDF and DOCX text extraction

### Phase 3: Gemini AI Integration & Job Comparison
- [ ] Create JobDescriptionInput component
- [ ] Set up Gemini API client
- [ ] Create AI analysis prompts for resume vs job comparison
- [ ] Build analysis API endpoint that accepts resume text + job description
- [ ] Implement response parsing for structured analysis results
- [ ] Add AI error handling and fallbacks
- [ ] Update main page to collect both resume and job description

### Phase 4: UI Components
- [ ] Build ResumeUploader component
- [ ] Create LoadingSpinner component
- [ ] Develop ScoreCard component
- [ ] Build AnalysisResults component
- [ ] Create ScoreBreakdown component

### Phase 5: Analysis Logic
- [ ] Implement core analysis workflow
- [ ] Create scoring calculation based on job match
- [ ] Build recommendation engine for job-specific improvements
- [ ] Add results formatting with actionable insights

### Phase 6: Pages & Routing
- [ ] Enhance main analyzer page with job description input
- [ ] Create results display page
- [ ] Implement basic navigation
- [ ] Add responsive design

### Phase 7: Testing & Polish
- [ ] Test with various resume/job description combinations
- [ ] Refine AI prompts for better analysis
- [ ] Improve error messages
- [ ] Add loading states and progress indicators

## Completed Utilities (Phase 2)

### `utils/fileValidator.ts` - Comprehensive File Validation ✅
**Why Added**: Production-ready file validation with detailed error handling.

**Key Features**:
- Multi-layer validation (type, size, extension, filename)
- Resume-specific logic (scanned document detection)
- Extensible design for custom validation rules
- TypeScript integration with proper interfaces

### `utils/documentProcessor.ts` - Text Extraction ✅
**Why Added**: Robust text extraction from PDF and DOCX files for AI analysis.

**Key Features**:
- PDF text extraction using `pdf-parse`
- DOCX text extraction using `mammoth`
- Server-side Buffer handling for Node.js environment
- Text cleaning and word counting utilities
- Comprehensive error handling

### `types/fileValidation.ts` - Type Definitions ✅
**Why Added**: Centralized type definitions for better code organization.

**Key Interfaces**:
- `FileValidationResult` - Validation results with errors/warnings
- `FileValidationOptions` - Configurable validation parameters
- `FileInfo` - Detailed file metadata
- `TextExtractionResult` - Text extraction results

## Development Guidelines

### Component Philosophy
- **Minimal Working Version**: Each component should be the simplest implementation that works
- **No Over-engineering**: Avoid extra features, complex styling, or unnecessary abstractions
- **Single Responsibility**: Each component does one thing well
- **Progressive Enhancement**: Start basic, improve incrementally

### Code Standards
- Use TypeScript for type safety with comprehensive interfaces
- Keep components under 100 lines when possible
- Focus on functionality over aesthetics initially
- Comment AI prompts and API integrations clearly

### TailwindCSS Best Practices

#### **Standard Class Order Pattern**
Follow this consistent order for utility classes for maintainable and readable code:

1. **Layout**: `flex`, `grid`, `block`, `inline`, `hidden`
2. **Positioning**: `relative`, `absolute`, `fixed`, `top-4`, `left-0`
3. **Box Model**: `w-full`, `h-screen`, `max-w-lg`, `min-h-0`
4. **Spacing**: `p-4`, `m-2`, `px-6`, `py-3`, `space-y-4`, `gap-4`
5. **Typography**: `text-lg`, `font-medium`, `leading-relaxed`, `text-center`
6. **Visual**: `bg-white`, `border`, `border-gray-200`, `rounded`, `shadow`
7. **Interactive**: `hover:bg-blue-500`, `focus:outline-none`, `transition-colors`

**Example (Correct Order):**
```html
<div class="flex items-center justify-between w-full max-w-screen-lg px-4 py-3 my-2 text-lg font-medium text-gray-800 bg-white border border-gray-200 rounded shadow hover:shadow-md transition-shadow">
  Content here
</div>
```

#### **Spacing Patterns**
Use Tailwind's spacing utilities systematically:

- **Padding**: `p-4`, `px-6`, `py-3` for internal spacing
- **Margin**: `m-4`, `mx-auto`, `my-6` for external spacing  
- **Gap**: `gap-4`, `space-y-4`, `space-x-2` for spacing between elements

**Examples:**
```html
<!-- Container with consistent padding -->
<div class="w-full max-w-lg p-6 bg-white rounded-lg shadow">

<!-- Button with proper spacing -->
<button class="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">

<!-- Card layout with spacing -->
<div class="flex flex-col space-y-4 p-4">
```

#### **Component-Specific Patterns**

**File Upload Areas:**
```html
<div class="flex flex-col items-center justify-center w-full h-32 p-6 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all duration-200">
```

**Form Elements:**
```html
<input class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
```

**Cards and Containers:**
```html
<div class="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
```

**Buttons:**
```html
<!-- Primary Button -->
<button class="inline-flex items-center px-6 py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">

<!-- Secondary Button -->
<button class="inline-flex items-center px-4 py-2 text-gray-700 font-medium bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
```

**Status Indicators:**
```html
<!-- Success -->
<div class="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">

<!-- Error -->
<div class="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">

<!-- Warning -->
<div class="flex items-center space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
```

#### **Responsive Design Patterns**
```html
<!-- Mobile-first responsive container -->
<div class="w-full max-w-sm mx-auto md:max-w-lg lg:max-w-4xl">

<!-- Responsive grid -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

<!-- Responsive text -->
<h1 class="text-2xl font-bold md:text-3xl lg:text-4xl">
```

#### **Color System Guidelines**
Use consistent color patterns throughout the application:

- **Gray Scale**: `gray-50`, `gray-100`, `gray-200`, `gray-300`, `gray-600`, `gray-900`
- **Primary (Blue)**: `blue-50`, `blue-600`, `blue-700` for primary actions
- **Success (Green)**: `green-50`, `green-200`, `green-600` for success states
- **Error (Red)**: `red-50`, `red-200`, `red-600` for error states  
- **Warning (Yellow)**: `yellow-50`, `yellow-200`, `yellow-600` for warnings

#### **Utility-First Approach**
- **Prefer utilities** over custom CSS classes
- **Use component classes** only for complex, reusable patterns
- **Group related utilities** logically in the class order
- **Keep classes readable** - break long class lists across lines when needed

**Example of well-organized classes:**
```html
<div class="
  flex flex-col items-center 
  w-full max-w-md mx-auto 
  p-6 space-y-4 
  text-center 
  bg-white border border-gray-200 rounded-xl shadow-lg
  hover:shadow-xl transition-shadow duration-200
">
```

These patterns ensure consistent, maintainable styling across all components while following Tailwind's utility-first philosophy.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   npm install @nuxt/icon        # For icons in components
   npm install mammoth           # DOCX text extraction
   npm install pdf-parse         # PDF text extraction
   npm install @types/mammoth --save-dev
   npm install @types/pdf-parse --save-dev
   ```

2. **Configure Nuxt** (nuxt.config.ts)
   ```typescript
   export default defineNuxtConfig({
     modules: ['@nuxt/icon'],
     // ... other config
   })
   ```

3. **Set Environment Variables**
   ```bash
   # .env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Test File Upload**: Visit `http://localhost:3000` and test with PDF/DOCX files

## Testing the Current MVP

### File Upload & Text Extraction Testing ✅
- **PDF Files**: Upload PDF resumes (should extract text successfully)
- **DOCX Files**: Upload Word documents (should extract text successfully)
- **Invalid Types**: Try JPG, TXT files (should show clear error messages)
- **Large Files**: Test files over 10MB (should show size limit errors)
- **Scanned Documents**: Try image-based PDFs (should show warnings)
- **Text Quality**: Verify extracted text is clean and readable

### Browser Console Monitoring
- Open Developer Tools (F12) → Console tab
- Watch for text extraction logs and processing times
- Monitor for any errors during file processing
- Check extracted text character/word counts

## Phase 3 Preview: Job Description Integration

The next phase will add job description comparison functionality:

**New User Flow**:
1. Upload resume (PDF/DOCX) ✅
2. Paste job description text ⏳
3. AI analyzes resume against specific job requirements ⏳
4. Receive targeted recommendations for that specific role ⏳

**Key Features Coming**:
- Job description text input component
- AI prompts for resume vs job comparison
- Job-specific keyword analysis
- Role-targeted improvement suggestions
- Match percentage scoring

## AI Model Context

This project builds a resume ATS analyzer that:
- Accepts PDF/DOCX resume uploads with comprehensive validation ✅
- Extracts text from documents using robust server-side processing ✅
- Uses Gemini AI to analyze resume content against job descriptions ⏳
- Provides scoring and recommendations for ATS optimization ⏳
- Focuses on practical, actionable feedback for specific job applications ⏳
- Maintains a clean, minimal user interface with excellent UX
- Prioritizes core functionality over complex features
- Uses TypeScript throughout for type safety and better developer experience

The goal is to create a working MVP that demonstrates AI-powered resume analysis capabilities while keeping the codebase simple, maintainable, and well-typed.

## Current Status

**Phase 2 Complete! ✅**
- File upload and validation working perfectly
- PDF and DOCX text extraction functional
- Server-side processing robust and tested
- Ready for Gemini AI integration in Phase 3

**Next: Phase 3 - Add job description input and AI analysis comparison**