# Resume ATS Analyzer MVP

An AI-powered resume analysis tool that evaluates resumes for ATS (Applicant Tracking System) compatibility using Google's Gemini AI. This application helps job seekers optimize their resumes to pass through automated screening systems.

## Project Overview

This MVP uses **Gemini AI** to intelligently analyze resume documents and provide actionable feedback on ATS compatibility, keyword optimization, and formatting improvements. The AI reads and understands the resume content to generate comprehensive scoring and recommendations.

## Tech Stack

- **Frontend**: Nuxt 3 + TypeScript
- **Styling**: TailwindCSS v4
- **AI Integration**: Google Gemini API (`@google/genai`)
- **File Processing**: PDF/DOCX parsing
- **Backend**: Nuxt server API routes

## Project Structure

```
resume-ats-analyzer/
├── components/
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── FileUpload.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ScoreCard.vue
│   │   └── ProgressBar.vue
│   ├── ResumeUploader.vue
│   ├── AnalysisResults.vue
│   ├── ScoreBreakdown.vue
│   └── AIInsights.vue
├── pages/
│   ├── index.vue (main analyzer page)
│   └── results/[id].vue (detailed results page)
├── server/api/
│   ├── analyze.post.ts (orchestrates AI analysis)
│   ├── upload.post.ts (file upload + text extraction)
│   └── gemini/
│       ├── score.post.ts (AI scoring endpoint)
│       └── suggestions.post.ts (AI recommendations)
├── utils/
│   ├── gemini/
│   │   ├── client.ts (Gemini API client setup)
│   │   ├── prompts.ts (AI prompts for analysis)
│   │   └── responseParser.ts (parse AI responses)
│   ├── documentProcessor.ts (PDF/DOCX text extraction)
│   ├── atsValidator.ts (basic ATS rules)
│   └── scoreCalculator.ts
├── types/
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
- **Gemini AI Integration**: Intelligent resume evaluation using structured prompts
- **Comprehensive Scoring**: AI generates scores with detailed reasoning
- **Smart Recommendations**: Context-aware improvement suggestions

### Analysis Categories
1. **ATS Compatibility Score** (0-100) - Format, structure, readability
2. **Keyword Optimization** - Industry-specific keyword analysis
3. **Content Quality** - Experience descriptions and achievements
4. **Overall Presentation** - Professional formatting and clarity

### User Experience
- Simple file upload interface
- Real-time analysis progress
- Detailed score breakdowns
- Actionable improvement recommendations
- Clean, minimal UI design

## MVP Development Tasks

### Phase 1: Core Setup ✅
- [x] Initialize Nuxt 3 project with TypeScript
- [x] Configure TailwindCSS v4
- [x] Install Google Gen AI SDK
- [x] Set up project structure

### Phase 2: File Upload & Processing
- [ ] Create basic FileUpload component
- [ ] Implement file validation (PDF/DOCX only)
- [ ] Build document text extraction utility
- [ ] Create upload API endpoint
- [ ] Add basic error handling

### Phase 3: Gemini AI Integration
- [ ] Set up Gemini API client
- [ ] Create AI analysis prompts
- [ ] Build analysis API endpoint
- [ ] Implement response parsing
- [ ] Add AI error handling

### Phase 4: UI Components
- [ ] Build ResumeUploader component
- [ ] Create LoadingSpinner component
- [ ] Develop ScoreCard component
- [ ] Build AnalysisResults component
- [ ] Create ScoreBreakdown component

### Phase 5: Analysis Logic
- [ ] Implement core analysis workflow
- [ ] Create scoring calculation
- [ ] Build recommendation engine
- [ ] Add results formatting

### Phase 6: Pages & Routing
- [ ] Build main analyzer page (index.vue)
- [ ] Create results display page
- [ ] Implement basic navigation
- [ ] Add responsive design

### Phase 7: Testing & Polish
- [ ] Test with sample resumes
- [ ] Refine AI prompts
- [ ] Improve error messages
- [ ] Add loading states

## Development Guidelines

### Component Philosophy
- **Minimal Working Version**: Each component should be the simplest implementation that works
- **No Over-engineering**: Avoid extra features, complex styling, or unnecessary abstractions
- **Single Responsibility**: Each component does one thing well
- **Progressive Enhancement**: Start basic, improve incrementally

### Code Standards
- Use TypeScript for type safety
- Keep components under 100 lines when possible
- Focus on functionality over aesthetics initially
- Comment AI prompts and API integrations clearly

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   # .env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Follow Task List**: Work through MVP tasks sequentially

## AI Model Context

This project builds a resume ATS analyzer that:
- Accepts PDF/DOCX resume uploads
- Uses Gemini AI to analyze resume content intelligently
- Provides scoring and recommendations for ATS optimization
- Focuses on practical, actionable feedback for job seekers
- Maintains a clean, minimal user interface
- Prioritizes core functionality over complex features

The goal is to create a working MVP that demonstrates AI-powered resume analysis capabilities while keeping the codebase simple and maintainable.