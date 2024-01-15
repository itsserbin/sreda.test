<script setup>
import {computed, onMounted, onUnmounted, watchEffect} from 'vue';
import Heading from "@/Pages/Public/Components/Heading.vue";
import CloseIcon from "@/Pages/Public/Components/Icons/CloseIcon.vue";
import Button from "@/Pages/Public/Components/Button.vue";

const props = defineProps({
    heading: {
        type: String,
        required: false,
    },
    show: {
        type: Boolean,
        default: false,
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    showFooter: {
        type: Boolean,
        default: true,
    },
    showHeading: {
        type: Boolean,
        default: true,
    },
    showCloseIcon: {
        type: Boolean,
        default: true,
    }
});

const emits = defineEmits([
    'close',
    'submit'
]);

const bodyOverflow = computed(() => props.show ? 'hidden' : null);

onMounted(() => {
    watchEffect(() => {
        document.body.style.overflow = bodyOverflow.value;
    });
});

const close = () => {
    if (props.closeable) {
        emits('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});
</script>

<template>
    <teleport to="body">
        <div v-if="show" class="overlay">
            <div class="modal">
                <template v-if="showHeading">
                    <div class="modal__heading">
                        <template v-if="!$slots.heading">
                            <Heading v-if="props.heading"
                                     :value="props.heading"
                                     size="1.5rem"
                            />
                        </template>
                        <template v-else>
                            <slot name="heading"></slot>
                        </template>
                    </div>
                    <hr class="hr">
                </template>

                <CloseIcon class="modal__close"
                           @click="emits('close')"
                           v-if="showCloseIcon"
                />
                <div class="modal__content">
                    <slot></slot>
                </div>
                <div v-if="showFooter" class="modal__footer">
                    <template v-if="!$slots.footer">
                        <Button class="btn-link" label="Cancel" @click="emits('close')"/>
                        <Button class="btn" label="Add" @click="emits('submit')"/>
                    </template>
                    <template v-else>
                        <slot name="footer"></slot>
                    </template>
                </div>
            </div>
        </div>
    </teleport>
</template>
