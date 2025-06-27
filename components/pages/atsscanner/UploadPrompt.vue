<!-- 
  Component: UploadPrompt.vue
  Location: /components/pages/ats-scanner/PagesAtsscannerUploadPrompt.vue
  Purpose: State 1 - No file uploaded prompt with clear call-to-action
-->
<template>
    <div class="text-center py-16">
      <div class="max-w-2xl mx-auto">
        <NuxtIcon name="heroicons:document-chart-bar" class="w-16 h-16 text-content-tertiary mx-auto mb-6" />
        <h1 class="text-hero text-content-base mb-4">ATS Scanner</h1>
        <p class="text-subtitle text-content-secondary mb-8">
          Upload your resume to analyze ATS compatibility and get actionable feedback
        </p>
        <div class="space-y-4">
          <NuxtLink to="/" class="btn-primary inline-flex items-center space-x-2">
            <NuxtIcon name="heroicons:arrow-up-tray" class="w-5 h-5" />
            <span>Upload Resume</span>
          </NuxtLink>
          <p class="text-sm text-content-tertiary">
            Supports PDF and DOCX files • Free analysis • No signup required
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No props needed for this state - it's a static prompt
  // Component uses semantic theme colors throughout
  // Clicking "Upload Resume" navigates back to homepage for file upload
  </script>
  
  <!-- 
    COMPONENT INFO:
    - Functionality: Shows upload prompt when no file is available
    - Dependencies: NuxtIcon for icons, NuxtLink for navigation
    - Store Connection: None - purely presentational
    - Usage: <ATSScannerUploadPrompt /> (auto-imported by Nuxt)
    
    INTEGRATION WITH MAIN PAGE:
    - Replaces the large v-if="!resumeStore.isFileUploaded" block
    - Maintains exact same styling and functionality
    - Uses semantic theme colors for consistency
    - Auto-imported by Nuxt, no manual import needed
  -->