<!-- 
  📍 FILE LOCATION: app.vue (root of your project)
  🎯 PURPOSE: Main app entry point that enables layouts
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
  <div>
    <!-- This enables all layouts in your app -->
    <NuxtLayout>
      <!-- This is where your pages will be rendered -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 🎨 Global app setup and theme initialization
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// 🎨 Initialize theme on app load
onMounted(() => {
  // Load saved theme or use system preference
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme && savedTheme !== 'system') {
    document.documentElement.setAttribute('data-theme', savedTheme)
  } else {
    // Use system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', systemTheme)
  }
})
</script>

<!-- 
  🔗 HOW THIS FIXES THE LAYOUT ERROR:
  
  📋 THE PROBLEM:
  - Nuxt 3 found layout files (layouts/default.vue)
  - But no <NuxtLayout> component was used to enable them
  - This causes the warning and prevents layouts from working
  
  ✅ THE SOLUTION:
  - app.vue must include <NuxtLayout> to enable layouts
  - <NuxtPage> renders the actual page content
  - Layouts wrap around the page content automatically
  
  📂 CORRECT FILE STRUCTURE:
  app.vue                    ← This file (enables layouts)
  layouts/default.vue        ← Your sidebar layout
  pages/index.vue           ← Gets wrapped by default layout
  pages/ats-scanner.vue     ← Gets wrapped by default layout
  
  🎯 HOW IT WORKS:
  1. User visits /ats-scanner
  2. Nuxt loads pages/ats-scanner.vue
  3. <NuxtLayout> wraps it with layouts/default.vue
  4. Your sidebar layout surrounds the page content
  5. Page content appears in the <slot /> of the layout
  
  🎨 THEME INITIALIZATION:
  - Loads saved theme from localStorage
  - Falls back to system preference
  - Sets data-theme attribute for CSS
  
  🚫 COMMON MISTAKES:
  ❌ Missing app.vue entirely
  ❌ app.vue without <NuxtLayout>
  ❌ Using <NuxtLayout> inside pages (should be in app.vue)
  ❌ Not using <NuxtPage> (pages won't render)
-->