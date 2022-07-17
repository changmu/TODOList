import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),  // history模式
  history: createWebHashHistory(), // hash模式
  routes: [
    {
      path: '/',
      name: 'todos',
      component: () => import('@/components/TodoList.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/components/TodoListAbout.vue')
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import('@/components/ChangeLog.vue')
    },
  ]
})

export default router
