<template>
    <div>
        <header class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Asset Inventory</h1>
            <router-link to="/assets/create" class="btn-primary inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
                Add New Asset
            </router-link>
        </header>

        <FilterPanel :initialFilters="filters" @filter-change="updateFilters" />

        <div v-if="isLoading">
            <LoadingSpinner />
        </div>

        <div v-else-if="error">
            <div class="bg-error-50 border-l-4 border-error-500 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-error-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-error-700">Error loading assets. Please try again later.</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="paginatedAssets.length === 0">
            <EmptyState title="No assets found"
                message="No assets match your current filters. Try adjusting your search criteria or add a new asset."
                actionText="Add New Asset" actionLink="/assets/create" />
        </div>

        <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <AssetCard v-for="asset in paginatedAssets" :key="asset.id" :asset="asset"
                    @delete="confirmDelete(asset.id)" />
            </div>

            <div class="flex justify-between items-center mt-8">
                <button class="btn-secondary" :disabled="currentPage === 1" @click="currentPage--">
                    Previous
                </button>
                <div class="text-sm text-gray-700">
                    Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                    {{ Math.min(currentPage * itemsPerPage, filteredAssets.length) }}
                    of {{ filteredAssets.length }} assets
                </div>
                <button class="btn-secondary" :disabled="currentPage * itemsPerPage >= filteredAssets.length"
                    @click="currentPage++">
                    Next
                </button>
            </div>
        </div>

        <ConfirmDialog :show="showDeleteConfirm" title="Delete Asset"
            message="Are you sure you want to delete this asset? This action cannot be undone."
            confirmButtonText="Delete" @confirm="deleteAsset" @cancel="cancelDelete" />
    </div>
</template>

<script>
import api from '../api';
import AssetCard from 'commons/AssetCard';
import FilterPanel from '../components/common/FilterPanel.vue';

export default {
    name: 'AssetList',
    components: {
        AssetCard,
        FilterPanel,
        EmptyState: () => import('commons/EmptyState'),
        LoadingSpinner: () => import('commons/LoadingSpinner'),
        ConfirmDialog: () => import('commons/ConfirmDialog'),
    },
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
        };
    },
    async created() {
        await this.fetchAssets();
    },
    watch: {
        filters: {
            handler() {
                this.currentPage = 1;
            },
            deep: true,
        },
    },
    computed: {
        filteredAssets() {
            let result = [...this.assets];

            if (this.filters.search) {
                const searchLower = this.filters.search.toLowerCase();
                result = result.filter(
                    (asset) =>
                        asset.name.toLowerCase().includes(searchLower) ||
                        asset.location.toLowerCase().includes(searchLower)
                );
            }

            if (this.filters.category) {
                result = result.filter((asset) => asset.category === this.filters.category);
            }

            if (this.filters.status) {
                result = result.filter((asset) => asset.status === this.filters.status);
            }

            return result;
        },
        paginatedAssets() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredAssets.slice(startIndex, endIndex);
        },
    },
    methods: {
        async fetchAssets() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.getAssets();
                this.assets = response.data;
            } catch (error) {
                this.error = error;
                console.error('Error fetching assets:', error);
            } finally {
                this.isLoading = false;
            }
        },
        updateFilters(newFilters) {
            this.filters = newFilters;
        },
        confirmDelete(id) {
            this.assetToDelete = id;
            this.showDeleteConfirm = true;
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
            this.assetToDelete = null;
        },
        async deleteAsset() {
            try {
                await api.deleteAsset(this.assetToDelete);
                await this.fetchAssets();
            } catch (error) {
                console.error('Failed to delete asset:', error);
            } finally {
                this.showDeleteConfirm = false;
                this.assetToDelete = null;
            }
        },
    },
};
</script>