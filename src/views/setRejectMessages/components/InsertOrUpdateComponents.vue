<template>
  <v-btn
    color="primary"
    prepend-icon="fas fa-plus"
    elevation="0"
    class="font-weight-bold"
    @click="openForAdd"
  >
    إضافة رسالة
  </v-btn>

  <v-dialog v-model="dialog" max-width="500" persistent @after-leave="resetForm">
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-3">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary">fas fa-message</v-icon>
          <span class="font-weight-bold">{{
            isEditMode ? 'تعديل رسالة الرفض' : 'إضافة رسالة رفض جديدة'
          }}</span>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.messageType"
              label="نوع الرسالة"
              variant="outlined"
              density="comfortable"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.message"
              label="رسالة الرفض"
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
import { useRejectMessagesStore } from '@/stores/index.js'

const store = useRejectMessagesStore()
const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const currentItem = ref(null)

const isEditMode = computed(() => currentItem.value !== null)

const emptyForm = () => ({ messageType: '', message: '' })
const form = ref(emptyForm())

function openForAdd() {
  currentItem.value = null
  form.value = emptyForm()
  dialog.value = true
}

function openForEdit(item) {
  currentItem.value = item
  form.value = { messageType: item.messageType, message: item.message }
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
    showSnackbar('تم تعديل رسالة الرفض بنجاح')
  } else {
    store.add({ ...form.value })
    showSnackbar('تمت إضافة رسالة الرفض بنجاح')
  }
  close()
}

defineExpose({ openForEdit })
</script>
