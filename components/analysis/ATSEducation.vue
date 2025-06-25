<!-- 
  📍 COMPONENT LOCATION: components/analysis/ATSEducation.vue
  🎯 PURPOSE: Educational content about modern ATS systems
  🔧 PHASE: Phase 6 - Analysis Pages
-->

<template>
    <div class="card-base card-padding bg-gradient-to-r from-surface-secondary to-surface-accent">
      <!-- Header -->
      <div class="text-center mb-6">
        <div class="flex items-center justify-center mb-3">
          <div class="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center">
            <Icon name="heroicons:academic-cap" class="w-7 h-7 text-primary" />
          </div>
        </div>
        <h3 class="text-xl font-bold text-content-base mb-2">
          📚 Understanding Your ATS Score
        </h3>
        <p class="text-content-secondary">
          Learn how modern ATS systems really work and what your scores mean
        </p>
      </div>
  
      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- ATS Facts Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-content-base flex items-center">
            <Icon name="heroicons:light-bulb" class="w-5 h-5 text-primary mr-2" />
            💡 ATS Reality Check
          </h4>
          
          <div class="space-y-3">
            <FactCard
              fact="98.4% of Fortune 500 companies use ATS systems"
              explanation="Nearly all large companies use some form of applicant tracking system"
              icon="heroicons:building-office-2"
              variant="info"
            />
            
            <FactCard
              fact="90-95% of resumes are still reviewed by humans"
              explanation="ATS systems rank and organize candidates, they don't auto-reject"
              icon="heroicons:user-group"
              variant="success"
            />
            
            <FactCard
              fact="50-70% keyword match is optimal"
              explanation="You don't need 100% keyword match - that actually looks suspicious"
              icon="heroicons:key"
              variant="warning"
            />
            
            <FactCard
              fact="Modern ATS understand context and synonyms"
              explanation="Today's systems use AI to understand related terms and skills"
              icon="heroicons:sparkles"
              variant="info"
            />
          </div>
        </div>
  
        <!-- Action Steps Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-content-base flex items-center">
            <Icon name="heroicons:rocket-launch" class="w-5 h-5 text-primary mr-2" />
            🎯 Next Steps
          </h4>
          
          <div class="space-y-3">
            <ActionCard
              title="Focus on top 3 recommendations"
              description="Start with the highest-impact changes first"
              priority="high"
              icon="heroicons:star"
            />
            
            <ActionCard
              title="Add missing keywords naturally"
              description="Integrate keywords into your existing experience descriptions"
              priority="high"
              icon="heroicons:pencil-square"
            />
            
            <ActionCard
              title="Fix format issues for better parsing"
              description="Ensure your resume can be read correctly by ATS systems"
              priority="medium"
              icon="heroicons:document-text"
            />
            
            <ActionCard
              title="Balance ATS optimization with readability"
              description="Remember that humans will ultimately read your resume"
              priority="medium"
              icon="heroicons:scale"
            />
          </div>
        </div>
      </div>
  
      <!-- Score Interpretation Guide -->
      <div class="mt-8 pt-6 border-t border-border-secondary">
        <h4 class="text-lg font-semibold text-content-base mb-4 flex items-center">
          <Icon name="heroicons:chart-bar" class="w-5 h-5 text-primary mr-2" />
          📊 Score Guide
        </h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- ATS Score Guide -->
          <ScoreGuide
            title="ATS Compatibility"
            description="How well your resume can be parsed and read"
            :ranges="[
              { min: 80, max: 100, label: 'Excellent', color: 'success', description: 'Great formatting, easy to parse' },
              { min: 60, max: 79, label: 'Good', color: 'warning', description: 'Minor formatting improvements needed' },
              { min: 0, max: 59, label: 'Needs Work', color: 'error', description: 'Significant format issues to address' }
            ]"
          />
          
          <!-- Job Match Guide -->
          <ScoreGuide
            title="Job Match"
            description="How well your experience aligns with the role"
            :ranges="[
              { min: 80, max: 100, label: 'Strong Match', color: 'success', description: 'Excellent experience alignment' },
              { min: 60, max: 79, label: 'Good Match', color: 'warning', description: 'Relevant with some gaps' },
              { min: 0, max: 59, label: 'Weak Match', color: 'error', description: 'Significant experience gaps' }
            ]"
          />
          
          <!-- Keyword Match Guide -->
          <ScoreGuide
            title="Keyword Match"
            description="Percentage of relevant terms found"
            :ranges="[
              { min: 50, max: 70, label: 'Optimal', color: 'success', description: 'Perfect balance of keywords' },
              { min: 30, max: 80, label: 'Acceptable', color: 'warning', description: 'Could use more targeted terms' },
              { min: 0, max: 30, label: 'Too Low', color: 'error', description: 'Missing critical keywords' },
              { min: 80, max: 100, label: 'Too High', color: 'warning', description: 'May appear keyword-stuffed' }
            ]"
          />
        </div>
      </div>
  
      <!-- Myth Busting Section -->
      <div class="mt-8 pt-6 border-t border-border-secondary">
        <h4 class="text-lg font-semibold text-content-base mb-4 flex items-center">
          <Icon name="heroicons:x-circle" class="w-5 h-5 text-error mr-2" />
          🚫 Common ATS Myths Debunked
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MythCard
            myth="ATS systems automatically reject 75% of resumes"
            reality="ATS systems rank and organize resumes for human review"
            icon="heroicons:x-circle"
          />
          
          <MythCard
            myth="You need to include every keyword from the job posting"
            reality="50-70% keyword match is optimal - too many keywords look suspicious"
            icon="heroicons:key"
          />
          
          <MythCard
            myth="ATS can't read PDF files"
            reality="Modern ATS systems handle PDF files very well"
            icon="heroicons:document-text"
          />
          
          <MythCard
            myth="You should use white text to hide keywords"
            reality="This is considered deceptive and can get you blacklisted"
            icon="heroicons:eye-slash"
          />
        </div>
      </div>
  
      <!-- Call to Action -->
      <div class="mt-8 pt-6 border-t border-border-secondary text-center">
        <div class="inline-flex items-center space-x-2 text-sm text-content-secondary">
          <Icon name="heroicons:information-circle" class="w-4 h-4" />
          <span>
            This analysis is based on 2024-2025 ATS research and modern hiring practices
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 📦 CHILD COMPONENTS
  
  // Fact Card Component (inline for simplicity)
  const FactCard = defineComponent({
    props: {
      fact: String,
      explanation: String,
      icon: String,
      variant: {
        type: String,
        default: 'info'
      }
    },
    setup(props) {
      const cardClasses = computed(() => {
        switch (props.variant) {
          case 'success':
            return 'bg-success-light border-success/20'
          case 'warning':
            return 'bg-warning-light border-warning/20'
          case 'error':
            return 'bg-error-light border-error/20'
          default:
            return 'bg-primary-light border-primary/20'
        }
      })
  
      const iconClasses = computed(() => {
        switch (props.variant) {
          case 'success':
            return 'text-success'
          case 'warning':
            return 'text-warning'
          case 'error':
            return 'text-error'
          default:
            return 'text-primary'
        }
      })
  
      return { cardClasses, iconClasses }
    },
    template: `
      <div class="p-3 rounded-lg border" :class="cardClasses">
        <div class="flex items-start space-x-3">
          <Icon :name="icon" class="w-5 h-5 mt-0.5 flex-shrink-0" :class="iconClasses" />
          <div>
            <p class="text-sm font-medium text-content-base">{{ fact }}</p>
            <p class="text-xs text-content-secondary mt-1">{{ explanation }}</p>
          </div>
        </div>
      </div>
    `
  })
  
  // Action Card Component
  const ActionCard = defineComponent({
    props: {
      title: String,
      description: String,
      priority: String,
      icon: String
    },
    setup(props) {
      const priorityClasses = computed(() => {
        switch (props.priority) {
          case 'high':
            return 'bg-error-light border-error/20 text-error-dark'
          case 'medium':
            return 'bg-warning-light border-warning/20 text-warning-dark'
          default:
            return 'bg-primary-light border-primary/20 text-primary-dark'
        }
      })
  
      const priorityLabel = computed(() => {
        switch (props.priority) {
          case 'high':
            return 'High Priority'
          case 'medium':
            return 'Medium Priority'
          default:
            return 'Low Priority'
        }
      })
  
      return { priorityClasses, priorityLabel }
    },
    template: `
      <div class="p-3 bg-surface-tertiary rounded-lg border border-border-secondary hover:border-border-accent transition-colors">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon :name="icon" class="w-4 h-4 text-primary" />
          </div>
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
              <h5 class="text-sm font-medium text-content-base">{{ title }}</h5>
              <span class="text-xs px-2 py-0.5 rounded-full border" :class="priorityClasses">
                {{ priorityLabel }}
              </span>
            </div>
            <p class="text-xs text-content-secondary">{{ description }}</p>
          </div>
        </div>
      </div>
    `
  })
  
  // Score Guide Component
  const ScoreGuide = defineComponent({
    props: {
      title: String,
      description: String,
      ranges: Array
    },
    template: `
      <div class="p-4 bg-surface-tertiary rounded-lg border border-border-secondary">
        <h5 class="text-sm font-semibold text-content-base mb-1">{{ title }}</h5>
        <p class="text-xs text-content-secondary mb-3">{{ description }}</p>
        <div class="space-y-2">
          <div v-for="range in ranges" :key="range.label" class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-2">
              <div 
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-success': range.color === 'success',
                  'bg-warning': range.color === 'warning', 
                  'bg-error': range.color === 'error',
                  'bg-primary': range.color === 'primary'
                }"
              ></div>
              <span class="font-medium text-content-base">{{ range.label }}</span>
            </div>
            <span class="text-content-tertiary">{{ range.min }}-{{ range.max }}{{ range.max <= 100 ? '' : '+' }}</span>
          </div>
        </div>
      </div>
    `
  })
  
  // Myth Card Component
  const MythCard = defineComponent({
    props: {
      myth: String,
      reality: String,
      icon: String
    },
    template: `
      <div class="p-4 bg-surface-tertiary rounded-lg border border-border-secondary">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-error-light rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon :name="icon" class="w-4 h-4 text-error" />
          </div>
          <div>
            <div class="mb-2">
              <span class="text-xs font-medium text-error-dark bg-error-light px-2 py-0.5 rounded-full">MYTH</span>
              <p class="text-sm text-content-base mt-1 line-through opacity-70">{{ myth }}</p>
            </div>
            <div>
              <span class="text-xs font-medium text-success-dark bg-success-light px-2 py-0.5 rounded-full">REALITY</span>
              <p class="text-sm text-content-base mt-1">{{ reality }}</p>
            </div>
          </div>
        </div>
      </div>
    `
  })
  </script>
  
  <!-- 
    🔗 HOW THIS ATS EDUCATION COMPONENT WORKS:
    
    📋 PURPOSE:
    - Educates users about modern ATS systems and how they actually work
    - Debunks common myths and outdated information
    - Provides actionable guidance for improving resume performance
    - Helps users understand their scores and what they mean
    
    📚 EDUCATIONAL CONTENT:
    - ATS Reality Check: Facts about modern ATS usage and functionality
    - Next Steps: Prioritized action items for resume improvement
    - Score Guide: Interpretation of different score ranges
    - Myth Busting: Common misconceptions corrected with facts
    
    🎨 VISUAL DESIGN:
    - Gradient background for visual interest
    - Card-based layout for easy scanning
    - Color-coded information (success/warning/error)
    - Icons for visual hierarchy and engagement
    - Responsive grid layout
    
    🎯 SEMANTIC THEME INTEGRATION:
    - Uses semantic color system throughout
    - Adapts to theme changes automatically
    - Consistent with overall design language
    - Proper contrast ratios maintained
    
    📱 RESPONSIVE DESIGN:
    - Single column on mobile, two columns on desktop
    - Touch-friendly interactive elements
    - Proper spacing and sizing for all devices
    - Card-based layout works well on all screen sizes
    
    🔧 COMPONENT FEATURES:
    - FactCard: Individual facts with explanations
    - ActionCard: Prioritized action items
    - ScoreGuide: Score range interpretation
    - MythCard: Myth vs reality comparisons
    
    📊 EDUCATIONAL VALUE:
    - Based on 2024-2025 ATS research
    - Debunks the "75% auto-rejection" myth
    - Explains optimal keyword match percentages
    - Clarifies human vs automated review process
    
    🎯 KEY MESSAGES:
    - 98.4% of Fortune 500 use ATS (establishes importance)
    - 90-95% of resumes reviewed by humans (reduces anxiety)
    - 50-70% keyword match is optimal (prevents over-optimization)
    - Modern ATS understand context (encourages natural writing)
    
    📈 ACTIONABLE GUIDANCE:
    - Focus on top 3 recommendations first
    - Add keywords naturally into existing content
    - Fix format issues for better parsing
    - Balance optimization with human readability
    
    🚫 MYTH BUSTING:
    - Auto-rejection myth corrected
    - Keyword stuffing discouraged
    - PDF compatibility clarified
    - White text hiding condemned
    
    🎨 VISUAL HIERARCHY:
    - Icons for quick visual identification
    - Color coding for different types of information
    - Typography hierarchy for easy scanning
    - Progressive disclosure of complex information
    
    📱 USAGE:
    <ATSEducation />
    
    This component is completely self-contained and requires no props or configuration.
    It provides comprehensive educational content that helps users understand and
    improve their ATS analysis results.
  -->