# Component Reference

## 🧩 How to Use and Add Components

### **Component Philosophy**
- **Minimal Working Version**: Each component should be the simplest implementation that works
- **No Over-engineering**: Avoid extra features, complex styling, or unnecessary abstractions
- **Single Responsibility**: Each component does one thing well
- **Progressive Enhancement**: Start basic, improve incrementally

### **Code Standards**
- Use TypeScript for type safety with comprehensive interfaces
- Keep components under 100 lines when possible
- Focus on functionality over aesthetics initially
- Comment AI prompts and API integrations clearly

### **TailwindCSS Best Practices**

#### **Standard Class Order Pattern**
Follow this consistent order for utility classes for maintainable and readable code:

1. **Layout**: `flex`, `grid`, `block`, `inline`, `hidden`
2. **Positioning**: `relative`, `absolute`, `fixed`, `top-4`, `left-0`
3. **Box Model**: `w-full`, `h-screen`, `max-w-lg`, `min-h-0`
4. **Spacing**: `p-4`, `m-2`, `px-6`, `py-3`, `space-y-4`, `gap-4`
5. **Typography**: `text-lg`, `font-medium`, `leading-relaxed`, `text-center`
6. **Visual**: `bg-surface`, `border-border`, `rounded`, `shadow`
7. **Interactive**: `hover:bg-primary`, `focus:outline-none`, `transition-colors`

#### **Theme Style Requirements**
- **Always use semantic theme colors**: `text-content-base`, `bg-surface`, `border-border`
- **Never use direct colors**: Avoid `text-gray-900`, `bg-white`, `border-gray-200`
- **Use opacity modifiers**: `text-content-secondary/70` for subtle text
- **Follow text hierarchy**: `text-content-base` > `text-content-secondary` > `text-content-tertiary`

## 📁 Component Structure & Nuxt Auto-Import

### **Component Categories with Auto-Import Naming**
- **Navigation**: `/components/navbar/` - Desktop sidebar, mobile bottom sheet
- **UI**: `/components/ui/` - Reusable interface components
- **Resume**: `/components/resume/` - File upload and management
- **Analysis**: `/components/analysis/` - Results display and visualization
- **Pages**: `/components/pages/[page-name]/` - Page-specific components
- **Shared**: `/components/shared/` - Cross-feature components

### **📋 Nuxt Auto-Import Naming Convention**

#### **Page-Specific Components**
```
File Path: /components/pages/ats-scanner/UploadPrompt.vue
Auto-Import Name: <PagesAtsscannerUploadPrompt />

File Path: /components/pages/job-comparison/ResultsDisplay.vue
Auto-Import Name: <PagesJobcomparisonResultsDisplay />

File Path: /components/pages/dashboard/StatsCard.vue
Auto-Import Name: <PagesDashboardStatsCard />
```

#### **General Components**
```
File Path: /components/ui/Button.vue
Auto-Import Name: <Button />

File Path: /components/analysis/ScoreCard.vue  
Auto-Import Name: <AnalysisScoreCard />

File Path: /components/navbar/Toggle.vue
Auto-Import Name: <NavbarToggle />
```

#### **Naming Rules**
1. **Folder structure becomes PascalCase prefix**: `pages/ats-scanner/` → `PagesAtsscanner`
2. **Kebab-case folders become camelCase**: `ats-scanner` → `Atsscanner`
3. **File name becomes PascalCase suffix**: `UploadPrompt.vue` → `UploadPrompt`
4. **Final format**: `PagesAtsscannerUploadPrompt`

### **📁 Page Component Organization Strategy**

#### **When to Create Page-Specific Components**
Create in `/components/pages/[page-name]/` when:
- ✅ **Single page usage**: Only used by one specific page
- ✅ **Highly specific logic**: Tightly coupled to page functionality  
- ✅ **Page-specific styling**: Unique visual patterns for this page
- ✅ **Rapid development**: Need quick solution without abstraction
- ✅ **State components**: Different UI states of the same page

#### **When to Create Reusable Components**
Create in `/components/[category]/` when:
- ✅ **Multi-page usage**: Pattern exists in 2+ pages already
- ✅ **Generic functionality**: Logic can be abstracted with props
- ✅ **Consistent styling**: Same visual pattern across pages
- ✅ **Clear abstraction**: Easy to make configurable
- ✅ **Confirmed reusability**: Definitely will be used elsewhere

### **🎯 Page Component Patterns**

#### **State-Based Component Pattern**
```vue
<!-- Example: ATS Scanner page components -->
/components/pages/ats-scanner/
├── UploadPrompt.vue           # State 1: No file uploaded
├── ReadyInterface.vue         # State 2: File ready, not analyzed
├── AnalysisLoading.vue        # State 3: Analyzing
├── ResultsDisplay.vue         # State 4: Results ready
├── ErrorState.vue             # State 5: Error occurred
└── ActionButtons.vue          # Shared action patterns
```

#### **Feature-Based Component Pattern**
```vue
<!-- Example: Job Comparison page components -->
/components/pages/job-comparison/
├── JobInput.vue               # Job description input
├── ComparisonMatrix.vue       # Skills comparison display
├── GapAnalysis.vue            # Skills gap visualization
└── Recommendations.vue        # Job-specific recommendations
```

## 🎨 Theme Integration Guidelines

### **Required Semantic Classes**
```vue
<!-- Text Hierarchy -->
<h1 class="text-content-base">Primary Heading</h1>
<p class="text-content-secondary">Body Text</p>
<span class="text-content-tertiary">Metadata</span>

<!-- Backgrounds and Surfaces -->
<div class="bg-surface">Main Background</div>
<div class="bg-surface-secondary">Card Background</div>
<div class="bg-surface-tertiary">Input Background</div>

<!-- Borders -->
<div class="border-border">Default Border</div>
<div class="border-border-secondary">Subtle Border</div>
<div class="border-border-accent">Emphasized Border</div>

<!-- Interactive Elements -->
<button class="bg-primary text-primary-content">Primary Button</button>
<button class="bg-success text-success-content">Success Button</button>
```

### **Status Color Usage**
- **Success**: `bg-success`, `text-success-content` for positive states
- **Warning**: `bg-warning`, `text-warning-content` for caution states
- **Error**: `bg-error`, `text-error-content` for negative states
- **Primary**: `bg-primary`, `text-primary-content` for main actions

## 🧩 Component Development Pattern

### **Page-Specific Component Template**
```vue
<!-- 
  Component: ComponentName.vue
  Location: /components/pages/[page-name]/ComponentName.vue
  Purpose: Brief description of what this component does for this specific page
-->
<template>
  <div class="[layout classes] [spacing classes] [visual classes] [interactive classes]">
    <!-- Component content with semantic theme colors -->
  </div>
</template>

<script setup lang="ts">
// TypeScript interface for props
interface Props {
  // Define component props with types
}

// TypeScript interface for emits
interface Emits {
  eventName: [payload: string]
}

// Define props and emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Component logic using semantic theme approach
</script>

<!-- 
  COMPONENT INFO:
  - Functionality: Simple description of what the component does
  - Dependencies: List any external dependencies or libraries used
  - Store Connection: None - receives data via props, emits events to parent
  - Usage: <PagesPagenameComponentName :prop="value" @event="handler" />
-->
```

### **Reusable Component Template**
```vue
<!-- 
  Component: ComponentName.vue
  Location: /components/[category]/ComponentName.vue
  Purpose: Brief description of reusable functionality
-->
<template>
  <div class="[layout classes] [spacing classes] [visual classes] [interactive classes]">
    <!-- Component content with semantic theme colors -->
  </div>
</template>

<script setup lang="ts">
// TypeScript interface for props
interface Props {
  // Define component props with types
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

// Component logic using semantic theme approach
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
</script>

<!-- 
  COMPONENT INFO:
  - Functionality: Simple description of what the component does
  - Dependencies: List any external dependencies or libraries used
  - Store Connection: Which Pinia stores this component uses (if any)
  - Usage: <CategoryComponentName :prop="value" variant="primary" />
-->
```

### **Component Integration Steps**
1. **Create component** in appropriate category folder
2. **Use semantic theme classes** throughout styling
3. **Add TypeScript interfaces** for props and emits
4. **No manual imports needed** - Nuxt auto-imports based on file structure
5. **Test across all themes** to ensure consistency

## 📋 Component Refactoring Benefits

### **✅ Page Refactoring Success: ATS Scanner**
**Before**: 431 lines in single file
**After**: 5 focused components + 140-line coordinator

- ✅ **State separation**: Each UI state has its own component
- ✅ **Maintainability**: Easier to debug and modify specific states
- ✅ **Reusability**: Components can be reused or extended
- ✅ **Testing**: Individual components can be unit tested
- ✅ **Collaboration**: Multiple developers can work on different states

### **🎯 Refactoring Candidates**
Look for pages with:
- **200+ lines**: Likely has multiple concerns mixed together
- **Multiple UI states**: Different displays based on conditions
- **Repeated patterns**: Similar UI blocks that could be componentized
- **Complex logic**: Mixed business logic and UI rendering

## 🔧 Adding New Components

### **Development Checklist**
- [ ] **Choose correct location**: Page-specific vs reusable
- [ ] **Use semantic theme colors** exclusively
- [ ] **Follow standard utility class order**
- [ ] **Add TypeScript interfaces** for props and emits
- [ ] **Test across all themes**
- [ ] **Keep under 100 lines** initially
- [ ] **Document props and usage**
- [ ] **Ensure accessibility compliance**
- [ ] **Test Nuxt auto-import** works correctly

### **Auto-Import Testing**
```vue
<!-- Test that component auto-imports correctly -->
<template>
  <div>
    <!-- Should work without manual import -->
    <PagesAtsscannerUploadPrompt />
    <AnalysisScoreCard :score="85" />
    <Button variant="primary">Test</Button>
  </div>
</template>

<script setup lang="ts">
// No manual imports needed - Nuxt handles automatically
// Components are available based on file structure
</script>
```

### **Theme Testing Requirements**
- Test component in light, dark, ocean, forest, and sunset themes
- Verify text hierarchy visibility
- Check interactive state consistency
- Ensure proper contrast ratios
- Validate responsive behavior

## 📁 File Organization Examples

### **Correct Page Component Structure**
```
/components/pages/ats-scanner/
├── UploadPrompt.vue              → <PagesAtsscannerUploadPrompt />
├── ReadyInterface.vue            → <PagesAtsscannerReadyInterface />
├── AnalysisLoading.vue           → <PagesAtsscannerAnalysisLoading />
├── ResultsDisplay.vue            → <PagesAtsscannerResultsDisplay />
└── ErrorState.vue                → <PagesAtsscannerErrorState />

/components/pages/job-comparison/
├── JobDescriptionInput.vue       → <PagesJobcomparisonJobDescriptionInput />
├── SkillsMatrix.vue              → <PagesJobcomparisonSkillsMatrix />
└── ComparisonResults.vue         → <PagesJobcomparisonComparisonResults />
```

### **Reusable Component Structure**
```
/components/analysis/
├── ScoreCard.vue                 → <AnalysisScoreCard />
├── Section.vue                   → <AnalysisSection />
└── ProgressSteps.vue             → <AnalysisProgressSteps />

/components/ui/
├── Button.vue                    → <Button />
├── Card.vue                      → <Card />
└── Badge.vue                     → <Badge />
```

This structure ensures clean organization, predictable naming, and leverages Nuxt's powerful auto-import system for better developer experience.