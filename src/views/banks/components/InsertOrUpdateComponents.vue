<template>
  <v-btn
    color="primary"
    prepend-icon="fas fa-plus"
    elevation="0"
    class="font-weight-bold"
    @click="openForAdd"
  >
    إضافة مصرف
  </v-btn>

  <v-dialog v-model="dialog" max-width="500" persistent @after-leave="resetForm">
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-3">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary">fas fa-bank</v-icon>
          <span class="font-weight-bold">{{
            isEditMode ? 'تعديل المصرف' : 'إضافة مصرف جديد'
          }}</span>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="اسم المصرف"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.code"
              label="رقم المصرف"
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
import { useBanksStore } from '@/stores/index.js'

const store = useBanksStore()
const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const currentItem = ref(null)

const isEditMode = computed(() => currentItem.value !== null)

const emptyForm = () => ({ name: '', code: '', branchCount: 0 })
const form = ref(emptyForm())

function openForAdd() {
  currentItem.value = null
  form.value = emptyForm()
  dialog.value = true
}

function openForEdit(item) {
  currentItem.value = item
  form.value = { name: item.name, code: item.code, branchCount: item.branchCount }
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
  if (isEditMode.value) {
    store.update({ ...currentItem.value, ...form.value })
    showSnackbar('تم تعديل المصرف بنجاح')
  } else {
    store.add({ ...form.value, branchCount: 0 })
    showSnackbar('تمت إضافة المصرف بنجاح')
  }
  close()
}

defineExpose({ openForEdit })
</script>
