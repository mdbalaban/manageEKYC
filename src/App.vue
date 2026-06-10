<template>
  <v-app :theme="theme">
    <AppSidebar v-model:drawer="drawer" />

    <v-app-bar elevation="0" color="onSecondary" height="64" border="b">
      <v-btn icon variant="text" @click="drawer = !drawer" class="ms-2">
        <v-icon>fas fa-bars</v-icon>
      </v-btn>
      <v-app-bar-title>
        <span class="font-weight-bold text-white">{{ currentPageTitle }}</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main style="background: rgb(var(--v-theme-background))">
      <div class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top end"
      :timeout="3000"
      rounded="xl"
    >
      <v-icon start>{{ snackbar.icon }}</v-icon>
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const theme = ref('light')
const drawer = ref(false)

const route = useRoute()

const snackbar = ref({ show: false, text: '', color: 'success', icon: 'fas fa-circle-check' })

const showSnackbar = (text, color = 'success') => {
  snackbar.value = {
    show: true,
    text,
    color,
    icon:
      color === 'success'
        ? 'fas fa-circle-check'
        : color === 'error'
          ? 'fas fa-circle-exclamation'
          : 'fas fa-circle-info',
  }
}

provide('showSnackbar', showSnackbar)

const navItems = [
  { path: '/countries', title: 'الدول' },
  { path: '/cities', title: 'المدن' },
  { path: '/regions', title: 'المناطق' },
  { path: '/banks', title: 'المصارف' },
  { path: '/branches', title: 'فروع المصارف' },
  { path: '/nationalities', title: 'الجنسيات' },
  { path: '/kyc-model-types', title: 'أنواع نماذج KYC' },
  { path: '/set-reject-messages', title: 'إعداد رسائل الرفض' },
  { path: '/new-requests', title: 'الطلبات الجديدة' },
]

const currentPageTitle = computed(() => {
  return navItems.find((i) => i.path === route.path)?.title || 'لوحة الإدارة'
})
</script>

<style>
.nav-item .v-list-item__prepend {
  margin-inline-end: 8px !important;
}
.v-list-item--active {
  background: rgba(0, 198, 174, 0.18) !important;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.lh-1 {
  line-height: 1.2 !important;
}
</style>
