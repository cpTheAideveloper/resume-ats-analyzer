<!-- 
  📍 COMPONENT LOCATION: layouts/default.vue
  🎯 PURPOSE: Main layout with sidebar (without VueUse dependency)
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
  <div class="min-h-screen bg-surface transition-all duration-300 ease-smooth">
    <!-- Mobile Bottom Sheet Overlay -->
    <div 
      v-if="isSidebarOpen && isMobile" 
      @click="closeSidebar"
      class="fixed inset-0 bg-content-base/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
    ></div>

    <!-- Desktop Sidebar -->
    <NavbarSidebar 
      v-if="!isMobile"
      :is-open="isSidebarOpen"
      @close="closeSidebar"
      @navigate="handleSidebarNavigation"
    />

    <!-- Mobile Bottom Sheet -->
    <NavbarBottomSheet
      v-if="isMobile"
      :is-open="isSidebarOpen"
      @close="closeSidebar"
      @navigate="handleSidebarNavigation"
    />

    <!-- Floating Sidebar Toggle Button -->
    <NavbarToggle 
      :is-sidebar-open="isSidebarOpen"
      :is-mobile="isMobile"
      @toggle="toggleSidebar"
    />

    <!-- Main Content Area -->
    <main 
      class="min-h-screen transition-all duration-300 ease-smooth"
      :class="[
        // Only push content on desktop when sidebar is open
        !isMobile && isSidebarOpen ? 'lg:mr-96' : 'mr-0'
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// 📱 LOCAL STATE (no external dependencies)
const isSidebarOpen = ref(false)
const windowWidth = ref(1024) // Default to desktop size

// 📱 RESPONSIVE DETECTION (manual implementation)
const isMobile = computed(() => windowWidth.value < 1024)

// 🎬 FUNCTIONS
function closeSidebar() {
  isSidebarOpen.value = false
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function handleSidebarNavigation(path: string) {
  navigateTo(path)
  // Close sidebar on mobile after navigation
  if (isMobile.value) {
    closeSidebar()
  }
}

// 📱 WINDOW RESIZE HANDLER
function updateWindowSize() {
  windowWidth.value = window.innerWidth
}

// 🔄 LIFECYCLE
onMounted(() => {
  // Set initial window size
  windowWidth.value = window.innerWidth
  
  // Listen for window resize
  window.addEventListener('resize', updateWindowSize)
  
  // Close sidebar on route change (mobile)
  watch(() => useRoute().path, () => {
    if (isMobile.value) {
      closeSidebar()
    }
  })
  
  // Handle escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSidebarOpen.value) {
      closeSidebar()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<!-- 
  🔗 HOW THIS FIXED LAYOUT WORKS:
  
  📋 FIXES APPLIED:
  - Removed useWindowSize dependency (was causing the error)
  - Implemented manual window size tracking
  - Added proper SSR safety with onMounted
  - Maintained all original functionality
  
  📱 RESPONSIVE DETECTION:
  - Uses manual window.innerWidth instead of VueUse
  - Updates on window resize events
  - Safe for server-side rendering
  
  🎯 FEATURES PRESERVED:
  - Sidebar slides in from right
  - Content shifts left on desktop when open
  - Mobile overlay behavior
  - Keyboard shortcuts (Escape)
  - Route change handling
  - Theme integration
  
  📊 STATE MANAGEMENT:
  - Local reactive state for sidebar open/close
  - Manual window width tracking
  - Clean component communication via props/events
  
  🚫 NO EXTERNAL DEPENDENCIES:
  - No VueUse required
  - Pure Vue 3 Composition API
  - Works out of the box with Nuxt 3
-->