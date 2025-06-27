# Resume ATS Analyzer - Enhanced MVP with Notion-Style UI

An AI-powered resume analysis platform that helps job seekers optimize their resumes for both ATS (Applicant Tracking System) compatibility and specific job requirements using Google's Gemini AI.

## 🚀 Project Overview

This enhanced MVP features a **dual-analysis approach** with a clean, Notion-inspired interface:

1. **ATS Scanner** - Analyzes resume formatting and ATS compatibility only
2. **Job Comparison Analyzer** - Compares resume against specific job descriptions

The application uses **Gemini AI** to provide intelligent, research-backed analysis with actionable recommendations based on real ATS functionality (not outdated myths).

## ✨ Key Features

### 🎯 Dual Analysis Modes
- **ATS Scanner**: Focus purely on formatting, parsing, and ATS compatibility
- **Job Comparison**: Targeted analysis against specific job postings
- **Separate User Flows**: Clean, focused experiences for each analysis type

### 🤖 AI-Powered Intelligence
- **Research-Based Analysis**: Built on comprehensive ATS research (98.4% Fortune 500 usage)
- **Myth-Busting Approach**: Debunks common ATS myths (75% rejection myth, etc.)
- **Contextual Understanding**: Modern AI that goes beyond simple keyword matching
- **Industry-Specific Insights**: Tailored recommendations for different sectors

### 🎨 Notion-Style UI with Advanced Theme System
- **TailwindCSS 4.0 Theme System**: CSS-first configuration with semantic color naming
- **Multi-Theme Support**: Light, dark, ocean, forest, and sunset themes
- **Semantic Text Colors**: Consistent text hierarchy using content-based naming
- **Responsive Design**: Mobile-first approach with fluid typography
- **Card-Based Layout**: Organized information presentation with hover effects
- **Custom Animations**: Floating particles, gradient effects, and smooth transitions

### 📁 Robust File Processing
- **Multi-Format Support**: PDF and DOCX text extraction
- **Server-Side Processing**: Secure, reliable document handling
- **Smart Validation**: Comprehensive error handling with helpful feedback
- **File State Management**: Persistent file data across pages

## 🏗️ Tech Stack

- **Frontend**: Nuxt 3 + TypeScript
- **Styling**: TailwindCSS v4 (CSS-first theme configuration)
- **State Management**: Pinia (for cross-page data persistence)
- **AI Integration**: Google Gemini API (`@google/genai`)
- **File Processing**: mammoth (DOCX) + pdf-parse (PDF)
- **Backend**: Nuxt server API routes
- **Icons**: Nuxt Icon module

## 🎨 Advanced Theme System - TailwindCSS 4.0

### CSS-First Theme Configuration

Our theme system uses TailwindCSS 4.0's revolutionary CSS-first approach with the `@theme` directive, eliminating JavaScript configuration files and enabling semantic color naming.

#### **Core Theme Structure**

```css
@theme {
  /* Semantic Content Colors */
  --color-content-base: #111827;        /* Primary text color */
  --color-content-secondary: #6b7280;   /* Secondary text with reduced emphasis */
  --color-content-tertiary: #9ca3af;    /* Tertiary text with minimal emphasis */
  --color-content-inverse: #ffffff;     /* Text on dark backgrounds */
  --color-content-muted: #d1d5db;       /* Placeholder and disabled text */
  
  /* Brand & Interactive Colors */
  --color-primary: #2563eb;             /* Primary brand color */
  --color-primary-hover: #1d4ed8;       /* Primary hover state */
  --color-primary-content: #ffffff;     /* Text on primary background */
  
  /* Status Colors with Content Variants */
  --color-success: #059669;
  --color-success-content: #ffffff;
  --color-warning: #d97706;
  --color-warning-content: #ffffff;
  --color-error: #dc2626;
  --color-error-content: #ffffff;
  
  /* Surface Colors */
  --color-surface: #ffffff;             /* Main background */
  --color-surface-secondary: #f9fafb;   /* Secondary backgrounds */
  --color-surface-tertiary: #f3f4f6;    /* Cards and containers */
  
  /* Border Colors */
  --color-border: #e5e7eb;              /* Default borders */
  --color-border-secondary: #f3f4f6;    /* Subtle borders */
  --color-border-accent: #d1d5db;       /* Emphasized borders */
}
```

#### **Semantic Text Usage Patterns**

Instead of using direct color classes, we use semantic text utilities:

```html
<!-- ❌ Old approach with direct colors -->
<h1 class="text-gray-900">Title</h1>
<p class="text-gray-600">Description</p>
<span class="text-gray-400">Metadata</span>

<!-- ✅ New approach with semantic content colors -->
<h1 class="text-content-base">Title</h1>
<p class="text-content-secondary">Description</p>
<span class="text-content-tertiary">Metadata</span>

<!-- ✅ Using opacity for reduced visibility -->
<p class="text-content-base/70">Subtle primary text</p>
<span class="text-content-secondary/50">Very subtle secondary text</span>
```

#### **Multi-Theme Support**

Themes automatically update all semantic colors:

```css
/* Dark Theme */
[data-theme="dark"] {
  --color-content-base: #f8fafc;        /* Light text on dark background */
  --color-content-secondary: #cbd5e1;   /* Adjusted secondary text */
  --color-content-tertiary: #94a3b8;    /* Adjusted tertiary text */
  --color-surface: #0f172a;             /* Dark background */
  --color-surface-secondary: #1e293b;   /* Dark secondary surfaces */
}

/* Ocean Theme */
[data-theme="ocean"] {
  --color-primary: #0891b2;             /* Cyan primary */
  --color-content-base: #0f172a;        /* Deep blue-gray text */
}
```

#### **Custom Utilities for Consistent Design**

```css
@utility text-hero {
  font-size: clamp(2.25rem, 5vw, 6rem);    /* Responsive hero text */
  line-height: 1.25;
  font-weight: 700;
  color: var(--color-content-base);
}

@utility text-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.875rem); /* Responsive subtitle */
  line-height: 1.625;
  font-weight: 400;
  color: var(--color-content-secondary);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-content);
  /* Automatically adapts to theme changes */
}
```

### Theme Usage Guidelines

#### **Text Hierarchy**
- `text-content-base` - Primary headings, important content
- `text-content-secondary` - Body text, descriptions
- `text-content-tertiary` - Captions, metadata, labels
- `text-content-muted` - Placeholder text, disabled content
- `text-content-inverse` - Text on dark/colored backgrounds

#### **Opacity Modifiers for Subtle Text**
- `text-content-base/90` - Slightly reduced primary text
- `text-content-base/70` - Noticeably reduced primary text
- `text-content-secondary/70` - Subtle secondary text
- `text-content-secondary/50` - Very subtle secondary text

#### **Surface and Border Consistency**
- `bg-surface` - Main background color
- `bg-surface-secondary` - Card backgrounds, sidebars
- `bg-surface-tertiary` - Input fields, code blocks
- `border-border` - Default border color
- `border-border-secondary` - Subtle borders
- `border-border-accent` - Emphasized borders

## 📂 Project Structure

```
resume-ats-analyzer/
├── app.vue                     ✅ Main app with NuxtLayout integration
├── assets/css/
│   └── main.css                ✅ TailwindCSS 4.0 theme configuration
├── layouts/
│   └── default.vue             ✅ Responsive sidebar layout with mobile bottom sheet
├── components/
│   ├── navbar/                 # Navigation components
│   │   ├── NavbarSidebar.vue   ✅ Desktop right sidebar
│   │   ├── NavbarBottomSheet.vue ✅ Mobile bottom sheet navigation
│   │   ├── NavbarToggle.vue    ✅ Responsive floating toggle button
│   │   ├── NavbarLink.vue      ✅ Navigation links with active states
│   │   └── NavbarTheme.vue     ✅ Theme switcher with persistence
│   ├── ui/                     # Core UI components
│   │   ├── Button.vue          ✅ Enhanced with semantic theme colors
│   │   ├── FileUpload.vue      ✅ Drag & drop with theme consistency
│   │   ├── Card.vue            🆕 Notion-style cards with theme support
│   │   ├── Badge.vue           🆕 Status indicators with semantic colors
│   │   ├── IconButton.vue      🆕 Icon-only buttons
│   │   ├── LoadingSpinner.vue  🆕 Loading states
│   │   └── ProgressBar.vue     🆕 Progress indicators
│   ├── resume/                 # Resume-related components
│   │   ├── ResumeUploader.vue  ✅ Enhanced with theme-aware animations
│   │   ├── ResumePreview.vue   ✅ File info with semantic text hierarchy
│   │   └── ResumeStatus.vue    🆕 Upload status with theme colors
│   ├── analysis/               # Analysis result components
│   │   ├── AnalysisSection.vue  ✅ 
│   │   ├── ATSEducation.vue     ✅ 
│   │   ├── ATSResults.vue       ✅ 
│   │   └── ScoreCard.vue        ✅  
│   └── shared/                 # Shared components
│       ├── AnalysisTypeSelector.vue 🚧 Choose analysis type
│       └── JobDescriptionInput.vue  🚧 Job posting input with theme support
├── stores/                     # Pinia state management
│   ├── resume.ts               ✅ File & text management with debugging
│   ├── analysis.ts             🚧 Analysis results & status
│   └── ui.ts                   🚧 UI state management
├── pages/                      # Application pages
│   ├── index.vue               ✅ Enhanced home with semantic theme
│   ├── ats-scanner.vue         🚧 ATS-only analysis page
│   ├── job-comparison.vue      🚧 Job comparison analysis page
│   └── results/                # Results pages
│       ├── ats/[id].vue       🚧 ATS analysis results
│       └── comparison/[id].vue 🚧 Comparison results
└── server/api/                 # Backend API routes
    ├── analyze/
    │   ├── ats.post.ts        🚧 ATS-only analysis endpoint
    │   └── comparison.post.ts  🚧 Job comparison analysis endpoint
    ├── upload.post.ts         ✅ File upload & extraction (fixed response format)
    └── health.get.ts          🚧 API health check
```

## 🛠️ Development Phases

### Phase 1-4: Foundation ✅ **COMPLETED**
- [x] Nuxt 3 + TypeScript + TailwindCSS v4 setup
- [x] File processing and AI integration
- [x] Enhanced UI with Pinia state management
- [x] Animated components and cross-page persistence

### Phase 5: Core Theme System & Navigation ✅ **COMPLETED**
- [x] TailwindCSS 4.0 @theme configuration implementation
- [x] Semantic color system with content-based naming
- [x] Multi-theme support (light, dark, ocean, forest, sunset, purple)
- [x] **Responsive navigation system with modern UX patterns**
- [x] **Desktop sidebar that slides from right and pushes content**
- [x] **Mobile bottom sheet navigation for better touch experience**
- [x] **Floating toggle button with responsive positioning**
- [x] **Theme switcher with visual previews and persistence**
- [x] **File upload system with semantic theme integration**

### Phase 6: Analysis Pages 🚧 **CURRENT PHASE**
Building the core analysis functionality with theme-aware components:

#### **6.1: ATS Scanner Page** 🎯 **NEXT UP**
- [x] Create `/ats-scanner` page with semantic theme styling
- [x] Build analysis interface that shows current file status
- [x] Implement loading states during AI analysis
- [x] Design results display with score visualization
- [x] Add actionable recommendations with priority levels

#### **6.2: Job Comparison Page**
- [ ] Create `/job-comparison` page with dual-input interface
- [ ] Job description input component with validation
- [ ] Comparison analysis with keyword highlighting
- [ ] Skills gap analysis with visual indicators
- [ ] Targeted improvement recommendations

#### **6.3: Analysis Components**
- [ ] `ScoreCard.vue` - Animated score visualization (0-100 scale)
- [ ] `RecommendationsList.vue` - Priority-based action items
- [ ] `ATSResults.vue` - Comprehensive ATS compatibility report
- [ ] `JobComparisonResults.vue` - Side-by-side comparison interface
- [ ] `AnalysisTypeSelector.vue` - Choice between analysis modes

#### **6.4: AI Integration**
- [ ] Implement Gemini AI analysis endpoints
- [ ] Create research-based ATS analysis prompts
- [ ] Build job comparison and keyword matching logic
- [ ] Add error handling and retry mechanisms
- [ ] Implement analysis result caching

### Phase 7: Results Visualization 🚧 **PLANNED**
- [ ] Interactive score cards with animated progress rings
- [ ] Before/after comparison views with theme support
- [ ] Detailed analysis breakdown with expandable sections
- [ ] Export functionality (PDF reports with theme styling)
- [ ] Results history and comparison features

### Phase 8: Polish & Optimization 🚧 **PLANNED**
- [ ] Performance optimization for theme switching
- [ ] Mobile responsiveness testing across all themes
- [ ] Loading states and micro-animations
- [ ] Analytics and user tracking
- [ ] SEO optimization with theme meta tags

## 🎯 **Navigation System Features** ✅ **COMPLETED**

### **Desktop Experience**
- **Right-side sidebar** that slides in smoothly
- **Content area shifts left** when sidebar is open
- **Floating toggle button** in top-right corner
- **Theme switcher** with visual color previews
- **File status display** when resume is uploaded
- **Quick navigation** to all analysis pages

### **Mobile Experience** 
- **Bottom sheet navigation** for natural touch interaction
- **Slides up from bottom** with handle bar indicator
- **Floating toggle button** in bottom-right corner (thumb-friendly)
- **Full-width layout** optimized for mobile screens
- **Scrollable content** that doesn't cover entire screen (85% max height)
- **Same functionality** as desktop but mobile-optimized

### **Universal Features**
- **Semantic theme integration** - all colors adapt to theme changes
- **Keyboard shortcuts** - Escape key closes navigation
- **Route-aware navigation** - automatically closes on mobile after navigation
- **File management** - clear/replace file directly from navigation
- **External link support** - documentation and issue reporting
- **Theme persistence** - remembers user's theme preference

## 🎯 **Phase 6 Implementation Strategy**

### **6.1: ATS Scanner Page Development**

#### **Page Structure:**
```vue
<!-- pages/ats-scanner.vue -->
<template>
  <div class="container-section space-component">
    <!-- Page Header -->
    <div class="text-center mb-8">
      <h1 class="text-hero text-content-base">ATS Scanner</h1>
      <p class="text-subtitle text-content-secondary">
        Analyze your resume for ATS compatibility
      </p>
    </div>

    <!-- File Status or Upload Prompt -->
    <div v-if="!resumeStore.isFileUploaded">
      <UploadPrompt />
    </div>

    <!-- Analysis Interface -->
    <div v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasResults">
      <AnalysisInterface />
    </div>

    <!-- Loading State -->
    <div v-else-if="analysisStore.isAnalyzing">
      <AnalysisLoading />
    </div>

    <!-- Results Display -->
    <div v-else>
      <ATSResults :results="analysisStore.atsResults" />
    </div>
  </div>
</template>
```

#### **Components to Build:**
1. **`UploadPrompt.vue`** - Prompts user to upload resume with link back to home
2. **`AnalysisInterface.vue`** - Shows file info and "Start Analysis" button
3. **`AnalysisLoading.vue`** - Loading animation with progress indicators
4. **`ATSResults.vue`** - Comprehensive results display with scores and recommendations

#### **Store Integration:**
```typescript
// stores/analysis.ts - New store for analysis state
export const useAnalysisStore = defineStore('analysis', () => {
  const isAnalyzing = ref(false)
  const atsResults = ref(null)
  const hasResults = computed(() => atsResults.value !== null)
  
  const analyzeATS = async (resumeText: string) => {
    isAnalyzing.value = true
    // Call Gemini AI API
    // Store results
    isAnalyzing.value = false
  }
})
```

### **6.2: Design System for Analysis Components**

#### **Score Visualization:**
```css
/* Custom utilities for analysis components */
@utility score-ring {
  /* Animated circular progress ring for scores */
}

@utility progress-gradient {
  /* Gradient background for progress bars */
}
```

#### **Semantic Color Usage for Analysis:**
- `text-content-base` - Main headings and scores
- `text-content-secondary` - Descriptions and explanations  
- `text-content-tertiary` - Labels and metadata
- `bg-success-light` + `text-success-dark` - Good scores (80-100)
- `bg-warning-light` + `text-warning-dark` - Medium scores (60-79)
- `bg-error-light` + `text-error-dark` - Poor scores (0-59)

### **6.3: AI Integration Approach**

#### **Research-Based Prompts:**
```typescript
// utils/gemini/atsPrompts.ts
export const createATSAnalysisPrompt = (resumeText: string) => `
Analyze this resume for ATS compatibility based on modern ATS research:

${resumeText}

Provide analysis in this JSON format:
{
  "score": 85,
  "issues": [...],
  "recommendations": [...],
  "formatting": {...},
  "keywords": {...}
}
`
```

## 📝 **Development Status Update**

**Phase 5 Complete! ✅**
- ✅ TailwindCSS 4.0 theme system fully implemented
- ✅ Semantic color naming with content-based hierarchy  
- ✅ Multi-theme support with automatic color adaptation
- ✅ **Complete navigation system with desktop sidebar and mobile bottom sheet**
- ✅ **Responsive floating toggle button with thumb-friendly positioning**
- ✅ **Theme switcher with visual previews and localStorage persistence**
- ✅ **File upload system fully integrated with semantic theme colors**
- ✅ **API response format standardized and documented**

**Starting Phase 6: Analysis Pages 🚧**
- 🎯 **Next Sprint**: Build ATS Scanner page with analysis interface
- 🎯 **Priority**: Create analysis store and loading states
- 🎯 **Focus**: Theme-aware score visualization components
- 🎯 **Goal**: Complete ATS analysis flow from upload to results

**Key Phase 6 Objectives:**
- **Semantic Analysis UI**: All analysis components use content-based color utilities
- **Theme-Aware Visualizations**: Score cards and charts adapt to theme automatically
- **Responsive Analysis Interface**: Optimized for both desktop sidebar and mobile bottom sheet
- **AI Integration**: Gemini-powered analysis with research-based prompts
- **Performance**: Smooth interactions with proper loading states

## 🎯 Theme Implementation Examples

### Component with Semantic Colors

```vue
<template>
  <!-- Hero section with semantic text hierarchy -->
  <section class="bg-surface py-16">
    <div class="container-section">
      <h1 class="text-hero text-content-base mb-4">
        Optimize Your Resume
      </h1>
      <p class="text-subtitle text-content-secondary mb-8">
        AI-powered analysis for ATS compatibility
      </p>
      <button class="btn-primary">
        Get Started
      </button>
      
      <!-- Subtle supporting text -->
      <p class="text-sm text-content-tertiary/70 mt-4">
        No signup required • Free analysis
      </p>
    </div>
  </section>
</template>
```

### Card Component with Theme Support

```vue
<template>
  <div class="card-base card-padding">
    <h3 class="text-lg font-semibold text-content-base mb-2">
      Analysis Results
    </h3>
    <p class="text-content-secondary mb-4">
      Your resume scored 85% for ATS compatibility
    </p>
    
    <!-- Status indicator with semantic colors -->
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 bg-success rounded-full"></div>
      <span class="text-sm text-content-tertiary">
        Good ATS compatibility
      </span>
    </div>
  </div>
</template>
```

### Theme Switcher Component

```vue
<template>
  <div class="flex items-center space-x-2">
    <button 
      v-for="theme in themes" 
      :key="theme.id"
      @click="setTheme(theme.id)"
      :class="[
        'w-8 h-8 rounded-full border-2 transition-all',
        currentTheme === theme.id 
          ? 'border-content-base scale-110' 
          : 'border-border hover:border-content-tertiary'
      ]"
      :style="{ backgroundColor: theme.color }"
    >
      <span class="sr-only">{{ theme.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const themes = [
  { id: 'light', name: 'Light', color: '#ffffff' },
  { id: 'dark', name: 'Dark', color: '#0f172a' },
  { id: 'ocean', name: 'Ocean', color: '#0891b2' },
  { id: 'forest', name: 'Forest', color: '#16a34a' },
  { id: 'sunset', name: 'Sunset', color: '#ea580c' }
]

const { currentTheme, setTheme } = useThemeStore()
</script>
```

## 🔄 User Flows with Theme Consistency

### Flow 1: ATS Scanner
1. **Enhanced Home Page** → Semantic text hierarchy → Theme-aware upload
2. **ATS Scanner Page** → Consistent theme colors → Analysis processing
3. **ATS Results Page** → Theme-based score visualization → Semantic recommendations

### Flow 2: Job Comparison  
1. **Enhanced Home Page** → Theme-consistent design → Upload component
2. **Job Comparison Page** → Semantic input styling → Theme-aware processing
3. **Comparison Results Page** → Consistent color scheme → Hierarchical text display

## 🧪 Testing Guidelines

### Theme Testing Checklist
- [ ] **Text Readability**: Verify contrast ratios across all themes
- [ ] **Component Consistency**: Ensure all components adapt to theme changes
- [ ] **Interactive States**: Test hover, focus, and active states in each theme
- [ ] **Mobile Experience**: Verify theme switching works on mobile devices
- [ ] **Theme Persistence**: Confirm theme preferences are saved and restored

### Semantic Color Testing
- [ ] **Text Hierarchy**: Verify content-base > secondary > tertiary visibility
- [ ] **Opacity Modifiers**: Test /90, /70, /50 opacity variants
- [ ] **Status Colors**: Ensure success, warning, error colors are distinguishable
- [ ] **Interactive Elements**: Verify primary, hover states work in all themes

## 🔌 API Documentation

### File Upload API (`/api/upload`)

The upload API handles file processing and text extraction with a standardized response format.

#### **Request Format**
```typescript
POST /api/upload
Content-Type: multipart/form-data

FormData {
  file: File (PDF or DOCX, max 10MB)
}
```

#### **Response Format**

**Success Response:**
```typescript
{
  success: true,                    // Always true for successful uploads
  text: string,                     // Extracted text content
  wordCount: number,                // Number of words in extracted text
  charCount: number,                // Number of characters in extracted text
  
  // Optional metadata
  fileName?: string,                // Original filename
  fileSize?: number,                // File size in bytes
  fileType?: string,                // MIME type
  processingTime?: number,          // Processing time in milliseconds
  warnings?: string[],              // Non-critical issues
  timestamp?: string                // ISO timestamp
}
```

**Error Response:**
```typescript
{
  success: false,                   // Always false for errors
  error: string,                    // Human-readable error message
  statusCode?: number,              // HTTP status code
  details?: string[],               // Detailed error information
  timestamp?: string                // ISO timestamp
}
```

#### **Store Integration**

The Pinia store expects the exact response format above. Key field mappings:

```typescript
// Store expects these exact field names:
interface ExpectedResponse {
  success: boolean                  // ✅ Must be exactly 'success'
  text: string                      // ✅ Must be 'text' (not 'extractedText')
  wordCount: number                 // ✅ Must be 'wordCount'
  charCount: number                 // ✅ Must be 'charCount' (not 'characterCount')
  error?: string                    // ✅ Error message if success: false
}
```

#### **Common API Response Issues**

❌ **Incorrect nested format:**
```typescript
{
  success: true,
  data: {                         // ❌ Don't nest in 'data' object
    extractedText: "...",         // ❌ Should be 'text'
    wordCount: 350
  }
}
```

✅ **Correct flat format:**
```typescript
{
  success: true,
  text: "...",                    // ✅ Direct field, named 'text'
  wordCount: 350,                 // ✅ Direct field
  charCount: 2450                 // ✅ Direct field
}
```

#### **Error Handling Best Practices**

1. **Always return error responses** (don't throw for client errors)
2. **Use consistent error format** with `success: false`
3. **Provide helpful error messages** for debugging
4. **Include status codes** for different error types

```typescript
// File validation error
{
  success: false,
  error: "File validation failed",
  statusCode: 400,
  details: ["File size exceeds 10MB limit", "Invalid file type"]
}

// Processing error  
{
  success: false,
  error: "Text extraction failed",
  statusCode: 422,
  details: ["Corrupted PDF file", "Unable to parse document structure"]
}

// Server error
{
  success: false,
  error: "Internal server error",
  statusCode: 500
}
```

### Analysis APIs (Planned)

#### **ATS Analysis** (`/api/analyze/ats`)
```typescript
POST /api/analyze/ats
{
  text: string,                   // Resume text content
  options?: {
    strictMode?: boolean,
    includeWarnings?: boolean
  }
}

Response: {
  success: boolean,
  score: number,                  // 0-100 ATS compatibility score
  issues: ATSIssue[],            // Formatting and parsing issues
  recommendations: string[],      // Actionable improvements
  processingTime?: number
}
```

#### **Job Comparison** (`/api/analyze/comparison`)
```typescript
POST /api/analyze/comparison
{
  resumeText: string,             // Resume content
  jobDescription: string,         // Job posting content
  options?: {
    includeKeywordAnalysis?: boolean,
    skillsMatching?: boolean
  }
}

Response: {
  success: boolean,
  matchScore: number,             // 0-100 job match score
  keywordMatches: KeywordMatch[], // Matched/missing keywords
  skillsGap: string[],           // Missing skills
  recommendations: string[],      // Targeted improvements
  processingTime?: number
}
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
npm install @pinia/nuxt          # State management
npm install @nuxt/icon           # Icon components
npm install mammoth              # DOCX processing
npm install pdf-parse            # PDF processing
npm install @google/genai        # Google Gemini AI
```

### 2. Environment Setup
```bash
# .env
GOOGLE_API_KEY=your_gemini_api_key_here
NUXT_SECRET_KEY=your_app_secret_key
```

### 3. Start Development
```bash
npm run dev
```

### 4. API Development Guidelines

#### **Response Format Standards**
- Always use flat response structure (no nested `data` objects)
- Use consistent field naming across all endpoints
- Return errors as responses (don't throw for client errors)
- Include helpful error messages and status codes

#### **Store Integration Requirements**
- API responses must match store interface expectations exactly
- Field names are case-sensitive and must be precise
- Boolean fields must be actual booleans, not strings
- Error responses must include `success: false`

#### **Testing API Responses**
```bash
# Test upload endpoint
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-resume.pdf"

# Expected response format
{
  "success": true,
  "text": "Resume content...",
  "wordCount": 350,
  "charCount": 2450,
  "fileName": "test-resume.pdf",
  "processingTime": 150
}
```

### 5. Theme Development
- All theme configuration is in `assets/css/main.css`
- Use semantic color utilities: `text-content-base`, `bg-surface`, etc.
- Test components across multiple themes
- Follow the semantic naming convention for new colors

### 6. Debugging File Upload Issues

If file upload shows "error" status but server logs show success:

1. **Check API response format** matches store expectations
2. **Verify field names** are exact (`text` not `extractedText`)
3. **Ensure flat structure** (no nested objects)
4. **Test API directly** with curl or Postman
5. **Use browser dev tools** to inspect actual response

Common debugging commands:
```typescript
// In browser console after upload error:
const store = useResumeStore()
store.debugState() // Shows current store state

// Check network tab for actual API response format
// Compare with expected format in store interface
```

## 📝 Development Status

**Phase 5 Complete! ✅**
- TailwindCSS 4.0 theme system fully implemented
- Semantic color naming with content-based hierarchy
- Multi-theme support with automatic color adaptation
- Responsive navigation with theme switcher
- Mobile menu with smooth animations

**Currently Working On: Phase 6 - Analysis Pages 🚧**
- Building ATS Scanner page with theme-aware components
- Implementing Job Comparison page with semantic text styling
- Creating analysis results display with theme consistency
- Developing score visualization using theme color palette

**Key Phase 6 Objectives:**
- **Semantic Styling**: All text uses content-based color utilities
- **Theme Consistency**: Components adapt seamlessly across themes
- **Analysis Components**: Results display with theme-aware visualizations
- **Performance**: Smooth theme switching without layout shifts

This enhanced theme system provides a professional, consistent design that adapts beautifully across multiple themes while maintaining excellent accessibility and user experience.




Based on your working version, here's the structure we should implement for the ATS results in Phase 6:
🎯 ATS Results Structure Plan
📂 Component Architecture
components/analysis/
├── ATSResults.vue              # Main results container
├── ScoreCard.vue              # Individual score visualization
├── ScoreRing.vue              # Circular progress rings
├── StrengthsList.vue          # Strengths display
├── MissingElementsList.vue    # Missing elements display  
├── RecommendationsList.vue    # Action items with priorities
├── KeywordAnalysis.vue        # Keyword matching breakdown
├── FormatIssuesList.vue       # ATS format problems
├── IndustryInsights.vue       # Industry-specific advice
└── ATSEducation.vue           # Educational content about ATS
📱 Page Structure
pages/
├── ats-scanner.vue            # Main ATS analysis page
└── results/
    └── ats/
        └── [id].vue           # Individual analysis results (future)
🏪 Store Structure
stores/
├── analysis.ts                # Analysis state management
│   ├── State: results, loading, errors
│   ├── Actions: analyzeATS(), clearResults()
│   └── Getters: hasResults, isAnalyzing
└── resume.ts                  # (existing) File management
🎨 Design System Components
components/ui/
├── ProgressRing.vue          # Reusable circular progress
├── ScoreLabel.vue            # Score text with color coding
├── KeywordTag.vue            # Individual keyword chips
├── RecommendationCard.vue    # Action item cards
└── AnalysisSection.vue       # Consistent section wrapper
📊 Data Flow Structure
1. User Flow:
   ├── Upload resume (existing)
   ├── Click "Analyze" button
   ├── Navigate to /ats-scanner
   ├── Show loading state
   ├── Display results
   └── Export/share options

2. Analysis States:
   ├── No file uploaded → Upload prompt
   ├── File ready → Analysis interface  
   ├── Analyzing → Loading animation
   ├── Results ready → Full results display
   └── Error → Error handling with retry
🎯 Component Breakdown
ATSResults.vue (Main Container)

Executive summary with 3 score rings
Grid layout for detailed sections
Responsive design (mobile stacked, desktop grid)
Export and action buttons

ScoreCard.vue (Individual Scores)

Animated circular progress ring
Score number with color coding
Label and description
Threshold-based coloring (80+ green, 60+ yellow, <60 red)

KeywordAnalysis.vue (Keyword Breakdown)

Matched keywords (green tags)
Missing keywords (red tags)
Match percentage visualization
Keyword density analysis

RecommendationsList.vue (Action Items)

Numbered priority list
Expandable detail cards
Implementation difficulty indicators
Before/after examples

ATSEducation.vue (Educational Content)

Modern ATS facts
Myth-busting information
Best practices tips
Score interpretation guide

🎨 Semantic Theme Integration
Color Usage Pattern:
Score Ranges:
├── 80-100: bg-success-light + text-success-dark
├── 60-79:  bg-warning-light + text-warning-dark  
├── 40-59:  bg-error-light + text-error-dark
└── 0-39:   bg-error-light + text-error-dark

Text Hierarchy:
├── Headings: text-content-base
├── Descriptions: text-content-secondary
├── Labels: text-content-tertiary
└── Metadata: text-content-tertiary/70

Interactive Elements:
├── Buttons: btn-primary, btn-secondary
├── Cards: card-base + card-padding
└── Tags: semantic color backgrounds
📱 Responsive Behavior
Desktop Layout:
├── Sidebar open: Results in main content area
├── Three-column score summary
├── Two-column detailed analysis grid
└── Full-width education section
Mobile Layout:
├── Bottom sheet navigation
├── Single-column stacked layout
├── Larger touch targets
└── Swipeable sections (future enhancement)
🔄 State Management Pattern
Analysis Store:
typescriptinterface AnalysisState {
  isAnalyzing: boolean
  atsResults: ATSResults | null
  analysisError: string | null
  analysisId: string | null
}

interface ATSResults {
  atsScore: number
  jobMatchScore: number
  keywordAnalysis: KeywordAnalysis
  strengths: string[]
  missing: string[]
  recommendations: Recommendation[]
  formatIssues: string[]
  industrySpecific: string[]
}
🎬 Animation Strategy
Progressive Disclosure:
1. Score rings animate in sequence (staggered)
2. Sections fade in as user scrolls
3. Keyword tags animate in with delay
4. Recommendations expand on interaction
5. Smooth transitions between states
🎯 Implementation Priority
Phase 6.1 (Core Results):

ATSResults.vue main container
ScoreCard.vue with animated rings
Basic recommendations list
Keyword analysis display

Phase 6.2 (Enhanced Features):

Detailed formatting issues
Industry-specific insights
Educational content
Export functionality

Phase 6.3 (Polish):

Advanced animations
Interactive elements
Mobile optimizations
Performance improvements

This structure maintains the visual appeal of your working version while integrating with our semantic theme system and responsive navigation layout. Would you like to start implementing any specific component from this structure?ReintentarClaude puede cometer errores. Verifique las respuestas.


