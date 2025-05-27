<template>
  <div class="bg-white shadow-sm rounded-lg p-4 mb-6">
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          id="search"
          v-model="searchInput"
          type="text"
          placeholder="Search assets..."
          class="form-input"
          @input="debounceSearch"
        />
      </div>
      
      <div class="w-full md:w-48">
        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          v-model="filterData.category"
          class="form-select"
          @change="updateFilters"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
          </option>
        </select>
      </div>
      
      <div class="w-full md:w-48">
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          id="status"
          v-model="filterData.status"
          class="form-select"
          @change="updateFilters"
        >
          <option value="">All Statuses</option>
          <option v-for="status in statuses" :key="status.id" :value="status.name">
            {{ status.name.charAt(0).toUpperCase() + status.name.slice(1) }}
          </option>
        </select>
      </div>
      
      <div class="self-end">
        <button 
          @click="resetFilters" 
          class="btn-secondary w-full md:w-auto"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/vue-query'
import api from '../../api'

export default {
  name: 'FilterPanel',
  props: {
    initialFilters: {
      type: Object,
      default: () => ({
        search: '',
        category: '',
        status: ''
      })
    }
  },
  data() {
    return {
      searchInput: this.initialFilters.search || '',
      filterData: {
        category: this.initialFilters.category || '',
        status: this.initialFilters.status || ''
      },
      categories: [],
      statuses: []
    }
  },
  setup() {
    const categoriesQuery = useQuery(['categories'], () => 
      api.getCategories().then(response => response.data)
    )
    
    const statusesQuery = useQuery(['statuses'], () => 
      api.getStatuses().then(response => response.data)
    )
    
    return {
      categoriesQuery,
      statusesQuery
    }
  },
  mounted() {
    this.fetchFilterData()
  },
  methods: {
    async fetchFilterData() {
      if (this.categoriesQuery.data) {
        this.categories = this.categoriesQuery.data
      }
      
      if (this.statusesQuery.data) {
        this.statuses = this.statusesQuery.data
      }
    },
    updateFilters() {
      this.$emit('filter-change', {
        search: this.searchInput,
        ...this.filterData
      })
    },
    emitSearch: debounce(function() {
      this.updateFilters()
    }, 300),
    debounceSearch() {
      this.emitSearch()
    },
    resetFilters() {
      this.searchInput = ''
      this.filterData = {
        category: '',
        status: ''
      }
      this.updateFilters()
    }
  }
}
</script>