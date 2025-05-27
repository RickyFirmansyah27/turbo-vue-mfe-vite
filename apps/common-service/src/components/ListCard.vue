<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">{{ title }}</h2>
            <router-link :to="viewAllLink" class="text-sm font-medium text-primary-600 hover:text-primary-800">
                View all
            </router-link>
        </div>
        <div class="divide-y divide-gray-200">
            <div v-for="item in items" :key="item.id" class="p-4 hover:bg-gray-50">
                <div class="flex justify-between">
                    <div>
                        <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 capitalize">{{ item.category }}</p>
                    </div>
                    <div
                        :class="getStatusClass(item.status) + ' px-2 py-2 rounded-full text-xs font-semibold text-center flex items-center'">
                        {{ capitalize(item.status) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const STATUS_COLOR_CLASSES = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
}

export default {
    name: 'ListCard',
    props: {
        title: String,
        viewAllLink: String,
        items: Array,
    },
    methods: {
        getStatusClass(status) {
            return STATUS_COLOR_CLASSES[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
        },
        capitalize(str) {
            if (!str) return ''
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
    },
}
</script>
