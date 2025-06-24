<template>
    <div class="flex flex-col w-full max-w-md mx-auto">
      <!-- Main Upload Area -->
      <div
        @drop.prevent="handleDrop"
        @dragover.prevent
        @dragenter.prevent
        @click="triggerFileInput"
        class="flex flex-col items-center justify-center w-full h-32 p-6 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all duration-200"
        :class="{ 
          'border-blue-400 bg-blue-50': isDragging,
          'border-red-400 bg-red-50': hasError 
        }"
      >
        <div class="flex flex-col items-center space-y-2">
          <!-- Upload Icon -->
          <Icon 
            name="heroicons:cloud-arrow-up" 
            class="w-8 h-8"
            :class="hasError ? 'text-red-400' : 'text-gray-400'"
          />
          
          <!-- Upload Text -->
          <div class="space-y-1">
            <p class="text-sm font-medium text-gray-600">
              <span class="text-blue-600">Click to upload</span>
              or drag and drop
            </p>
            <p class="text-xs text-gray-500">
              PDF or DOCX files only (max {{ maxSizeMB }}MB)
            </p>
          </div>
        </div>
      </div>
  
      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        accept=".pdf,.docx"
        @change="handleFileSelect"
        class="hidden"
      />
  
      <!-- Selected File Display -->
      <div v-if="selectedFile && !hasError" class="flex items-center justify-between w-full p-3 mt-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center space-x-3">
          <Icon 
            name="heroicons:document-text" 
            class="w-5 h-5 text-green-600" 
          />
          <div class="flex flex-col">
            <p class="text-sm font-medium text-gray-900">{{ selectedFile.name }}</p>
            <div class="flex items-center space-x-2 text-xs text-gray-500">
              <span>{{ fileTypeDescription }}</span>
              <span>•</span>
              <span>{{ formattedFileSize }}</span>
            </div>
          </div>
        </div>
        
        <!-- Remove File Button -->
        <button
          @click="clearFile"
          class="flex items-center justify-center w-6 h-6 text-gray-400 rounded hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>
  
      <!-- Validation Errors -->
      <div v-if="validationErrors.length > 0" class="w-full mt-3 space-y-2">
        <div 
          v-for="error in validationErrors" 
          :key="error"
          class="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>
  
      <!-- Validation Warnings -->
      <div v-if="validationWarnings.length > 0" class="w-full mt-3 space-y-2">
        <div 
          v-for="warning in validationWarnings" 
          :key="warning"
          class="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p class="text-sm text-yellow-700">{{ warning }}</p>
        </div>
      </div>
  
      <!-- File Analysis Info -->
      <div v-if="selectedFile && !hasError && showFileInfo" class="w-full p-3 mt-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-sm font-medium text-blue-900 mb-2">File Analysis:</h4>
        <div class="text-xs text-blue-800 space-y-1">
          <p v-if="isLikelyScanned">📄 This appears to be a scanned document</p>
          <p v-if="fileSize > recommendedMaxSize">💡 Consider optimizing file size for faster processing</p>
          <p v-if="fileSize < 1024">⚠️ File seems very small for a resume</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { 
    validateResumeFile, 
    formatFileSize, 
    getFileTypeDescription, 
    isLikelyScannedResume,
    RECOMMENDED_MAX_SIZE,
    type FileValidationResult 
  } from '~/utils/fileValidator'
  
  // Props and emits
  interface FileUploadProps {
    maxSize?: number // in MB
    showFileInfo?: boolean
    strictValidation?: boolean
  }
  
  interface FileUploadEmits {
    (e: 'file-selected', file: File, validation: FileValidationResult): void
    (e: 'file-cleared'): void
    (e: 'validation-error', errors: string[]): void
    (e: 'validation-warning', warnings: string[]): void
  }
  
  const props = withDefaults(defineProps<FileUploadProps>(), {
    maxSize: 10,
    showFileInfo: true,
    strictValidation: true
  })
  
  const emit = defineEmits<FileUploadEmits>()
  
  // Reactive variables
  const fileInput = ref<HTMLInputElement>()
  const selectedFile = ref<File | null>(null)
  const validationErrors = ref<string[]>([])
  const validationWarnings = ref<string[]>([])
  const isDragging = ref(false)
  const validationResult = ref<FileValidationResult | null>(null)
  
  // Computed properties
  const hasError = computed(() => validationErrors.value.length > 0)
  const maxSizeMB = computed(() => props.maxSize)
  const recommendedMaxSize = RECOMMENDED_MAX_SIZE
  
  const fileTypeDescription = computed(() => {
    if (!selectedFile.value) return ''
    return getFileTypeDescription(selectedFile.value)
  })
  
  const formattedFileSize = computed(() => {
    if (!selectedFile.value) return ''
    return formatFileSize(selectedFile.value.size)
  })
  
  const fileSize = computed(() => selectedFile.value?.size || 0)
  
  const isLikelyScanned = computed(() => {
    if (!selectedFile.value) return false
    return isLikelyScannedResume(selectedFile.value)
  })
  
  // Functions
  function triggerFileInput() {
    fileInput.value?.click()
  }
  
  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      processFile(target.files[0])
    }
  }
  
  function handleDrop(event: DragEvent) {
    isDragging.value = false
    
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0])
    }
  }
  
  function processFile(file: File) {
    console.log('Processing file:', file.name)
    
    // Clear previous state
    clearValidationState()
    
    // Validate file using our utility
    const validation = validateResumeFile(file, {
      maxSizeBytes: props.maxSize * 1024 * 1024,
      strictTypeChecking: props.strictValidation
    })
    
    console.log('Validation result:', validation)
    
    // Store validation result
    validationResult.value = validation
    
    // Handle validation results
    if (validation.isValid) {
      // File is valid - accept it
      selectedFile.value = file
      validationWarnings.value = validation.warnings
      
      // Emit success events
      emit('file-selected', file, validation)
      
      if (validation.warnings.length > 0) {
        emit('validation-warning', validation.warnings)
      }
    } else {
      // File has errors - reject it
      validationErrors.value = validation.errors
      selectedFile.value = null
      
      // Emit error event
      emit('validation-error', validation.errors)
    }
  }
  
  function clearFile() {
    clearValidationState()
    selectedFile.value = null
    validationResult.value = null
    
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    
    emit('file-cleared')
  }
  
  function clearValidationState() {
    validationErrors.value = []
    validationWarnings.value = []
  }
  
  // Drag and drop listeners
  onMounted(() => {
    document.addEventListener('dragenter', (e) => {
      e.preventDefault()
      isDragging.value = true
    })
    
    document.addEventListener('dragleave', (e) => {
      e.preventDefault()
      if (!e.relatedTarget) {
        isDragging.value = false
      }
    })
    
    document.addEventListener('drop', (e) => {
      e.preventDefault()
      isDragging.value = false
    })
  })
  </script>