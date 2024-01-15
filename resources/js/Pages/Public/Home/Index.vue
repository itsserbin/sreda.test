<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Heading from "@/Pages/Public/Components/Heading.vue";
import Filter from "@/Pages/Public/Home/Filter.vue";
import Calendar from "@/Pages/Public/Home/Calendar/Calendar.vue";
</script>

<template>
    <AppLayout>
        <Heading value="Calendar"/>
        <Filter/>
        <Calendar/>
    </AppLayout>
</template>
