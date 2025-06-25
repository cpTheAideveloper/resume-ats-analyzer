<!-- 
  📍 COMPONENT LOCATION: components/navbar/NavbarSidebar.vue
  🎯 PURPOSE: Main sidebar content with navigation and tools
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
    <aside 
      class="fixed top-0 right-0 h-full bg-surface-secondary border-l border-border z-50 transform transition-transform duration-300 ease-smooth shadow-xl"
      :class="[
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'w-80 lg:w-96'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-6 border-b border-border-secondary">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="heroicons:document-magnifying-glass" class="w-5 h-5 text-primary-content" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-content-base">ATS Analyzer</h2>
            <p class="text-sm text-content-tertiary">Resume Tools</p>
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
  
      <!-- Sidebar Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Quick Actions -->
        <div>
          <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Quick Actions</h3>
          <div class="space-y-2">
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
  
        <!-- Theme Switcher -->
        <div>
          <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Theme</h3>
          <NavbarTheme />
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
  
        <!-- Help & Support -->
        <div>
          <h3 class="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">Help & Support</h3>
          <div class="space-y-2">
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
  
      <!-- Sidebar Footer -->
      <div class="p-6 border-t border-border-secondary bg-surface-accent">
        <div class="text-center">
          <p class="text-xs text-content-tertiary">
            Made with ❤️ for job seekers
          </p>
          <p class="text-xs text-content-muted mt-1">
            Version 1.0.0 • Open Source
          </p>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface NavbarSidebarProps {
    isOpen: boolean
  }
  
  defineProps<NavbarSidebarProps>()
  
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
    📍 COMPONENT LOCATION: components/navbar/NavbarSidebar.vue
    🎯 PURPOSE: Main sidebar content - organized navigation component
    
    📂 NAVBAR COMPONENT STRUCTURE:
    components/navbar/
    ├── NavbarSidebar.vue     ← This file (main sidebar content)
    ├── NavbarToggle.vue      ← Floating toggle button
    ├── NavbarLink.vue        ← Individual navigation links  
    └── NavbarTheme.vue       ← Theme switcher
    
    🎯 WHY NO PINIA STORE:
    - Simple UI state doesn't need global state management
    - Sidebar open/close is temporary, component-specific state
    - Props and events provide clean, predictable communication
    - Easier to test and debug without store complexity
    - Follows KISS principle (Keep It Simple, Stupid)
    
    📊 COMPONENT COMMUNICATION:
    - Props: Receives isOpen state from parent layout
    - Events: Emits 'close' and 'navigate' events to parent
    - Clean separation: UI state in layout, business logic in stores
  -->