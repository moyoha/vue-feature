<template>
  <div class="crop-container">
    <img :src="imgSrc" ref="imgRef" crossorigin="anonymous">
    <div
      class="crop"
      @mousedown.self="drag"
      @touchstart.self="drag"
      ref="cropRef"
      :style="{
        transform: `translate(${newTx}px, ${newTy}px)`,
        width: `${newWidth}px`,
        height: `${newHeight}px`
      }"
    >
      <div v-if="options.dragNodes.includes('left')" @mousedown="zoom($event, leftZoom)"  @touchstart="zoom($event, leftZoom)" class="crop-vertical crop-left"></div>
      <div v-if="options.dragNodes.includes('right')" @mousedown="zoom($event, rightZoom)" @touchstart="zoom($event, rightZoom)" class="crop-vertical crop-right"></div>
      <div v-if="options.dragNodes.includes('top')" @mousedown="zoom($event, topZoom)" @touchstart="zoom($event, topZoom)" class="crop-horizontal crop-top"></div>
      <div v-if="options.dragNodes.includes('bottom')" @mousedown="zoom($event, bottomZoom)" @touchstart="zoom($event, bottomZoom)" class="crop-horizontal crop-bottom"></div>
      <div v-if="options.dragNodes.includes('leftTop')" @mousedown="zoom($event, leftTopZoom)" @touchstart="zoom($event, leftTopZoom)" class="crop-horn crop-leftTop"></div>
      <div v-if="options.dragNodes.includes('leftBottom')" @mousedown="zoom($event, leftBottomZoom)" @touchstart="zoom($event, leftBottomZoom)" class="crop-horn crop-leftBottom"></div>
      <div v-if="options.dragNodes.includes('rightTop')" @mousedown="zoom($event, rightTopZoom)" @touchstart="zoom($event, rightTopZoom)" class="crop-horn crop-rightTop"></div>
      <div v-if="options.dragNodes.includes('rightBottom')" @mousedown="zoom($event, rightBottomZoom)" @touchstart="zoom($event, rightBottomZoom)" class="crop-horn crop-rightBottom"></div>
    </div>
    <div
      :style="{
        width: `${newWidth}px`,
        height: `${newHeight}px`,
        'border-top-width': `${borderTopWidth}px`,
        'border-left-width': `${borderLeftWidth}px`,
        'border-bottom-width': `${borderBottomWidth}px`,
        'border-right-width': `${borderRightWidth}px`
      }"
      class="crop-border"
    >
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';

type TDir = 'left' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
interface IConfig {
  minWidth: number,
  minHeight: number,
  width: number,
  height: number,
  aspectRatio: number,
  dragNodes: TDir[]
}
const props = defineProps<{
  imgSrc: string,
  config?: Partial<IConfig>
}>()

const defaultConfig: IConfig = {
  minWidth: 100,
  minHeight: 100,
  width: 100,
  height: 100,
  aspectRatio: 4/5,
  dragNodes: ['left', 'right', 'top', 'bottom', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']
}
const options: IConfig = { ...defaultConfig, ...props.config };
const imgRef = ref();
let eventTypes = {
  start: 'mousedown',
  end: 'mouseup',
  move: 'mousemove'
}
onMounted(() => {
  init();
});

let pWidth = ref(0);
let pHeight = ref(0);
function showCrop() {
  // 获取父元素的宽高
  pWidth.value = imgRef.value.clientWidth
  pHeight.value = imgRef.value.clientHeight
  
  getSelfInfo()
}
const cropRef = ref();
let width = 0;
let height = 0;
const newWidth = ref(options.width);
const newHeight = ref(options.height);
let tx = 0;
let ty = 0;
const newTx = ref(0);
const newTy = ref(0);

const borderTopWidth = computed(() => newTy.value);
const borderBottomWidth = computed(() => pHeight.value - newTy.value - newHeight.value);
const borderLeftWidth = computed(() => newTx.value);
const borderRightWidth = computed(() => pWidth.value - newTx.value - newWidth.value);
function init() {
  if(options.aspectRatio) {
    // 修正宽高比
    options.minHeight = options.minWidth / options.aspectRatio;
    newHeight.value = height = options.width / options.aspectRatio;
  }
  if(imgRef.value.complete) {
    showCrop();
  } else {
    imgRef.value.addEventListener('load', () => {
      showCrop();
    });
  }
  if(/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    eventTypes = {
      start: 'touchstart',
      end: 'touchend',
      move: 'touchmove'
    }
  }
}
// 获取裁剪元素的宽高、偏移
function getSelfInfo() {
  newWidth.value = width = cropRef.value.offsetWidth;
  newHeight.value = height = cropRef.value.offsetHeight;

  const translateDistance = getTranslateDistance()
  newTx.value = tx = translateDistance.x;
  newTy.value = ty = translateDistance.y;
}

// 获取裁剪元素当前的的偏移数据
function getTranslateDistance() {
  let translateStr = cropRef.value.style.transform;
  const reg = /-?\d+(\.\d+)?/g;
  let translateArr = translateStr.match(reg);

  return {
    x: +translateArr[0],
    y: +translateArr[1]
  }
}

let startX = 0;
let startY = 0;
// 获取裁剪元素的宽高、偏移以及鼠标的起始位置信息
function getInfo(e: MouseEvent | Touch) {
  getSelfInfo()

  startX = e.clientX
  startY = e.clientY
}



// 拖动实现
function drag(ev: MouseEvent | TouchEvent) {
  const e = getEvent(ev);
  getInfo(e)
  const handleMove = (ev: MouseEvent | TouchEvent) => {
    const e = getEvent(ev);
    newTx.value = Math.max(0, Math.min(tx + e.clientX - startX, pWidth.value - width));
    newTy.value = Math.max(0, Math.min(ty + e.clientY - startY, pHeight.value - height));
  }
  // @ts-ignore
  document.addEventListener(eventTypes.move, handleMove)
  document.addEventListener(eventTypes.end, () => {
    // @ts-ignore
    document.removeEventListener(eventTypes.move, handleMove)
  })
}
// 缩放实现
function zoom(ev: MouseEvent | TouchEvent, dir: Function) {
  const e = getEvent(ev);
  getInfo(e);
  const handleZoom = (ev: MouseEvent | TouchEvent) => {
    const e = getEvent(ev);
    dir(e);
  }
  // @ts-ignore
  document.addEventListener(eventTypes.move, handleZoom)
  document.addEventListener(eventTypes.end, () => {
    // @ts-ignore
    document.removeEventListener(eventTypes.move, handleZoom)
  })
}
function leftZoom(e: MouseEvent | Touch) {
  const nWidth = width + (startX - e.clientX)
  newWidth.value = Math.max(options.minWidth, Math.min(nWidth, getMaxWidthToLeft()))
  
  if(options.aspectRatio) {
    if(newWidth.value >= getMaxHeightToTop() * options.aspectRatio) {
      newWidth.value = getMaxHeightToTop() * options.aspectRatio;
    }
    newHeight.value = newWidth.value / options.aspectRatio;
    newTy.value = ty + (height - newHeight.value);
  }
  newTx.value = tx + width - newWidth.value;
}

function rightZoom(e: MouseEvent | Touch) {
  const nWidth = width + (e.clientX - startX)
  newWidth.value = Math.max(options.minWidth, Math.min(nWidth, getMaxWidthToRight()))

  if(options.aspectRatio) {
    if(newWidth.value >= getMaxHeightToBottom() * options.aspectRatio) {
      newWidth.value = getMaxHeightToBottom() * options.aspectRatio
    }
    newHeight.value = newWidth.value / options.aspectRatio
  }
}

function topZoom(e: MouseEvent | Touch) {
  const nHeight = height + (startY - e.clientY)
  newHeight.value = Math.max(options.minHeight, Math.min(nHeight, getMaxHeightToTop()))

  if (options.aspectRatio) {
    if (newHeight.value >= getMaxWidthToRight() / options.aspectRatio) {
      newHeight.value = getMaxWidthToRight() / options.aspectRatio
    }
    newWidth.value = newHeight.value * options.aspectRatio
  }
  newTy.value = ty + (height - newHeight.value);
}

function bottomZoom(e: MouseEvent | Touch) {
  const nHeight = height + (e.clientY - startY)
  newHeight.value = Math.max(options.minHeight, Math.min(nHeight, getMaxHeightToBottom()))

  if (options.aspectRatio) {
    if (newHeight.value >= getMaxWidthToLeft() / options.aspectRatio) {
      newHeight.value = getMaxWidthToLeft() / options.aspectRatio
    }
    newWidth.value = newHeight.value * options.aspectRatio
  }
  newTx.value = tx + width - newWidth.value;
}

function leftTopZoom(e: MouseEvent | Touch) {
  leftZoom(e)
  if(!options.aspectRatio) {
    topZoom(e)
  }
}

function leftBottomZoom(e: MouseEvent | Touch) {
  bottomZoom(e)
  if (!options.aspectRatio) {
    leftZoom(e)
  }
}

function rightTopZoom(e: MouseEvent | Touch) {
  topZoom(e)
  if(!options.aspectRatio) {
    rightZoom(e)
  }
}

function rightBottomZoom(e: MouseEvent | Touch) {
  rightZoom(e)
  if (!options.aspectRatio) {
    bottomZoom(e)
  }
}
// 获取向上缩放的最大高度
function getMaxHeightToTop() {
  return height + ty;
}
// 获取向下缩放的最大高度
function getMaxHeightToBottom() {
  return pHeight.value - ty;
}
// 获取向左缩放的最大宽度
function getMaxWidthToLeft() {
  return width + tx;
}
// 获取向右缩放的最大宽度
function getMaxWidthToRight() {
  return pWidth.value - tx;
}
function getEvent(event: MouseEvent | TouchEvent) {
  if(event instanceof TouchEvent) {
    return event.touches[0];
  }
  return event;
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* 四个角的样式 start */
.crop-horn {
  width: 8px;
  height: 8px;
  background-color: #fff;
  position: absolute;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
}
.crop-leftTop {
  cursor: nw-resize;
  left: -4px;
  top: -4px;
}

.crop-rightTop {
  cursor: ne-resize;
  right: -4px;
  top: -4px;
}

.crop-leftBottom {
  cursor: sw-resize;
  bottom: -4px;
  left: -4px;
}

.crop-rightBottom {
  cursor: se-resize;
  right: -4px;
  bottom: -4px;
}
/* 四个角的样式 end */

/* 左右两侧样式 start */
.crop-vertical {
  width: 6px;
  height: 12px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  cursor: col-resize;
}
.crop-left {
  top: calc(50% - 6px);
  left: -3px;
}
.crop-right {
  top: calc(50% - 6px);
  right: -3px;
}
/* 左右两侧样式 end */

/* 上下两侧样式 start */
.crop-horizontal {
  width: 12px;
  height: 6px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  cursor: row-resize;
}
.crop-top {
  top: -3px;
  left: calc(50% - 6px);
}

.crop-bottom {
  left: calc(50% - 6px);
  bottom: -3px;
}
/* 上下两侧样式 end */

.crop {
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #5864f6;
  z-index: 100;
}

.crop-container {
  position: relative;
  width: fit-content;
  height: fit-content;
  user-select: none;
  font-size: 0;
}

.crop-border {
  box-sizing: content-box;
  position: absolute;
  left: 0;
  top: 0;
  border-color: rgba(0, 0, 0, 0.5);
  border-style: solid;
}
</style>