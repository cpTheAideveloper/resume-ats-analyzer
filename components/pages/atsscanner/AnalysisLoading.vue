<!-- 
  Component: AnalysisLoading.vue
  Location: /components/pages/ats-scanner/PagesAtsscannerAnalysisLoading.vue
  Purpose: State 3 - Analyzing with animated loading and progress steps
-->
<template>
    <div class="max-w-2xl mx-auto text-center py-16">
      <div class="mb-8">
        <!-- Animated Loading Spinner -->
        <div class="relative w-24 h-24 mx-auto mb-6">
          <div class="absolute inset-0 border-4 border-border rounded-full"></div>
          <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
            <NuxtIcon name="heroicons:document-chart-bar" class="w-8 h-8 text-primary" />
          </div>
        </div>
  
        <h2 class="text-2xl font-bold text-content-base mb-2">
          Analyzing Your Resume...
        </h2>
        <p class="text-content-secondary mb-6">
          Our AI is checking ATS compatibility, keywords, and formatting
        </p>
  
        <!-- Progress Steps -->
        <div class="bg-surface-secondary border border-border rounded-lg p-6 max-w-md mx-auto">
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <NuxtIcon name="heroicons:check" class="w-3 h-3 text-success-content" />
              </div>
              <span class="text-sm text-content-secondary">Extracting text content</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-primary rounded-full animate-pulse"></div>
              <span class="text-sm text-content-base font-medium">Analyzing ATS compatibility</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-border rounded-full"></div>
              <span class="text-sm text-content-tertiary">Generating recommendations</span>
            </div>
          </div>
        </div>
  
        <p class="text-sm text-content-tertiary mt-6">
          This usually takes 15-30 seconds
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No props needed for this state - it's a static loading display
  // Component uses semantic theme colors throughout
  // Shows animated loading spinner with progress steps
  </script>
  
  <!-- 
    COMPONENT INFO:
    - Functionality: Shows animated loading state during analysis
    - Dependencies: NuxtIcon for icons
    - Store Connection: None - purely presentational
    - Usage: <PagesAtsscannerAnalysisLoading /> (auto-imported by Nuxt)
    
    INTEGRATION WITH MAIN PAGE:
    - Replaces the large v-else-if="analysisStore.isAnalyzing" block
    - Maintains exact same styling and functionality
    - Uses semantic theme colors for consistency
    - Auto-imported by Nuxt, no manual import needed
  -->