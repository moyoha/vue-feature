<template>
    <div id="container" ref="container" contenteditable="true" v-show="showInput"></div>
    <div class="op">
        <button @click="level1Comment()">立即评论</button>
        <button @click="showInput = false">隐藏输入框</button>
        <button @click="submitComment()">发布评论</button>
        <button @click="replyComment('用户1', false)">回复一级评论</button>
        <button @click="replyComment('用户2', true)">回复二级评论</button>
    </div>
</template>

<script lang='ts' setup>
import { nextTick, ref } from 'vue';

const showInput = ref(false);
const container = ref();
const showUsername = ref(false);

const level1Comment = () => {
  showInput.value = true;
  showUsername.value = false;
  focusCommentEnd();
}

const focusCommentEnd = () => {
    nextTick(() => {
        const range = new Range();
        range.setStart(container.value, container.value.childNodes.length);
        range.setEnd(container.value, container.value.childNodes.length);
        const selection = getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    })
}

const submitComment = () => {
    const cloneNode = container.value.cloneNode(true);
    // 删除用户名
    const usernameEl = cloneNode.querySelector('#username');
    if(usernameEl) {
      usernameEl.remove();
    }
    const text = cloneNode.innerText;
    console.log('发布评论', text);
    container.value.innerText = '';
    showInput.value = false;
};

const replyComment = (username: string, isShow: boolean) => {
    showInput.value = true;
    let usernameEl = container.value.querySelector('#username');
    if(!isShow) {
        usernameEl?.remove();
        return;
    }
    if(!usernameEl) {
        usernameEl = document.createElement('span');
        usernameEl.id = 'username';
        usernameEl.contentEditable = 'false';
        container.value.prepend(usernameEl);
    }
    usernameEl.innerText = `@${username}`;
    focusCommentEnd();
};
</script>

<style scoped lang="scss">
#container {
    box-sizing: border-box;
    border: 1px solid #5f5f5f;
    border-radius: 8px;
    min-height: 40px;
    width: 200px;
    line-height: 1.2;
    font-size: 16px;
    padding: 9px 6px;
    :deep(#username) {
        color: #8E8E8E;
        display: inline-block;
        /* 不能用 margin-right, 不能用空格 */
        padding-right: 5px;
    }
}

.op {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    gap: 10px;
}

</style>