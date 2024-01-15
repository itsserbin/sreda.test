<script setup>
const props = defineProps({
    size: {
        type: String,
        default: '2.5rem'
    },
    type: {
        type: String,
        default: 'div'
    },
    value: {
        type: String,
        required: true
    }
});

const allowedTypes = ['div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const isValidType = allowedTypes.includes(props.type);
const Tag = isValidType ? props.type : 'div';
</script>

<template>
    <Tag class="heading" :style="size ? 'font-size:' + size : null">
        {{ value }}
    </Tag>
</template>
