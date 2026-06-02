<template>
  <div class="d-flex align-center mb-6">
    <div>
      <div class="d-flex align-center gap-2 mb-1">
        <v-icon icon="fas fa-file-pen" color="primary" size="28" />
        <h1 class="text-h5 font-weight-black text-primary px-2">الطلبات الجديدة</h1>
      </div>
      <div class="text-body-2 text-medium-emphasis">
        إجمالي السجلات: <strong>{{ store.items.length }}</strong>
      </div>
    </div>
    <v-spacer />
    <UpdateComponents ref="dialogRef" />
  </div>
  <DetailsDialogComponent ref="dialogDetails" />
  <DataTablePage
    :headers="headers"
    :items="store.pagedItems"
    :loading="store.loading"
    :totalPages="store.totalPages"
    :totalRecords="store.items.length"
    :modelPage="store.page"
    @show="openDetails"
    @page-change="store.page = $event"
    @search="searchFilter = $event"
  />
</template>

<script setup>
import { ref } from 'vue'
import DataTablePage from '../components/DataTablePage.vue'
import UpdateComponents from '../components/UpdateComponents.vue'
import DetailsDialogComponent from '../components/DetailsDialogComponent.vue'
import { useKycRequestStore } from '@/stores/kycRequestStore.js'

const store = useKycRequestStore()

const dialogRef = ref(null)
const dialogDetails = ref(null)

const searchFilter = ref('')

const headers = [
  { title: 'رقم الهوية', key: 'nationalId', align: 'center' },
  { title: 'نوع الطلب', key: 'KycRequestType', align: 'center' },
  { title: 'اسم العميل', key: 'fullName', align: 'center' },
  { title: 'نوع النموذج', key: 'KycModelName', align: 'center' },
  { title: 'اسم الفرع', key: 'region', align: 'center' },
  { title: 'الحالة', key: 'status', align: 'center' },
  { title: 'إجراءات', key: 'actions', align: 'center', sortable: false },
]

function openDetails(item) {
  dialogDetails.value.open(item)
}
</script>
