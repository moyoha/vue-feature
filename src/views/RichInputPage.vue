<template>
    <div id="container" contenteditable="true" v-if="showInput">
        <span id="content"></span>
    </div>
    <!-- <span id="username" v-show="showUsername">@{{ username }}</span> -->
    <div class="op">
        <button @click="showInput = true">显示输入框</button>
        <button @click="showInput = false">隐藏输入框</button>
        <button @click="submitComment()">发布评论</button>
        <button @click="replyComment()">回复评论</button>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const showInput = ref(true);
const username = ref('张三');
const showUsername = ref(false);

const submitComment = () => {
    console.log('提交评论');
};

const replyComment = () => {
    showUsername.value = true;
    console.log('回复评论');
};
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

.op {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

#username {
    color: #8E8E8E;
    display: inline-block;
    /* 不能用 margin-right, 不能用空格 */
    padding-right: 5px;
}
</style>