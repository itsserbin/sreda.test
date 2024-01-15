<script setup>
import Header from "@/Pages/Public/Components/Header.vue";
import Footer from "@/Pages/Public/Components/Footer.vue";
</script>

<template>
    <div class="container">
        <Header/>
        <main class="content">
            <slot></slot>
        </main>
        <Footer/>
    </div>
</template>
