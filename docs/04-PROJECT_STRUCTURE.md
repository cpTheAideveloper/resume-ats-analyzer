# Project Structure

## 📂 Complete Project Architecture

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
│   │   ├── AnalysisSection.vue ✅ Section wrapper with theme support
│   │   ├── ATSEducation.vue    ✅ Educational content component
│   │   ├── ATSResults.vue      ✅ Complete results display
│   │   └── ScoreCard.vue       ✅ Score visualization component
│   ├── pages/                  # 🆕 Page-specific components (Nuxt auto-import)
│   │   └── ats-scanner/        # ATS scanner page components
│   │       ├── UploadPrompt.vue         ✅ State 1: No file uploaded → <PagesAtsscannerUploadPrompt />
│   │       ├── ReadyInterface.vue       ✅ State 2: File ready, not analyzed → <PagesAtsscannerReadyInterface />
│   │       ├── AnalysisLoading.vue      ✅ State 3: Analyzing with progress → <PagesAtsscannerAnalysisLoading />
│   │       ├── ResultsDisplay.vue       ✅ State 4: Results ready → <PagesAtsscannerResultsDisplay />
│   │       └── ErrorState.vue           ✅ State 5: Error recovery → <PagesAtsscannerErrorState />
│   └── shared/                 # Shared components
│       ├── AnalysisTypeSelector.vue 🚧 Choose analysis type
│       └── JobDescriptionInput.vue  🚧 Job posting input with theme support
├── composables/                # 🆕 Reusable logic functions
│   ├── useAnalysisHelpers.ts   🎯 Score helpers, date formatting, export functionality
│   ├── useATSAutoStart.ts      🎯 Auto-start analysis logic
│   └── useATSPageState.ts      🎯 Page state management composable
├── stores/                     # Pinia state management
│   ├── resume.ts               ✅ File & text management with debugging
│   ├── analysis.ts             ✅ Analysis results & status (enhanced)
│   └── ui.ts                   🚧 UI state management
├── pages/                      # Application pages
│   ├── index.vue               ✅ Enhanced home with semantic theme
│   ├── ats-scanner.vue         ✅ Refactored: 5 state components (431 → 140 lines)
│   ├── job-comparison.vue      🎯 Next: Apply same refactoring pattern
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

## 📁 Folder Organization

### `/components` - UI Components
- **navbar/**: Navigation system (sidebar, bottom sheet, theme switcher)
- **ui/**: Core reusable UI components with theme support
- **resume/**: Resume-specific components (upload, preview, status)
- **analysis/**: Analysis result display components
- **pages/**: Page-specific components organized by page name (leverages Nuxt auto-import)
- **shared/**: Components used across multiple features

### **🆕 `/components/pages/` - Page-Specific Components**
New folder structure for page-specific components that leverages Nuxt's auto-import system:

```
/components/pages/[page-name]/
├── ComponentName.vue → <Pages[PageName][ComponentName] />

Examples:
/components/pages/ats-scanner/UploadPrompt.vue → <PagesAtsscannerUploadPrompt />
/components/pages/job-comparison/JobInput.vue → <PagesJobcomparisonJobInput />
```

**Benefits:**
- **Automatic imports**: No manual import statements needed
- **Clear organization**: Page-specific components are grouped together
- **Predictable naming**: File structure determines component name
- **Better maintainability**: Easy to find and modify page-specific UI

### **🆕 `/composables/` - Reusable Logic**
Extracted business logic from large page files:

- **useAnalysisHelpers.ts**: Score color/label functions, date formatting, export functionality
- **useATSAutoStart.ts**: Auto-start analysis detection and triggering logic
- **useATSPageState.ts**: Computed state management for page conditions

### `/stores` - State Management
- **resume.ts**: File upload and text extraction state
- **analysis.ts**: Analysis results and processing state (enhanced with better error handling)
- **ui.ts**: UI state (theme, navigation, modals)

### `/pages` - Application Routes
- **index.vue**: Home page with dual analysis options
- **ats-scanner.vue**: ✅ **Refactored**: Now uses component composition (431 → 140 lines)
- **job-comparison.vue**: 🎯 **Next target** for same refactoring pattern
- **results/**: Dynamic result pages for both analysis types

### `/server/api` - Backend Endpoints
- **upload.post.ts**: File processing and text extraction
- **analyze/**: Analysis endpoints for both modes
- **health.get.ts**: API health monitoring

## 🎯 Component Status Legend

- **✅ COMPLETED**: Fully implemented with theme integration
- **🆕 NEW**: Recently added components/features
- **🚧 CURRENT PHASE**: Currently being developed
- **🎯 NEXT UP**: Priority for next development sprint

## 📊 Refactoring Success: ATS Scanner

### **Before Refactoring**
```
ats-scanner.vue: 431 lines
├── Massive template blocks for each state
├── Mixed business logic and UI rendering
├── Hard to debug specific UI states
└── Difficult for multiple developers to work on
```

### **After Refactoring**
```
ats-scanner.vue: 140 lines (coordinator)
├── <PagesAtsscannerUploadPrompt />          # 30 lines
├── <PagesAtsscannerReadyInterface />        # 70 lines
├── <PagesAtsscannerAnalysisLoading />       # 40 lines
├── <PagesAtsscannerResultsDisplay />        # 90 lines
└── <PagesAtsscannerErrorState />            # 35 lines

+ composables/useAnalysisHelpers.ts          # 80 lines
+ composables/useATSAutoStart.ts             # 40 lines
```

### **Refactoring Benefits**
- ✅ **70% cleaner main page** (431 → 140 lines)
- ✅ **5 focused components** - each with single responsibility
- ✅ **Better maintainability** - easier to debug specific states
- ✅ **Improved testability** - components can be unit tested
- ✅ **Enhanced collaboration** - multiple developers can work on different states
- ✅ **Logic separation** - business logic extracted to composables

## 🔄 Data Flow Architecture

### File Upload Flow
```
User → FileUpload Component → Server API → Resume Store → Cross-page persistence
```

### Analysis Flow
```
Resume Store → Analysis API → Analysis Store → Page Components → Theme-aware display
```

### **🆕 Component Composition Flow**
```
Page → State Detection → Component Selection → Props/Events → Store Actions
```

### Navigation Flow
```
User interaction → UI Store → Responsive navigation → Theme-consistent styling
```

## 📱 Responsive Architecture

### Desktop Layout
- Right sidebar navigation
- Content area shifts when sidebar opens
- Floating toggle button in top-right

### Mobile Layout
- Bottom sheet navigation
- Full-width content area
- Floating toggle button in bottom-right
- Touch-optimized interactions

## 🎯 Next Refactoring Targets

### **job-comparison.vue** (Estimated 300+ lines)
Apply same pattern:
```
1. Identify UI states (no-job, input, comparing, results, error)
2. Extract to page-specific components in /components/pages/job-comparison/
3. Create composables for business logic
4. Update main page to use component composition
```

### **Future Pages**
- **Dashboard**: User analytics and history
- **Settings**: User preferences and account management
- **Help**: Documentation and support

## 🔍 Auto-Import Examples

### **Page Components**
```vue
<!-- No manual imports needed - Nuxt auto-imports based on file structure -->
<template>
  <div>
    <PagesAtsscannerUploadPrompt />
    <PagesJobcomparisonJobInput />
    <PagesDashboardStatsCard />
  </div>
</template>
```

### **Reusable Components**
```vue
<!-- Standard components auto-import by category -->
<template>
  <div>
    <AnalysisScoreCard :score="85" />
    <Button variant="primary">Action</Button>
    <NavbarToggle />
  </div>
</template>
```

This structure provides a clean, maintainable architecture that leverages Nuxt's auto-import system while separating concerns effectively between pages, components, and business logic.