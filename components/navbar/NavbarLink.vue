<!-- 
  📍 COMPONENT LOCATION: components/navbar/NavbarLink.vue
  🎯 PURPOSE: Individual navigation links for sidebar
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
    <component
      :is="linkComponent"
      :to="to"
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener noreferrer' : undefined"
      @click="handleClick"
      class="group flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-surface-tertiary hover:scale-[1.02] border border-transparent hover:border-border-secondary cursor-pointer"
      :class="[
        isActive ? 'bg-primary-light border-primary/20 text-primary-dark' : 'text-content-secondary hover:text-content-base'
      ]"
    >
      <!-- Icon -->
      <div 
        class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
        :class="[
          isActive 
            ? 'bg-primary text-primary-content' 
            : 'bg-surface-tertiary text-content-tertiary group-hover:bg-primary/10 group-hover:text-primary'
        ]"
      >
        <Icon :name="icon" class="w-4 h-4" />
      </div>
  
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <h4 
            class="text-sm font-medium transition-colors duration-200"
            :class="isActive ? 'text-primary-dark' : 'text-content-base group-hover:text-content-base'"
          >
            {{ label }}
          </h4>
          
          <!-- External link indicator -->
          <Icon 
            v-if="external" 
            name="heroicons:arrow-top-right-on-square" 
            class="w-3 h-3 text-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
          />
        </div>
        
        <p 
          class="text-xs mt-1 transition-colors duration-200"
          :class="isActive ? 'text-primary/80' : 'text-content-tertiary group-hover:text-content-secondary'"
        >
          {{ description }}
        </p>
      </div>
  
      <!-- Active indicator -->
      <div 
        v-if="isActive"
        class="flex-shrink-0 w-2 h-2 bg-primary rounded-full animate-pulse"
      ></div>
    </component>
  </template>
  
  <script setup lang="ts">
  // 🎛️ PROPS
  interface NavbarLinkProps {
    to?: string
    href?: string
    icon: string
    label: string
    description: string
    external?: boolean
  }
  
  const props = defineProps<NavbarLinkProps>()
  
  // 🎬 EMITS
  const emit = defineEmits<{
    click: [event: Event]
  }>()
  
  // 🧭 ROUTER
  const route = useRoute()
  
  // 🔍 COMPUTED
  const linkComponent = computed(() => {
    if (props.external || props.href) {
      return 'a'
    }
    return 'NuxtLink'
  })
  
  const isActive = computed(() => {
    if (!props.to) return false
    
    // Exact match for home page
    if (props.to === '/' && route.path === '/') {
      return true
    }
    
    // Path starts with the link path (for nested routes)
    if (props.to !== '/' && route.path.startsWith(props.to)) {
      return true
    }
    
    return false
  })
  
  // 🎬 FUNCTIONS
  function handleClick(event: Event) {
    emit('click', event)
  }
  </script>
  
  <!-- 
    📍 COMPONENT LOCATION: components/navbar/NavbarLink.vue
    🎯 PURPOSE: Navigation links - part of organized navbar component family
    
    📂 NAVBAR FAMILY STRUCTURE:
    components/navbar/
    ├── NavbarSidebar.vue     # Main container
    ├── NavbarToggle.vue      # Toggle button
    ├── NavbarLink.vue        # This component (navigation items)
    └── NavbarTheme.vue       # Theme switcher
    
    🎯 WHY ORGANIZED THIS WAY:
    ✅ Related components grouped together
    ✅ Clear naming convention (Navbar prefix)
    ✅ Single responsibility per component
    ✅ Easy to find and maintain
    ✅ No unnecessary global state (Pinia store)
    
    📊 COMPONENT COMMUNICATION:
    - Props: Configuration data flows down
    - Events: User interactions bubble up
    - Clean, predictable data flow
    - Easy to test each component in isolation
  -->