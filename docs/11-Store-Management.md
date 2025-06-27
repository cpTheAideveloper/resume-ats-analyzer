# Store Management

## 🏪 Pinia State Management Overview

### **Store Philosophy**
- **Single Source of Truth**: Each store manages one domain of application state
- **Cross-Page Persistence**: State persists across page navigation
- **Reactive Updates**: Components automatically update when store state changes
- **TypeScript Integration**: Full type safety with comprehensive interfaces

## 📁 Current Store Structure

```
stores/
├── resume.ts               ✅ File & text management with debugging
├── analysis.ts             ✅  Analysis results & status
└── ui.ts                   🚧 UI state management
```

## 🔄 Store Responsibilities

### **Resume Store** (`stores/resume.ts`) ✅
**Purpose**: Manages file upload, text extraction, and resume data

**State Management**:
- File upload status and metadata
- Extracted resume text content
- Word count and character count
- Upload progress and error states

**Key Features**:
- Cross-page file persistence
- Debug state functionality
- File validation and processing
- Text extraction from PDF/DOCX

### **Analysis Store** (`stores/analysis.ts`) 🚧
**Purpose**: Manages analysis processes and results

**Planned State**:
- Analysis loading states
- ATS and job comparison results
- Analysis history and caching
- Error handling for AI processes

**Key Features**:
- Multiple analysis type support
- Result caching and persistence
- Progress tracking for long analyses
- Integration with Gemini AI API

### **UI Store** (`stores/ui.ts`) 🚧
**Purpose**: Manages user interface state

**Planned State**:
- Current theme selection
- Navigation state (sidebar/bottom sheet)
- Modal and overlay states
- User preferences and settings

**Key Features**:
- Theme persistence across sessions
- Responsive navigation state
- Component visibility management
- User preference storage

## 🎯 Store Usage Patterns

### **Basic Store Connection**
```typescript
// In any component or page
<script setup lang="ts">
const resumeStore = useResumeStore()

// Reactive state access
const isFileUploaded = computed(() => resumeStore.isFileUploaded)
const resumeText = computed(() => resumeStore.text)

// Store actions
const handleFileUpload = async (file: File) => {
  await resumeStore.uploadFile(file)
}
</script>
```

### **Multi-Store Integration**
```typescript
<script setup lang="ts">
// Connect multiple stores
const resumeStore = useResumeStore()
const analysisStore = useAnalysisStore()
const uiStore = useUIStore()

// Combined reactive state
const canAnalyze = computed(() => 
  resumeStore.isFileUploaded && 
  !analysisStore.isAnalyzing && 
  uiStore.isReady
)

// Cross-store actions
const startAnalysis = async () => {
  if (canAnalyze.value) {
    await analysisStore.analyzeATS(resumeStore.text)
  }
}
</script>
```

## 💾 State Persistence

### **Current Persistence Features**
- **Resume Store**: File data persists across page navigation
- **Theme Selection**: User theme choice saved to localStorage
- **Navigation State**: Sidebar/bottom sheet state maintained

### **Persistence Strategy**
- **Session Persistence**: Critical user data maintained during session
- **Local Storage**: User preferences and theme selection
- **Memory Only**: Temporary UI states and loading indicators

## 🔧 Store Development Guidelines

### **Store Creation Pattern**
```typescript
// stores/newStore.ts
export const useNewStore = defineStore('newStore', () => {
  // State
  const state = ref(initialValue)
  
  // Computed/Getters
  const computedValue = computed(() => state.value.processed)
  
  // Actions
  const updateState = (newValue: any) => {
    state.value = newValue
  }
  
  // Return public interface
  return {
    // State
    state: readonly(state),
    
    // Getters
    computedValue,
    
    // Actions
    updateState
  }
})
```

### **Store Integration Requirements**
- **TypeScript Interfaces**: Define clear interfaces for all state
- **Error Handling**: Comprehensive error states and recovery
- **Loading States**: Track async operations with loading indicators
- **Validation**: Input validation before state updates

## 🚦 Store State Flow

### **File Upload Flow**
```
User uploads file → Resume Store → API processing → State update → UI reflects change
```

### **Analysis Flow**
```
User starts analysis → Analysis Store → Gemini API → Results stored → Components update
```

### **Theme Change Flow**
```
User selects theme → UI Store → Global CSS update → localStorage save → Components re-render
```

## 🧪 Store Testing and Debugging

### **Resume Store Debug Features**
```typescript
// Available debugging methods
resumeStore.debugState() // Logs current store state
resumeStore.clearFile()  // Resets file state
resumeStore.validateState() // Checks state integrity
```

### **Development Tools**
- **Vue DevTools**: Monitor store state changes in real-time
- **Debug Methods**: Built-in debugging for store state inspection
- **State Validation**: Automatic validation of store state integrity
- **Error Logging**: Comprehensive error tracking and reporting

## 📋 Store Development Checklist

### **Before Creating New Stores**
- [ ] **Check existing stores** for similar functionality
- [ ] **Define clear responsibilities** and boundaries
- [ ] **Plan state structure** with TypeScript interfaces
- [ ] **Design persistence strategy** for critical data
- [ ] **Consider cross-store dependencies** and interactions

### **Store Implementation Requirements**
- [ ] **TypeScript interfaces** for all state and actions
- [ ] **Error handling** for all async operations
- [ ] **Loading states** for user feedback
- [ ] **Validation** for state updates
- [ ] **Debug methods** for development support
- [ ] **Documentation** for store usage and integration

## 🔄 State Management Best Practices

### **State Organization**
- **Keep stores focused**: Each store manages one domain
- **Minimize state**: Store only necessary data
- **Use computed properties**: Derive values rather than storing duplicates
- **Handle errors gracefully**: Always provide error recovery paths

### **Performance Considerations**
- **Lazy loading**: Load store state only when needed
- **Efficient updates**: Minimize reactive state changes
- **Memory management**: Clean up temporary state appropriately
- **Caching strategy**: Cache expensive computations and API results