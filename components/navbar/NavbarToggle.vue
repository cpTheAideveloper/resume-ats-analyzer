<!-- 
  📍 COMPONENT LOCATION: components/navbar/NavbarToggle.vue
  🎯 PURPOSE: Floating toggle button - responsive positioning
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
    <button
      @click="$emit('toggle')"
      class="fixed z-30 w-12 h-12 bg-primary hover:bg-primary-hover text-primary-content rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      :class="[
        // Responsive positioning
        isMobile ? 'bottom-6 right-6' : 'top-6 right-6',
        // Visibility
        isSidebarOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      ]"
      aria-label="Open navigation menu"
    >
      <Icon 
        name="heroicons:bars-3" 
        class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
      />
    </button>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface NavbarToggleProps {
    isSidebarOpen: boolean
    isMobile: boolean
  }
  
  defineProps<NavbarToggleProps>()
  
  // 🎬 EMITS
  defineEmits<{
    toggle: []
  }>()
  </script>
  
  <!-- 
    📍 RESPONSIVE POSITIONING:
    - Mobile: bottom-6 right-6 (bottom-right corner, above bottom sheet)
    - Desktop: top-6 right-6 (top-right corner, near sidebar)
    
    🎯 MOBILE UX IMPROVEMENT:
    - Bottom positioning is more thumb-friendly
    - Doesn't interfere with status bar
    - Natural position for bottom sheet trigger
  -->