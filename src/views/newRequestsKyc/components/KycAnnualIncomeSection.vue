<template>
  <v-container fluid>
    <div class="d-flex align-center" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">متوسط الدخل السنوي</div>
        <div class="text-caption text-grey">حدد نطاق دخلك السنوي والشهري</div>
        <div class="font-weight-bold text-subtitle-2 my-3">الدخل السنوي:</div>
      </div>
    </div>

    <v-row>
      <v-radio-group v-model="jobInfo.employmentDetails.AnnualIncomeRange" inline>
        <v-radio
          v-for="range in incomeRanges"
          :key="range.value"
          :label="range.label"
          :value="range.label"
          class="ml-5"
        />
      </v-radio-group>

      <v-col cols="12" sm="6">
        <div style="max-width: 500px">
          <v-text-field
            v-model="jobInfo.personOwnedCompanies.AnnualIncome"
            label="الدخل الشهري"
            variant="outlined"
            density="compact"
            rounded
            prepend-inner-icon="fas fa-money-bill-wave"
            type="number"
            placeholder="أدخل دخلك الشهري"
            hint="بالدينار الليبي"
            persistent-hint
          />
        </div>
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

const incomeRanges = ref([
  { value: 1, label: 'إلي 20 ألف' },
  { value: 2, label: 'إلي 50 ألف' },
  { value: 3, label: 'إلي 150 ألف' },
  { value: 4, label: 'إلي 200 ألف' },
  { value: 5, label: 'مليون فأكتر' },
])
</script>
