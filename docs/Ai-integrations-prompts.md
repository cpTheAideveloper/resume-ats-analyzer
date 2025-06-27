# AI App Integration Guide

## 🤖 Essential Prompts for AI Development Apps

### **File Structure Context Prompts**

#### **1. Folder Structure Recognition Prompt**
```
FOLDER STRUCTURE CONTEXT:
Current project structure shows:
- pages/atscanner/ (folder-based routing)
- UploadPrompt.vue (component in page folder)

This indicates:
✅ Nuxt 3 folder-based routing system
✅ Page-specific components in page folders
✅ Component co-location pattern

When working with this project:
- Respect folder-based routing conventions
- Keep page-specific components in page folders
- Follow Nuxt 3 file organization patterns
```

#### **2. Component Location Prompt**
```
COMPONENT ORGANIZATION PATTERN:
📁 pages/atscanner/
├── index.vue (main page file)
├── UploadPrompt.vue (page-specific component)
└── [other-components].vue (page-specific components)

RULES:
- Page-specific components stay in page folder
- Reusable components go to /components/[category]/
- Follow existing naming conventions
- Maintain folder structure consistency
```

---

## 🔧 Development Context Prompts

### **3. Technology Stack Context**
```
PROJECT TECHNOLOGY CONTEXT:
Framework: Nuxt 3 + TypeScript
Styling: TailwindCSS v4 (semantic theme system)
State: Pinia stores
Icons: NuxtIcon module
Routing: Nuxt file-based routing

DEVELOPMENT CONSTRAINTS:
- ONLY modify TailwindCSS classes for styling
- ALWAYS use semantic theme colors (text-content-base, bg-surface)
- NEVER use direct colors (text-gray-900, bg-white)
- Follow TypeScript interfaces for all props
- Use existing Pinia stores, don't create new state
```

### **4. Code Standards Prompt**
```
CODE STANDARDS ENFORCEMENT:
✅ DO:
- Use semantic theme classes (text-content-base, bg-surface)
- Follow TypeScript interfaces
- Keep components under 100 lines
- Add component documentation headers
- Connect to existing Pinia stores

❌ DON'T:
- Use direct color classes (text-gray-900, bg-blue-500)
- Modify store logic or create new stores
- Add new dependencies or imports
- Change component props or emit interfaces
- Break established naming conventions
```

---

## 📱 AI App-Specific Integration

### **5. Cursor/VS Code AI Integration**
```
CURSOR AI CONTEXT:
Project: Resume ATS Analyzer
Phase: Phase 6 - ATS Scanner Implementation
Current: Building page-specific components

ACTIVE FILES:
- pages/atscanner/index.vue (main page)
- pages/atscanner/UploadPrompt.vue (component)
- stores/resume.ts (file management)
- stores/analysis.ts (analysis state)

NEXT TASKS:
- Complete remaining state components
- Maintain semantic theme consistency
- Follow established component patterns
```

### **6. GitHub Copilot Context**
```
// GitHub Copilot Context
// Project: Resume ATS Analyzer - Nuxt 3 + TypeScript
// Theme: Semantic color system (text-content-base, bg-surface)
// State: Pinia stores (resumeStore, analysisStore)
// Conventions: Page-specific components in page folders
// Current: Phase 6 ATS Scanner page implementation
```

### **7. Claude/ChatGPT Context**
```
PROJECT CONTEXT FOR AI CHAT:
I'm working on the Resume ATS Analyzer project. Current status:
- Framework: Nuxt 3 + TypeScript + TailwindCSS v4
- Phase: 6 (ATS Scanner implementation)
- Structure: Page-specific components in pages/atscanner/
- Theme: Semantic color system only
- Stores: Resume store (file management) + Analysis store

CURRENT TASK: [Describe specific task]
CONSTRAINTS: Only styling changes, use semantic colors, follow existing patterns
```

---

## 🎯 Component Development Prompts

### **8. Component Creation Template**
```
NEW COMPONENT TEMPLATE:
When creating components in pages/atscanner/:

<!-- 
  Component: ComponentName.vue
  Location: /pages/atscanner/ComponentName.vue
  Purpose: [Specific responsibility for ATS scanner page]
-->
<template>
  <div class="[semantic-theme-classes]">
    <!-- Component content -->
  </div>
</template>

<script setup lang="ts">
// Page-specific component logic
interface Props {
  // TypeScript props
}

// Store connections (if needed)
const resumeStore = useResumeStore()
const analysisStore = useAnalysisStore()
</script>

<!-- 
  COMPONENT INFO:
  - Functionality: [What it does]
  - Dependencies: [External dependencies]
  - Store Connection: [Which stores]
  - Usage: <ComponentName :prop="value" />
  - Page: ATS Scanner only
-->
```

### **9. Styling-Only Modification Prompt**
```
STYLING MODIFICATION RULES:
Target: pages/atscanner/[component].vue

ALLOWED CHANGES:
✅ TailwindCSS class modifications
✅ Semantic color adjustments (text-content-base to text-content-secondary)
✅ Spacing changes (p-4 to p-6, space-y-4 to space-y-6)
✅ Typography adjustments (text-lg to text-xl, font-medium to font-semibold)
✅ Visual enhancements (rounded-lg to rounded-xl, shadow-sm to shadow-md)

FORBIDDEN CHANGES:
❌ Template structure modifications
❌ Script logic changes
❌ Props or emit changes
❌ Store connections
❌ Component functionality
❌ Direct color classes (text-gray-900, bg-blue-500)
```

---

## 🔄 State Management Prompts

### **10. Store Integration Prompt**
```
STORE USAGE PATTERN:
Available stores:
- resumeStore: useResumeStore() - File upload and text extraction
- analysisStore: useAnalysisStore() - Analysis state and results

COMMON PATTERNS:
// File status checking
const isFileUploaded = computed(() => resumeStore.isFileUploaded)
const resumeText = computed(() => resumeStore.extractedText)

// Analysis state checking  
const isAnalyzing = computed(() => analysisStore.isAnalyzing)
const hasResults = computed(() => analysisStore.hasATSResults)

// Actions
const startAnalysis = () => analysisStore.analyzeATS(resumeStore.extractedText)
```

### **11. Error Handling Prompt**
```
ERROR HANDLING PATTERN:
For pages/atscanner/ components:

// Error state checking
const hasError = computed(() => analysisStore.analysisError)
const errorMessage = computed(() => analysisStore.analysisError?.message)

// Error recovery actions
const retryAnalysis = () => analysisStore.retryAnalysis()
const clearError = () => analysisStore.clearError()

// User feedback
<div v-if="hasError" class="bg-error/5 border border-error/20 rounded-lg p-4">
  <p class="text-error">{{ errorMessage }}</p>
  <button @click="retryAnalysis" class="btn-primary mt-2">Try Again</button>
</div>
```

---

## 📋 Quick Reference Cards

### **12. Semantic Colors Quick Reference**
```
SEMANTIC COLOR CHEAT SHEET:
Text Hierarchy:
- text-content-base (primary headings, important content)
- text-content-secondary (body text, descriptions)  
- text-content-tertiary (labels, metadata)
- text-content-muted (placeholder, disabled)

Backgrounds:
- bg-surface (main background)
- bg-surface-secondary (cards, sidebars)
- bg-surface-tertiary (inputs, code blocks)

Status Colors:
- bg-success + text-success-content (positive states)
- bg-warning + text-warning-content (caution states)
- bg-error + text-error-content (negative states)
- bg-primary + text-primary-content (main actions)

Borders:
- border-border (default borders)
- border-border-secondary (subtle borders)
- border-border-accent (emphasized borders)
```

### **13. Common Class Patterns**
```
COMMON TAILWIND PATTERNS:
Cards:
- bg-surface-secondary border border-border rounded-lg p-6

Buttons:
- btn-primary (theme-aware primary button)
- btn-secondary (theme-aware secondary button)

Layout:
- container-section (responsive container)
- space-component (consistent spacing)
- space-y-6 (vertical spacing between elements)

Typography:
- text-hero (responsive hero text)
- text-subtitle (responsive subtitle)
- leading-relaxed (comfortable line height)

Interactive:
- hover:bg-primary transition-colors
- focus:outline-none focus:ring-2 focus:ring-primary/50
```

---

## 🚀 Usage Instructions

### **For Cursor/VS Code:**
1. Add relevant context prompts to workspace settings
2. Include project context in AI chat
3. Reference current phase and component location

### **For GitHub Copilot:**
1. Add context comments at top of files
2. Include current task and constraints
3. Reference semantic color system

### **For ChatGPT/Claude:**
1. Provide project context with each new chat
2. Include current phase status
3. Specify styling-only or development work
4. Attach relevant documentation files

### **For Component Development:**
1. Use component creation template
2. Follow semantic color requirements  
3. Connect to existing stores only
4. Keep components page-specific

This integration guide ensures AI tools understand your project context, constraints, and conventions for better assistance!