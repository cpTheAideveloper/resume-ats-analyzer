<!-- 
  📍 COMPONENT LOCATION: pages/index.vue
  🎯 PURPOSE: Notion-style full-screen hero with semantic theme integration + Auto-start logic
  🔧 PHASE: Phase 6 - Auto-start ATS analysis from homepage
-->

<template>
    <div class="min-h-screen bg-surface flex items-center justify-center container-section">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid-hero">
          
          <!-- Left Side - Hero Message (Notion-style with semantic colors) -->
          <div class="text-center lg:text-left space-component">
            <!-- Main Headline - Using semantic typography utilities -->
            <h1 class="text-hero text-content-base leading-[0.9] tracking-tight">
              Does your resume pass the 
              <span class="text-primary">ATS</span>?
            </h1>
            
            <!-- Description - Using semantic text hierarchy -->
            <p class="text-subtitle text-content-secondary leading-relaxed font-normal space-element">
              Most resumes never reach human eyes. Our AI analyzer helps you optimize for 
              <span class="font-semibold text-content-base">Applicant Tracking Systems</span> used by 98.4% of Fortune 500 companies.
            </p>
            
            <!-- CTA Button - Using semantic button styles -->
            <div class="space-component">
              <button
                v-if="!resumeStore.isFileUploaded"
                @click="scrollToUpload"
                class="btn-primary"
              >
                <Icon name="heroicons:document-arrow-up" class="w-7 h-7 mr-3" />
                Check My Resume
              </button>
              
              <NuxtLink
                v-else
                to="/ats-scanner?autoStart=true"
                class="btn-primary"
              >
                <Icon name="heroicons:magnifying-glass" class="w-7 h-7 mr-3" />
                Analyze Resume
              </NuxtLink>
            </div>
  
            <!-- Arrow pointing to upload (only on larger screens) -->
            <div class="hidden lg:block space-component">
              <div class="flex items-center justify-end">
                <div class="flex items-center space-x-4 text-content-tertiary animate-pulse">
                  <span class="text-lg font-medium">Drop your resume here</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-16 h-px bg-border-accent"></div>
                    <Icon name="heroicons:arrow-right" class="w-6 h-6 text-content-tertiary/70 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Side - Resume Upload (Simplified Container) -->
          <div class="">
            <!-- Upload Component (Enhanced with semantic theme integration) -->
            <div id="upload-section" class="mb-6 ">
              <ResumeUploader v-if="!resumeStore.isFileUploaded" />
              <ResumePreview v-else />
            </div>
            
            <!-- Next Steps - Enhanced with semantic colors -->
            <div v-if="resumeStore.isReady" class="space-y-4 mt-8">
              <div class="text-center mb-6">
                <div class="flex items-center justify-center space-x-2 text-success-dark mb-2">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 animate-bounce" />
                  <span class="text-lg font-semibold">Ready for analysis!</span>
                </div>
              </div>
              
              <NuxtLink
                to="/ats-scanner?autoStart=true"
                class="btn-primary w-full justify-center"
              >
                <Icon name="heroicons:magnifying-glass" class="w-6 h-6 mr-3" />
                ATS Scanner
              </NuxtLink>
              
              <NuxtLink
                to="/job-comparison"
                class="btn-secondary w-full justify-center"
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
    - Clean home page with semantic theme integration
    - Auto-start ATS analysis when user clicks "Analyze Resume"
    - Showcases enhanced upload components with consistent styling
    - Notion-inspired typography using semantic utility classes
    - Automatic theme adaptation across all color variants
    
    📊 STATE MANAGEMENT:
    - Uses useResumeStore() to check upload status
    - Dynamic content based on file upload state
    - Enhanced animations and micro-interactions
    
    🔌 CONNECTIONS:
    - stores/resume.ts: Upload status and file management
    - components/resume/ResumeUploader.vue: Semantic theme-aware upload interface
    - components/resume/ResumePreview.vue: Theme-consistent file display
    - /ats-scanner?autoStart=true: Analysis page with auto-start parameter
    - /job-comparison: Job comparison analysis page
    
    🎯 AUTO-START LOGIC:
    - Homepage buttons now include ?autoStart=true parameter
    - ATS Scanner page detects this parameter and auto-starts analysis
    - Improves user experience by eliminating extra click
    - Maintains existing manual analysis option for direct navigation
    
    🎨 SEMANTIC THEME COLORS USED:
    
    CONTENT COLORS (Text Hierarchy):
    - text-content-base: Main headline, emphasized text
    - text-content-secondary: Body text, descriptions
    - text-content-tertiary: Supporting text, arrow indicators
    - text-content-tertiary/70: Subtle variations with opacity
    
    SURFACE COLORS (Backgrounds):
    - bg-surface: Main page background (adapts to theme)
    
    BORDER COLORS:
    - bg-border-accent: Arrow line decoration
    
    BRAND COLORS:
    - text-primary: ATS highlight in headline
    
    STATUS COLORS:
    - text-success-dark: Ready state indicators
    
    COMPONENT UTILITIES:
    - btn-primary: Primary action buttons (theme-aware)
    - btn-secondary: Secondary action buttons (theme-aware)
    - text-hero: Responsive hero typography
    - text-subtitle: Responsive subtitle typography
    - container-section: Responsive container with theme-aware padding
    - grid-hero: Responsive grid layout
    - space-component: Consistent component spacing
    - space-element: Consistent element spacing
    
    📱 RESPONSIVE DESIGN:
    - Mobile: Single column, optimized spacing using semantic utilities
    - Tablet: Enhanced text sizing with responsive typography
    - Desktop: Two columns with animated arrow indicator
    
    🎯 ENHANCED SEMANTIC FEATURES:
    - Typography hierarchy using semantic text colors (base > secondary > tertiary)
    - Component utilities that adapt to theme automatically
    - Consistent spacing using semantic space utilities
    - Interactive elements with theme-aware styling
    - Status indicators using semantic status colors
    - Brand colors that adapt to theme variants
    
    🎯 THEME ADAPTATION:
    - All colors automatically adapt when theme changes
    - Dark theme: Light text on dark surface with proper contrast
    - Ocean theme: Cyan primary color for ATS highlight
    - Forest theme: Green primary color maintains brand consistency
    - Sunset theme: Orange primary color with warm feel
    - Purple theme: Violet primary color for creative appeal
    
    🎯 COMPONENT INTEGRATION:
    - btn-primary: Uses semantic primary colors with hover states
    - btn-secondary: Uses semantic surface colors with proper contrast
    - ResumeUploader: Fully theme-aware with semantic color system
    - ResumePreview: Consistent styling with semantic hierarchy
    
    🎯 CUSTOM UTILITIES USAGE:
    - text-hero: Responsive typography (36px to 96px)
    - text-subtitle: Responsive descriptions (18px to 30px)
    - container-section: Responsive container (24px to 48px padding)
    - grid-hero: Responsive grid (1 col mobile, 2 col desktop)
    - space-component: Responsive spacing (24px to 48px)
    - space-element: Responsive spacing (12px to 24px)
    
    🚫 WHAT IT DOESN'T DO:
    - Handle file uploading (delegated to ResumeUploader component)
    - Perform theme switching (handled by layout/header)
    - Store application state (uses store for data access)
    - Use any hardcoded color classes (all colors are semantic)
    - Perform the actual analysis (delegated to ATS Scanner page)
    
    📋 TYPICAL USER FLOW:
    1. User lands on semantic theme-aware homepage
    2. Reads hero message with consistent typography hierarchy
    3. Uploads resume using theme-integrated uploader component
    4. Sees analysis options with semantic button styling
    5. Clicks "Analyze Resume" → navigates to /ats-scanner?autoStart=true
    6. ATS Scanner automatically starts analysis without additional clicks
    7. All interactions maintain theme consistency automatically
    
    🎯 AUTO-START BENEFITS:
    - Smoother user experience with fewer clicks
    - Clear intent when coming from homepage
    - Maintains existing manual flow for bookmarks/direct navigation
    - Progressive enhancement approach
    - Consistent with modern SPA patterns
    
    🎯 SEMANTIC COLOR BENEFITS:
    - Consistent visual hierarchy across all themes
    - Automatic color adaptation when switching themes
    - Self-documenting code with semantic color names
    - Easy maintenance and global color updates
    - Accessible contrast ratios maintained automatically
    - No hardcoded gray-*, blue-*, or green-* classes
    - Component utilities ensure design consistency
    - Typography scales responsively with proper contrast
  -->