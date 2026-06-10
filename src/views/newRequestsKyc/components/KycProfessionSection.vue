<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">البيانات المهنية والوظيفية</div>
        <div class="text-caption text-grey">أدخل معلومات مهنتك ووظيفتك</div>
      </div>
    </div>

    <v-row>
      <v-col cols="12" sm="4">
        <v-select
          v-model="jobInfo.employmentDetails.SectorType"
          :items="sectorTypeItems"
          item-title="name"
          item-value="id"
          label="نوع المهنة"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-briefcase"
          placeholder="اختر نوع المهنة"
          chips
          multiple
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="jobInfo.employmentDetails.OtherSector"
          label="مهنة أخرى (إذا وجدت)"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-pen"
          :disabled="jobInfo.employmentDetails.SectorType !== 128"
          placeholder="حدد المهنة الأخرى"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="jobInfo.employmentDetails.ActivityType"
          label="طبيعة النشاط"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-tasks"
          placeholder="مثال: تجاري، صناعي، خدمي..."
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useKycJobInfoStore } from '../../../stores/kycJobInfoStore.js'

const kycJobInfoStore = useKycJobInfoStore()
const { jobInfo } = storeToRefs(kycJobInfoStore)

// const professionTypes = ref([
//   { value: 1, label: 'موظف' },
//   { value: 2, label: 'صاحب عمل' },
//   { value: 3, label: 'مستقل' },
//   { value: 4, label: 'أخرى' },
// ])

const sectorTypeItems = ref([
  {
    name: 'قطاع عام/ حكومي',
    id: 1,
  },
  {
    name: 'قطاع خاص',
    id: 2,
  },
  {
    name: 'موظف',
    id: 4,
  },
  {
    name: 'ربة بيت',
    id: 8,
  },
  {
    name: 'متقاعد',
    id: 16,
  },
  {
    name: 'طـالب',
    id: 32,
  },
  {
    name: 'عمل حر',
    id: 64,
  },
  {
    name: 'أخرى',
    id: 128,
  },
])
</script>
