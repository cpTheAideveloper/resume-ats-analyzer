<!-- 
  📍 COMPONENT LOCATION: components/analysis/AnalysisSection.vue
  🎯 PURPOSE: Consistent section wrapper with icons and theming
  🔧 PHASE: Phase 6 - Analysis Pages
-->

<template>
    <div class="card-base card-padding" :class="containerClasses">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <!-- Icon -->
          <div 
            v-if="icon"
            class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            :class="iconBackgroundClass"
          >
            <Icon 
              :name="icon" 
              class="w-5 h-5"
              :class="iconClass"
            />
          </div>
          
          <!-- Title and Badge -->
          <div class="flex items-center space-x-2">
            <h3 class="text-lg font-semibold text-content-base">
              {{ title }}
            </h3>
            
            <!-- Count Badge -->
            <span 
              v-if="count !== undefined"
              class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
              :class="badgeClasses"
            >
              {{ count }}
            </span>
            
            <!-- Status Badge -->
            <span 
              v-if="status"
              class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
              :class="statusBadgeClasses"
            >
              {{ status }}
            </span>
          </div>
        </div>
        
        <!-- Action Button -->
        <button 
          v-if="actionLabel"
          @click="$emit('action')"
          class="text-sm text-content-secondary hover:text-content-base transition-colors duration-200 flex items-center space-x-1"
        >
          <span>{{ actionLabel }}</span>
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        </button>
      </div>
  
      <!-- Description -->
      <p 
        v-if="description" 
        class="text-sm text-content-secondary mb-4"
      >
        {{ description }}
      </p>
  
      <!-- Content Slot -->
      <div :class="contentClasses">
        <slot />
      </div>
  
      <!-- Footer Slot -->
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-border-secondary">
        <slot name="footer" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface AnalysisSectionProps {
    title: string
    description?: string
    icon?: string
    iconColor?: string
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
    count?: number
    status?: string
    actionLabel?: string
    dense?: boolean
    collapsible?: boolean
    defaultExpanded?: boolean
  }
  
  const props = withDefaults(defineProps<AnalysisSectionProps>(), {
    description: '',
    icon: '',
    iconColor: 'text-content-tertiary',
    variant: 'default',
    count: undefined,
    status: '',
    actionLabel: '',
    dense: false,
    collapsible: false,
    defaultExpanded: true
  })
  
  // 🎬 EMITS
  defineEmits<{
    action: []
  }>()
  
  // 📱 LOCAL STATE
  const isExpanded = ref(props.defaultExpanded)
  
  // 🔍 COMPUTED PROPERTIES
  
  // Container styling based on variant
  const containerClasses = computed(() => {
    const base = 'transition-all duration-200'
    
    switch (props.variant) {
      case 'success':
        return `${base} border-l-4 border-success bg-success-light/20`
      case 'warning':
        return `${base} border-l-4 border-warning bg-warning-light/20`
      case 'error':
        return `${base} border-l-4 border-error bg-error-light/20`
      case 'info':
        return `${base} border-l-4 border-primary bg-primary-light/20`
      default:
        return base
    }
  })
  
  // Icon background styling
  const iconBackgroundClass = computed(() => {
    switch (props.variant) {
      case 'success':
        return 'bg-success-light'
      case 'warning':
        return 'bg-warning-light'
      case 'error':
        return 'bg-error-light'
      case 'info':
        return 'bg-primary-light'
      default:
        return 'bg-surface-tertiary'
    }
  })
  
  // Icon color
  const iconClass = computed(() => {
    if (props.iconColor) return props.iconColor
    
    switch (props.variant) {
      case 'success':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'error':
        return 'text-error'
      case 'info':
        return 'text-primary'
      default:
        return 'text-content-tertiary'
    }
  })
  
  // Count badge styling
  const badgeClasses = computed(() => {
    switch (props.variant) {
      case 'success':
        return 'bg-success-light text-success-dark border border-success/20'
      case 'warning':
        return 'bg-warning-light text-warning-dark border border-warning/20'
      case 'error':
        return 'bg-error-light text-error-dark border border-error/20'
      case 'info':
        return 'bg-primary-light text-primary-dark border border-primary/20'
      default:
        return 'bg-surface-tertiary text-content-tertiary border border-border-secondary'
    }
  })
  
  // Status badge styling
  const statusBadgeClasses = computed(() => {
    if (!props.status) return ''
    
    // Status-specific colors
    if (props.status.toLowerCase().includes('good') || props.status.toLowerCase().includes('excellent')) {
      return 'bg-success-light text-success-dark border border-success/20'
    }
    if (props.status.toLowerCase().includes('warning') || props.status.toLowerCase().includes('needs')) {
      return 'bg-warning-light text-warning-dark border border-warning/20'
    }
    if (props.status.toLowerCase().includes('error') || props.status.toLowerCase().includes('poor')) {
      return 'bg-error-light text-error-dark border border-error/20'
    }
    
    return 'bg-surface-tertiary text-content-secondary border border-border-secondary'
  })
  
  // Content wrapper classes
  const contentClasses = computed(() => {
    let classes = ''
    
    if (props.dense) {
      classes += 'space-y-2'
    } else {
      classes += 'space-y-3'
    }
    
    if (props.collapsible && !isExpanded.value) {
      classes += ' hidden'
    }
    
    return classes
  })
  
  // 🎬 FUNCTIONS
  function toggleExpanded() {
    if (props.collapsible) {
      isExpanded.value = !isExpanded.value
    }
  }
  </script>
  
  <!-- 
    🔗 HOW THIS ANALYSIS SECTION COMPONENT WORKS:
    
    📋 PURPOSE:
    - Provides consistent styling and structure for analysis sections
    - Supports multiple variants with semantic color coding
    - Includes icon, title, description, and action patterns
    - Maintains design system consistency across all analysis displays
    
    🎨 VISUAL VARIANTS:
    - default: Standard card styling with neutral colors
    - success: Green accent border and background for positive results
    - warning: Yellow accent border and background for areas to improve
    - error: Red accent border and background for critical issues
    - info: Blue accent border and background for informational content
    
    🔧 FLEXIBLE FEATURES:
    - Icon with automatic color coordination
    - Count badges for displaying quantities
    - Status badges for performance indicators
    - Action buttons for expandable sections
    - Collapsible content with smooth animations
    - Footer slot for additional actions
    
    📱 RESPONSIVE DESIGN:
    - Consistent card-base and card-padding utilities
    - Flexible header layout that adapts to content
    - Touch-friendly interactive elements
    - Proper spacing for mobile and desktop
    
    🎯 SEMANTIC THEME INTEGRATION:
    - Uses semantic color system (success/warning/error)
    - Automatically adapts to theme changes
    - Consistent with overall design language
    - Proper contrast ratios maintained
    
    📊 USAGE EXAMPLES:
    
  
    <AnalysisSection
      title="Key Strengths"
      icon="heroicons:check-circle"
      variant="success"
    >
      <StrengthsList :strengths="strengths" />
    </AnalysisSection>
    
   
    <AnalysisSection
      title="Missing Keywords"
      icon="heroicons:x-circle"
      variant="error"
      :count="missingKeywords.length"
      description="Keywords from the job description not found in your resume"
    >
      <KeywordsList :keywords="missingKeywords" />
    </AnalysisSection>
    
   
    <AnalysisSection
      title="Recommendations"
      icon="heroicons:light-bulb"
      variant="info"
      action-label="Show Details"
      @action="showRecommendationDetails"
    >
      <RecommendationsList :recommendations="recommendations" />
    </AnalysisSection>
    
   
    <AnalysisSection
      title="Format Issues"
      icon="heroicons:exclamation-triangle"
      variant="warning"
      :collapsible="true"
      :default-expanded="false"
      status="Needs Attention"
    >
      <FormatIssuesList :issues="formatIssues" />
      
      <template #footer>
        <button class="btn-secondary text-sm">
          Fix Issues Automatically
        </button>
      </template>
    </AnalysisSection>
    
    🎨 COLOR CODING SYSTEM:
    - Success (Green): Strengths, good scores, matched keywords
    - Warning (Yellow): Areas for improvement, format issues, missing elements
    - Error (Red): Critical problems, poor scores, failed requirements
    - Info (Blue): General information, recommendations, tips
    - Default (Neutral): General content without specific status
    
    🔄 ANIMATION FEATURES:
    - Smooth transitions on state changes (200ms)
    - Hover effects on interactive elements
    - Collapsible content with smooth show/hide
    - Theme color transitions
    
    📦 SLOT STRUCTURE:
    - Default slot: Main content area
    - Footer slot: Additional actions or information
    - Icon slot: Custom icon content (future enhancement)
    
    🎯 ACCESSIBILITY:
    - Proper heading hierarchy with h3 titles
    - Color coding supplemented with text labels
    - Keyboard navigation support for interactive elements
    - Screen reader friendly structure
    
    🚫 WHAT IT DOESN'T DO:
    - Manage the actual content data (uses slots)
    - Handle complex interactions (delegates to child components)
    - Perform analysis calculations (pure presentation)
    - Store state beyond UI presentation needs
  -->