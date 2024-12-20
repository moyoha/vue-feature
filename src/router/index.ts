import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../App.vue'

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
      path: '/demo1',
      name: 'demo1',
      component: () => import('@/views/Demo1.vue')
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: () => import('@/views/Demo2.vue')
    },
    {
      path: '/demo3',
      name: 'demo3',
      component: () => import('@/views/Demo3.vue')
    }
  ]
})

export default router
