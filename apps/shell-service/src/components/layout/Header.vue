<template>
  <header class="bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-gray-800"></h1>

    <div class="relative" @click="toggleDropdown">
      <button class="flex items-center space-x-2 focus:outline-none">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          class="w-10 h-10 rounded-full border"
        />
        <span class="hidden md:inline text-gray-700 font-medium">John Doe</span>
        <svg
          class="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10"
      >
        <button
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: 'Header',
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      alert('Logged out');
    }
  }
};
</script>
