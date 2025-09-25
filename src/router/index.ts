import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crop',
      name: 'crop',
      component: () => import('@/views/CropPage.vue')
    },
    {
      path: '/rich-input',
      name: 'rich-input',
      component: () => import('@/views/RichInputPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue')
    },
  ]
});

export default router;
