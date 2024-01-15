<script setup>
import Logo from "@/Pages/Public/Components/Logo.vue";
import NavLinksRepository from "@/Repositories/NavLinksRepository.js";

const data = NavLinksRepository.data;

const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
}
</script>

<template>
    <footer class="footer">
        <div class="footer__logo">
            <Logo/>
        </div>
        <div class="footer__nav-links">
            <a v-for="item in data"
               :href="item.href"
               class="footer__nav-links__link"
            >{{ item.label }}</a>
        </div>
        <div class="footer__copyright">
            © {{ getCurrentYear() }} All rights reserved
        </div>
    </footer>
</template>
