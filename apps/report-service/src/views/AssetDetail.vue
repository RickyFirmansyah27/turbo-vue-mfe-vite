<template>
  <div>
    <div class="flex items-center mb-6">
      <button @click="$router.go(-1)" class="mr-4 text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Asset Details</h1>
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
          <p class="text-sm text-error-700">Error loading asset details. Please try again later.</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="asset" class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">{{ asset.name }}</h2>
        <div :class="statusBadgeClass">
          {{ formattedStatus }}
        </div>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Asset Information</h3>
            <dl class="grid grid-cols-3 gap-4">
              <dt class="col-span-1 font-medium text-gray-500">Category</dt>
              <dd class="col-span-2 text-gray-900 capitalize">{{ asset.category }}</dd>
              
              <dt class="col-span-1 font-medium text-gray-500">Purchase Date</dt>
              <dd class="col-span-2 text-gray-900">{{ formattedDate }}</dd>
              
              <dt class="col-span-1 font-medium text-gray-500">Location</dt>
              <dd class="col-span-2 text-gray-900">{{ asset.location }}</dd>
              
              <dt class="col-span-1 font-medium text-gray-500">Asset ID</dt>
              <dd class="col-span-2 text-gray-900">{{ asset.id }}</dd>
            </dl>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div class="space-y-3">
              <router-link :to="`/assets/${asset.id}/edit`" class="btn-primary w-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Asset
              </router-link>
              
              <button @click="confirmDelete" class="btn-danger w-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                Delete Asset
              </button>
              
              <button 
                @click="updateStatus"
                class="btn-secondary w-full flex justify-center items-center"
                :class="{ 'bg-accent-600 hover:bg-accent-700 text-white': asset.status !== 'available' }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
                {{ statusActionText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ConfirmDialog
      :show="showDeleteConfirm"
      title="Delete Asset"
      message="Are you sure you want to delete this asset? This action cannot be undone."
      confirmButtonText="Delete"
      @confirm="deleteAsset"
      @cancel="cancelDelete"
    />
    
    <ConfirmDialog
      :show="showStatusConfirm"
      :title="statusDialogTitle"
      :message="statusDialogMessage"
      confirmButtonText="Yes, Update"
      @confirm="confirmStatusUpdate"
      @cancel="cancelStatusUpdate"
    />
  </div>
</template>

<script>
import api from '../api'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'

export default {
  name: 'AssetDetail',
  components: {
    LoadingSpinner,
    ConfirmDialog
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
      error: null,
      showDeleteConfirm: false,
      showStatusConfirm: false,
      newStatus: ''
    }
  },
  async created() {
    await this.fetchAsset()
  },
  computed: {
    formattedDate() {
      if (!this.asset) return ''
      const date = new Date(this.asset.purchaseDate)
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date)
    },
    formattedStatus() {
      if (!this.asset) return ''
      return this.asset.status.charAt(0).toUpperCase() + this.asset.status.slice(1)
    },
    statusBadgeClass() {
      if (!this.asset) return ''
      return {
        'badge-available': this.asset.status === 'available',
        'badge-borrowed': this.asset.status === 'borrowed',
        'badge-damaged': this.asset.status === 'damaged'
      }
    },
    statusActionText() {
      if (!this.asset) return ''
      if (this.asset.status === 'available') return 'Mark as Borrowed'
      if (this.asset.status === 'borrowed') return 'Mark as Available'
      if (this.asset.status === 'damaged') return 'Mark as Available'
      return 'Update Status'
    },
    statusDialogTitle() {
      return `Update Asset Status`
    },
    statusDialogMessage() {
      if (!this.newStatus) return ''
      return `Are you sure you want to change the status to "${this.newStatus}"?`
    }
  },
  methods: {
    async fetchAsset() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await api.getAsset(this.id)
        this.asset = response.data
      } catch (error) {
        this.error = error
        console.error('Error fetching asset:', error)
      } finally {
        this.isLoading = false
      }
    },
    confirmDelete() {
      this.showDeleteConfirm = true
    },
    cancelDelete() {
      this.showDeleteConfirm = false
    },
    async deleteAsset() {
      try {
        await api.deleteAsset(this.id)
        this.$router.push('/assets')
      } catch (error) {
        console.error('Failed to delete asset:', error)
      } finally {
        this.showDeleteConfirm = false
      }
    },
    updateStatus() {
      if (this.asset.status === 'available') {
        this.newStatus = 'borrowed'
      } else {
        this.newStatus = 'available'
      }
      this.showStatusConfirm = true
    },
    cancelStatusUpdate() {
      this.showStatusConfirm = false
      this.newStatus = ''
    },
    async confirmStatusUpdate() {
      try {
        const updatedAsset = { ...this.asset, status: this.newStatus }
        await api.updateAsset(this.id, updatedAsset)
        
        this.asset.status = this.newStatus
        await this.fetchAsset()
        
      } catch (error) {
        console.error('Failed to update asset status:', error)
      } finally {
        this.showStatusConfirm = false
        this.newStatus = ''
      }
    }
  }
}
</script>