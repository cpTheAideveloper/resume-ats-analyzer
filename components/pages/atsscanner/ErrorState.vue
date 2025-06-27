<!-- 
  Component: ErrorState.vue
  Location: /components/pages/ats-scanner/PagesAtsscannerErrorState.vue
  Purpose: State 5 - Error state with retry and recovery options
-->
<template>
    <div class="max-w-2xl mx-auto text-center py-16">
      <div class="bg-error/5 border border-error/20 rounded-lg p-8">
        <NuxtIcon name="heroicons:exclamation-triangle" class="w-12 h-12 text-error mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-content-base mb-2">Analysis Failed</h2>
        <p class="text-content-secondary mb-6">
          {{ error.message }}
        </p>
        <div class="space-x-4">
          <button 
            v-if="error.retryable"
            @click="$emit('retry')" 
            class="btn-primary"
          >
            Try Again
          </button>
          <button @click="$emit('startOver')" class="btn-secondary">
            Start Over
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Props interface
  interface Props {
    error: {
      message: string
      code: string
      timestamp: string
      retryable: boolean
    }
  }
  
  // Emits interface
  interface Emits {
    retry: []
    startOver: []
  }
  
  // Define props and emits
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  </script>
  
  <!-- 
    COMPONENT INFO:
    - Functionality: Shows error state with retry and start-over options
    - Dependencies: NuxtIcon for icons
    - Store Connection: None - receives error data via props, emits events to parent
    - Usage: <PagesAtsscannerErrorState 
               :error="analysisStore.analysisError"
               @retry="retryAnalysis" 
               @startOver="handleStartOver" 
             />
    
    INTEGRATION WITH MAIN PAGE:
    - Replaces the large v-else-if="analysisStore.analysisError" block
    - Receives error object via props instead of directly accessing stores
    - Emits events back to parent for actions
    - Uses semantic theme colors for consistency
    - Auto-imported by Nuxt as PagesAtsscannerErrorState
  -->