<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button',
        required: false
    },
    label: {
        type: String,
        required: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    class: {
        type: [Array, Object, String],
        required: false
    }
})
</script>

<template>
    <button :type="type" :disabled="disabled" :class="props.class">
        <slot v-if="!$slots.default">{{ label }}</slot>
        <slot v-else></slot>
    </button>
</template>
