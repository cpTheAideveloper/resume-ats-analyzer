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
        'border-red-400 bg-red-50': hasError,
        'border-green-400 bg-green-50': resumeStore.uploadStatus === 'success'
      }"
    >
      <div class="flex flex-col items-center space-y-2">
        <!-- Upload Icon with status -->
        <Icon 
          v-if="resumeStore.uploadStatus === 'idle' || resumeStore.uploadStatus === 'error'"
          name="heroicons:cloud-arrow-up" 
          class="w-8 h-8"
          :class="hasError ? 'text-red-400' : 'text-gray-400'"
        />
        <Icon 
          v-else-if="resumeStore.uploadStatus === 'uploading' || resumeStore.uploadStatus === 'processing'"
          name="heroicons:arrow-path" 
          class="w-8 h-8 text-blue-500 animate-spin"
        />
        <Icon 
          v-else-if="resumeStore.uploadStatus === 'success'"
          name="heroicons:check-circle" 
          class="w-8 h-8 text-green-500"
        />
        
        <!-- Upload Text with status -->
        <div class="space-y-1">
          <p class="text-sm font-medium text-gray-600">
            <span v-if="resumeStore.uploadStatus === 'idle'">
              <span class="text-blue-600">Click to upload</span> or drag and drop
            </span>
            <span v-else-if="resumeStore.uploadStatus === 'uploading'">
              Uploading...
            </span>
            <span v-else-if="resumeStore.uploadStatus === 'processing'">
              Processing document...
            </span>
            <span v-else-if="resumeStore.uploadStatus === 'success'" class="text-green-600">
              Upload successful!
            </span>
            <span v-else-if="resumeStore.uploadStatus === 'error'" class="text-red-600">
              Upload failed - click to retry
            </span>
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
      :disabled="isUploading"
    />

    <!-- Upload Progress -->
    <div v-if="resumeStore.uploadStatus === 'uploading'" class="w-full mt-3">
      <div class="flex items-center justify-between text-sm text-gray-600 mb-1">
        <span>Uploading...</span>
        <span>{{ resumeStore.uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${resumeStore.uploadProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Selected File Display (from store) -->
    <div v-if="resumeStore.isFileUploaded && resumeStore.uploadStatus === 'success'" class="flex items-center justify-between w-full p-3 mt-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center space-x-3">
        <Icon 
          name="heroicons:document-text" 
          class="w-5 h-5 text-green-600" 
        />
        <div class="flex flex-col">
          <p class="text-sm font-medium text-gray-900">{{ resumeStore.resumeFile?.name }}</p>
          <div class="flex items-center space-x-2 text-xs text-gray-500">
            <span>{{ fileTypeDescription }}</span>
            <span>•</span>
            <span>{{ formattedFileSize }}</span>
            <span>•</span>
            <span>{{ resumeStore.wordCount }} words</span>
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

    <!-- Store Upload Error -->
    <div v-if="resumeStore.uploadError" class="w-full mt-3">
      <div class="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <p class="text-sm text-red-600">{{ resumeStore.uploadError }}</p>
          <button 
            @click="retryUpload"
            class="mt-2 text-xs text-red-700 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
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
    <div v-if="resumeStore.isFileUploaded && showFileInfo && resumeStore.uploadStatus === 'success'" class="w-full p-3 mt-3 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="text-sm font-medium text-blue-900 mb-2">File Analysis:</h4>
      <div class="text-xs text-blue-800 space-y-1">
        <p>✅ Document processed successfully</p>
        <p>📊 {{ resumeStore.wordCount }} words, {{ resumeStore.charCount }} characters</p>
        <p v-if="isLikelyScanned">📄 This appears to be a scanned document</p>
        <p v-if="fileSize > recommendedMaxSize">💡 Consider optimizing file size for faster processing</p>
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

// Use the Pinia store
const resumeStore = useResumeStore()

// Props (simplified - most functionality now handled by store)
interface FileUploadProps {
  maxSize?: number // in MB
  showFileInfo?: boolean
  strictValidation?: boolean
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  maxSize: 10,
  showFileInfo: true,
  strictValidation: true
})

// Local reactive variables (only for UI state, not file data)
const fileInput = ref<HTMLInputElement>()
const validationErrors = ref<string[]>([])
const validationWarnings = ref<string[]>([])
const isDragging = ref(false)

// Computed properties
const hasError = computed(() => 
  validationErrors.value.length > 0 || resumeStore.uploadStatus === 'error'
)
const maxSizeMB = computed(() => props.maxSize)
const recommendedMaxSize = RECOMMENDED_MAX_SIZE

const isUploading = computed(() => 
  resumeStore.uploadStatus === 'uploading' || resumeStore.uploadStatus === 'processing'
)

const fileTypeDescription = computed(() => {
  if (!resumeStore.resumeFile) return ''
  return getFileTypeDescription(resumeStore.resumeFile.file)
})

const formattedFileSize = computed(() => {
  if (!resumeStore.resumeFile) return ''
  return formatFileSize(resumeStore.resumeFile.size)
})

const fileSize = computed(() => resumeStore.resumeFile?.size || 0)

const isLikelyScanned = computed(() => {
  if (!resumeStore.resumeFile) return false
  return isLikelyScannedResume(resumeStore.resumeFile.file)
})

// Functions
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

function handleDrop(event: DragEvent) {
  isDragging.value = false
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0] && !isUploading.value) {
    processFile(event.dataTransfer.files[0])
  }
}

async function processFile(file: File) {
  console.log('Processing file:', file.name)
  
  // Clear previous validation state
  clearValidationState()
  
  // Validate file using our utility
  const validation = validateResumeFile(file, {
    maxSizeBytes: props.maxSize * 1024 * 1024,
    strictTypeChecking: props.strictValidation
  })
  
  console.log('Validation result:', validation)
  
  // Handle validation results
  if (validation.isValid) {
    // File is valid - upload via store
    validationWarnings.value = validation.warnings
    
    // Use store to upload file
    const result = await resumeStore.uploadFile(file)
    
    if (!result.success) {
      console.error('Upload failed:', result.error)
    }
  } else {
    // File has errors - show them
    validationErrors.value = validation.errors
  }
}

function clearFile() {
  clearValidationState()
  resumeStore.clearFile()
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function retryUpload() {
  clearValidationState()
  await resumeStore.retryUpload()
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