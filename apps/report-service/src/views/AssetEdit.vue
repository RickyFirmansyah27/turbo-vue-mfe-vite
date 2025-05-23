<template>
  <div>
    <div class="flex items-center mb-6">
      <button @click="$router.go(-1)" class="mr-4 text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Edit Asset</h1>
    </div>
    
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error" class="bg-error-50 border-l-4 border-error-500 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-error-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-error-700">Error loading asset. Please try again later.</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="asset" class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b">
        <h2 class="font-medium text-gray-900">Edit Asset: {{ asset.name }}</h2>
      </div>
      
      <div class="p-6">
        <AssetForm 
          :initialData="asset"
          :submitButtonText="'Update Asset'"
          @submit="updateAsset"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import AssetForm from '../components/assets/AssetForm.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

export default {
  name: 'AssetEdit',
  components: {
    AssetForm,
    LoadingSpinner
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      asset: null,
      isLoading: false,
      error: null
    }
  },
  created() {
    this.fetchAsset()
  },
  methods: {
    async fetchAsset() {
      this.isLoading = true
      try {
        const response = await api.getAsset(this.id)
        this.asset = response.data
      } catch (err) {
        this.error = err
        this.$toast.error('Error loading asset')
        console.error('Error fetching asset:', err)
      } finally {
        this.isLoading = false
      }
    },
    async updateAsset(asset, callback) {
      try {
        await api.updateAsset(this.id, asset)
        this.$toast.success('Asset updated successfully')
        this.$emit('invalidate-queries', ['asset', this.id, 'assets'])
        this.$router.push(`/assets/${this.id}`)
      } catch (error) {
        this.$toast.error('Failed to update asset')
        console.error('Error updating asset:', error)
      } finally {
        if (callback) callback()
      }
    }
  }
}
</script>