<template>
  <nav class="bg-primary-700 text-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
            <span class="font-bold text-xl">AssetManagement</span>
          </router-link>
        </div>
        
        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600 transition duration-150"
              :class="{ 'bg-primary-800': $route.path === '/' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/assets" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600 transition duration-150"
              :class="{ 'bg-primary-800': $route.path.includes('/assets') }"
            >
              Assets
            </router-link>
          </div>
        </div>
        
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="p-2 rounded-md hover:bg-primary-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-primary-800">
        <router-link 
          to="/" 
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600 transition duration-150"
          :class="{ 'bg-primary-900': $route.path === '/' }"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/assets" 
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600 transition duration-150"
          :class="{ 'bg-primary-900': $route.path.includes('/assets') }"
          @click="mobileMenuOpen = false"
        >
          Assets
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  }
}
</script>