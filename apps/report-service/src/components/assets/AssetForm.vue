<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="col-span-1 md:col-span-2">
        <label for="name" class="block text-sm font-medium text-gray-700">Asset Name</label>
        <input
          id="name"
          v-model="assetData.name"
          type="text"
          class="form-input mt-1"
          required
        />
      </div>
      
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          v-model="assetData.category"
          class="form-select mt-1"
          required
        >
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
          </option>
        </select>
      </div>
      
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          v-model="assetData.status"
          class="form-select mt-1"
          required
        >
          <option value="" disabled>Select status</option>
          <option v-for="status in statuses" :key="status.id" :value="status.name">
            {{ status.name.charAt(0).toUpperCase() + status.name.slice(1) }}
          </option>
        </select>
      </div>
      
      <div>
        <label for="purchaseDate" class="block text-sm font-medium text-gray-700">Purchase Date</label>
        <input
          id="purchaseDate"
          v-model="assetData.purchaseDate"
          type="date"
          class="form-input mt-1"
          required
        />
      </div>
      
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <input
          id="location"
          v-model="assetData.location"
          type="text"
          class="form-input mt-1"
          required
        />
      </div>
    </div>
    
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$router.go(-1)"
        class="btn-secondary"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Saving...' : submitButtonText }}
      </button>
    </div>
  </form>
</template>

<script>
import { useQuery } from '@tanstack/vue-query'
import api from '../../api'

export default {
  name: 'AssetForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({
        name: '',
        category: '',
        purchaseDate: new Date().toISOString().substr(0, 10),
        status: '',
        location: ''
      })
    },
    submitButtonText: {
      type: String,
      default: 'Save Asset'
    }
  },
  data() {
    return {
      assetData: { ...this.initialData },
      isSubmitting: false,
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
    this.fetchFormData()
  },
  methods: {
    async fetchFormData() {
      if (this.categoriesQuery.data) {
        this.categories = this.categoriesQuery.data
      }
      
      if (this.statusesQuery.data) {
        this.statuses = this.statusesQuery.data
      }
    },
    submitForm() {
      this.isSubmitting = true
      this.$emit('submit', this.assetData, () => {
        this.isSubmitting = false
      })
    }
  }
}
</script>