import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/countries',
  },

  {
    path: '/settings',
    name: 'الإعدادات العامة',
    icon: 'mdi-cog',
    children: [
      {
        path: '/countries',
        name: 'الدول',
        icon: 'mdi-earth',
        component: () => import('@/views/countries/page/index.vue'),
      },
      {
        path: '/cities',
        name: 'المدن',
        icon: 'mdi-city',
        component: () => import('@/views/cities/page/index.vue'),
      },
      {
        path: '/regions',
        name: 'المناطق',
        icon: 'mdi-map-marker',
        component: () => import('@/views/regions/page/index.vue'),
      },
      {
        path: '/banks',
        name: 'المصارف',
        icon: 'mdi-bank',
        component: () => import('@/views/banks/page/index.vue'),
      },
      {
        path: '/branches',
        name: 'الفروع',
        icon: 'mdi-source-branch',
        component: () => import('@/views/branches/page/index.vue'),
      },
      {
        path: '/nationalities',
        name: 'الجنسيات',
        icon: 'mdi-flag',
        component: () => import('@/views/nationalities/page/index.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
