<!-- 方案 3-b -->
<template>
    <div id="container" ref="container" contenteditable="true"></div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'


const container = ref()

setInterval(() => {
    const cloneNode = container.value.cloneNode(true);
    // 删除用户名
    const usernameEl = cloneNode.querySelector('#username');
    if(usernameEl) {
      usernameEl.remove();
    }
    const text = cloneNode.innerText;
    console.log('content', text)
}, 1000);

</script>

<style scoped>
#container {
    box-sizing: border-box;
    border: 1px solid #5f5f5f;
    border-radius: 8px;
    min-height: 40px;
    width: 200px;
    line-height: 1.2em;
    font-size: 16px;
    padding: 9px 6px;
}
</style>