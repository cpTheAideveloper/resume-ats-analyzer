<!-- 
  📍 COMPONENT LOCATION: components/analysis/ScoreCard.vue
  🎯 PURPOSE: Animated circular progress ring for individual scores
  🔧 PHASE: Phase 6 - Analysis Pages
-->

<template>
    <div class="text-center">
      <!-- Circular Progress Ring -->
      <div class="relative w-24 h-24 mx-auto mb-3">
        <!-- Background Circle -->
        <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            stroke-width="6"
            fill="none"
            class="text-border-secondary"
          />
          <!-- Animated Progress Circle -->
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            stroke-width="6"
            fill="none"
            stroke-linecap="round"
            :class="color"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            class="transition-all duration-1000 ease-out"
            style="transform-origin: center"
          />
        </svg>
        
        <!-- Score Number Overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <span class="text-xl font-bold text-content-base">
              {{ animatedScore }}{{ isPercentage ? '%' : '' }}
            </span>
            <div v-if="showMaxScore" class="text-xs text-content-tertiary">
              / {{ maxScore }}
            </div>
          </div>
        </div>
  
        <!-- Icon Badge -->
        <div 
          v-if="icon"
          class="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface"
          :class="iconBackgroundClass"
        >
          <Icon :name="icon" class="w-3 h-3 text-white" />
        </div>
      </div>
  
      <!-- Score Information -->
      <div class="space-y-1">
        <!-- Title -->
        <h3 class="text-lg font-semibold text-content-base">
          {{ title }}
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-content-secondary">
          {{ description }}
        </p>
        
        <!-- Score Label -->
        <div class="flex items-center justify-center space-x-2">
          <span 
            class="text-xs font-medium px-2 py-1 rounded-full"
            :class="labelClasses"
          >
            {{ label }}
          </span>
          
          <!-- Improvement Indicator -->
          <div v-if="showImprovement" class="flex items-center space-x-1">
            <Icon 
              :name="improvementIcon" 
              class="w-3 h-3"
              :class="improvementColor"
            />
            <span class="text-xs" :class="improvementColor">
              {{ improvementText }}
            </span>
          </div>
        </div>
      </div>
  
      <!-- Additional Info -->
      <div v-if="additionalInfo" class="mt-2 text-xs text-content-tertiary">
        {{ additionalInfo }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface ScoreCardProps {
    score: number
    maxScore?: number
    title: string
    description: string
    color: string
    label: string
    icon?: string
    isPercentage?: boolean
    showMaxScore?: boolean
    showImprovement?: boolean
    previousScore?: number
    additionalInfo?: string
  }
  
  const props = withDefaults(defineProps<ScoreCardProps>(), {
    maxScore: 100,
    isPercentage: false,
    showMaxScore: false,
    showImprovement: false,
    previousScore: undefined,
    additionalInfo: ''
  })
  
  // 📱 REACTIVE STATE
  const animatedScore = ref(0)
  const mounted = ref(false)
  
  // 🔍 COMPUTED PROPERTIES
  
  // Circle geometry calculations
  const radius = 40
  const circumference = computed(() => 2 * Math.PI * radius)
  
  // Progress calculation
  const progress = computed(() => 
    Math.min(Math.max(props.score / props.maxScore, 0), 1)
  )
  
  // Stroke dash offset for progress animation
  const strokeDashoffset = computed(() => {
    const offset = circumference.value - (progress.value * circumference.value)
    return mounted.value ? offset : circumference.value
  })
  
  // Icon background color based on score
  const iconBackgroundClass = computed(() => {
    if (props.color.includes('success')) return 'bg-success'
    if (props.color.includes('warning')) return 'bg-warning'
    if (props.color.includes('error')) return 'bg-error'
    return 'bg-primary'
  })
  
  // Label styling based on score performance
  const labelClasses = computed(() => {
    if (props.color.includes('success')) {
      return 'bg-success-light text-success-dark border border-success/20'
    }
    if (props.color.includes('warning')) {
      return 'bg-warning-light text-warning-dark border border-warning/20'
    }
    if (props.color.includes('error')) {
      return 'bg-error-light text-error-dark border border-error/20'
    }
    return 'bg-primary-light text-primary-dark border border-primary/20'
  })
  
  // Improvement indicators
  const improvementIcon = computed(() => {
    if (!props.previousScore) return 'heroicons:minus'
    if (props.score > props.previousScore) return 'heroicons:arrow-trending-up'
    if (props.score < props.previousScore) return 'heroicons:arrow-trending-down'
    return 'heroicons:minus'
  })
  
  const improvementColor = computed(() => {
    if (!props.previousScore) return 'text-content-tertiary'
    if (props.score > props.previousScore) return 'text-success'
    if (props.score < props.previousScore) return 'text-error'
    return 'text-content-tertiary'
  })
  
  const improvementText = computed(() => {
    if (!props.previousScore) return 'New'
    const diff = Math.abs(props.score - props.previousScore)
    if (props.score > props.previousScore) return `+${diff}`
    if (props.score < props.previousScore) return `-${diff}`
    return 'Same'
  })
  
  // 🎬 ANIMATION FUNCTIONS
  
  // Animate score number from 0 to target
  function animateScore() {
    const duration = 1000 // 1 second
    const startTime = Date.now()
    const startValue = 0
    const endValue = props.score
    
    function updateScore() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      animatedScore.value = Math.round(startValue + (endValue - startValue) * easeOut)
      
      if (progress < 1) {
        requestAnimationFrame(updateScore)
      }
    }
    
    requestAnimationFrame(updateScore)
  }
  
  // 🔄 LIFECYCLE
  onMounted(() => {
    // Small delay to ensure smooth animation
    nextTick(() => {
      mounted.value = true
      animateScore()
    })
  })
  
  // Watch for score changes to re-animate
  watch(() => props.score, (newScore, oldScore) => {
    if (newScore !== oldScore && mounted.value) {
      animateScore()
    }
  })
  </script>
  
  <!-- 
    🔗 HOW THIS SCORE CARD COMPONENT WORKS:
    
    📋 PURPOSE:
    - Displays individual scores with animated circular progress rings
    - Provides visual feedback through color coding and labels
    - Supports comparison with previous scores
    - Integrates seamlessly with semantic theme system
    
    🎨 VISUAL ELEMENTS:
    - Circular progress ring with smooth animation
    - Animated score counter that counts up from 0
    - Color-coded styling based on performance
    - Optional icon badge in top-right corner
    - Score label with semantic background colors
    
    📊 SCORE VISUALIZATION:
    - Progress ring fills based on score/maxScore ratio
    - Color changes based on performance thresholds
    - Label text reflects score quality (Excellent/Good/Poor)
    - Optional percentage display for keyword matching
    
    🎬 ANIMATIONS:
    - 1-second progress ring animation with ease-out
    - Animated score counter with smooth easing
    - Smooth color transitions on theme changes
    - Staggered entrance when multiple cards are shown
    
    🎯 SEMANTIC THEME INTEGRATION:
    - Uses semantic color classes (success/warning/error)
    - Adapts to theme changes automatically
    - Consistent with overall design system
    - Proper contrast ratios maintained
    
    📱 RESPONSIVE DESIGN:
    - Fixed 24x24 (96px) size for consistency
    - Scales well on mobile devices
    - Touch-friendly spacing and sizing
    - Works in grid layouts
    
    🔧 PROPS INTERFACE:
    - score: The numeric score to display
    - maxScore: Maximum possible score (default 100)
    - title: Main heading for the score
    - description: Subtitle explaining what's measured
    - color: Semantic color class for theming
    - label: Performance label (Excellent/Good/etc.)
    - icon: Optional icon name for badge
    - isPercentage: Whether to show % symbol
    - showImprovement: Whether to show comparison arrows
    - previousScore: Previous score for comparison
    
    📊 USAGE EXAMPLES:
    
    <!-- ATS Compatibility Score -->
    <ScoreCard
      :score="85"
      title="ATS Compatibility"
      description="Format & Parsing"
      color="text-success-dark"
      label="Excellent"
      icon="heroicons:document-check"
    />
    
    <!-- Keyword Match Percentage -->
    <ScoreCard
      :score="65"
      title="Keyword Match"
      description="Term Alignment"
      color="text-success-dark"
      label="Optimal Range"
      icon="heroicons:key"
      :is-percentage="true"
    />
    
    <!-- With Improvement Tracking -->
    <ScoreCard
      :score="78"
      :previous-score="65"
      title="Job Match"
      description="Role Relevance"
      color="text-warning-dark"
      label="Good"
      :show-improvement="true"
    />
    
    🎯 COLOR CODING LOGIC:
    - Green (success): 80+ scores - excellent performance
    - Yellow (warning): 60-79 scores - good but improvable
    - Red (error): <60 scores - needs significant work
    - Special: Keyword 50-70% is optimal (green)
    
    🔄 ANIMATION TIMING:
    - Progress ring: 1000ms ease-out
    - Score counter: 1000ms with easing
    - Color transitions: 200ms for theme changes
    - Entrance delay: Can be staggered in parent
    
    🚫 WHAT IT DOESN'T DO:
    - Calculate scores (receives via props)
    - Handle click interactions (pure display)
    - Manage state (stateless except for animations)
    - Fetch data (presentation component only)
  -->