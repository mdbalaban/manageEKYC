<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">بيانات جهة العمل</div>
        <div class="text-caption text-grey">أدخل معلومات جهة عملك الحالية والسابقة</div>
      </div>
    </div>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="jobInfo.employmentDetails.CurrentEmployer"
          label="اسم جهة العمل الحالية"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-building"
          placeholder="اكتب اسم الجهة الحالية"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="jobInfo.employmentDetails.PreviousEmployer"
          label="اسم جهة العمل السابقة"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-history"
          placeholder="اكتب اسم الجهة السابقة (إن وجدت)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useKycJobInfoStore } from '../../../stores/kycJobInfoStore.js'

const kycJobInfoStore = useKycJobInfoStore()
const { jobInfo } = storeToRefs(kycJobInfoStore)
</script>
