<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Header from "@/Pages/Public/Components/Header.vue";
import Heading from "@/Pages/Public/Components/Heading.vue";
import Filter from "@/Pages/Public/Components/Filter.vue";
import Calendar from "@/Pages/Public/Components/Calendar/Calendar.vue";
import Footer from "@/Pages/Public/Components/Footer.vue";
</script>

<template>
    <AppLayout>
        <Header/>
        <main class="content">
            <Heading value="Calendar"/>
            <Filter/>
            <Calendar/>
        </main>
        <Footer/>
    </AppLayout>
</template>
