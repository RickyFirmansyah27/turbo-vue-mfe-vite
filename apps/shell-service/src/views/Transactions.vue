<template>
  <div>
    <header class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Transactions</h1>
    </header>

    <EmptyState
      title="No transactions found"
      message="No transactions match your current filters. Try adjusting your search criteria or add a new transaction."
    />
  </div>
</template>

<script>
import EmptyState from 'commons/EmptyState'

export default {
  name: 'Transactions',
  components: {
    EmptyState,
  },
}
</script>
