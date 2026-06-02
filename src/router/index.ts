import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/countries',
  },

  {
    path: '/settings',
    name: 'الإعدادات العامة',
    icon: 'fas fa-cog',
    children: [
      {
        path: '/countries',
        name: 'الدول',
        icon: 'fas fa-earth',
        component: () => import('@/views/countries/page/index.vue'),
      },
      {
        path: '/nationalities',
        name: 'الجنسيات',
        icon: 'fas fa-flag',
        component: () => import('@/views/nationalities/page/index.vue'),
      },
      {
        path: '/cities',
        name: 'المدن',
        icon: 'fas fa-city',
        component: () => import('@/views/cities/page/index.vue'),
      },
      {
        path: '/regions',
        name: 'المناطق',
        icon: 'fas fa-map-marker',
        component: () => import('@/views/regions/page/index.vue'),
      },
      {
        path: '/banks',
        name: 'المصارف',
        icon: 'fas fa-bank',
        component: () => import('@/views/banks/page/index.vue'),
      },
      {
        path: '/branches',
        name: 'الفروع',
        icon: 'fas fa-code-branch',
        component: () => import('@/views/branches/page/index.vue'),
      },
      {
        path: '/kyc-model-types',
        name: ' نماذج KYC',
        icon: 'fas fa-circle-user',
        component: () => import('@/views/kycModelTypes/page/index.vue'),
      },
      {
        path: '/set-reject-messages',
        name: ' إعداد رسائل الرفض',
        icon: 'fas fa-message',
        component: () => import('@/views/setRejectMessages/page/index.vue'),
      },
    ],
  },
  {
    path: '/requests',
    name: 'إدارة الطلبات',
    icon: 'fas fa-file',
    children: [
      {
        path: '/new-requests',
        name: 'الطلبات الجديدة',
        icon: 'fas fa-file-pen',
        component: () => import('@/views/newRequestsKyc/page/index.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
