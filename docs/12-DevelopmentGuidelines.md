# Development Guidelines

## 🛠️ Development Standards

### **Code Quality Principles**
- **Functionality First**: Focus on working features over perfect styling
- **Incremental Improvement**: Build basic, then enhance progressively
- **Type Safety**: Use TypeScript interfaces for all data structures
- **Consistency**: Follow established patterns and conventions

### **Performance Guidelines**
- **Theme Optimization**: Ensure smooth theme switching without layout shifts
- **Component Efficiency**: Minimize unnecessary re-renders and computations
- **API Optimization**: Implement proper caching and error handling
- **Bundle Size**: Keep dependencies minimal and focused

## 🧪 Testing Guidelines

### **Theme Testing Checklist**
- [ ] **Text Readability**: Verify contrast ratios across all themes
- [ ] **Component Consistency**: Ensure all components adapt to theme changes
- [ ] **Interactive States**: Test hover, focus, and active states in each theme
- [ ] **Mobile Experience**: Verify theme switching works on mobile devices
- [ ] **Theme Persistence**: Confirm theme preferences are saved and restored

### **Semantic Color Testing**
- [ ] **Text Hierarchy**: Verify content-base > secondary > tertiary visibility
- [ ] **Opacity Modifiers**: Test /90, /70, /50 opacity variants
- [ ] **Status Colors**: Ensure success, warning, error colors are distinguishable
- [ ] **Interactive Elements**: Verify primary, hover states work in all themes

### **Responsive Testing**
- [ ] **Desktop Sidebar**: Test content shifting when sidebar opens
- [ ] **Mobile Bottom Sheet**: Verify smooth slide-up animation
- [ ] **Navigation Toggle**: Test floating button positioning
- [ ] **Touch Interactions**: Verify thumb-friendly mobile experience

## 🚨 Error Handling Best Practices

### **API Error Handling**
- **Always return error responses** (don't throw for client errors)
- **Use consistent error format** with `success: false`
- **Provide helpful error messages** for debugging
- **Include status codes** for different error types

### **Component Error Boundaries**
- **Graceful Degradation**: Components should handle missing data
- **User Feedback**: Show meaningful error messages to users
- **Recovery Options**: Provide ways for users to retry failed actions
- **Debug Information**: Log errors for development debugging

## 🐛 Debugging Procedures

### **File Upload Debugging**
If file upload shows "error" status but server logs show success:

1. **Check API response format** matches store expectations
2. **Verify field names** are exact (`text` not `extractedText`)
3. **Ensure flat structure** (no nested objects)
4. **Test API directly** with curl or Postman
5. **Use browser dev tools** to inspect actual response

### **Common Debugging Commands**
```javascript
// In browser console after upload error:
const store = useResumeStore()
store.debugState() // Shows current store state

// Check network tab for actual API response format
// Compare with expected format in store interface
```

### **Theme Debugging**
- **Check semantic classes**: Ensure using `text-content-base` not `text-gray-900`
- **Verify theme switching**: Test all theme transitions for consistency
- **Inspect CSS variables**: Check if theme variables are updating correctly
- **Test responsive behavior**: Verify mobile/desktop theme switching

## 📊 Code Organization Standards

### **File Naming Conventions**
- **Components**: PascalCase (`ButtonPrimary.vue`)
- **Pages**: kebab-case (`ats-scanner.vue`)
- **Stores**: camelCase (`resumeStore.ts`)
- **Utilities**: camelCase (`themeUtils.ts`)

### **Import Organization**
```typescript
// 1. Vue/Nuxt imports
import { ref, computed } from 'vue'

// 2. Third-party libraries
import Papa from 'papaparse'

// 3. Internal stores
import { useResumeStore } from '~/stores/resume'

// 4. Internal components
import Button from '~/components/ui/Button.vue'

// 5. Types and interfaces
import type { FileUploadResponse } from '~/types'
```

### **Component Structure Standard**
```vue
<!-- 
  Component: ComponentName.vue
  Location: /components/[category]/ComponentName.vue
  Purpose: Brief description
-->
<template>
  <!-- Template with semantic theme classes -->
</template>

<script setup lang="ts">
// Imports
// Interfaces
// Props/Emits
// Store connections
// Component logic
</script>

<!-- 
  COMPONENT INFO:
  - Functionality: What it does
  - Dependencies: External dependencies
  - Store Connection: Which stores it uses
  - Usage: How to use it
-->
```

## 🎨 Styling Guidelines

### **Theme Class Requirements**
- **NEVER use direct colors**: Avoid `text-gray-900`, `bg-white`
- **ALWAYS use semantic classes**: Use `text-content-base`, `bg-surface`
- **Follow text hierarchy**: Primary > Secondary > Tertiary
- **Use opacity for subtlety**: `text-content-secondary/70`

### **TailwindCSS Class Order**
1. **Layout**: `flex`, `grid`, `block`
2. **Positioning**: `relative`, `absolute`, `top-4`
3. **Box Model**: `w-full`, `h-screen`, `max-w-lg`
4. **Spacing**: `p-4`, `m-2`, `space-y-4`
5. **Typography**: `text-lg`, `font-medium`
6. **Visual**: `bg-surface`, `border-border`, `rounded`
7. **Interactive**: `hover:bg-primary`, `transition-colors`

## 🔄 Development Workflow

### **Feature Development Process**
1. **Plan**: Review existing components and stores
2. **Design**: Plan theme integration and responsive behavior
3. **Build**: Implement with semantic theme classes
4. **Test**: Verify across all themes and devices
5. **Document**: Update component/page documentation
6. **Review**: Check code quality and performance

### **Git Workflow**
- **Feature branches**: Create branches for each feature
- **Descriptive commits**: Clear commit messages describing changes
- **Small commits**: Focused commits for easier review
- **Testing before merge**: Ensure all tests pass

## 📈 Performance Optimization

### **Theme Performance**
- **CSS Variables**: Use CSS custom properties for theme switching
- **Avoid Layout Shifts**: Ensure theme changes don't cause reflow
- **Efficient Selectors**: Use semantic classes for better performance
- **Caching**: Cache theme preferences in localStorage

### **Component Performance**
- **Lazy Loading**: Load components only when needed
- **Computed Properties**: Use computed for derived values
- **Event Handling**: Debounce expensive operations
- **Memory Management**: Clean up event listeners and watchers

## 📝 Documentation Standards

### **Code Documentation**
- **Component Purpose**: Clear description of component function