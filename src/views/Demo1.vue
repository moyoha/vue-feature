<template>
    <div id="container" contenteditable="true" @focus="focusCommentEnd()">
        <span id="content"></span>
    </div>
</template>

<script lang='ts' setup>

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

</script>

<style scoped>
#container {
    box-sizing: border-box;
    border: 1px solid #5f5f5f;
    border-radius: 8px;
    min-height: 40px;
    width: 200px;
    line-height: 1.2;
    font-size: 16px;
    padding: 9px 6px;
}
</style>