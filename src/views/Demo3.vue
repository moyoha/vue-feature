<!-- 方案 2-a -->
<template>
    <div id="container" ref="container" contenteditable="true">
        <div id="username" contenteditable="false">@用户名</div>
    </div>
    <button @click="reply()">回复评论</button>
</template>

<script lang='ts' setup>
import { ref } from 'vue'


const container = ref()
const showUsername = ref(true)

function reply() {
    let usernameEl = container.value.querySelector('#username');
    if(!showUsername.value) {
        usernameEl?.remove();
        return;
    }
    if(!usernameEl) {
        usernameEl = document.createElement('span');
        usernameEl.id = 'username';
        usernameEl.contentEditable = 'false';
        container.value.prepend(usernameEl);
    }
    usernameEl.innerText = '@用户名';
}

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

<style scoped lang="scss">
#container {
    box-sizing: border-box;
    border: 1px solid #5f5f5f;
    border-radius: 8px;
    min-height: 40px;
    width: 200px;
    line-height: 1.2em;
    font-size: 16px;
    padding: 9px 6px;
    :deep(#username) {
        color: #8E8E8E;
        display: inline-block;
        /* 不能用 margin-right, 不能用空格 */
        padding-right: 5px;
    }
}

</style>