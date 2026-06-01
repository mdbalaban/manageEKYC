<template>
  <div class="d-flex align-center mb-6">
    <div>
      <div class="d-flex align-center gap-2 mb-1">
        <v-icon icon="mdi-file-document-edit" color="primary" size="28" />
        <h1 class="text-h5 font-weight-black text-primary">الطلبات الجديدة</h1>
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
    @show="openDetails"
    @page-change="store.page = $event"
    @search="searchFilter = $event"
  />

  <DeleteComponent v-model="deleteDialog" :item="deleteItem" @confirm="doDelete" />
</template>

<script setup>
import { ref } from 'vue'
import DataTablePage from '../components/DataTablePage.vue'
import UpdateComponents from '../components/UpdateComponents.vue'
import { useKycRequestStore } from '@/stores/kycRequestStore.js'

const store = useKycRequestStore()

const dialogRef = ref(null)
const dialogDetails = ref(null)

const searchFilter = ref('')

const headers = [
  { title: 'رقم الطلب', key: 'KycRequestNumber', align: 'center' },
  { title: 'نوع الطلب', key: 'KycRequestType', align: 'center' },
  { title: 'اسم العميل', key: 'KycPartyName', align: 'center' },
  { title: 'نوع النموذج', key: 'KycModelName', align: 'center' },
  { title: 'اسم الفرع', key: 'BranchName', align: 'center' },
  { title: 'الحالة', key: 'status', align: 'center' },
  { title: 'إجراءات', key: 'actions', align: 'center', sortable: false },
]

function openDetails(item) {
  selectedItem.value = item
  dialogDetails.value = true
}
</script>
