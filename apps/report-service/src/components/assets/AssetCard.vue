<template>
  <div class="card group">
    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
      <h3 class="font-medium text-gray-900 truncate">{{ asset.name }}</h3>
      <div :class="statusClass">{{ formattedStatus }}</div>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
        <div class="text-gray-500">Category:</div>
        <div class="font-medium text-gray-900 capitalize">{{ asset.category }}</div>
        
        <div class="text-gray-500">Purchase Date:</div>
        <div class="font-medium text-gray-900">{{ formattedDate }}</div>
        
        <div class="text-gray-500">Location:</div>
        <div class="font-medium text-gray-900">{{ asset.location }}</div>
      </div>
      
      <div class="flex justify-between pt-2 border-t border-gray-100">
        <router-link :to="`/assets/${asset.id}`" class="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors duration-150">
          View Details
        </router-link>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <router-link :to="`/assets/${asset.id}/edit`" class="text-gray-600 hover:text-primary-600 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </router-link>
          <button @click="$emit('delete', asset.id)" class="text-gray-600 hover:text-error-600 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetCard',
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const date = new Date(this.asset.purchaseDate)
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date)
    },
    formattedStatus() {
      return this.asset.status.charAt(0).toUpperCase() + this.asset.status.slice(1)
    },
    statusClass() {
      return {
        'badge-available': this.asset.status === 'available',
        'badge-borrowed': this.asset.status === 'borrowed',
        'badge-damaged': this.asset.status === 'damaged'
      }
    }
  }
}
</script>