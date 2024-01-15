<script setup>
import {defineAsyncComponent, onMounted, reactive} from "vue";
import Heading from "@/Pages/Public/Components/Heading.vue";
import EventsRepository from "@/Repositories/EventsRepository.js";
import CalendarItem from "@/Pages/Public/Home/Calendar/CalendarItem.vue";

const Modal = defineAsyncComponent(() =>
    import('@/Pages/Public/Home/Modal.vue')
);

import {
    getMonthName,
    daysOfWeek,
    getPrevMonthDay,
    getNextMonthDay,
    getShortMonthNames
} from "@/Pages/Public/Home/utils.js";

const event = {
    id: null,
    name: null,
    description: null,
    location: null,
    time: null,
    date: null,
    category: 'Meeting with an expert'
};

const state = reactive({
    months: [],
    events: EventsRepository.data,
    isShowModal: false,
    modalItem: {}
});

onMounted(() => generateCalendar());

const getCellClasses = (day, currentMonth) => {
    const events = findEvents(day);
    const classes = {
        'current-month': day.month === currentMonth,
        'outside-month': day.isOutsideMonth,
        'has-event': events.length > 0,
    };

    events.forEach((event) => {
        classes[`event-type-${event.category.toLowerCase().replace(/\s/g, '-')}`] = true;
    });

    return classes;
}

const findEvents = (day) => {
    const formattedDate = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
    return state.events.filter(event => event.date === formattedDate) || [];
}

const generateCalendar = () => {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    for (let i = 0; i < 6; i++) {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const numDays = lastDay.getDate();

        const monthData = {
            name: getMonthName(currentMonth),
            month: currentMonth,
            weeks: [],
        };

        let currentWeek = [];
        let currentDayOfWeek = firstDay.getDay();

        for (let j = 0; j < currentDayOfWeek; j++) {
            const prevMonthDay = getPrevMonthDay(currentYear, currentMonth, j - currentDayOfWeek);
            currentWeek.push({day: prevMonthDay, month: currentMonth - 1, isOutsideMonth: true, year: currentYear});
        }

        for (let j = 1; j <= numDays; j++) {
            currentWeek.push({
                day: j,
                month: currentMonth,
                year: currentYear,
            });

            if (currentDayOfWeek === 6) {
                monthData.weeks.push(currentWeek);
                currentWeek = [];
                currentDayOfWeek = 0;
            } else if (j === numDays && currentDayOfWeek !== 6) {
                monthData.weeks.push(currentWeek);
            } else {
                currentDayOfWeek++;
            }
        }

        const trailingDays = 7 - ((lastDay.getDay() + 1) % 7);

        for (let j = 1; j <= trailingDays; j++) {
            const nextMonthDay = getNextMonthDay(currentYear, currentMonth, j);
            currentWeek.push({day: nextMonthDay, month: currentMonth + 1, isOutsideMonth: true, year: currentYear});
        }

        state.months.push(monthData);

        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear++;
        }
    }
}

const onEdit = (item) => {
    state.modalItem = JSON.parse(JSON.stringify(item));
    const [year, month, day] = item.date.split('-');
    const formattedDate = new Date(year, month - 1, day);
    const formattedDay = formattedDate.getDate();
    const formattedMonth = getShortMonthNames[formattedDate.getMonth()];
    state.modalItem.date = `${formattedDay} ${formattedMonth}`;
    toggleModal();
}

const onCreate = (day) => {
    state.modalItem = JSON.parse(JSON.stringify(event));
    const formattedDate = new Date(day.year, day.month - 1, day.day);
    state.modalItem.date = `${formattedDate.getDate()} ${getShortMonthNames[formattedDate.getMonth()]}`;
    toggleModal();
}

const toggleModal = (val) => {
    val ? state.isShowModal = val : state.isShowModal = !state.isShowModal;
}
</script>

<template>
    <div class="calendar">
        <div v-for="(month, index) in state.months" :key="index" class="calendar__month">
            <Heading :value="month.name" size="2rem" class="calendar__month__heading"/>
            <div class="calendar__month__items">
                <div v-for="day in daysOfWeek"
                     :key="day"
                     class="calendar__month__items__item"
                >{{ day }}
                </div>
            </div>

            <div v-for="week in month.weeks" :key="week" class="calendar__month__items">
                <CalendarItem
                    :findEvents="findEvents"
                    :getCellClasses="getCellClasses"
                    :week="week"
                    v-for="day in week"
                    :key="day.day"
                    :class="getCellClasses(day, month.month)"
                    class="calendar__month__items__popover"
                    :month="month"
                    :day="day"
                    @onEdit="onEdit"
                    @onCreate="onCreate"
                />
            </div>
        </div>
    </div>
    <Modal v-if="state.isShowModal"
           :show="state.isShowModal"
           @close="toggleModal"
           :item="state.modalItem"
           @submit="toggleModal"
    />
</template>
