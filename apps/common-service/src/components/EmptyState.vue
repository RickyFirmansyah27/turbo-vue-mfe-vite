<template>
  <div class="flex flex-col items-center justify-center py-12">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <h3 class="mt-4 text-lg font-medium text-gray-900">{{ title }}</h3>
    <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
    <div class="mt-6" v-if="actionText && actionLink">
      <router-link :to="actionLink" class="btn-primary">
        {{ actionText }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: 'No data found'
    },
    message: {
      type: String,
      default: 'There are no items to display at this time.'
    },
    actionText: {
      type: String,
      default: ''
    },
    actionLink: {
      type: String,
      default: ''
    }
  }
}
</script>