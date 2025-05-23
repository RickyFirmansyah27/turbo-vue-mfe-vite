<template>
  <div class="h-screen flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten utama -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Header -->
      <Header />

      <!-- Konten router -->
      <main class="flex-1 overflow-y-auto container mx-auto px-4 py-6">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/layout/Sidebar.vue'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Footer,
    Header
  }
}
</script>
