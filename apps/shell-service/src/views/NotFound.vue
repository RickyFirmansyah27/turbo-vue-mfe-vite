<template>
  <div class="flex flex-col items-center justify-center py-12">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Page not found</p>
    <router-link to="/" class="btn-primary">
      Return to Dashboard
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>