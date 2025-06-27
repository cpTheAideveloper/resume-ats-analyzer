# Theme System

## 🎨 Advanced Theme System - TailwindCSS 4.0

### CSS-First Theme Configuration

Our theme system uses TailwindCSS 4.0's revolutionary CSS-first approach with the `@theme` directive, eliminating JavaScript configuration files and enabling semantic color naming.

## **Core Theme Structure**

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

## **Semantic Text Usage Patterns**

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

## **Multi-Theme Support**

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

## **Custom Utilities for Consistent Design**

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

## Theme Usage Guidelines

### **Text Hierarchy**
- `text-content-base` - Primary headings, important content
- `text-content-secondary` - Body text, descriptions
- `text-content-tertiary` - Captions, metadata, labels
- `text-content-muted` - Placeholder text, disabled content
- `text-content-inverse` - Text on dark/colored backgrounds

### **Opacity Modifiers for Subtle Text**
- `text-content-base/90` - Slightly reduced primary text
- `text-content-base/70` - Noticeably reduced primary text
- `text-content-secondary/70` - Subtle secondary text
- `text-content-secondary/50` - Very subtle secondary text

### **Surface and Border Consistency**
- `bg-surface` - Main background color
- `bg-surface-secondary` - Card backgrounds, sidebars
- `bg-surface-tertiary` - Input fields, code blocks
- `border-border` - Default border color
- `border-border-secondary` - Subtle borders
- `border-border-accent` - Emphasized borders

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