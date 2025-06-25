<!-- 
  📍 COMPONENT LOCATION: components/resume/ResumePreview.vue
  🎯 PURPOSE: Display uploaded resume information and actions
-->

<template>
    <div v-if="resumeStore.isFileUploaded" class="w-full max-w-md mx-auto">
      <!-- File Info Card -->
      <div class="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="flex items-center space-x-3">
          <!-- File Type Icon -->
          <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
            <Icon 
              :name="fileTypeIcon" 
              class="w-5 h-5 text-green-600" 
            />
          </div>
          
          <!-- File Details -->
          <div class="flex flex-col">
            <p class="text-sm font-medium text-gray-900">
              {{ resumeStore.resumeFile?.name }}
            </p>
            <div class="flex items-center space-x-2 text-xs text-gray-500">
              <span>{{ fileTypeDescription }}</span>
              <span>•</span>
              <span>{{ formattedFileSize }}</span>
              <span v-if="resumeStore.isTextExtracted">•</span>
              <span v-if="resumeStore.isTextExtracted">{{ resumeStore.wordCount }} words</span>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <!-- Replace File Button -->
          <button
            @click="replaceFile"
            class="flex items-center justify-center w-8 h-8 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Replace file"
          >
            <Icon name="heroicons:arrow-path" class="w-4 h-4" />
          </button>
          
          <!-- Remove File Button -->
          <button
            @click="clearFile"
            class="flex items-center justify-center w-8 h-8 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Remove file"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <!-- Processing Status -->
      <div v-if="resumeStore.uploadStatus === 'processing'" class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:cog-6-tooth" class="w-4 h-4 text-blue-500 animate-spin" />
          <p class="text-sm text-blue-700">Processing document...</p>
        </div>
      </div>
      
      <!-- Success Status with Stats -->
      <div v-if="resumeStore.uploadStatus === 'success' && resumeStore.isTextExtracted" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
            <p class="text-sm text-green-700">Ready for analysis</p>
          </div>
          
          <!-- Quick Stats -->
          <div class="flex items-center space-x-4 text-xs text-green-600">
            <span>{{ resumeStore.wordCount }} words</span>
            <span>{{ resumeStore.charCount }} chars</span>
          </div>
        </div>
      </div>
      
      <!-- Text Preview (Optional) -->
      <div v-if="showPreview && resumeStore.isTextExtracted" class="mt-3">
        <button 
          @click="togglePreview"
          class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Icon 
            :name="previewExpanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
            class="w-4 h-4" 
          />
          <span>{{ previewExpanded ? 'Hide' : 'Show' }} text preview</span>
        </button>
        
        <div v-if="previewExpanded" class="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p class="text-xs text-gray-700 leading-relaxed">
            {{ textPreview }}
          </p>
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
  </script>
  
  <!-- 
    🔗 HOW THIS COMPONENT WORKS:
    
    📋 PURPOSE:
    - Displays uploaded resume file information
    - Shows file metadata (name, size, type, word count)
    - Provides actions to replace or remove the file
    - Optional text preview functionality
    
    📊 STATE MANAGEMENT:
    - Reads from useResumeStore() for all file information
    - No local file state - purely display component
    - Local state only for UI interactions (preview expanded)
    
    🔌 CONNECTIONS:
    - stores/resume.ts: Reads file data and upload status
    - utils/fileValidator.ts: File type descriptions and formatting
    - components/resume/ResumeUploader.vue: Partner component for uploading
    
    📱 USAGE:
    <ResumePreview />
    <ResumePreview :show-preview="false" />
    
    🎯 KEY FEATURES:
    - File metadata display (name, size, type, word count)
    - Processing status indicators
    - Replace/remove file actions
    - Collapsible text preview
    - Responsive card design
    
    🚫 WHAT IT DOESN'T DO:
    - Handle file uploading (that's ResumeUploader.vue)
    - Perform analysis or processing
    - Store any file data (reads from store)
    
    📋 TYPICAL USAGE PATTERN:
    <ResumeUploader v-if="!resumeStore.isFileUploaded" />
    <ResumePreview v-else />
  -->