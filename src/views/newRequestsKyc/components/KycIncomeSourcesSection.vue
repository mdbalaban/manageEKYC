<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">مصادر الدخل</div>
        <div class="text-caption text-grey">يمكنك اختيار أكثر من مصدر دخل</div>
      </div>
    </div>

    <div class="mb-4">
      <div class="font-weight-bold text-subtitle-2 mb-3">مصدر الأموال:</div>

      <v-row>
        <v-checkbox
          v-for="source in incomeSources"
          :key="source.id"
          :label="source.label"
          v-model="jobInfo.employmentDetails.IncomeSource"
          density="compact"
          :value="source.id"
        />
        <v-col cols="12" sm="6">
          <div style="max-width: 500px">
            <v-text-field
              v-model="jobInfo.employmentDetails.OtherSources"
              label="حدد المصادر الأخرى"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-pen"
              placeholder="اكتب المصادر الأخرى"
            />
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- v-if="(jobInfo.employmentDetails.IncomeSource & 32) === 32" -->
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useKycJobInfoStore } from '../../../stores/kycJobInfoStore.js'

const kycJobInfoStore = useKycJobInfoStore()
const { jobInfo } = storeToRefs(kycJobInfoStore)

const incomeSources = ref([
  { id: 1, label: 'رواتب' },
  { id: 2, label: 'استثمارات' },
  { id: 4, label: 'أرباح تجارية' },
  { id: 8, label: 'ميراث' },
  { id: 16, label: 'اراضي' },
  { id: 32, label: 'أخرى' },
])

function isChecked(flag) {
  const value = jobInfo.value.employmentDetails.IncomeSource || 0
  return (value & flag) === flag
}

function toggle(flag) {
  let current = jobInfo.value.employmentDetails.IncomeSource || 0

  jobInfo.value.employmentDetails.IncomeSource =
    (current & flag) === flag ? current & ~flag : current | flag
}

// function toFlags(arr) {
//   return (arr || []).reduce((a, b) => a | b, 0)
// }

// function fromFlags(value) {
//   return incomeSources.value
//     .map(i => i.id)
//     .filter(flag => (value & flag) === flag)
// }
</script>
