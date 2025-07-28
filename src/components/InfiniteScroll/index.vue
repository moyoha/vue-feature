<template>
  <div class="container" ref="containerEl">
    <div class="top" ref="topEl" :style="{ height: `${100 * startIndex}px` }"></div>
    <div v-for="item in data" :key="item" class="item">{{ item }}</div>
    <div class="bottom" ref="bottomEl"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const topEl = ref<HTMLDivElement | null>(null);
const bottomEl = ref<HTMLDivElement | null>(null);

const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const startIndex = ref(0);

const topObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('topObserver', entry);
    }
  });
});

let bottomIsShow = false;
const containerEl = ref<HTMLDivElement | null>(null);


onMounted(async () => {
  // await nextTick();
  // topObserver.observe(topEl.value!);
  const bottomObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('bottomObserver-------------', entry);
      if (entry.isIntersecting) {
        bottomIsShow = true;
        // 加载数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            data.value.push(data.value.length + 1);
          }
        }, 1000);
      } else {
        bottomIsShow = false;
      }
    });
  }, {
    root: containerEl.value,
    rootMargin: '0px 0px 500px 0px'
  });
  bottomObserver.observe(bottomEl.value!);
});
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
