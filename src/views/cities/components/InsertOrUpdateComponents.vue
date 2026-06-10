<template>
  <v-btn
    color="onPrimary"
    prepend-icon="fas fa-plus"
    elevation="0"
    class="font-weight-bold"
    @click="openForAdd"
  >
    إضافة مدينة
  </v-btn>

  <v-dialog v-model="dialog" max-width="500" persistent @after-leave="resetForm">
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-3">
        <div class="d-flex align-center gap-2">
          <v-icon size="small" color="onPrimary">fas fa-city</v-icon>
          <span class="font-weight-bold px-2">{{
            isEditMode ? 'تعديل مدينة' : 'إضافة مدينة جديدة'
          }}</span>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="اسم المدينة"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="form.countryId"
              :items="countriesStore.items"
              item-title="name"
              item-value="id"
              label="الدولة"
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
        <v-btn color="onPrimary" variant="flat" rounded="lg" @click="save">
          {{ isEditMode ? 'حفظ التعديلات' : 'إضافة' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useCitiesStore, useCountriesStore } from '@/stores/index.js'

const store = useCitiesStore()
const countriesStore = useCountriesStore()
const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const currentItem = ref(null)

const isEditMode = computed(() => currentItem.value !== null)

const emptyForm = () => ({ name: '', countryId: null })
const form = ref(emptyForm())

function openForAdd() {
  currentItem.value = null
  form.value = emptyForm()
  dialog.value = true
}

function openForEdit(item) {
  currentItem.value = item
  form.value = { name: item.name, countryId: item.countryId }
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
  const country = countriesStore.items.find((c) => c.id === form.value.countryId)

  if (isEditMode.value) {
    store.update({ ...currentItem.value, ...form.value, countryName: country?.name ?? '' })
    showSnackbar('تم تعديل المدينة بنجاح')
  } else {
    store.add({ ...form.value, countryName: country?.name ?? '' })
    showSnackbar('تمت إضافة المدينة بنجاح')
  }
  close()
}

defineExpose({ openForEdit })
</script>
