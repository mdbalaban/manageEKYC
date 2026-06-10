<template>
  <div>
    <div class="d-flex align-center mb-6">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <v-icon icon="fas fa-map-marker" color="primary" size="28" />
          <h1 class="text-h5 font-weight-black text-primary px-2">إدارة المناطق</h1>
        </div>
        <div class="text-body-2 text-medium-emphasis">
          إجمالي السجلات: <strong>{{ store.items.length }}</strong>
        </div>
      </div>
      <v-spacer />
      <InsertOrUpdateComponents ref="dialogRef" />
    </div>

    <DataTablePage
      :headers="headers"
      :items="store.pagedItems"
      :loading="store.loading"
      :totalPages="store.totalPages"
      :totalRecords="store.items.length"
      :modelPage="store.page"
      @edit="dialogRef.openForEdit($event)"
      @delete="confirmDelete($event)"
      @toggle="store.toggle($event)"
      @page-change="store.page = $event"
      @search="searchFilter = $event"
    />

    <DeleteComponent v-model="deleteDialog" :item="deleteItem" @confirm="doDelete" />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import DataTablePage from '../components/DataTablePage.vue'
import InsertOrUpdateComponents from '../components/InsertOrUpdateComponents.vue'
import DeleteComponent from '../components/DeleteComponent.vue'
import { useRegionsStore } from '@/stores/index.js'

const store = useRegionsStore()
const showSnackbar = inject('showSnackbar')

const dialogRef = ref(null)
const deleteDialog = ref(false)
const deleteItem = ref(null)
const searchFilter = ref('')

const headers = [
  { title: 'رقم المنطقة', key: 'regionNumber', align: 'center' },
  { title: 'اسم المنطقة', key: 'name', align: 'center' },
  { title: 'عدد الفروع', key: 'branchCount', align: 'center' },
  { title: 'الحالة', key: 'toggle', align: 'center', sortable: false },
  { title: 'إجراءات', key: 'actions', align: 'center', sortable: false },
]

function confirmDelete(item) {
  deleteItem.value = item
  deleteDialog.value = true
}

function doDelete() {
  store.remove(deleteItem.value.id)
  showSnackbar('تم حذف المنطقة', 'error')
  deleteDialog.value = false
}
</script>
