# Page Reference

## 📄 How to Create and Add Pages

### **Page Philosophy**
- **Single Purpose**: Each page serves one main user goal
- **Component Composition**: Pages coordinate components, don't contain complex UI
- **Layout Integration**: All pages use the default layout with navigation
- **Theme Consistency**: Pages adapt seamlessly across all themes
- **Responsive Design**: Mobile-first approach with desktop enhancements

### **Page Standards**
- Use semantic theme colors throughout
- Follow consistent spacing and typography
- Integrate with Pinia stores for state management
- Handle loading and error states gracefully
- **Compose from components**: Pages should orchestrate, not implement UI

## 🏗️ Modern Page Structure Pattern

### **Component-First Page Template**
```vue
<!-- 
  Page: PageName.vue
  Route: /page-route
  Purpose: Brief description of what this page accomplishes
-->
<template>
  <div class="container-section space-component">
    <!-- State-based component composition -->
    <PagesPagenameStateOne v-if="condition1" @event="handler" />
    <PagesPagenameStateTwo v-else-if="condition2" :data="storeData" @event="handler" />
    <PagesPagenameStateThree v-else :results="results" @export="exportHandler" />
  </div>
</template>

<script setup lang="ts">
// Page metadata
definePageMeta({
  title: 'Page Title',
  description: 'Page description for SEO'
})

// Store connections
const someStore = useSomeStore()
const anotherStore = useAnotherStore()

// Event handlers and coordination logic
const handler = () => {
  // Handle events from components
}

// SEO meta tags
useHead({
  title: 'Page Title - App Name',
  meta: [
    { name: 'description', content: 'Page description' }
  ]
})
</script>

<!-- 
  PAGE INFO:
  - Functionality: What the page accomplishes for users
  - Store Usage: Which Pinia stores this page connects to
  - Navigation: How users reach this page
  - Dependencies: Page-specific components used
-->
```

## 📁 Page Organization & Refactoring Strategy

### **Current Page Structure**
```
pages/
├── index.vue               # ✅ Home page with dual analysis options
├── ats-scanner.vue         # ✅ Refactored: 5 state components (431 → 140 lines)
├── job-comparison.vue      # 🎯 Next: Apply same refactoring pattern
└── results/                # 🎯 Future: Dynamic result pages
    ├── ats/[id].vue       # ATS analysis results
    └── comparison/[id].vue # Job comparison results
```

### **🎯 Page Refactoring Success: ATS Scanner Example**

#### **Before Refactoring (431 lines)**
```vue
<template>
  <div class="container-section space-component">
    <!-- 50+ lines: No file uploaded state -->
    <div v-if="!resumeStore.isFileUploaded" class="text-center py-16">
      <!-- Complex upload prompt HTML -->
    </div>
    
    <!-- 80+ lines: File ready state -->
    <div v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasATSResults">
      <!-- Complex ready interface HTML -->
    </div>
    
    <!-- 60+ lines: Loading state -->
    <div v-else-if="analysisStore.isAnalyzing">
      <!-- Complex loading animation HTML -->
    </div>
    
    <!-- 200+ lines: Results state -->
    <div v-else-if="analysisStore.hasATSResults">
      <!-- Massive results display HTML -->
    </div>
  </div>
</template>
```

#### **After Refactoring (140 lines)**
```vue
<template>
  <div class="container-section space-component">
    <!-- Clean component composition -->
    <PagesAtsscannerUploadPrompt v-if="!resumeStore.isFileUploaded" />
    
    <PagesAtsscannerReadyInterface 
      v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasATSResults"
      :fileName="resumeStore.fileName" 
      :wordCount="resumeStore.wordCount"
      :extractedText="resumeStore.extractedText"
      @clearFile="handleClearFile" 
      @startAnalysis="startAnalysis" 
    />
    
    <PagesAtsscannerAnalysisLoading v-else-if="analysisStore.isAnalyzing" />
    
    <PagesAtsscannerResultsDisplay 
      v-else-if="analysisStore.hasATSResults" 
      :results="analysisStore.atsResults"
      @startOver="handleStartOver" 
      @exportResults="exportResults" 
    />
    
    <PagesAtsscannerErrorState 
      v-else-if="analysisStore.analysisError"
      :error="analysisStore.analysisError"
      @retry="retryAnalysis" 
      @startOver="handleStartOver" 
    />
  </div>
</template>

<script setup lang="ts">
// Only coordination logic, event handlers, and store connections
// All UI complexity moved to focused components
</script>
```

### **🎯 Page Refactoring Benefits**
- ✅ **70% reduction in page complexity** (431 → 140 lines)
- ✅ **5 focused components** instead of massive template blocks
- ✅ **Better maintainability** - easier to debug specific states
- ✅ **Improved testability** - components can be unit tested
- ✅ **Enhanced collaboration** - developers can work on different states
- ✅ **Reusability potential** - components can be extended/reused

## 🎨 Theme Integration for Pages

### **Required Page Structure**
```vue
<template>
  <!-- Main container with semantic spacing -->
  <div class="container-section space-component">
    
    <!-- Hero Section (if needed) -->
    <header class="text-center mb-12">
      <h1 class="text-hero text-content-base mb-4">
        Primary Page Title
      </h1>
      <p class="text-subtitle text-content-secondary max-w-2xl mx-auto">
        Supporting description that explains the page purpose
      </p>
    </header>

    <!-- Component Composition -->
    <main class="space-y-12">
      <!-- Compose from page-specific components -->
      <PagesPagenameComponentOne :data="storeData" @event="handler" />
      <PagesPagenameComponentTwo v-if="condition" @action="actionHandler" />
    </main>
  </div>
</template>
```

### **Semantic Class Usage**
- **Containers**: `container-section`, `space-component`
- **Typography**: `text-hero`, `text-subtitle`, `text-content-base`
- **Backgrounds**: `bg-surface`, `bg-surface-secondary`
- **Spacing**: `space-y-8`, `mb-12`, `p-8`

## 🔄 Page State Management Pattern

### **Component-Props-Events Pattern**
```vue
<script setup lang="ts">
// Store connections (read-only data)
const resumeStore = useResumeStore()
const analysisStore = useAnalysisStore()

// Reactive state for component conditions
const currentState = computed(() => {
  if (!resumeStore.isFileUploaded) return 'no-file'
  if (analysisStore.isAnalyzing) return 'analyzing'
  if (analysisStore.hasResults) return 'results'
  if (analysisStore.analysisError) return 'error'
  return 'ready'
})

// Event handlers (coordination logic)
const handleStartAnalysis = async () => {
  const success = await analysisStore.analyzeATS(resumeStore.extractedText)
  if (!success) {
    // Handle error
  }
}

const handleClearFile = () => {
  resumeStore.clearFile()
  analysisStore.clearResults()
  navigateTo('/')
}
</script>
```

### **Store Integration Best Practices**
- **Read store data** via computed properties
- **Pass data down** as props to components
- **Handle events** from components to trigger store actions
- **Keep pages stateless** - state lives in stores
- **Components are pure** - receive props, emit events

## 📱 Responsive Page Design

### **Layout Considerations**
- **Desktop**: Content adapts when sidebar is open
- **Mobile**: Full-width layout with bottom sheet navigation
- **Spacing**: Consistent spacing that works across devices
- **Typography**: Responsive text sizing with clamp()

### **Mobile-First Component Composition**
```vue
<template>
  <div class="container-section space-component">
    <!-- Components handle their own responsive design -->
    <div class="space-y-6 md:space-y-8 lg:space-y-12">
      <!-- Each component is responsively designed -->
      <PagesPagenameHeader />
      <PagesPagenameContent :data="data" />
      <PagesPagenameActions @action="handler" />
    </div>
  </div>
</template>
```

## 🧩 Component Composition Requirements

### **When to Refactor a Page**
Look for pages with:
- **200+ lines**: Complex template likely has multiple concerns
- **Multiple UI states**: Different displays based on conditions
- **Repeated patterns**: Similar UI blocks across states
- **Mixed logic**: Business logic tangled with UI rendering
- **Hard to debug**: Issues difficult to isolate

### **Refactoring Process**
1. **Identify distinct UI states** (no-file, ready, loading, results, error)
2. **Extract each state** into its own component
3. **Define clean props/events** for each component
4. **Move logic to stores/composables** if needed
5. **Update main page** to use component composition
6. **Test each state** individually

### **Component Organization Decision Matrix**

#### **Create Page-Specific Component When:**
- ✅ **Single page usage**: Only used by this specific page
- ✅ **Highly specific**: Tightly coupled to page functionality  
- ✅ **Different UI states**: Loading, error, results variations
- ✅ **Rapid development**: Quick solution without abstraction

#### **Create Reusable Component When:**
- ✅ **Multi-page usage**: Pattern used across 2+ pages
- ✅ **Generic functionality**: Logic can be abstracted with props
- ✅ **Consistent patterns**: Same visual/functional pattern
- ✅ **Clear abstraction**: Easy to make configurable

## 🏪 Pinia Store Integration Requirements

### **Mandatory Store Usage**
- **All pages MUST use Pinia stores** for state management
- **Check existing stores first** before creating new state
- **Connect to appropriate stores** based on page functionality
- **Follow store patterns** established in the project

### **Store Connection Pattern**
```vue
<script setup lang="ts">
// Required store connections
const resumeStore = useResumeStore()     // File management
const analysisStore = useAnalysisStore() // Analysis state
const uiStore = useUIStore()             // UI state (if exists)

// State-based component rendering
const showUploadPrompt = computed(() => !resumeStore.isFileUploaded)
const showResults = computed(() => analysisStore.hasATSResults)
const showLoading = computed(() => analysisStore.isAnalyzing)
</script>
```

## ⚠️ Pre-Development Requirements

### **Before Creating New Pages**

#### **1. Component Audit**
- Review existing page components in `/components/pages/`
- Check if similar state patterns already exist
- Identify reusable UI components
- Plan component composition strategy

#### **2. Store Analysis**
- Examine existing Pinia stores for required state
- Determine if new store modules are needed
- Plan state management approach
- Document store dependencies

#### **3. State Identification**
- Map out different UI states the page will have
- Define conditions for each state
- Plan component props and events
- Design data flow between components and stores

### **Development Checklist**
- [ ] **Component Review**: Cataloged existing components for reuse
- [ ] **Store Planning**: Identified required stores and state management
- [ ] **State Mapping**: Planned different UI states and components
- [ ] **Props/Events Design**: Defined component interfaces
- [ ] **Theme Integration**: Ensured semantic color usage throughout
- [ ] **Auto-Import Testing**: Verified Nuxt auto-import works correctly

## 🎯 Page Examples by Type

### **Analysis Page Pattern** (ATS Scanner, Job Comparison)
```vue
<template>
  <div class="container-section space-component">
    <PagesAnalysisUploadPrompt v-if="!hasFile" />
    <PagesAnalysisInterface v-else-if="!isAnalyzing && !hasResults" />
    <PagesAnalysisLoading v-else-if="isAnalyzing" />
    <PagesAnalysisResults v-else-if="hasResults" />
    <PagesAnalysisError v-else-if="hasError" />
  </div>
</template>
```

### **Dashboard Page Pattern**
```vue
<template>
  <div class="container-section space-component">
    <PagesDashboardHeader :user="user" />
    <PagesDashboardStats :data="stats" />
    <PagesDashboardRecentActivity :activities="activities" />
    <PagesDashboardQuickActions @action="handleAction" />
  </div>
</template>
```

### **Settings Page Pattern**
```vue
<template>
  <div class="container-section space-component">
    <PagesSettingsNavigation :sections="sections" :active="activeSection" />
    <PagesSettingsProfile v-if="activeSection === 'profile'" />
    <PagesSettingsPreferences v-else-if="activeSection === 'preferences'" />
    <PagesSettingsAccount v-else-if="activeSection === 'account'" />
  </div>
</template>
```

This approach transforms complex pages into clean, maintainable component orchestrators that leverage Nuxt's auto-import system for better developer experience.