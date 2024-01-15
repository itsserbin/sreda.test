<script setup>
defineProps({
    text: {
        required: false,
        type: String,
        default: 'LOGO'
    },
    image: {
        type: String,
        required: false,
    }
});

const appName = import.meta.env.VITE_APP_NAME;
</script>

<template>
    <a class="logo">
        <img v-if="image" :src="image" :alt="appName">

        <template v-else>
            {{ text }}
        </template>
    </a>
</template>
