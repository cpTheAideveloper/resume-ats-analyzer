<!-- 
  📍 COMPONENT LOCATION: components/navbar/NavbarBottomSheet.vue
  🎯 PURPOSE: Mobile bottom sheet navigation
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
    <div 
      class="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-smooth"
      :class="[
        isOpen ? 'translate-y-0' : 'translate-y-full'
      ]"
    >
      <!-- Bottom Sheet Container -->
      <div class="bg-surface-secondary border-t border-border shadow-2xl rounded-t-2xl max-h-[85vh] flex flex-col">
        <!-- Handle Bar -->
        <div class="flex justify-center py-3">
          <div class="w-12 h-1 bg-border-accent rounded-full"></div>
        </div>
  
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pb-4 border-b border-border-secondary">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="heroicons:document-magnifying-glass" class="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-content-base">Menu</h2>
              <p class="text-sm text-content-tertiary">Navigation & Tools</p>
            </div>
          </div>
          
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="w-8 h-8 rounded-lg bg-surface-tertiary hover:bg-surface text-content-tertiary hover:text-content-secondary transition-colors duration-200 flex items-center justify-center"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
  
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <!-- Quick Actions -->
          <div>
            <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Quick Actions</h3>
            <div class="grid grid-cols-1 gap-2">
              <NavbarLink
                to="/"
                icon="heroicons:home"
                label="Home"
                description="Upload and analyze resumes"
                @click="$emit('navigate', '/')"
              />
              <NavbarLink
                to="/ats-scanner"
                icon="heroicons:document-magnifying-glass"
                label="ATS Scanner"
                description="Check ATS compatibility"
                @click="$emit('navigate', '/ats-scanner')"
              />
              <NavbarLink
                to="/job-comparison"
                icon="heroicons:clipboard-document-check"
                label="Job Matcher"
                description="Compare with job postings"
                @click="$emit('navigate', '/job-comparison')"
              />
            </div>
          </div>
  
          <!-- File Status (if file uploaded) -->
          <div v-if="resumeStore.isFileUploaded">
            <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Current File</h3>
            <div class="p-4 bg-surface-tertiary rounded-lg border border-border-secondary">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-8 h-8 bg-success-light rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:document-text" class="w-4 h-4 text-success" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-content-base truncate">
                    {{ resumeStore.resumeFile?.name }}
                  </p>
                  <p class="text-xs text-content-tertiary">
                    {{ resumeStore.wordCount }} words • Ready
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="$emit('navigate', '/ats-scanner')"
                  class="btn-secondary text-xs py-2"
                >
                  <Icon name="heroicons:magnifying-glass" class="w-3 h-3 mr-1" />
                  Analyze
                </button>
                <button
                  @click="clearFile"
                  class="text-xs py-2 px-3 bg-surface border border-border-secondary rounded-lg hover:bg-error-light hover:text-error hover:border-error transition-colors"
                >
                  <Icon name="heroicons:trash" class="w-3 h-3 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
  
          <!-- Theme Switcher -->
          <div>
            <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Theme</h3>
            <NavbarTheme />
          </div>
  
          <!-- Help & Support -->
          <div class="pb-6">
            <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Help & Support</h3>
            <div class="grid grid-cols-1 gap-2">
              <NavbarLink
                href="https://github.com/your-repo/resume-ats-analyzer"
                icon="heroicons:question-mark-circle"
                label="Documentation"
                description="Learn how to use the analyzer"
                external
              />
              <NavbarLink
                href="https://github.com/your-repo/resume-ats-analyzer/issues"
                icon="heroicons:bug-ant"
                label="Report Issue"
                description="Found a bug? Let us know"
                external
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface NavbarBottomSheetProps {
    isOpen: boolean
  }
  
  defineProps<NavbarBottomSheetProps>()
  
  // 🎬 EMITS
  defineEmits<{
    close: []
    navigate: [path: string]
  }>()
  
  // 🏪 STORE
  const resumeStore = useResumeStore()
  
  // 🎬 FUNCTIONS
  function clearFile() {
    resumeStore.clearFile()
  }
  </script>
  
  <!-- 
    🔗 HOW THIS MOBILE BOTTOM SHEET WORKS:
    
    📋 PURPOSE:
    - Mobile-optimized navigation experience
    - Slides up from bottom (natural mobile gesture)
    - Full-width design optimized for touch
    - Same content as desktop sidebar, different layout
    
    📱 MOBILE UX IMPROVEMENTS:
    - Bottom sheet is more natural on mobile than side drawer
    - Handle bar indicates it can be dragged (visual affordance)
    - Rounded top corners follow mobile design patterns
    - Large touch targets for easy interaction
    - Scrollable content with proper safe areas
    
    🎨 DESIGN FEATURES:
    - Rounded top corners (rounded-t-2xl)
    - Visual handle bar for drag indication
    - Maximum height of 85vh (doesn't cover entire screen)
    - Shadow and border for depth
    - Same semantic theme colors as desktop
    
    📊 RESPONSIVE BEHAVIOR:
    - Only shown on mobile devices (controlled by parent)
    - Slides in from bottom with smooth animation
    - Overlay backdrop dims background content
    - Content is scrollable if it exceeds screen height
    
    🎯 INTERACTION PATTERNS:
    - Tap backdrop to close
    - Tap X button to close
    - Navigate and auto-close (handled by parent)
    - Escape key support (handled by parent layout)
    
    🔄 CONTENT ORGANIZATION:
    - Same sections as desktop sidebar
    - Grid layout optimized for mobile
    - Consistent spacing and typography
    - Touch-friendly button sizes
    
    🎭 ANIMATIONS:
    - Slide up/down with transform translate
    - Smooth 300ms duration with ease-smooth timing
    - Backdrop fade in/out
    - Button hover effects
  -->