<!-- 
  📍 COMPONENT LOCATION: components/resume/ResumePreview.vue
  🎯 PURPOSE: Display uploaded resume information and actions
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
  <div v-if="resumeStore.isFileUploaded" class="w-full max-w-md mx-auto">
    <!-- File Info Card -->
    <div class="card-base card-padding">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center space-x-3">
          <!-- File Type Icon -->
          <div class="flex items-center justify-center w-10 h-10 bg-success-light rounded-lg">
            <Icon 
              :name="fileTypeIcon" 
              class="w-5 h-5 text-success" 
            />
          </div>
          
          <!-- File Details -->
          <div class="flex flex-col">
            <p class="text-sm font-medium text-content-base">
              {{ resumeStore.resumeFile?.name }}
            </p>
            <div class="flex items-center space-x-2 text-xs text-content-secondary">
              <span>{{ fileTypeDescription }}</span>
              <span>•</span>
              <span>{{ formattedFileSize }}</span>
              <span v-if="resumeStore.isTextExtracted">•</span>
              <span v-if="resumeStore.isTextExtracted" class="text-content-tertiary">
                {{ resumeStore.wordCount }} words
              </span>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <!-- Replace File Button -->
          <button
            @click="replaceFile"
            class="flex items-center justify-center w-8 h-8 text-content-tertiary rounded-lg hover:text-content-secondary hover:bg-surface-secondary transition-colors duration-200"
            title="Replace file"
          >
            <Icon name="heroicons:arrow-path" class="w-4 h-4" />
          </button>
          
          <!-- Remove File Button -->
          <button
            @click="clearFile"
            class="flex items-center justify-center w-8 h-8 text-content-tertiary rounded-lg hover:text-error hover:bg-error-light transition-colors duration-200"
            title="Remove file"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Processing Status -->
    <div v-if="resumeStore.uploadStatus === 'processing'" class="mt-3 p-3 bg-primary-light border border-primary rounded-lg animate-fade-in">
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:cog-6-tooth" class="w-4 h-4 text-primary animate-spin" />
        <p class="text-sm text-primary-dark font-medium">Processing document...</p>
      </div>
    </div>
    
    <!-- Success Status with Stats -->
    <div v-if="resumeStore.uploadStatus === 'success' && resumeStore.isTextExtracted" class="mt-3 p-3 bg-success-light border border-success rounded-lg animate-fade-in">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:check-circle" class="w-4 h-4 text-success" />
          <p class="text-sm text-success-dark font-medium">Ready for analysis</p>
        </div>
        
        <!-- Quick Stats -->
        <div class="flex items-center space-x-4 text-xs text-success-dark/80">
          <span>{{ resumeStore.wordCount }} words</span>
          <span>{{ resumeStore.charCount }} chars</span>
        </div>
      </div>
    </div>
    
    <!-- Error Status -->
    <div v-if="resumeStore.uploadStatus === 'error'" class="mt-3 p-3 bg-error-light border border-error rounded-lg animate-fade-in">
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-error" />
        <p class="text-sm text-error-dark font-medium">
          {{ resumeStore.uploadError || 'Upload failed. Please try again.' }}
        </p>
      </div>
    </div>
    
    <!-- Text Preview (Optional) -->
    <div v-if="showPreview && resumeStore.isTextExtracted" class="mt-3">
      <button 
        @click="togglePreview"
        class="flex items-center space-x-2 text-sm text-content-secondary hover:text-content-base transition-colors duration-200 group"
      >
        <Icon 
          :name="previewExpanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
          class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
        />
        <span>{{ previewExpanded ? 'Hide' : 'Show' }} text preview</span>
      </button>
      
      <div 
        v-if="previewExpanded" 
        class="mt-2 p-3 bg-surface-secondary border border-border-secondary rounded-lg animate-fade-in-down"
      >
        <p class="text-xs text-content-secondary/80 leading-relaxed font-mono">
          {{ textPreview }}
        </p>
      </div>
    </div>
    
    <!-- Analysis Actions -->
    <div v-if="resumeStore.uploadStatus === 'success' && resumeStore.isTextExtracted" class="mt-4 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <!-- ATS Analysis Button -->
        <button
          @click="startATSAnalysis"
          class="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-primary bg-primary-light border border-primary/20 rounded-lg hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <Icon name="heroicons:document-magnifying-glass" class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
          ATS Check
        </button>
        
        <!-- Job Comparison Button -->
        <button
          @click="startJobComparison"
          class="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-accent bg-accent-light border border-accent/20 rounded-lg hover:bg-accent hover:text-accent-content hover:border-accent transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <Icon name="heroicons:clipboard-document-check" class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
          Job Match
        </button>
      </div>
      
      <!-- Quick Stats Summary -->
      <div class="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg border border-border-secondary">
        <div class="flex items-center space-x-4 text-xs text-content-tertiary">
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:document-text" class="w-3 h-3" />
            <span>{{ resumeStore.wordCount }} words</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:clock" class="w-3 h-3" />
            <span>{{ estimatedReadTime }}min read</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:document" class="w-3 h-3" />
            <span>{{ fileTypeDescription }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 text-xs text-success-dark font-medium">
          <Icon name="heroicons:check-circle" class="w-3 h-3" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFileTypeDescription, formatFileSize } from '~/utils/fileValidator'

// 🎛️ PROPS
interface ResumePreviewProps {
  showPreview?: boolean
}

const props = withDefaults(defineProps<ResumePreviewProps>(), {
  showPreview: true
})

// 🏪 PINIA STORE CONNECTION
const resumeStore = useResumeStore()

// 📱 LOCAL STATE
const previewExpanded = ref(false)

// 🔍 COMPUTED PROPERTIES
const fileTypeIcon = computed(() => {
  if (!resumeStore.resumeFile) return 'heroicons:document'
  
  const fileType = resumeStore.resumeFile.type
  if (fileType.includes('pdf')) return 'heroicons:document-text'
  if (fileType.includes('word') || fileType.includes('document')) return 'heroicons:document'
  return 'heroicons:document'
})

const fileTypeDescription = computed(() => {
  if (!resumeStore.resumeFile) return ''
  return getFileTypeDescription(resumeStore.resumeFile.file)
})

const formattedFileSize = computed(() => {
  if (!resumeStore.resumeFile) return ''
  return formatFileSize(resumeStore.resumeFile.size)
})

const textPreview = computed(() => {
  if (!resumeStore.extractedText) return ''
  
  // Show first 200 characters with ellipsis
  const preview = resumeStore.extractedText.slice(0, 200)
  return resumeStore.extractedText.length > 200 ? `${preview}...` : preview
})

const estimatedReadTime = computed(() => {
  if (!resumeStore.wordCount) return 0
  // Average reading speed: 200 words per minute
  return Math.ceil(resumeStore.wordCount / 200)
})

// 🎬 FUNCTIONS
function replaceFile() {
  // Clear current file and trigger new upload
  resumeStore.clearFile()
  
  // Optionally emit event to parent to show uploader
  // For now, clearing will show the uploader again
}

function clearFile() {
  resumeStore.clearFile()
}

function togglePreview() {
  previewExpanded.value = !previewExpanded.value
}

function startATSAnalysis() {
  // Navigate to ATS scanner page
  navigateTo('/ats-scanner')
}

function startJobComparison() {
  // Navigate to job comparison page
  navigateTo('/job-comparison')
}
</script>

<!-- 
  🔗 HOW THIS COMPONENT WORKS:
  
  📋 PURPOSE:
  - Displays uploaded resume file information with semantic theme integration
  - Shows file metadata (name, size, type, word count) using content hierarchy
  - Provides actions to replace or remove the file with theme-aware styling
  - Optional text preview functionality with consistent surface colors
  - Quick access to analysis options using semantic color system
  
  📊 STATE MANAGEMENT:
  - Reads from useResumeStore() for all file information
  - No local file state - purely display component
  - Local state only for UI interactions (preview expanded)
  
  🔌 CONNECTIONS:
  - stores/resume.ts: Reads file data and upload status
  - utils/fileValidator.ts: File type descriptions and formatting
  - components/resume/ResumeUploader.vue: Partner component for uploading
  - pages/ats-scanner.vue: ATS analysis destination
  - pages/job-comparison.vue: Job comparison destination
  
  🎨 SEMANTIC THEME COLORS USED:
  
  CONTENT COLORS (Text Hierarchy):
  - text-content-base: Primary text (file names, headings)
  - text-content-secondary: Body text (file metadata, descriptions)
  - text-content-tertiary: Supporting text (stats, labels)
  - text-content-secondary/80: Subtle variations with opacity
  
  SURFACE COLORS (Backgrounds):
  - card-base: Main card background (auto-adapts to theme)
  - bg-surface-secondary: Preview background
  - bg-surface-tertiary: Stats summary background
  
  BORDER COLORS:
  - border-border-secondary: Subtle borders
  - border-primary/20, border-accent/20: Transparent borders for buttons
  
  STATUS COLORS:
  - bg-success-light + text-success: Success states
  - bg-error-light + text-error: Error states  
  - bg-primary-light + text-primary: Processing states
  - text-success-dark, text-error-dark: High contrast text on light backgrounds
  
  INTERACTIVE COLORS:
  - text-primary + bg-primary-light: Primary action buttons
  - text-accent + bg-accent-light: Secondary action buttons
  - hover:bg-primary + hover:text-primary-content: Button hover states
  - hover:text-content-base: Text hover effects
  
  📱 USAGE:
  <ResumePreview />
  <ResumePreview :show-preview="false" />
  
  🎯 ENHANCED SEMANTIC FEATURES:
  - Content hierarchy using semantic text colors (base > secondary > tertiary)
  - Surface backgrounds that adapt to any theme automatically
  - Status indicators using proper semantic status colors
  - Interactive elements with theme-aware hover states
  - Opacity modifiers for subtle text variations (/80, /20)
  - Component utilities (card-base, card-padding) for consistency
  - Monospace font for code preview text
  - Enhanced button styling with semantic color transitions
  
  🎯 THEME ADAPTATION:
  - All colors automatically adapt when theme changes
  - Dark theme: Light text on dark surfaces
  - Branded themes: Primary colors change while maintaining hierarchy
  - Proper contrast maintained across all theme variants
  - Status colors remain semantically correct in all themes
  
  🚫 WHAT IT DOESN'T DO:
  - Handle file uploading (that's ResumeUploader.vue)
  - Perform analysis or processing (navigates to analysis pages)
  - Store any file data (reads from store)
  - Handle theme switching (automatically adapts to current theme)
  - Use any hardcoded color classes (all colors are semantic)
  
  📋 TYPICAL USAGE PATTERN:
  <ResumeUploader v-if="!resumeStore.isFileUploaded" />
  <ResumePreview v-else />
  
  🎯 SEMANTIC COLOR BENEFITS:
  - Consistent text hierarchy across all themes
  - Automatic color adaptation when switching themes
  - Self-documenting code with semantic color names
  - Easy maintenance and extension
  - Accessible contrast ratios maintained
  - No more hardcoded gray-* or blue-* classes
  
  🎯 NAVIGATION FLOW:
  1. User uploads file → ResumeUploader
  2. File processed → ResumePreview appears with semantic styling
  3. User clicks "ATS Check" → navigates to /ats-scanner
  4. User clicks "Job Match" → navigates to /job-comparison
  5. User can replace/remove file to start over
  6. All interactions use semantic theme colors for consistency
-->