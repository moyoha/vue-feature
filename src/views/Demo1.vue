<!-- 方案 3-a -->
<template>
    <div id="container" contenteditable="true" @focus="focusCommentEnd()">
        <div id="content" ref="content"></div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

function focusCommentEnd() {
    console.log('focusCommentEnd')
    const container = document.querySelector('#container') as HTMLDivElement;
    const contentEl = container.querySelector('#content') as HTMLSpanElement
    const range = new Range();
    const selection = getSelection();
    range.setStartAfter(contentEl);
    range.setEndAfter(contentEl);
    selection?.removeAllRanges();
    selection?.addRange(range);
}

const content = ref()

setInterval(() => {
    console.log('content', content.value.innerText)
}, 1000);

</script>

<style scoped>
#container {
    /* display: flex; */
    box-sizing: border-box;
    border: 1px solid #5f5f5f;
    border-radius: 8px;
    min-height: 40px;
    width: 200px;
    line-height: 1.2em;
    font-size: 16px;
    padding: 9px 6px;
    /* #content {
        display: inline-block;
        min-width: 1px;
        min-height: 1em;
    } */
}
</style>