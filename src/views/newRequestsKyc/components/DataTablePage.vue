<template>
  <div>
    <v-card elevation="0" rounded="xl" border>
      <div class="pa-4 d-flex align-center flex-wrap gap-3">
        <v-text-field
          v-model="search"
          placeholder="بحث..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          rounded="lg"
          style="max-width: 300px; min-width: 200px"
          @update:modelValue="$emit('search', $event)"
        />
        <slot name="filters" />
      </div>

      <v-divider />

      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        hide-default-footer
        item-value="id"
        class="rtl-table"
        hover
      >
        <template v-slot:[`item.KycRequestType`]="{ item }">
          <v-chip size="small" color="primary">
            {{ getKycRequestTypeEnumTypeString(item.KycRequestType) }}
          </v-chip>
        </template>

        <template #item.status="{ item }">
          <v-chip
            :color="item.status === 1 ? 'success' : item.status === 2 ? 'error' : 'warning'"
            size="small"
          >
            {{ item.status === 1 ? 'مقبول' : item.status === 2 ? 'مرفوض' : 'قيد الانتظار' }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center">
            <v-btn variant="flat" color="primary" size="small" @click="$emit('show', item)">
              عرض التفاصيل
            </v-btn>
          </div>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader v-for="i in 5" :key="i" type="table-row" />
        </template>

        <template v-slot:no-data>
          <div class="py-12 text-center">
            <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-database-off-outline</v-icon>
            <div class="text-body-1 text-medium-emphasis">لا توجد بيانات</div>
          </div>
        </template>
      </v-data-table>

      <v-divider />

      <div class="pa-4 d-flex align-center justify-space-between flex-wrap gap-2">
        <div class="text-caption text-medium-emphasis">
          عرض {{ items.length }} من {{ totalRecords }} سجل
        </div>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          density="comfortable"
          rounded="lg"
          active-color="primary"
          @update:modelValue="$emit('page-change', $event)"
        />
      </div>
    </v-card>
  </div>
</template>

<script setup>
import * as KycEnums from '@/data/kycEnums.js'
import { ref, watch } from 'vue'

const kycEnums = KycEnums
const props = defineProps({
  headers: Array,
  items: Array,
  loading: Boolean,
  totalRecords: { type: Number, default: 0 },
  totalPages: { type: Number, default: 1 },
  modelPage: { type: Number, default: 1 },
})

defineEmits(['toggle', 'search', 'page-change'])

const search = ref('')
const currentPage = ref(props.modelPage)

watch(
  () => props.modelPage,
  (v) => (currentPage.value = v),
)

function getKycRequestTypeEnumTypeString(kycRequestType) {
  return kycEnums.KycRequestTypeEnumToTextPublic(kycRequestType)
}
</script>

<style>
.rtl-table .v-data-table__th {
  font-weight: 700 !important;
  color: rgb(var(--v-theme-primary)) !important;
  white-space: nowrap;
}
.rtl-table .v-data-table__tr:hover td {
  background: rgba(var(--v-theme-primary), 0.03) !important;
}
</style>
