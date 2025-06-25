<!-- 
  📍 COMPONENT LOCATION: components/navbar/NavbarTheme.vue
  🎯 PURPOSE: Theme switcher for navbar sidebar
  🔧 PHASE: Phase 5 - Core Theme System & Navigation
-->

<template>
    <div class="space-y-3">
      <!-- Current Theme Display -->
      <div class="flex items-center justify-between p-3 bg-surface-tertiary rounded-lg border border-border-secondary">
        <div class="flex items-center space-x-2">
          <div 
            class="w-4 h-4 rounded-full border border-border-accent"
            :style="{ backgroundColor: currentThemeColor }"
          ></div>
          <span class="text-sm font-medium text-content-base capitalize">
            {{ currentTheme }} Theme
          </span>
        </div>
        <Icon name="heroicons:paint-brush" class="w-4 h-4 text-content-tertiary" />
      </div>
  
      <!-- Theme Options Grid -->
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="setTheme(theme.id)"
          class="flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-all duration-200 group hover:scale-[1.02]"
          :class="[
            currentTheme === theme.id
              ? 'border-primary bg-primary-light'
              : 'border-border-secondary bg-surface hover:bg-surface-tertiary hover:border-border-accent'
          ]"
        >
          <!-- Theme Color Preview -->
          <div class="flex space-x-1">
            <div 
              class="w-3 h-3 rounded-full border border-border-accent"
              :style="{ backgroundColor: theme.colors.primary }"
            ></div>
            <div 
              class="w-3 h-3 rounded-full border border-border-accent"
              :style="{ backgroundColor: theme.colors.surface }"
            ></div>
            <div 
              class="w-3 h-3 rounded-full border border-border-accent"
              :style="{ backgroundColor: theme.colors.accent }"
            ></div>
          </div>
  
          <!-- Theme Name -->
          <span 
            class="text-xs font-medium transition-colors duration-200"
            :class="[
              currentTheme === theme.id 
                ? 'text-primary-dark' 
                : 'text-content-secondary group-hover:text-content-base'
            ]"
          >
            {{ theme.name }}
          </span>
  
          <!-- Active Indicator -->
          <div 
            v-if="currentTheme === theme.id"
            class="w-2 h-2 bg-primary rounded-full animate-pulse"
          ></div>
        </button>
      </div>
  
      <!-- Theme Actions -->
      <div class="flex space-x-2">
        <button
          @click="toggleSystemTheme"
          class="flex-1 text-xs py-2 px-3 bg-surface border border-border-secondary rounded-lg hover:bg-surface-tertiary transition-colors"
          :class="[
            isSystemTheme ? 'text-primary border-primary/20 bg-primary-light' : 'text-content-secondary'
          ]"
        >
          <Icon name="heroicons:computer-desktop" class="w-3 h-3 mr-1 inline" />
          Auto
        </button>
        <button
          @click="resetTheme"
          class="flex-1 text-xs py-2 px-3 bg-surface border border-border-secondary rounded-lg hover:bg-surface-tertiary hover:text-content-base transition-colors text-content-secondary"
        >
          <Icon name="heroicons:arrow-path" class="w-3 h-3 mr-1 inline" />
          Reset
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 🎨 THEME CONFIGURATION
  const themes = [
    {
      id: 'light',
      name: 'Light',
      colors: {
        primary: '#2563eb',
        surface: '#ffffff',
        accent: '#f3f4f6'
      }
    },
    {
      id: 'dark',
      name: 'Dark',
      colors: {
        primary: '#3b82f6',
        surface: '#0f172a',
        accent: '#1e293b'
      }
    },
    {
      id: 'ocean',
      name: 'Ocean',
      colors: {
        primary: '#0891b2',
        surface: '#ffffff',
        accent: '#cffafe'
      }
    },
    {
      id: 'forest',
      name: 'Forest',
      colors: {
        primary: '#16a34a',
        surface: '#ffffff',
        accent: '#dcfce7'
      }
    },
    {
      id: 'sunset',
      name: 'Sunset',
      colors: {
        primary: '#ea580c',
        surface: '#ffffff',
        accent: '#fed7aa'
      }
    },
    {
      id: 'purple',
      name: 'Purple',
      colors: {
        primary: '#7c3aed',
        surface: '#ffffff',
        accent: '#ede9fe'
      }
    }
  ]
  
  // 📱 LOCAL STATE
  const currentTheme = ref('light')
  const isSystemTheme = ref(false)
  
  // 🔍 COMPUTED
  const currentThemeColor = computed(() => {
    const theme = themes.find(t => t.id === currentTheme.value)
    return theme?.colors.primary || '#2563eb'
  })
  
  // 🎬 FUNCTIONS
  function setTheme(themeId: string) {
    currentTheme.value = themeId
    isSystemTheme.value = false
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', themeId)
    
    // Save preference (future: implement persistence)
    localStorage.setItem('theme', themeId)
    
    console.log('🎨 Theme changed to:', themeId)
  }
  
  function toggleSystemTheme() {
    isSystemTheme.value = !isSystemTheme.value
    
    if (isSystemTheme.value) {
      // Use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      localStorage.setItem('theme', 'system')
    } else {
      // Use manual selection
      setTheme(currentTheme.value)
    }
  }
  
  function resetTheme() {
    setTheme('light')
    isSystemTheme.value = false
    localStorage.removeItem('theme')
  }
  
  // 🔄 LIFECYCLE
  onMounted(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'system') {
      toggleSystemTheme()
    } else if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setTheme(savedTheme)
    } else {
      // Check system preference as fallback
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (isSystemTheme.value) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    })
  })
  </script>
  
  <!-- 
    📍 COMPONENT LOCATION: components/navbar/NavbarTheme.vue
    🎯 PURPOSE: Theme switcher - completes the navbar component family
    
    📂 COMPLETE NAVBAR ORGANIZATION:
    components/navbar/
    ├── NavbarSidebar.vue     ✅ Main sidebar container
    ├── NavbarToggle.vue      ✅ Floating toggle button
    ├── NavbarLink.vue        ✅ Navigation items
    └── NavbarTheme.vue       ✅ This component (theme switcher)
    
    🎯 ORGANIZATIONAL BENEFITS:
    ✅ All navigation-related components in one folder
    ✅ Clear naming convention with Navbar prefix
    ✅ No unnecessary Pinia store for simple UI state
    ✅ Each component has single responsibility
    ✅ Easy to find, maintain, and test
    ✅ Props/events provide clean communication
    
    🎨 THEME FEATURES:
    - Visual theme previews with color swatches
    - Current theme indicator
    - System theme detection and auto-switching
    - Theme persistence in localStorage
    - Reset functionality
    - Responsive grid layout
    
    📊 WHY LOCAL STATE INSTEAD OF PINIA:
    - Simple UI interactions don't need global state
    - Theme switching is handled by CSS and localStorage
    - Component-specific state is easier to reason about
    - Reduces complexity and bundle size
    - Follows principle of least complexity
  -->