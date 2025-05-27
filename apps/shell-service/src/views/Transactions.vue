<template>
  <EmptyState title="No assets found"
    message="No assets match your current filters. Try adjusting your search criteria or add a new asset."
    />
</template>

<script>

import EmptyState from 'commons/EmptyState';

export default {
  name: 'Transactions',
  components: {
    EmptyState,
  },
}
</script>