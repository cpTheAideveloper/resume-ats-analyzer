<!-- JobDescriptionInput.vue - components/JobDescriptionInput.vue -->
<template>
    <div class="w-full max-w-2xl mx-auto space-y-4">
      <div class="space-y-2">
        <label for="jobDescription" class="block text-sm font-medium text-gray-900">
          Job Description
        </label>
        <p class="text-sm text-gray-600">
          Paste the full job posting to get targeted resume analysis
        </p>
      </div>
      
      <div class="relative">
        <textarea
          id="jobDescription"
          v-model="jobText"
          placeholder="Paste the job description here..."
          class="block w-full h-48 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          @input="handleInput"
        />
        
        <div class="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>{{ wordCount }} words</span>
          <span v-if="jobText.length > 0" class="text-green-600">
            ✓ Job description added
          </span>
        </div>
      </div>
      
      <div v-if="error" class="flex items-center w-full p-3 space-x-2 bg-red-50 border border-red-200 rounded-lg">
        <Icon name="lucide:alert-circle" class="flex-shrink-0 w-4 h-4 text-red-500" />
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>
      
      <div v-if="showTips" class="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start space-x-3">
          <Icon name="lucide:lightbulb" class="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-500" />
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-blue-900">Tips for better analysis:</h4>
            <ul class="space-y-1 text-sm text-blue-700">
              <li>• Include the complete job posting with requirements</li>
              <li>• Copy responsibilities, qualifications, and skills sections</li>
              <li>• Don't worry about formatting - just paste the text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    modelValue?: string
  }
  
  interface Emits {
    'update:modelValue': [value: string]
    'change': [value: string]
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const jobText = ref(props.modelValue || '')
  const error = ref('')
  
  const wordCount = computed(() => {
    return jobText.value.trim() ? jobText.value.trim().split(/\s+/).length : 0
  })
  
  const showTips = computed(() => {
    return jobText.value.length === 0
  })
  
  const handleInput = () => {
    error.value = ''
    
    // Basic validation
    if (jobText.value.length > 10000) {
      error.value = 'Job description is too long. Please keep it under 10,000 characters.'
      return
    }
    
    if (wordCount.value > 0 && wordCount.value < 50) {
      error.value = 'Job description seems too short. Please include more details for better analysis.'
      return
    }
    
    emit('update:modelValue', jobText.value)
    emit('change', jobText.value)
  }
  
  // Watch for external changes
  watch(() => props.modelValue, (newValue) => {
    if (newValue !== jobText.value) {
      jobText.value = newValue || ''
    }
  })
  </script>