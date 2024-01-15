<script setup>
import Modal from "@/Pages/Public/Components/Modal.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import FilterRepository from "@/Repositories/FilterRepository.js";

const props = defineProps({
    show: {
        required: true,
        type: Boolean
    },
    item: {
        required: true,
        type: Object
    }
});

const categories = FilterRepository.data;
const emits = defineEmits(['close', 'submit']);
const heading = () => props.item.id ? 'Edit event' : 'Add event';
</script>

<template>
    <Modal :show="show"
           @close="emits('close')"
           @submit="emits('submit')"
           :heading="heading()"
    >
        <input type="text"
               class="input"
               placeholder="Event name..."
               v-model="item.name"
        >

        <textarea class="textarea"
                  placeholder="Event description..."
                  v-model="item.description"
        ></textarea>

        <input type="text"
               class="input"
               placeholder="Location..."
               v-model="item.location"
        >

        <div class="date-time-wrapper">
            <p>{{ item.date }} at</p>
            <VueDatePicker v-model="item.time"
                           time-picker
                           placeholder="Event time"
                           dark
                           class="date-time-picker"
                           format="HH:mm"
            />
        </div>

        <select v-model="item.category" class="select">
            <option v-for="item in categories" :value="item.label">
                {{ item.label }}
            </option>
        </select>
    </Modal>
</template>

<style scoped>
.date-time-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
}

.date-time-wrapper p {
    color: #FFFAFB;
    font-family: Lexend, sans-serif;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.75rem;
    white-space: nowrap;
}
</style>
