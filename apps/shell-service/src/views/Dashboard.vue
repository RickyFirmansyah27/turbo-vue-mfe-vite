<template>
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
    </header>
    
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error">
      <div class="bg-error-50 border-l-4 border-error-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-error-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-error-700">Error loading dashboard data. Please try again later.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Available Assets</h2>
              <p class="text-3xl font-bold text-gray-900">{{ availableCount }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-warning-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-warning-100 text-warning-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Borrowed Assets</h2>
              <p class="text-3xl font-bold text-gray-900">{{ borrowedCount }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-error-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-error-100 text-error-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Damaged Assets</h2>
              <p class="text-3xl font-bold text-gray-900">{{ damagedCount }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b">
            <h2 class="text-lg font-medium text-gray-900">Category Distribution</h2>
          </div>
          <div class="p-6">
            <div v-for="(count, category) in categoryDistribution" :key="category" class="mb-4 last:mb-0">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700 capitalize">{{ category }}</span>
                <span class="text-sm font-medium text-gray-700">{{ count }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary-600 h-2 rounded-full"
                  :style="{ width: `${(count / assets.length) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Recent Assets</h2>
            <router-link to="/assets" class="text-sm font-medium text-primary-600 hover:text-primary-800">
              View all
            </router-link>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="asset in recentAssets" :key="asset.id" class="p-4 hover:bg-gray-50">
              <div class="flex justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">{{ asset.name }}</h3>
                  <p class="text-sm text-gray-500 capitalize">{{ asset.category }}</p>
                </div>
                <div :class="getStatusBadgeClass(asset.status)">
                  {{ asset.status.charAt(0).toUpperCase() + asset.status.slice(1) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery } from '@tanstack/vue-query'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: 'Dashboard',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      assets: []
    }
  },
  setup() {
    const { isLoading, error, data } = useQuery(['assets'], () => 
      api.getAssets().then(response => response.data)
    )
    
    return {
      isLoading,
      error,
      assetsData: data
    }
  },
  watch: {
    assetsData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.assets = newData
        }
      }
    }
  },
  computed: {
    availableCount() {
      return this.assets.filter(asset => asset.status === 'available').length
    },
    borrowedCount() {
      return this.assets.filter(asset => asset.status === 'borrowed').length
    },
    damagedCount() {
      return this.assets.filter(asset => asset.status === 'damaged').length
    },
    categoryDistribution() {
      return this.assets.reduce((acc, asset) => {
        if (!acc[asset.category]) {
          acc[asset.category] = 0
        }
        acc[asset.category]++
        return acc
      }, {})
    },
    recentAssets() {
      // Sort by purchase date (most recent first) and take top 5
      return [...this.assets]
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        .slice(0, 5)
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      return {
        'badge-available': status === 'available',
        'badge-borrowed': status === 'borrowed',
        'badge-damaged': status === 'damaged'
      }
    }
  }
}
</script>