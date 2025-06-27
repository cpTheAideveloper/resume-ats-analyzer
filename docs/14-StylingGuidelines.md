# Styling Guidelines for AI Assistance

## ⚠️ CRITICAL RULES FOR AI STYLING ASSISTANCE

### **🚫 FORBIDDEN ACTIONS**
- **NEVER modify core application logic**
- **NEVER add new functionality or features**
- **NEVER change component props or emit interfaces**
- **NEVER modify store connections or state management**
- **NEVER add new dependencies or imports**
- **NEVER change API endpoints or data flow**

### **✅ ALLOWED ACTIONS**
- **ONLY modify TailwindCSS classes**
- **ONLY update semantic theme colors**
- **ONLY adjust spacing, typography, and visual styling**
- **ONLY improve responsive design within existing structure**

---

## 🎨 Styling-Only Modifications

### **Safe Style Changes**

#### **Typography Adjustments**
```vue
<!-- ✅ ALLOWED: Change text sizing and hierarchy -->
<h1 class="text-hero text-content-base mb-4">
  <!-- Can change to: text-4xl, text-5xl, text-6xl -->
  <!-- Can change: mb-4 to mb-6, mb-8, etc. -->
</h1>

<!-- ✅ ALLOWED: Adjust text opacity and weight -->
<p class="text-content-secondary/70 font-medium">
  <!-- Can change: /70 to /80, /60, /50 -->
  <!-- Can change: font-medium to font-normal, font-semibold -->
</p>
```

#### **Spacing and Layout**
```vue
<!-- ✅ ALLOWED: Modify spacing classes -->
<div class="container-section space-y-8">
  <!-- Can change: space-y-8 to space-y-6, space-y-12 -->
  <!-- Can change: p-4 to p-6, p-8 -->
  <!-- Can change: gap-4 to gap-6, gap-8 -->
</div>

<!-- ✅ ALLOWED: Adjust responsive breakpoints -->
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <!-- Can change: md:grid-cols-2 to md:grid-cols-1 -->
  <!-- Can change: gap-6 to gap-4, gap-8 -->
</div>
```

#### **Visual Enhancements**
```vue
<!-- ✅ ALLOWED: Modify visual styling -->
<div class="bg-surface-secondary rounded-lg shadow-sm">
  <!-- Can change: rounded-lg to rounded-xl, rounded-md -->
  <!-- Can change: shadow-sm to shadow-md, shadow-lg -->
  <!-- Can change: bg-surface-secondary to bg-surface-tertiary -->
</div>

<!-- ✅ ALLOWED: Adjust borders and effects -->
<button class="border-border hover:border-primary transition-colors">
  <!-- Can change: transition-colors to transition-all -->
  <!-- Can change: border thickness, hover states -->
</button>
```

### **Theme Color Adjustments**
```vue
<!-- ✅ ALLOWED: Change semantic theme colors -->
<div class="text-content-base bg-surface border-border">
  <!-- Can change: text-content-base to text-content-secondary -->
  <!-- Can change: bg-surface to bg-surface-secondary -->
  <!-- Can change: border-border to border-border-accent -->
</div>

<!-- ✅ ALLOWED: Adjust status colors -->
<span class="bg-success text-success-content">
  <!-- Can change: bg-success to bg-warning, bg-error -->
  <!-- Must maintain: text-success-content pairing -->
</span>
```

---

## 🚫 FORBIDDEN MODIFICATIONS

### **Never Touch These Elements**

#### **Component Logic**
```vue
<!-- 🚫 NEVER MODIFY: Script setup logic -->
<script setup lang="ts">
// DON'T TOUCH: Store connections
const resumeStore = useResumeStore()

// DON'T TOUCH: Computed properties
const isFileUploaded = computed(() => resumeStore.isFileUploaded)

// DON'T TOUCH: Methods and functions
const handleFileUpload = async (file: File) => {
  await resumeStore.uploadFile(file)
}
</script>
```

#### **Component Structure**
```vue
<!-- 🚫 NEVER MODIFY: Template structure -->
<template>
  <!-- DON'T TOUCH: Conditional rendering logic -->
  <div v-if="!resumeStore.isFileUploaded">
    <UploadPrompt />
  </div>
  
  <!-- DON'T TOUCH: Component props or events -->
  <Button @click="startAnalysis" :disabled="!canAnalyze">
    Analyze
  </Button>
  
  <!-- DON'T TOUCH: v-for loops or data binding -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

#### **Store Integration**
```vue
<!-- 🚫 NEVER MODIFY: Store usage -->
<script setup lang="ts">
// DON'T TOUCH: Store imports
import { useResumeStore } from '~/stores/resume'

// DON'T TOUCH: Store method calls
const uploadFile = async () => {
  await resumeStore.uploadFile(file)
}
</script>
```

---

## 📋 Style Modification Checklist

### **Before Making Changes**
- [ ] **Identify styling target**: Only TailwindCSS classes
- [ ] **Verify no logic changes**: Ensure no functional modifications
- [ ] **Check semantic colors**: Use only theme-appropriate colors
- [ ] **Maintain component structure**: Don't add/remove elements

### **During Styling**
- [ ] **Use semantic classes only**: No direct color classes
- [ ] **Maintain responsive design**: Test mobile and desktop
- [ ] **Preserve accessibility**: Keep contrast and focus states
- [ ] **Follow class order**: Layout → Spacing → Typography → Visual → Interactive

### **After Changes**
- [ ] **Test all themes**: Verify styling across light, dark, ocean, forest, sunset
- [ ] **Check responsiveness**: Test desktop sidebar and mobile bottom sheet
- [ ] **Verify functionality**: Ensure no logic was affected
- [ ] **Review semantic hierarchy**: Maintain text content hierarchy

---

## 🎯 Common Styling Tasks

### **Improving Visual Hierarchy**
```vue
<!-- Enhance text hierarchy with better sizing and spacing -->
<h1 class="text-4xl font-bold text-content-base mb-6">
<h2 class="text-2xl font-semibold text-content-base mb-4">
<p class="text-lg text-content-secondary mb-4">
<span class="text-sm text-content-tertiary">
```

### **Better Spacing and Layout**
```vue
<!-- Improve component spacing and organization -->
<div class="container-section space-y-12">
  <section class="space-y-6">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Cards with consistent spacing -->
      <div class="bg-surface-secondary rounded-xl p-6 shadow-sm">
```

### **Enhanced Interactive States**
```vue
<!-- Better hover and focus states -->
<button class="
  bg-primary text-primary-content
  hover:bg-primary-hover
  focus:outline-none focus:ring-2 focus:ring-primary/50
  transition-all duration-200
  rounded-lg px-6 py-3
">
```

### **Responsive Improvements**
```vue
<!-- Better mobile and desktop layouts -->
<div class="
  flex flex-col space-y-4
  md:flex-row md:space-y-0 md:space-x-6
  lg:space-x-8
">
```

---

## ⚡ Quick Style Reference

### **Semantic Color Classes**
- **Text**: `text-content-base`, `text-content-secondary`, `text-content-tertiary`
- **Backgrounds**: `bg-surface`, `bg-surface-secondary`, `bg-surface-tertiary`
- **Borders**: `border-border`, `border-border-secondary`, `border-border-accent`
- **Status**: `bg-success`, `bg-warning`, `bg-error` (with matching content colors)

### **Safe Spacing Classes**
- **Padding**: `p-4`, `p-6`, `p-8`, `px-4`, `py-6`
- **Margin**: `m-4`, `mb-6`, `mt-8`, `mx-auto`
- **Space Between**: `space-y-4`, `space-y-6`, `space-x-4`
- **Gap**: `gap-4`, `gap-6`, `gap-8`

### **Typography Classes**
- **Size**: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- **Weight**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Line Height**: `leading-tight`, `leading-normal`, `leading-relaxed`

### **Visual Enhancement Classes**
- **Borders**: `border`, `border-2`, `rounded`, `rounded-lg`, `rounded-xl`
- **Shadows**: `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`
- **Transitions**: `transition-colors`, `transition-all`, `duration-200`

---

## 🔒 Final Reminders

### **Golden Rules**
1. **ONLY modify TailwindCSS classes**
2. **NEVER change component logic or structure**
3. **ALWAYS use semantic theme colors**
4. **MAINTAIN responsive design patterns**
5. **TEST across all themes after changes**

### **When in Doubt**
- **If it's not a TailwindCSS class change → DON'T DO IT**
- **If it affects functionality → DON'T DO IT**
- **If it adds new features → DON'T DO IT**
- **If it changes component props/events → DON'T DO IT**