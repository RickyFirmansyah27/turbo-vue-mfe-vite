<template>
  <div>
    <div class="flex items-center mb-6">
      <button @click="$router.go(-1)" class="mr-4 text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Add New Asset</h1>
    </div>
    
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b">
        <h2 class="font-medium text-gray-900">Asset Information</h2>
      </div>
      
      <div class="p-6">
        <AssetForm 
          :submitButtonText="'Create Asset'"
          @submit="createAsset"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQueryClient } from '@tanstack/vue-query'
import api from '../api'
import AssetForm from '../components/assets/AssetForm.vue'

export default {
  name: 'AssetCreate',
  components: {
    AssetForm
  },
  setup() {
    const queryClient = useQueryClient()
    
    return {
      queryClient,
      $toast: Vue.$toast
    }
  },
  methods: {
    async createAsset(asset, callback) {
      try {
        await api.createAsset(asset)
        this.$toast.success('Asset created successfully')
        this.queryClient.invalidateQueries(['assets'])
        this.$router.push('/assets')
      } catch (error) {
        this.$toast.error('Failed to create asset')
        console.error('Error creating asset:', error)
      } finally {
        if (callback) callback()
      }
    }
  }
}
</script>