<template>
    <TransitionGroup tag="div" class="message-box" name="list" @after-leave="emits('afterClose')">
        <Message
            v-for="item in messages"
            :key="item.id"
            :id="item.id"
            :duration="item.duration"
            :text="item.text"
            :type="item.type"
            @close="emits('close', item.id)"
        />
    </TransitionGroup>
</template>

<script lang="ts" setup>
import type { IMessageProps } from './types';
import Message from './message-item.vue';

const emits = defineEmits<{
    (e: 'close', id: string | number): void;
    (e: 'afterClose'): void;
}>();

withDefaults(defineProps<{
    messages: IMessageProps[];
}>(), {
    messages: () => []
});
</script>

<style lang="scss" scoped>
.message-box {
    position: fixed;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>

