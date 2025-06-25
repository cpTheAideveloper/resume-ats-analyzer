<!-- 
  📍 COMPONENT LOCATION: pages/index.vue
  🎯 PURPOSE: Notion-style full-screen hero with enhanced upload component
-->

<template>
    <div class="min-h-screen bg-white flex items-center justify-center px-6 sm:px-8 lg:px-12">
      <div class="max-w-screen-2xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <!-- Left Side - Hero Message (Notion-style) -->
          <div class="text-center lg:text-left">
            <!-- Main Headline - Larger, Notion-style -->
            <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
              Does your resume pass the 
              <span class="text-blue-600">ATS</span>?
            </h1>
            
            <!-- Description - Larger and more readable -->
            <p class="mt-8 text-2xl sm:text-3xl lg:text-3xl text-gray-600 leading-relaxed font-normal">
              Most resumes never reach human eyes. Our AI analyzer helps you optimize for 
              <span class="font-semibold text-gray-800">Applicant Tracking Systems</span> used by 98.4% of Fortune 500 companies.
            </p>
            
            <!-- CTA Button - Larger with arrow -->
            <div class="mt-12 lg:mt-16">
              <button
                v-if="!resumeStore.isFileUploaded"
                @click="scrollToUpload"
                class="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-semibold text-xl rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Icon name="heroicons:document-arrow-up" class="w-7 h-7 mr-3" />
                Check My Resume
              </button>
              
              <NuxtLink
                v-else
                to="/ats-scanner"
                class="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-semibold text-xl rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Icon name="heroicons:magnifying-glass" class="w-7 h-7 mr-3" />
                Analyze Resume
              </NuxtLink>
            </div>
  
            <!-- Arrow pointing to upload (only on larger screens) -->
            <div class="hidden lg:block mt-12">
              <div class="flex items-center justify-end">
                <div class="flex items-center space-x-4 text-gray-500 animate-pulse">
                  <span class="text-lg font-medium">Drop your resume here</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-16 h-px bg-gray-300"></div>
                    <Icon name="heroicons:arrow-right" class="w-6 h-6 text-gray-400 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Side - Resume Upload (Simplified Container) -->
          <div class="h-full">
           
          
             
              
              <!-- Upload Component (Enhanced with animations) -->
              <div id="upload-section" class="mb-6 h-full">
                <ResumeUploader v-if="!resumeStore.isFileUploaded" />
                <ResumePreview v-else />
              </div>
              
              <!-- Next Steps - Enhanced -->
              <div v-if="resumeStore.isReady" class="space-y-4 mt-8">
                <div class="text-center mb-6">
                  <div class="flex items-center justify-center space-x-2 text-green-600 mb-2">
                    <Icon name="heroicons:check-circle" class="w-6 h-6 animate-bounce" />
                    <span class="text-lg font-semibold">Ready for analysis!</span>
                  </div>
                </div>
                
                <NuxtLink
                  to="/ats-scanner"
                  class="flex items-center justify-center w-full p-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <Icon name="heroicons:magnifying-glass" class="w-6 h-6 mr-3" />
                  ATS Scanner
                </NuxtLink>
                
                <NuxtLink
                  to="/job-comparison"
                  class="flex items-center justify-center w-full p-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold text-lg rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Icon name="heroicons:document-duplicate" class="w-6 h-6 mr-3" />
                  Job Comparison
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </template>
  
  <script setup lang="ts">
  // 🏪 PINIA STORE CONNECTION
  const resumeStore = useResumeStore()
  
  // 🎬 FUNCTIONS
  function scrollToUpload() {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // 📱 META TAGS
  useHead({
    title: 'ATS Resume Analyzer - Does Your Resume Pass?',
    meta: [
      { name: 'description', content: 'AI-powered resume analyzer that helps optimize your resume for Applicant Tracking Systems used by Fortune 500 companies.' }
    ]
  })
  </script>
  
  <!-- 
    🔗 HOW THIS COMPONENT WORKS:
    
    📋 PURPOSE:
    - Clean home page that showcases the enhanced ResumeUploader component
    - Removed duplicate upload styling to let ResumeUploader handle all animations
    - Simplified container to highlight the animated upload component
    
    📊 STATE MANAGEMENT:
    - Uses useResumeStore() to check upload status
    - Dynamic content based on file upload state
    - Enhanced animations and micro-interactions
    
    🔌 CONNECTIONS:
    - stores/resume.ts: Upload status and file management
    - components/resume/ResumeUploader.vue: Enhanced animated upload interface
    - components/resume/ResumePreview.vue: Uploaded file display
    - /ats-scanner and /job-comparison: Analysis pages
    
    📱 RESPONSIVE DESIGN:
    - Mobile: Single column, optimized for touch
    - Tablet: Larger text, improved spacing
    - Desktop: Two columns, animated arrow indicator
    
    🎯 KEY FEATURES:
    - Notion-inspired typography and layout
    - Enhanced ResumeUploader with all animations
    - Animated arrow pointer on large screens
    - Hover effects and micro-interactions throughout
    - Clean separation of concerns (upload logic in component)
    
    🎨 DESIGN IMPROVEMENTS:
    - Removed duplicate container styling
    - Let ResumeUploader handle all visual states
    - Added subtle animations to arrow pointer
    - Enhanced button hover effects
    - Better visual hierarchy between sections
  -->