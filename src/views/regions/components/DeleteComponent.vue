<template>
  <v-dialog v-model="model" max-width="400">
    <v-card rounded="xl">
      <v-card-text class="pa-6 text-center">
        <v-icon color="error" size="64" class="mb-4"> mdi-trash-can-outline </v-icon>

        <div class="text-h6 font-weight-bold mb-2">تأكيد الحذف</div>

        <div>
          هل أنت متأكد من حذف
          <strong>{{ item?.name }}</strong
          >؟
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn variant="tonal" @click="model = false"> إلغاء </v-btn>

        <v-spacer />

        <v-btn color="error" variant="flat" @click="$emit('confirm')"> حذف </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  item: Object,
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
