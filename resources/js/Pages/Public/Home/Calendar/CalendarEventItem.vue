<script setup>
import Heading from "@/Pages/Public/Components/Heading.vue";
import EditIcon from "@/Pages/Public/Components/Icons/EditIcon.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    id: {
        type: [String, Number],
        required: true
    }
});

const emits = defineEmits(['onEdit']);

const categoryClass = () => {
    switch (props.category.toLowerCase().replace(/\s/g, '-')) {
        case 'meeting-with-an-expert':
            return 'bg-meeting-with-an-expert';
        case 'question-answer':
            return 'bg-question-answer';
        case 'conference':
            return 'bg-conference';
        case 'webinar':
            return 'bg-webinar';
    }
}
</script>

<template>
    <div class="calendar__month__items__popover_details">
        <div class="calendar__month__items__popover_details_name">
            <Heading :value="title"
                     size="1.25rem"
                     class="calendar__month__items__popover_title"
            />
            <EditIcon @click="emits('onEdit',id)"/>
        </div>
        <div class="calendar__month__items__popover_details_description">
            {{ description }}
        </div>
        <div class="calendar__month__items__popover_details_location">
            {{ location }}
        </div>
        <div :class="categoryClass()" class="calendar__month__items__popover_details_footer">
            <div class="calendar__month__items__popover_details_footer_time">
                {{ dateTime }}
            </div>
            <div class="calendar__month__items__popover_details_footer_category">
                <p>{{ category }}</p>
            </div>
        </div>
    </div>
    <hr class="hr">
</template>
