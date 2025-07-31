<template>
  <div class="container" ref="containerEl">
    <div ref="topEl"></div>
    <div ref="topEl" :style="{ height: `${100 * startIndex}px` }"></div>
    <div v-for="item in showData" :key="item" class="item">{{ item }}</div>
    <div ref="bottomEl"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const topEl = ref<HTMLDivElement | null>(null);
const bottomEl = ref<HTMLDivElement | null>(null);
const containerEl = ref<HTMLDivElement | null>(null);

const data = generateRandomPermutation(1000);
const showData = ref<number[]>([]);
const startIndex = ref(0);

onMounted(async () => {
  const topObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startIndex.value = Math.max(Math.floor((containerEl.value!.scrollTop) / 100 - 30), 0);
      showData.value = data.slice(startIndex.value, 30);
    }
  }, {
    root: containerEl.value,
    rootMargin: '500px 0px 0px 0px'
  });
  topObserver.observe(topEl.value!);

  const bottomObserver = new IntersectionObserver((entries) => {
    console.log('bottomObserver', entries.length, entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      startIndex.value = Math.max(Math.floor((containerEl.value!.scrollTop - 500) / 100), 0);
      showData.value = data.slice(startIndex.value, startIndex.value + 30);
      console.log(containerEl.value!.scrollTop, startIndex.value, showData.value);
    }
  }, {
    root: containerEl.value,
    rootMargin: '0px 0px 500px 0px'
  });
  bottomObserver.observe(bottomEl.value!);
});


function generateRandomPermutation(n: number) {
  return Array.from({ length: n }, (_, index) => index + 1);
}
</script>

<style lang="scss" scoped>
.container {
  height: 500px;
  width: 300px;
  overflow: auto;
  position: relative;
  border: 1px solid #000;

  .item {
    background-color: red;
    height: 100px;
    border: 1px solid #000;
  }
}
</style>
