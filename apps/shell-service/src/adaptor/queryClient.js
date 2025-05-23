import { QueryClient } from '@tanstack/vue-query'

const vueQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default vueQueryClient
