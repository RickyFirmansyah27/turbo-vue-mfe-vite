<template>
  <div>
    <header class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Transactions</h1>
    </header>

    <Card title="Total Transactions" :count="150" class="mb-6" />
    
    <ListCard
      title="Recent Transactions"
      viewAllLink="/transactions"
      :items="transactions"
      :statusColorClasses="statusColorClasses"
    />
  </div>
</template>

<script>
import { Card, ListCard } from 'commons/Components'

export default {
  name: 'Transactions',
  components: {
    Card,
    ListCard,
  },
  data() {
    return {
      statusColorClasses: {
        completed: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        failed: 'bg-red-100 text-red-800',
      },
      transactions: [
        { id: 1, name: 'Transaction 1', category: 'Category A', status: 'completed' },
        { id: 2, name: 'Transaction 2', category: 'Category B', status: 'pending' },
        { id: 3, name: 'Transaction 3', category: 'Category C', status: 'failed' },
      ],
    }
  },
}
</script>
