<template>
  <div>
     <header class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Report List</h1>
    </header>
    <div v-if="isLoading" class="text-center py-8 text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error.message || 'Failed to load assets.' }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AssetCard
        v-for="asset in paginatedAssets"
        :key="asset.id"
        :asset="asset"
        @delete="confirmDelete(asset.id)"
      />
    </div>
  </div>
</template>

<script>
import AssetCard from 'commons/AssetCard'
import api from '../api'

export default {
  name: 'ReportList',
  components: { AssetCard },
  data() {
    return {
      assets: [],
      filters: {
        search: '',
        category: '',
        status: '',
      },
      currentPage: 1,
      itemsPerPage: 9,
      showDeleteConfirm: false,
      assetToDelete: null,
      isLoading: false,
      error: null,
    }
  },
  computed: {
    paginatedAssets() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.assets.slice(start, end)
    },
  },
  async created() {
    await this.fetchAssets()
  },
  methods: {
    async fetchAssets() {
      this.isLoading = true
      this.error = null

      try {
        const response = await api.getAssets()
        this.assets = response.data
      } catch (error) {
        this.error = error
        console.error('Error fetching assets:', error)
      } finally {
        this.isLoading = false
      }
    },
    confirmDelete(id) {
      this.assetToDelete = id
      this.$emit('delete', id)
    },
  },
}
</script>
