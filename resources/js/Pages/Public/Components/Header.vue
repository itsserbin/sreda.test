<script setup>
import Logo from "@/Pages/Public/Components/Logo.vue";
import NavLinksRepository from "@/Repositories/NavLinksRepository.js";

const data = NavLinksRepository.data;
</script>

<template>
    <header class="header">
        <Logo/>
        <div class="header__nav-links">
            <a v-for="item in data"
               :href="item.href"
               class="header__nav-links__link"
            >
                {{ item.label }}
            </a>
        </div>
    </header>
</template>
