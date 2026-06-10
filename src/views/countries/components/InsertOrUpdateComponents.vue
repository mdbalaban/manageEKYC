<template>
  <v-btn
    color="onPrimary"
    prepend-icon="fas fa-plus"
    elevation="0"
    class="font-weight-bold"
    @click="openForAdd"
  >
    إضافة دولة
  </v-btn>

  <v-dialog v-model="dialog" max-width="500" persistent @after-leave="resetForm">
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-3">
        <div class="d-flex align-center">
          <v-icon size="small" color="onPrimary" class="me-2">fas fa-earth</v-icon>
          <span class="font-weight-bold">
            {{ isEditMode ? 'تعديل دولة' : 'إضافة دولة جديدة' }}
          </span>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field v-model="form.name" label="اسم الدولة" variant="outlined" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.code" label="الرمز" variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-btn variant="tonal" @click="close">إلغاء</v-btn>
        <v-spacer />
        <v-btn color="onPrimary" variant="flat" @click="save">
          {{ isEditMode ? 'حفظ التعديلات' : 'إضافة' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useCountriesStore } from '@/stores/index.js'

const store = useCountriesStore()
const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const currentItem = ref(null)

const isEditMode = computed(() => currentItem.value !== null)

const emptyForm = () => ({ name: '', code: '' })
const form = ref(emptyForm())

function openForAdd() {
  currentItem.value = null
  form.value = emptyForm()
  dialog.value = true
}

function openForEdit(item) {
  currentItem.value = item
  form.value = { name: item.name, code: item.code }
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
    showSnackbar('تم تعديل الدولة بنجاح')
  } else {
    store.add({ ...form.value, citiesCount: 0 })
    showSnackbar('تمت إضافة الدولة بنجاح')
  }
  close()
}

defineExpose({ openForEdit })
</script>
