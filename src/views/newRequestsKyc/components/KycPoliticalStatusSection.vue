<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">المسؤولية السياسية والرتب العليا</div>
        <div class="text-caption text-grey">هل أنت مسؤول سياسي أو تحمل رتبة عليا؟</div>
      </div>
    </div>

    <div class="mb-6">
      <v-btn-toggle v-model="form.isPolitical" mandatory rounded="lg">
        <v-btn :value="true" :color="form.isPolitical === true ? 'deep-purple' : undefined">
          <v-icon start>fas fa-check</v-icon>
          نعم
        </v-btn>

        <v-btn :value="false" :color="form.isPolitical === false ? 'deep-purple' : undefined">
          <v-icon start>fas fa-times</v-icon>
          لا
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-row v-if="form.isPolitical">
      <v-col cols="12" sm="6">
        <v-select
          v-model="form.position"
          :items="positions"
          label="نوع المنصب"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-user-shield"
          placeholder="اختر نوع المنصب"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="form.otherPosition"
          label="تحديد المنصب الآخر (إذا وجد)"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-pen"
          placeholder="اكتب تفاصيل المنصب"
          :disabled="form.position !== 'أخرى'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useKycJobInfoStore } from '../../../stores/kycJobInfoStore.js'

const kycJobInfoStore = useKycJobInfoStore()
const { jobInfo } = storeToRefs(kycJobInfoStore)

const form = reactive({
  isPolitical: null,
  position: '',
  otherPosition: '',
})

const positions = [
  'رئيس دولة',
  'وزير',
  'شخصية سياسية',
  'عضو برلمان',
  'رتبة عسكرية عليا (جيش/شرطة)',
  'منصب حكومي عالي',
  'شخصية دبلوماسية أجنبية',
  'مسؤول قضائي',
  'مسؤول حزب سياسي',
  'مسؤول بارز في منظمة دولية',
  'من الأقارب لأي مما سبق (يرجى التحديد)',
  'أخرى',
]
</script>
