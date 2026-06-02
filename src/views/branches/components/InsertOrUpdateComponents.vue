<template>
  <v-btn
    color="primary"
    prepend-icon="fas fa-plus"
    elevation="0"
    class="font-weight-bold"
    @click="openForAdd"
  >
    إضافة فرع
  </v-btn>

  <v-dialog v-model="dialog" max-width="500" persistent @after-leave="resetForm">
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-3">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary">fas fa-code-branch</v-icon>
          <span class="font-weight-bold">{{ isEditMode ? 'تعديل الفرع' : 'إضافة فرع جديد' }}</span>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="اسم الفرع"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.branchCode"
              label="رقم الفرع"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="form.bankId"
              :items="banksStore.items"
              item-title="name"
              item-value="id"
              label="المصرف"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="form.regionId"
              :items="regionsStore.items"
              item-title="name"
              item-value="id"
              label="المنطقة"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-btn variant="tonal" rounded="lg" @click="close">إلغاء</v-btn>
        <v-spacer />
        <v-btn color="primary" variant="flat" rounded="lg" @click="save">
          {{ isEditMode ? 'حفظ التعديلات' : 'إضافة' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useBranchesStore, useBanksStore, useRegionsStore } from '@/stores/index.js'

const store = useBranchesStore()
const banksStore = useBanksStore()
const regionsStore = useRegionsStore()
const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const currentItem = ref(null)

const isEditMode = computed(() => currentItem.value !== null)

const emptyForm = () => ({ name: '', branchCode: '', bankId: null, regionId: null, branchCount: 0 })
const form = ref(emptyForm())

function openForAdd() {
  currentItem.value = null
  form.value = emptyForm()
  dialog.value = true
}

function openForEdit(item) {
  currentItem.value = item
  form.value = {
    name: item.name,
    branchCode: item.branchCode,
    bankId: item.bankId,
    regionId: item.regionId,
    branchCount: item.branchCount,
  }
  dialog.value = true
}

function close() {
  dialog.value = false
}

function resetForm() {
  currentItem.value = null
  form.value = emptyForm()
}

function save() {
  const bank = banksStore.items.find((b) => b.id === form.value.bankId)
  const region = regionsStore.items.find((r) => r.id === form.value.regionId)

  if (isEditMode.value) {
    store.update({
      ...currentItem.value,
      ...form.value,
      bankName: bank?.name ?? '',
      regionName: region?.name ?? '',
    })

    showSnackbar('تم تعديل الفرع بنجاح')
  } else {
    store.add({
      ...form.value,
      bankName: bank?.name ?? '',
      regionName: region?.name ?? '',
    })

    showSnackbar('تمت إضافة الفرع بنجاح')
  }

  close()
}

defineExpose({ openForEdit })
</script>
