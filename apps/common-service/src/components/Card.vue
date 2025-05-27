<template>
    <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
        <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            </div>
            <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-700">{{ title }}</h2>
                <p class="text-3xl font-bold text-gray-900">{{ count }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        count: {
            type: Number,
            default: 0
        }
    }
}
</script>
