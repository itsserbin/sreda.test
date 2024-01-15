<script setup>
import Popper from "@/Pages/Public/Components/Popover/entry.esm.js";
import Heading from "@/Pages/Public/Components/Heading.vue";
import CalendarEventItem from "@/Pages/Public/Home/Calendar/CalendarEventItem.vue";
import Button from "@/Pages/Public/Components/Button.vue";

const props = defineProps({
    month: {
        type: Object,
        required: true
    },
    week: {
        required: true,
        type: Array
    },
    class: {
        type: [String, Array, Object],
        required: false
    },
    getCellClasses: {
        type: Function,
        required: true
    },
    findEvents: {
        type: Function,
        required: true
    },
    day: {
        type: Object
    }
});

const emits = defineEmits([
    'onEdit',
    'onCreate'
]);

const Tag = props.findEvents(props.day).length ? Popper : 'div';

const onClick = () => {
    if (!props.findEvents(props.day).length) {
        emits('onCreate', props.day);
    }
}
</script>

<template>
    <Tag :class="props.class" @click="onClick">
        <div class="calendar__month__items__item">
            {{ day.day }}
            <div
                v-if="getCellClasses(day, month.month)['has-event'] && getCellClasses(day, month.month)['current-month']"
                class="calendar__month__items__item__events"
            >
                <div v-for="event in findEvents(day)"
                     :key="event.category"
                     :class="['calendar__month__items__item__events__event', `event-dot-${event.category.toLowerCase().replace(/\s/g, '-')}`]"
                ></div>
            </div>
        </div>
        <template #content>
            <Heading value="Events"
                     size="2rem"
                     class="calendar__month__items__popover_title"
            />

            <hr class="hr">

            <template v-for="event in findEvents(day)">
                <CalendarEventItem :title="event.name"
                                   :description="event.description"
                                   :location="event.location"
                                   :dateTime="`${day.day} ${month.name} ${event.time}`"
                                   :category="event.category"
                                   :id="event.id"
                                   @onEdit="emits('onEdit',event)"
                />
            </template>

            <div>
                <Button class="btn" @click="emits('onCreate',day)">
                    Add event
                </Button>
            </div>
        </template>
    </Tag>
</template>
