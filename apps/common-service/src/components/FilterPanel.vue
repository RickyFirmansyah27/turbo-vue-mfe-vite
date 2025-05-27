<script>
import debounce from 'lodash.debounce'

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
    },
    categories: {
      type: Array,
      default: () => []
    },
    statuses: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchInput: this.initialFilters.search || '',
      filterData: {
        category: this.initialFilters.category || '',
        status: this.initialFilters.status || ''
      }
    }
  },
  methods: {
    updateFilters() {
      this.$emit('filter-change', {
        search: this.searchInput,
        ...this.filterData
      })
    },
    emitSearch: debounce(function () {
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
