<!-- 
  📍 COMPONENT LOCATION: components/resume/ResumeUploader.vue
  🎯 PURPOSE: Attractive animated file upload interface for resumes
-->

<template>
  <div class="flex flex-col w-full max-w-lg mx-auto space-y-4 h-full">
    <!-- Main Upload Area - Enhanced with animations -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @click="triggerFileInput"
      class="relative flex flex-col items-center justify-center w-full p-12 text-center border-3 h-full border-dashed rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden group"
      :class="uploadAreaClasses"
      style="min-height: 280px;"
    >
      <!-- Animated Background Gradient -->
      <div 
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        :class="{
          'opacity-100': isDragging || isUploading,
          'opacity-0': !isDragging && !isUploading
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient-xy"></div>
      </div>

      <!-- Floating particles animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="i in 6" 
          :key="i"
          class="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
          :style="{ 
            left: `${15 + (i * 12)}%`, 
            top: `${20 + (i * 8)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i * 0.5)}s`
          }"
        ></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6">
        <!-- Animated Icon Container -->
        <div class="relative">
          <!-- Pulsing background circle -->
          <div 
            class="absolute inset-0 rounded-full animate-ping"
            :class="{
              'bg-blue-200': resumeStore.uploadStatus === 'idle',
              'bg-green-200': resumeStore.uploadStatus === 'success',
              'bg-red-200': resumeStore.uploadStatus === 'error'
            }"
            style="animation-duration: 2s;"
          ></div>
          
          <!-- Icon with enhanced animations -->
          <div 
            class="relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform"
            :class="{
              'bg-blue-100 scale-110': isDragging,
              'bg-green-100': resumeStore.uploadStatus === 'success',
              'bg-red-100': resumeStore.uploadStatus === 'error',
              'bg-gray-100 group-hover:bg-blue-100 group-hover:scale-105': resumeStore.uploadStatus === 'idle'
            }"
          >
            <!-- Status Icon with animations -->
            <Icon 
              :name="statusIcon" 
              class="transition-all duration-300"
              :class="iconClasses"
            />
          </div>
        </div>
        
        <!-- Animated Text Content -->
        <div class="space-y-4">
          <div class="space-y-2">
            <h3 
              class="text-2xl font-bold transition-all duration-300"
              :class="textClasses"
            >
              {{ statusTitle }}
            </h3>
            <p 
              class="text-lg transition-all duration-300"
              :class="subtitleClasses"
            >
              {{ statusSubtitle }}
            </p>
          </div>
          
          <!-- File type info with icons -->
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:document-text" class="w-4 h-4 text-red-500" />
              <span>PDF</span>
            </div>
            <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:document" class="w-4 h-4 text-blue-500" />
              <span>DOCX</span>
            </div>
            <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>Max 10MB</span>
          </div>
        </div>

        <!-- Drag & Drop Visual Indicator -->
        <div 
          class="flex items-center space-x-2 text-gray-400 transition-all duration-300"
          :class="{
            'text-blue-500 scale-105': isDragging,
            'group-hover:text-gray-600': !isDragging
          }"
        >
          <Icon name="heroicons:cursor-arrow-rays" class="w-5 h-5 animate-bounce" />
          <span class="font-medium">{{ dragText }}</span>
          <Icon name="heroicons:cursor-arrow-rays" class="w-5 h-5 animate-bounce" style="animation-delay: 0.1s;" />
        </div>
      </div>

      <!-- Upload Progress Ring -->
      <div 
        v-if="resumeStore.uploadStatus === 'uploading'" 
        class="absolute inset-6"
      >
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="2"
            fill="transparent"
            class="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="3"
            fill="transparent"
            stroke-linecap="round"
            class="text-blue-500 transition-all duration-300"
            :stroke-dasharray="`${2 * Math.PI * 45}`"
            :stroke-dashoffset="`${2 * Math.PI * 45 * (1 - resumeStore.uploadProgress / 100)}`"
          />
        </svg>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept=".pdf,.docx"
      @change="handleFileSelect"
      class="hidden"
      :disabled="isUploading"
    />

    <!-- Upload Progress Bar (Alternative) -->
    <div v-if="resumeStore.uploadStatus === 'uploading'" class="w-full">
      <div class="flex items-center justify-between text-base text-gray-700 mb-3 font-medium">
        <span>Uploading your resume...</span>
        <span class="text-blue-600">{{ resumeStore.uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 relative"
          :style="{ width: `${resumeStore.uploadProgress}%` }"
        >
          <!-- Shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>

    <!-- Validation Errors -->
    <div v-if="validationErrors.length > 0" class="space-y-3">
      <div 
        v-for="error in validationErrors" 
        :key="error"
        class="flex items-start space-x-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl animate-slideIn"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0 animate-pulse" />
        <p class="text-base text-red-700 font-medium">{{ error }}</p>
      </div>
    </div>

    <!-- Upload Error with Retry -->
    <div v-if="resumeStore.uploadError" class="space-y-3">
      <div class="flex items-start space-x-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl animate-slideIn">
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <p class="text-base text-red-700 font-medium">{{ resumeStore.uploadError }}</p>
          <button 
            @click="retryUpload"
            class="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
            Try again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validateResumeFile } from '~/utils/fileValidator'

// 🏪 PINIA STORE CONNECTION
const resumeStore = useResumeStore()

// 📱 LOCAL STATE
const fileInput = ref<HTMLInputElement>()
const validationErrors = ref<string[]>([])
const isDragging = ref(false)
const dragCounter = ref(0) // Track drag events properly

// 🔍 COMPUTED PROPERTIES
const isUploading = computed(() => 
  resumeStore.uploadStatus === 'uploading' || resumeStore.uploadStatus === 'processing'
)

const uploadAreaClasses = computed(() => ({
  // Base styles
  'border-gray-300 bg-gray-50/50': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  
  // Dragging state
  'border-blue-400 bg-blue-50 scale-[1.02] shadow-lg border-solid': isDragging.value,
  
  // Uploading state
  'border-blue-400 bg-blue-50/80 border-solid': isUploading.value,
  
  // Success state
  'border-green-400 bg-green-50 border-solid': resumeStore.uploadStatus === 'success',
  
  // Error state
  'border-red-400 bg-red-50 border-solid': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0,
  
  // Hover state
  'hover:border-gray-400 hover:bg-gray-100/50 hover:scale-[1.01] hover:shadow-md': 
    resumeStore.uploadStatus === 'idle' && !isDragging.value && !isUploading.value
}))

const statusIcon = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
    case 'processing':
      return 'heroicons:arrow-path'
    case 'success':
      return 'heroicons:check-circle'
    case 'error':
      return 'heroicons:exclamation-triangle'
    default:
      return isDragging.value ? 'heroicons:document-plus' : 'heroicons:cloud-arrow-up'
  }
})

const iconClasses = computed(() => ({
  'w-10 h-10': true,
  'text-gray-500 group-hover:text-blue-500': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-blue-500 animate-spin': isUploading.value,
  'text-green-500 animate-bounce': resumeStore.uploadStatus === 'success',
  'text-red-500 animate-pulse': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0,
  'text-blue-600 animate-pulse': isDragging.value
}))

const textClasses = computed(() => ({
  'text-gray-700 group-hover:text-gray-900': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-blue-700': isUploading.value || isDragging.value,
  'text-green-700': resumeStore.uploadStatus === 'success',
  'text-red-700': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0
}))

const subtitleClasses = computed(() => ({
  'text-gray-600 group-hover:text-gray-700': resumeStore.uploadStatus === 'idle' && !isDragging.value,
  'text-blue-600': isUploading.value || isDragging.value,
  'text-green-600': resumeStore.uploadStatus === 'success',
  'text-red-600': resumeStore.uploadStatus === 'error' || validationErrors.value.length > 0
}))

const statusTitle = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
      return 'Uploading Resume...'
    case 'processing':
      return 'Processing Document...'
    case 'success':
      return 'Upload Successful!'
    case 'error':
      return 'Upload Failed'
    default:
      return isDragging.value ? 'Drop Your Resume' : 'Upload Your Resume'
  }
})

const statusSubtitle = computed(() => {
  switch (resumeStore.uploadStatus) {
    case 'uploading':
      return 'Please wait while we upload your file'
    case 'processing':
      return 'Extracting text from your document'
    case 'success':
      return 'Your resume is ready for analysis'
    case 'error':
      return 'Click to try again'
    default:
      return isDragging.value ? 'Release to upload your file' : 'Click here or drag and drop your resume'
  }
})

const dragText = computed(() => {
  if (isDragging.value) return 'Drop it here!'
  if (isUploading.value) return 'Processing...'
  return 'Drag & Drop or Click'
})

// 🎬 FUNCTIONS
function triggerFileInput() {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  dragCounter.value++
  isDragging.value = true
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  dragCounter.value = 0
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0] && !isUploading.value) {
    processFile(event.dataTransfer.files[0])
  }
}

async function processFile(file: File) {
  // Clear previous errors
  validationErrors.value = []
  
  // Validate file
  const validation = validateResumeFile(file, {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    strictTypeChecking: true
  })
  
  if (!validation.isValid) {
    validationErrors.value = validation.errors
    return
  }
  
  // Upload via store
  await resumeStore.uploadFile(file)
}

async function retryUpload() {
  validationErrors.value = []
  await resumeStore.retryUpload()
}
</script>

<style scoped>
@keyframes gradient-xy {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-gradient-xy {
  background-size: 200% 200%;
  animation: gradient-xy 3s ease infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
</style>

<!-- 
  🔗 HOW THIS COMPONENT WORKS:
  
  📋 PURPOSE:
  - Highly attractive and animated file upload interface
  - Multiple visual states with smooth transitions
  - Enhanced user feedback with animations and progress indicators
  - Larger, more engaging drop zone
  
  📊 STATE MANAGEMENT:
  - Uses useResumeStore() for file processing and status
  - Local state for drag interactions and validation
  - Proper drag event handling with counter
  
  🔌 CONNECTIONS:
  - stores/resume.ts: File upload and status management
  - utils/fileValidator.ts: File validation logic
  - server/api/upload.post.ts: Backend processing
  
  🎨 ANIMATIONS & EFFECTS:
  - Floating particles background animation
  - Gradient background transitions
  - Pulsing icon backgrounds
  - Progress ring for upload status
  - Shimmer effect on progress bar
  - Scale and shadow transitions on hover/drag
  - Color transitions based on status
  
  📱 ENHANCED FEATURES:
  - Larger drop zone (280px min-height)
  - Better visual hierarchy with larger text
  - File type indicators with icons
  - Animated drag & drop hints
  - Progress ring and bar animations
  - Enhanced error states with slide-in animations
  - Proper drag counter for accurate drag/leave detection
  
  🎯 INTERACTION STATES:
  - Idle: Subtle hover effects and invitation to upload
  - Dragging: Scale up, color change, animated feedback
  - Uploading: Progress ring, shimmer effects, status text
  - Success: Green state with celebration animations
  - Error: Red state with retry functionality
-->