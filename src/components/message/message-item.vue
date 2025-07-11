<template>
    <div class="message-item">
        <template v-if="type === 'plain'"></template>
        <div class="icon succ" v-else-if="type === 'succ'"></div>
        <div class="icon fail" v-else-if="type === 'fail'"></div>
        <span>
            <slot>{{ text }}</slot>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import type { IMessageProps } from './types'

const props = withDefaults(defineProps<IMessageProps>(), {
    duration: 3000,
    type: 'plain',
})

const emits = defineEmits<{
    (e: 'close', id: number | string): void;
}>();

let timer: number = 0;
function startTimer() {
    if (props.duration > 0) {
        timer = window.setTimeout(handleClose, props.duration);
    }
}

function clearTimer() {
    if (timer) {
        window.clearTimeout(timer);
        timer = 0;
    }
}

function handleClose() {
    emits('close', props.id);
}

onMounted(() => {
    startTimer();
})

onUnmounted(() => {
    clearTimer();
})

</script>

<style lang="scss" scoped>
.message-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px 36px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #FFFFFF1A;
    font-size: 26px;
    color: #FFFFFF;
    border-radius: 20px;
    .icon {
        flex: none;
        width: 30px;
        height: 30px;
        background-size: 30px 30px;
        background-repeat: no-repeat;
        &.plain {
            width: 0;
        }
        &.succ {
            background-image: url('./imgs/succ.png');
        }
        &.fail {
            background-image: url('./imgs/fail.png');
        }
    }
}
</style>