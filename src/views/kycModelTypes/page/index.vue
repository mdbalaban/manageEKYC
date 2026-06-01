<template>
  <div class="d-flex align-center mb-6">
    <div>
      <div class="d-flex align-center gap-2 mb-1">
        <v-icon icon="mdi-account-circle" color="primary" size="28" />
        <h1 class="text-h5 font-weight-black text-primary">إدارة نماذج KYC</h1>
      </div>
      <div class="text-body-2 text-medium-emphasis">
        إجمالي السجلات: <strong>{{ store.items.length }}</strong>
      </div>
    </div>
    <v-spacer />
    <UpdateComponents ref="dialogRef" />
  </div>

  <DataTablePage
    :headers="headers"
    :items="store.pagedItems"
    :loading="store.loading"
    :totalPages="store.totalPages"
    :totalRecords="store.items.length"
    :modelPage="store.page"
    @edit="dialogRef.openForEdit($event)"
    @toggle="store.toggle($event)"
    @page-change="store.page = $event"
    @search="searchFilter = $event"
  />
</template>

<script setup>
import { ref } from 'vue'
import DataTablePage from '../components/DataTablePage.vue'
import UpdateComponents from '../components/UpdateComponents.vue'

import { useKycModelTypesStore } from '@/stores/index.js'

const store = useKycModelTypesStore()

const dialogRef = ref(null)

const searchFilter = ref('')

const headers = [
  { title: 'نوع الطلب', key: 'requestType', align: 'center' },
  { title: 'اسم النموذج', key: 'name', align: 'center' },
  { title: 'الأيقونة', key: 'icon', align: 'center' },
  { title: 'الحالة', key: 'toggle', align: 'center', sortable: false },
  { title: 'إجراءات', key: 'actions', align: 'center', sortable: false },
]
</script>
