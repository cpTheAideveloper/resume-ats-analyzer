<!-- 
  Component: ReadyInterface.vue
  Location: /components/pages/atsscanner/PagesAtsscannerReadyInterface.vue
  Purpose: State 2 - File ready, not analyzed - shows file preview and analysis options
-->
<template>
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-hero text-content-base mb-4">Ready to Analyze</h1>
        <p class="text-subtitle text-content-secondary">
          Your resume is uploaded and ready for ATS compatibility analysis
        </p>
      </div>
  
      <!-- Resume Preview Card -->
      <div class="bg-surface-secondary border border-border rounded-lg p-6 mb-8">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-content-base mb-2">Resume Uploaded</h3>
            <div class="flex items-center space-x-4 text-sm text-content-secondary">
              <span class="flex items-center space-x-1">
                <NuxtIcon name="heroicons:document-text" class="w-4 h-4" />
                <span>{{ fileName || 'Resume' }}</span>
              </span>
              <span class="flex items-center space-x-1">
                <NuxtIcon name="heroicons:document" class="w-4 h-4" />
                <span>{{ wordCount }} words</span>
              </span>
              <span class="flex items-center space-x-1">
                <NuxtIcon name="heroicons:clock" class="w-4 h-4" />
                <span>Just uploaded</span>
              </span>
            </div>
          </div>
          <button 
            @click="$emit('clearFile')" 
            class="text-content-tertiary hover:text-error transition-colors"
            title="Remove file"
          >
            <NuxtIcon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
  
        <!-- Resume Text Preview -->
        <div class="bg-surface-tertiary border border-border-secondary rounded-lg p-4 mb-6">
          <p class="text-sm text-content-tertiary mb-2">Resume Preview:</p>
          <p class="text-content-secondary text-sm leading-relaxed line-clamp-4">
            {{ previewText }}...
          </p>
        </div>
  
        <!-- Analysis Options -->
        <div class="bg-surface border border-border-accent rounded-lg p-6">
          <h4 class="font-semibold text-content-base mb-4">What we'll analyze:</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <NuxtIcon name="heroicons:document-check" class="w-4 h-4 text-primary" />
              </div>
              <div>
                <p class="font-medium text-content-base text-sm">ATS Compatibility</p>
                <p class="text-content-tertiary text-xs">Formatting and parsing issues</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <NuxtIcon name="heroicons:hashtag" class="w-4 h-4 text-success" />
              </div>
              <div>
                <p class="font-medium text-content-base text-sm">Keyword Analysis</p>
                <p class="text-content-tertiary text-xs">Industry keyword optimization</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <NuxtIcon name="heroicons:light-bulb" class="w-4 h-4 text-warning" />
              </div>
              <div>
                <p class="font-medium text-content-base text-sm">Recommendations</p>
                <p class="text-content-tertiary text-xs">Actionable improvement tips</p>
              </div>
            </div>
          </div>
  
          <button 
            @click="$emit('startAnalysis')" 
            :disabled="isAnalyzing"
            class="btn-primary w-full md:w-auto inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <NuxtIcon name="heroicons:play" class="w-5 h-5" />
            <span>Start ATS Analysis</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Props interface
  interface Props {
    fileName?: string
    wordCount: number
    extractedText: string
    isAnalyzing?: boolean
  }
  
  // Emits interface
  interface Emits {
    clearFile: []
    startAnalysis: []
  }
  
  // Define props and emits
  const props = withDefaults(defineProps<Props>(), {
    fileName: '',
    isAnalyzing: false
  })
  
  const emit = defineEmits<Emits>()
  
  // Computed preview text (first 300 characters)
  const previewText = computed(() => {
    return props.extractedText?.substring(0, 300) || ''
  })
  </script>
  
  <style scoped>
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  
  <!-- 
    COMPONENT INFO:
    - Functionality: Shows uploaded file info, preview, and analysis options
    - Dependencies: NuxtIcon for icons
    - Store Connection: None - receives data via props, emits events to parent
    - Usage: <ATSScannerReadyInterface 
               :fileName="resumeStore.fileName" 
               :wordCount="resumeStore.wordCount" 
               :extractedText="resumeStore.extractedText"
               :isAnalyzing="analysisStore.isAnalyzing"
               @clearFile="handleClearFile" 
               @startAnalysis="startAnalysis" 
             />
    
    INTEGRATION WITH MAIN PAGE:
    - Replaces the large v-else-if="!analysisStore.isAnalyzing && !analysisStore.hasATSResults" block
    - Receives data via props instead of directly accessing stores
    - Emits events back to parent for actions
    - Uses semantic theme colors for consistency
    - Auto-imported by Nuxt as PagesAtsscannerReadyInterface
  -->