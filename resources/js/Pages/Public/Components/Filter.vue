<script setup>
import FilterRepository from "@/Repositories/FilterRepository.js";

const data = FilterRepository.data;
</script>

<template>
    <div class="filter">
        <div class="filter__items">
            <div v-for="item in data"
                 :class="['filter__items__item', `bg-${item.color}`, item.active ? 'active' : '']">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>
