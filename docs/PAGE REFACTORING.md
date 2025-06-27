# Page Refactoring Prompt Guide

## 🤖 AI ASSISTANT: COLLABORATIVE PAGE REFACTORING

**When you see this file, follow these steps:**

---

## 📋 STEP 1: DETECT REFACTORING NEED & REQUEST FILES

"Hi! I can help you refactor a complex page to make it cleaner and more manageable. I'll analyze your page and **propose a specific refactoring structure** for your approval before we start.

**This refactoring will solve:**
- 🔢 Too many lines of code (over 200 lines)
- 🔄 Multiple UI states in one file  
- 🧩 Complex logic mixed together
- 🔁 Repeated UI patterns
- 🐛 Hard to debug or maintain

**To get started, please provide these files:**

**REQUIRED FILES:**
- 📄 **Your page file** (e.g., `pages/ats-scanner.vue`, `pages/job-comparison.vue`) 
- 📋 **10-PAGE-REFERENCE.md** (page creation patterns)
- 🧩 **09-COMPONENT-REFERENCE.md** (component guidelines) 
- 📁 **04-PROJECT-STRUCTURE.md** (project organization)
- 🎨 **03-THEME-SYSTEM.md** (semantic color system)

**OPTIONAL (if your page uses these):**
- 🏪 **11-STORE-MANAGEMENT.md** (if page uses stores)
- 🔌 **08-API-DOCUMENTATION.md** (if page has API calls)
- 🧭 **07-NAVIGATION-SYSTEM.md** (if page has navigation)

**I'll analyze your page and propose a detailed refactoring structure for your approval before we begin!**"

---

## 🎯 STEP 2: ANALYZE & PROPOSE REFACTORING STRUCTURE

**After receiving files, provide detailed analysis and proposal:**

### **Page Analysis Report**
"I've analyzed your `[page-name].vue` file. Here's what I found:

**Current Complexity:**
- 📊 **File size**: [X] lines of code
- 🔄 **UI states detected**: [list specific states]
- 🔁 **Repeated patterns**: [list specific repeated UI blocks]
- 🧩 **Logic concerns**: [list mixed responsibilities]
- 🐛 **Maintenance issues**: [specific pain points]

**Refactoring Assessment:**
- ✅ **Needs state component extraction**: [Y] distinct UI states
- ✅ **Needs UI component extraction**: [Z] repeated patterns
- ✅ **Needs logic separation**: [complex functions to extract]
- ✅ **Component scope**: Page-specific vs reusable components"

### **Proposed Refactoring Structure**

"**PROPOSED STRUCTURE:**

```
📁 Refactoring Plan for [page-name].vue

📄 MAIN PAGE (Simplified):
├── pages/[page-name].vue (40-60 lines)
│   ├── State management only
│   ├── Component composition
│   └── Basic routing logic

📁 PAGE-SPECIFIC COMPONENTS:
├── components/pages/[page-name]/
│   ├── [PageName]StateNoFile.vue       # [Description of this state]
│   ├── [PageName]StateReady.vue        # [Description of this state]  
│   ├── [PageName]StateLoading.vue      # [Description of this state]
│   ├── [PageName]StateResults.vue      # [Description of this state]
│   ├── [PageName]StateError.vue        # [Description of this state]
│   ├── [PageName]ActionButtons.vue     # [Specific repeated action pattern]
│   └── [PageName]InfoCard.vue          # [Specific repeated info pattern]

📁 REUSABLE COMPONENTS (if applicable):
├── components/analysis/ (if pattern used elsewhere)
│   ├── AnalysisScoreCard.vue           # [If score pattern used in other pages]
│   └── AnalysisProgressSteps.vue       # [If progress pattern used elsewhere]

📁 COMPOSABLES (if needed):
├── composables/
│   ├── use[PageName]State.ts           # [State management logic]
│   ├── use[PageName]Actions.ts         # [Business logic functions]
│   └── use[PageName]Helpers.ts         # [Utility functions]
```

**COMPONENT ORGANIZATION STRATEGY:**

🎯 **Page-Specific Components** (components/pages/[page-name]/)
- Components ONLY used by this page
- Highly specific to page functionality
- Faster development, less abstraction
- Easier to modify for page-specific needs

🔄 **Reusable Components** (components/[feature]/)
- Patterns found in multiple pages
- More generic, configurable via props
- Shared across different pages
- Worth the abstraction investment

**Do you approve this refactoring structure? If yes, I'll work through each file step by step. If you'd like changes, let me know what adjustments you want to make.**"

---

## 🔄 STEP 3: COLLABORATIVE FILE-BY-FILE REFACTORING

**After user approval, work systematically:**

### **File-by-File Process**
"Great! You've approved the structure. I'll now refactor **one file at a time** in this order:

**REFACTORING SEQUENCE:**
1. 📄 **Main page simplification** (extract states, keep coordination)
2. 🧩 **State components** (one by one, in order of complexity)
3. 🎨 **UI components** (page-specific first, then reusable)
4. 🔧 **Composables** (if complex logic needs extraction)
5. 📋 **Documentation updates** (component references and usage)

**Let's start with #1: Main Page Simplification**

I'll show you the simplified main page file first. After you approve it, we'll move to each state component one by one. This way you can review each step and request changes before we continue.

**Ready to see the simplified main page?**"

### **Individual File Approval Process**
```
For each file:
1. "Here's the [ComponentName].vue file:"
2. Show complete component code
3. "This component handles: [specific responsibility]"
4. "Key features: [list key features]"
5. "Does this look good? Any changes needed before we continue?"
6. Wait for approval before moving to next file
```

---

## 🏗️ COMPONENT ORGANIZATION STRATEGY

### **Page-Specific vs Reusable Decision Matrix**

#### **CREATE PAGE-SPECIFIC COMPONENT** (`components/pages/[page-name]/`) **WHEN:**
- ✅ **Single page usage**: Only used by this specific page
- ✅ **Highly specific logic**: Tightly coupled to page functionality  
- ✅ **Page-specific styling**: Unique visual patterns for this page
- ✅ **Rapid development**: Need quick solution without abstraction
- ✅ **Uncertain reusability**: Not sure if pattern will be used elsewhere

#### **CREATE REUSABLE COMPONENT** (`components/[feature]/`) **WHEN:**
- ✅ **Multi-page usage**: Pattern exists in 2+ pages already
- ✅ **Generic functionality**: Logic can be abstracted with props
- ✅ **Consistent styling**: Same visual pattern across pages
- ✅ **Clear abstraction**: Easy to make configurable
- ✅ **Confirmed reusability**: Definitely will be used elsewhere

### **File Naming Conventions**

#### **Page-Specific Components:**
```
components/pages/ats-scanner/
├── ATSScannerUploadPrompt.vue      # Clear page association
├── ATSScannerAnalysisInterface.vue  # Specific to ATS scanner
├── ATSScannerLoadingState.vue       # Page-specific loading
└── ATSScannerResultsDisplay.vue     # Page-specific results
```

#### **Reusable Components:**
```
components/analysis/
├── AnalysisScoreCard.vue           # Generic, configurable
├── AnalysisProgressIndicator.vue   # Used across analysis pages
└── AnalysisActionButtons.vue       # Common action patterns
```

---

## 📋 REFACTORING APPROVAL CHECKPOINTS

### **Checkpoint 1: Structure Approval**
- [ ] **Proposed file structure** approved
- [ ] **Component organization strategy** agreed upon  
- [ ] **Page-specific vs reusable** decisions confirmed
- [ ] **Refactoring sequence** accepted

### **Checkpoint 2: Main Page Approval**
- [ ] **Simplified page structure** approved
- [ ] **State management approach** confirmed
- [ ] **Component composition** looks correct
- [ ] **Functionality preserved** verified

### **Checkpoint 3: Individual Component Approvals**
- [ ] **Component responsibility** is clear
- [ ] **Props and events** make sense
- [ ] **Styling follows** semantic theme system
- [ ] **Documentation** is complete
- [ ] **Integration** with stores/composables correct

### **Checkpoint 4: Final Integration**
- [ ] **All components** work together
- [ ] **No functionality** was lost
- [ ] **Page performance** maintained or improved
- [ ] **Code maintainability** significantly improved

---

## 🎯 COLLABORATIVE BENEFITS

### **Why Work File-by-File:**
- ✅ **Review each step**: Catch issues early before they compound
- ✅ **Request changes**: Modify approach if something doesn't fit
- ✅ **Learn the pattern**: Understand the refactoring approach
- ✅ **Maintain control**: You approve each component before moving on
- ✅ **Reduce risk**: No massive changes without your approval

### **Why Propose Structure First:**
- ✅ **Clear plan**: Everyone understands the end goal
- ✅ **Smart organization**: Page-specific vs reusable decisions upfront
- ✅ **Avoid rework**: Get organization right before building
- ✅ **Set expectations**: Know exactly what will be created
- ✅ **Efficient process**: No surprises or scope creep"

---

## 🤖 STEP 2: AUTOMATIC ANALYSIS & REFACTORING

**After receiving the files, automatically:**

### **Analyze Current Page Issues**
1. **Count lines and complexity**
2. **Identify distinct UI states** 
3. **Find repeated UI patterns**
4. **Locate mixed logic concerns**
5. **Spot maintenance pain points**

### **Create Refactoring Plan**
1. **State-based component breakdown**
2. **Reusable UI component extraction**  
3. **Logic separation strategy**
4. **File organization structure**
5. **Component naming convention**

### **Apply Best Practices Automatically**
1. **Use semantic theme colors only**
2. **Follow established component patterns**
3. **Create proper TypeScript interfaces**
4. **Add component documentation**
5. **Implement store connections correctly**

---

## 🎯 AUTOMATIC REFACTORING PROCESS

### **1. State Component Extraction**
```vue
<!-- BEFORE: Long conditional blocks -->
<div v-if="!resumeStore.isFileUploaded" class="text-center py-16">
  <!-- 50+ lines of upload prompt code -->
</div>
<div v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasResults" class="max-w-4xl mx-auto">
  <!-- 80+ lines of analysis interface code -->
</div>
<div v-else-if="analysisStore.isAnalyzing" class="max-w-2xl mx-auto text-center py-16">
  <!-- 60+ lines of loading state code -->
</div>

<!-- AFTER: Clean state components -->
<template>
  <div class="container-section space-component">
    <ATSUploadPrompt v-if="currentState === 'no-file'" />
    <ATSAnalysisInterface v-else-if="currentState === 'ready'" />
    <ATSAnalysisLoading v-else-if="currentState === 'analyzing'" />
    <ATSAnalysisResults v-else-if="currentState === 'results'" />
    <ATSAnalysisError v-else-if="currentState === 'error'" />
  </div>
</template>
```

### **2. Reusable UI Component Extraction**
```vue
<!-- BEFORE: Repeated patterns -->
<div class="bg-surface-secondary border border-border rounded-lg p-6">
  <h3 class="text-lg font-semibold text-content-base mb-2">Score Card</h3>
  <div class="text-2xl font-bold text-success">85%</div>
</div>

<!-- AFTER: Reusable component -->
<AnalysisScoreCard 
  title="ATS Compatibility"
  :score="85"
  variant="success"
  icon="heroicons:document-check"
/>
```

### **3. Logic Separation**
```vue
<!-- BEFORE: Mixed logic in page -->
<script setup lang="ts">
// 150+ lines of mixed logic including:
// - Store management
// - Analysis functions  
// - UI state handling
// - Date formatting
// - Export functionality
// - Auto-start detection
// - Error handling
</script>

<!-- AFTER: Clean separation -->
<script setup lang="ts">
// Page logic only - delegates to composables and components
const { currentState } = useATSPageState()
const { handleAutoStart } = useATSAutoStart()

// All complex logic moved to:
// - composables/useATSAnalysis.ts
// - composables/useATSPageState.ts  
// - composables/useAnalysisHelpers.ts
// - Individual components handle their own logic
</script>
```

### **4. Component Organization**
```
components/
├── pages/
│   └── ats-scanner/
│       ├── ATSUploadPrompt.vue       # State: No file uploaded
│       ├── ATSAnalysisInterface.vue  # State: Ready to analyze
│       ├── ATSAnalysisLoading.vue    # State: Analyzing
│       ├── ATSAnalysisResults.vue    # State: Results ready
│       └── ATSAnalysisError.vue      # State: Error occurred
├── analysis/
│   ├── AnalysisScoreCard.vue         # Reusable score display
│   ├── AnalysisActionButtons.vue     # Reusable action section
│   └── AnalysisProgressSteps.vue     # Reusable progress indicator
└── ui/
    ├── FilePreviewCard.vue           # Reusable file display
    └── LoadingSpinner.vue            # Reusable loading state
```

---

## ⚡ AUTOMATIC BEST PRACTICES APPLIED

### **Component Standards**
- ✅ **Semantic theme colors**: Only `text-content-base`, `bg-surface`, etc.
- ✅ **Single responsibility**: Each component has one clear purpose
- ✅ **TypeScript interfaces**: Proper prop and emit definitions
- ✅ **Component documentation**: Header and footer comments
- ✅ **Store integration**: Proper Pinia store connections

### **Code Organization**
- ✅ **File naming**: Clear, descriptive component names
- ✅ **Folder structure**: Organized by feature and reusability
- ✅ **Logic separation**: Composables for complex business logic
- ✅ **Template clarity**: Clean, readable template structure
- ✅ **Script organization**: Imports, interfaces, logic, exports

### **Maintainability Improvements**
- ✅ **Smaller files**: Each component under 100 lines
- ✅ **Clear responsibilities**: Easy to understand what each file does
- ✅ **Reusable patterns**: Components can be used across pages
- ✅ **Testing ready**: Individual components can be tested
- ✅ **Debug friendly**: Issues isolated to specific components

---

## 📋 REFACTORING DELIVERABLES

**I will provide you with:**

### **1. Refactored Main Page**
- Clean, minimal page file (under 50 lines)
- Clear state management
- Component composition only
- Proper store integration

### **2. State Components** 
- One component per major UI state
- Focused, single-responsibility components  
- Proper prop interfaces and events
- Semantic theme integration

### **3. Reusable UI Components**
- Extracted repeated patterns
- Configurable via props
- Usable across multiple pages
- Consistent styling and behavior

### **4. Composables (if needed)**
- Complex business logic separation
- Reusable functionality
- Clean API design
- Proper TypeScript typing

### **5. Component Documentation**
- Usage examples for each component
- Prop and event documentation
- Integration instructions
- Testing guidelines

---

## 🚀 GETTING STARTED

**Simply provide:**
1. 📄 Your complex page file 
2. 📋 The 4-5 required documentation files

**I will automatically:**
1. 🔍 Analyze your page complexity
2. 📝 Create refactoring plan  
3. 🧩 Extract state components
4. 🎨 Extract reusable UI components
5. 🔧 Separate business logic
6. 📚 Document everything
7. ✅ Apply all best practices

**Result:** Clean, maintainable, testable page architecture following your project's established patterns!"

---

## ⚠️ CRITICAL AI REMINDERS

### **ALWAYS DO:**
- ✅ **Use semantic theme colors** - Never direct colors
- ✅ **Follow component patterns** - Match existing conventions
- ✅ **Create proper interfaces** - TypeScript for all props/events
- ✅ **Add documentation** - Component info headers and footers
- ✅ **Maintain functionality** - Don't break existing features
- ✅ **Use existing stores** - Connect to established Pinia stores

### **NEVER DO:**
- ❌ **Change core functionality** - Only refactor structure
- ❌ **Add new features** - Focus on organization only  
- ❌ **Break established patterns** - Follow project conventions
- ❌ **Use direct colors** - Always semantic theme classes
- ❌ **Create complex components** - Keep components simple and focused



at the end of the job 
ALWAYS UPDATE:

04-PROJECT-STRUCTURE.md - Add all new components with ✅ status
09-COMPONENT-REFERENCE.md - Document each new component with usage examples
10-PAGE-REFERENCE.md - Add page as refactored example
16-DOCUMENTATION-UPDATES.md - Record refactoring completion