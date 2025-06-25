<!-- 
  📍 COMPONENT LOCATION: components/resume/ResumeUploader.vue
  🎯 PURPOSE: Attractive animated file upload interface for resumes
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
  <div class="flex flex-col w-full max-w-lg mx-auto space-y-4 h-full">
    <!-- Main Upload Area - Enhanced with semantic theme system -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @click="triggerFileInput"
      class="relative flex flex-col items-center justify-center w-full p-12 text-center border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden group"
      :class="uploadAreaClasses"
      style="min-height: 280px;"
    >
      <!-- Animated Background Gradient -->
      <div 
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        :class="{
          'opacity-100': isDragging || isUploading,
          'opacity-0': !isDragging && !isUploading
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-primary-light via-surface-secondary to-accent-light animate-gradient"></div>
      </div>

      <!-- Floating particles animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="i in 6" 
          :key="i"
          class="absolute w-2 h-2 bg-primary rounded-full opacity-30 animate-float"
          :style="{ 
            left: `${15 + (i * 12)}%`, 
            top: `${20 + (i * 8)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i * 0.5)}s`
          }"
        ></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6">
        <!-- Animated Icon Container -->
        <div class="relative">
          <!-- Pulsing background circle -->
          <div 
            class="absolute inset-0 rounded-full animate-ping"
            :class="{
              'bg-primary-light': resumeStore.uploadStatus === 'idle',
              'bg-success-light': resumeStore.uploadStatus === 'success',
              'bg-error-light': resumeStore.uploadStatus === 'error'
            }"
            style="animation-duration: 2s;"
          ></div>
          
          <!-- Icon with enhanced animations -->
          <div 
            class="relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform"
            :class="{
              'bg-primary-light scale-110': isDragging,
              'bg-success-light': resumeStore.uploadStatus === 'success',
              'bg-error-light': resumeStore.uploadStatus === 'error',
              'bg-surface-tertiary group-hover:bg-primary-light group-hover:scale-105': resumeStore.uploadStatus === 'idle'
            }"
          >
            <!-- Status Icon with animations -->
            <Icon 
              :name="statusIcon" 
              class="transition-all duration-300"
              :class="iconClasses"
            />
          </div>
        </div>
        
        <!-- Animated Text Content -->
        <div class="space-y-4">
          <div class="space-y-2">
            <h3 
              class="text-2xl font-bold transition-all duration-300"
              :class="textClasses"
            >
              {{ statusTitle }}
            </h3>
            <p 
              class="text-lg transition-all duration-300"
              :class="subtitleClasses"
            >
              {{ statusSubtitle }}
            </p>
          </div>
          
          <!-- File type info with icons -->
          <div class="flex items-center justify-center space-x-4 text-sm text-content-secondary">
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:document-text" class="w-4 h-4 text-error" />
              <span>PDF</span>
            </div>
            <div class="w-1 h-1 bg-border rounded-full"></div>
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:document" class="w-4 h-4 text-primary" />
              <span>DOCX</span>
            </div>
            <div class="w-1 h-1 bg-border rounded-full"></div>
            <span>Max 10MB</span>
          </div>
        </div>

        <!-- Drag & Drop Visual Indicator -->
        <div 
          class="flex items-center space-x-2 text-content-tertiary transition-all duration-300"
          :class="{
            'text-primary scale-105': isDragging,
            'group-hover:text-content-secondary': !isDragging
          }"
        >
          <Icon name="heroicons:cursor-arrow-rays" class="w-5 h-5 animate-bounce" />
          <span class="font-medium">{{ dragText }}</span>
          <Icon name="heroicons:cursor-arrow-rays" class="w-5 h-5 animate-bounce" style="animation-delay: 0.1s;" />
        </div>
      </div>

      <!-- Upload Progress Ring -->
      <div 
        v-if="resumeStore.uploadStatus === 'uploading'" 
        class="absolute inset-6"
      >
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="2"
            fill="transparent"
            class="text-border-secondary"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="3"
            fill="transparent"
            stroke-linecap="round"
            class="text-primary transition-all duration-300"
            :stroke-dasharray="`${2 * Math.PI * 45}`"
            :stroke-dashoffset="`${2 * Math.PI * 45 * (1 - resumeStore.uploadProgress / 100)}`"
          />
        </svg>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept=".pdf,.docx"
      @change="handleFileSelect"
      class="hidden"
      :disabled="isUploading"
    />

    <!-- Upload Progress Bar (Alternative) -->
    <div v-if="resumeStore.uploadStatus === 'uploading'" class="w-full">
      <div class="flex items-center justify-between text-base text-content-base mb-3 font-medium">
        <span>Uploading your resume...</span>
        <span class="text-primary">{{ resumeStore.uploadProgress }}%</span>
      </div>
      <div class="w-full bg-surface-tertiary rounded-full h-3 overflow-hidden border border-border-secondary">
        <div 
          class="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-300 relative"
          :style="{ width: `${resumeStore.uploadProgress}%` }"
        >
          <!-- Shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>

    <!-- Validation Errors -->
    <div v-if="validationErrors.length > 0" class="space-y-3">
      <div 
        v-for="error in validationErrors" 
        :key="error"
        class="flex items-start space-x-3 p-4 bg-error-light border-l-4 border-error rounded-r-xl animate-fade-in-up"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-error mt-0.5 flex-shrink-0 animate-pulse" />
        <p class="text-base text-error-dark font-medium">{{ error }}</p>
      </div>
    </div>

    <!-- Upload Error with Retry -->
    <div v-if="resumeStore.uploadError" class="space-y-3">
      <div class="flex items-start space-x-3 p-4 bg-error-light border-l-4 border-error rounded-r-xl animate-fade-in-up">
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <p class="text-base text-error-dark font-medium">{{ resumeStore.uploadError }}</p>
          <button 
            @click="retryUpload"
            class="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-error-dark bg-error-light rounded-lg hover:bg-error-light/80 transition-colors border border-error/20"
          >
            <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
            Try again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validateResumeFile } from '~/utils/fileValidator'

// 🏪 PINIA STORE CONNECTION
const resumeStore = useResumeStore()

// 📱 LOCAL STATE
const fileInput = ref<HTMLInputElement>()
const validationErrors = ref<string[]>([])
const isDragging = ref(false)
const dragCounter = ref(0) // Track drag events properly

// 🔍 COMPUTED PROPERTIES
const isUploading = computed(() => 
  resumeStore.uploadStatus === 'uploading' || resumeStore.uploadStatus === 'processing'
)

const uploadAreaClasses = computed(() => ({
  // Base styles using semantic theme variables
  'border-border bg-surface-secondary': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  
  // Dragging state
  'border-primary bg-primary-light scale-[1.02] shadow-lg border-solid': isDragging.value,
  
  // Uploading state
  'border-primary bg-primary-light/80 border-solid': isUploading.value,
  
  // Success state
  'border-success bg-success-light border-solid': resumeStore.uploadStatus === 'success',
  
  // Error state
  'border-error bg-error-light border-solid': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0,
  
  // Hover state
  'hover:border-border-accent hover:bg-surface-tertiary hover:scale-[1.01] hover:shadow-md': 
    resumeStore.uploadStatus === 'idle' && !isDragging.value && !isUploading.value
}))

const statusIcon = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
    case 'processing':
      return 'heroicons:arrow-path'
    case 'success':
      return 'heroicons:check-circle'
    case 'error':
      return 'heroicons:exclamation-triangle'
    default:
      return isDragging.value ? 'heroicons:document-plus' : 'heroicons:cloud-arrow-up'
  }
})

const iconClasses = computed(() => ({
  'w-10 h-10': true,
  'text-content-secondary group-hover:text-primary': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-primary animate-spin': isUploading.value,
  'text-success animate-bounce': resumeStore.uploadStatus === 'success',
  'text-error animate-pulse': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0,
  'text-primary animate-pulse': isDragging.value
}))

const textClasses = computed(() => ({
  'text-content-base group-hover:text-content-base': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-primary-dark': isUploading.value || isDragging.value,
  'text-success-dark': resumeStore.uploadStatus === 'success',
  'text-error-dark': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0
}))

const subtitleClasses = computed(() => ({
  'text-content-secondary group-hover:text-content-base': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-primary': isUploading.value || isDragging.value,
  'text-success': resumeStore.uploadStatus === 'success',
  'text-error': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0
}))

const statusTitle = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
      return 'Uploading Resume...'
    case 'processing':
      return 'Processing Document...'
    case 'success':
      return 'Upload Successful!'
    case 'error':
      return 'Upload Failed'
    default:
      return isDragging.value ? 'Drop Your Resume' : 'Upload Your Resume'
  }
})

const statusSubtitle = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
      return 'Please wait while we upload your file'
    case 'processing':
      return 'Extracting text from your document'
    case 'success':
      return 'Your resume is ready for analysis'
    case 'error':
      return 'Click to try again'
    default:
      return isDragging.value ? 'Release to upload your file' : 'Click here or drag and drop your resume'
  }
})

const dragText = computed(() => {
  if (isDragging.value) return 'Drop it here!'
  if (isUploading.value) return 'Processing...'
  return 'Drag & Drop or Click'
})

// 🎬 FUNCTIONS
function triggerFileInput() {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  dragCounter.value++
  isDragging.value = true
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  dragCounter.value = 0
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0] && !isUploading.value) {
    processFile(event.dataTransfer.files[0])
  }
}

async function processFile(file: File) {
  // Clear previous errors
  validationErrors.value = []
  
  // Validate file
  const validation = validateResumeFile(file, {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    strictTypeChecking: true
  })
  
  if (!validation.isValid) {
    validationErrors.value = validation.errors
    return
  }
  
  // Upload via store
  await resumeStore.uploadFile(file)
}

async function retryUpload() {
  validationErrors.value = []
  await resumeStore.retryUpload()
}
</script>

<!-- 
  🔗 HOW THIS COMPONENT WORKS:
  
  📋 PURPOSE:
  - Highly attractive and animated file upload interface
  - Multiple visual states with smooth transitions using semantic theme colors
  - Enhanced user feedback with animations and progress indicators
  - Larger, more engaging drop zone with theme-aware styling
  
  📊 STATE MANAGEMENT:
  - Uses useResumeStore() for file processing and status
  - Local state for drag interactions and validation
  - Proper drag event handling with counter
  
  🔌 CONNECTIONS:
  - stores/resume.ts: File upload and status management
  - utils/fileValidator.ts: File validation logic
  - server/api/upload.post.ts: Backend processing
  
  🎨 SEMANTIC THEME COLORS USED:
  
  CONTENT COLORS (Text Hierarchy):
  - text-content-base: Main headings and status titles
  - text-content-secondary: File type info, drag hints
  - text-content-tertiary: Supporting text, drag indicators
  - group-hover:text-content-base: Hover state text transitions
  
  SURFACE COLORS (Backgrounds):
  - bg-surface-secondary: Default upload area background
  - bg-surface-tertiary: Icon background, progress bar background
  - via-surface-secondary: Gradient background overlay
  
  BORDER COLORS:
  - border-border: Default upload area border
  - border-border-accent: Hover state borders
  - border-border-secondary: Progress bar and subtle borders
  
  STATUS COLORS:
  - bg-primary-light + text-primary: Upload/processing states
  - bg-success-light + text-success: Success states
  - bg-error-light + text-error: Error states
  - text-primary-dark, text-success-dark, text-error-dark: High contrast text
  
  INTERACTIVE COLORS:
  - text-primary: Active dragging, processing states
  - border-primary: Active upload area border
  - hover:bg-surface-tertiary: Hover state backgrounds
  
  📱 ENHANCED SEMANTIC FEATURES:
  - Content hierarchy using semantic text colors (base > secondary > tertiary)
  - Surface backgrounds that adapt to any theme automatically
  - Status indicators using proper semantic status colors
  - Interactive elements with theme-aware hover states
  - Progress indicators using semantic primary colors
  - Error states with semantic error color system
  - Gradient overlays using semantic surface and primary colors
  
  🎯 ANIMATIONS & EFFECTS:
  - Floating particles with semantic primary color
  - Gradient background transitions using semantic surface colors
  - Pulsing icon backgrounds with semantic status colors
  - Progress ring with semantic primary color
  - Shimmer effect on progress bar
  - Scale and shadow transitions on hover/drag
  - Color transitions based on status using semantic variables
  
  🎯 THEME ADAPTATION:
  - All colors automatically adapt when theme changes
  - Dark theme: Light text on dark surfaces with proper contrast
  - Branded themes: Primary colors change while maintaining hierarchy
  - Status colors remain semantically correct in all themes
  - Hover states maintain proper contrast across themes
  
  🎯 INTERACTION STATES:
  - Idle: Subtle hover effects using semantic surface colors
  - Dragging: Scale up, semantic primary colors, animated feedback
  - Uploading: Progress ring, shimmer effects, semantic status colors
  - Success: Semantic success colors with celebration animations
  - Error: Semantic error colors with retry functionality
  
  🚫 WHAT IT DOESN'T DO:
  - Handle file analysis (that's for analysis components)
  - Store files permanently (temporary upload only)
  - Handle multiple file uploads
  - Perform theme switching (handled by parent/layout)
  - Use any hardcoded color classes (all colors are semantic)
  
  📋 TYPICAL USAGE PATTERN:
  <ResumeUploader v-if="!resumeStore.isFileUploaded" />
  <ResumePreview v-else />
  
  🎯 SEMANTIC COLOR BENEFITS:
  - Consistent visual hierarchy across all themes
  - Automatic color adaptation when switching themes
  - Self-documenting code with semantic color names
  - Easy maintenance and extension
  - Accessible contrast ratios maintained
  - No more hardcoded gray-*, blue-*, or green-* classes
  - Status colors that make semantic sense
  - Surface colors that adapt to theme context
-->