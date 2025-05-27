import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  // Assets
  getAssets(params = {}) {
    return apiClient.get('/assets', { params })
  },
  
  getAsset(id) {
    return apiClient.get(`/assets/${id}`)
  },
  
  createAsset(asset) {
    return apiClient.post('/assets', asset)
  },
  
  updateAsset(id, asset) {
    return apiClient.put(`/assets/${id}`, asset)
  },
  
  deleteAsset(id) {
    return apiClient.delete(`/assets/${id}`)
  },
  
  // Categories
  getCategories() {
    return apiClient.get('/categories')
  },
  
  // Statuses
  getStatuses() {
    return apiClient.get('/statuses')
  }
}