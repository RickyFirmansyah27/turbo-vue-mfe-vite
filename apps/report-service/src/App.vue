<template>
  <div class="h-screen flex">
    <div class="flex flex-col flex-1 overflow-hidden">
      <main class="flex-1 overflow-y-auto container mx-auto px-4 py-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportApp'
}
</script>
