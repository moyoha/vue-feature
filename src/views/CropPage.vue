<template>
  <CropImage :img-src="Image" :config="config"></CropImage>
</template>

<script lang="ts" setup>
import Image from '@/assets/imgs/2.jpeg'
import CropImage from '@/components/crop/CropImage.vue'
import { reactive } from 'vue';

type TDir = 'left' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
const config = reactive({
  dragNodes: ['left', 'right', 'top', 'bottom'] as TDir[],
  aspectRatio: 0
})
</script>