<template>
  <v-container fluid>
    <div>
      <div class="font-weight-black text-subtitle-1">عنوان جهة العمل</div>
      <div class="text-caption text-grey">أدخل معلومات عنوان جهة العمل والتفاصيل الوظيفية</div>
    </div>

    <v-row>
      <v-col cols="12" sm="4">
        <v-select
          v-model="jobInfo.employmentDetails.EmployerCountryId"
          :items="countries"
          item-title="text"
          item-value="value"
          label="البلد"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-globe"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="jobInfo.employmentDetails.EmployerCityId"
          :items="cities"
          item-title="text"
          item-value="value"
          label="المدينة"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-city"
          :disabled="!jobInfo.employmentDetails.EmployerCountryId"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="jobInfo.employmentDetails.EmployerStreet"
          label="اسم الشارع"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-road"
          placeholder="اكتب اسم الشارع"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="jobInfo.employmentDetails.JobTitle"
          :items="jobTitles"
          item-title="label"
          item-value="value"
          label="المسمى الوظيفي"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-user-tie"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="jobInfo.employmentDetails.YearsOfExperience"
          :items="workYearsList"
          item-title="title"
          item-value="value"
          label="عدد سنوات العمل"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-calendar-alt"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="jobInfo.employmentDetails.EmployerPhone"
          label="هاتف جهة العمل"
          variant="outlined"
          density="compact"
          rounded
          prepend-inner-icon="fas fa-phone"
          type="tel"
          placeholder="091XXXXXXX"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useKycJobInfoStore } from '../../../stores/kycJobInfoStore.js'

const kycJobInfoStore = useKycJobInfoStore()
const { jobInfo } = storeToRefs(kycJobInfoStore)

const countries = [
  { text: 'ليبيا', value: '1' },
  { text: 'تونس', value: '2' },
  { text: 'مصر', value: '3' },
  { text: 'السعودية', value: '4' },
  { text: 'الإمارات', value: '5' },
  { text: 'أخرى', value: '6' },
]
const citiesMap = {
  1: [
    { text: 'طرابلس', value: 1 },
    { text: 'بنغازي', value: 2 },
    { text: 'مصراتة', value: 3 },
    { text: 'الزاوية', value: 4 },
    { text: 'الجبل الغربي', value: 5 },
    { text: 'سبها', value: 6 },
    { text: 'البيضاء', value: 7 },
    { text: 'درنة', value: 8 },
    { text: 'طبرق', value: 9 },
    { text: 'أخرى', value: 10 },
  ],

  2: [
    { text: 'تونس', value: 1 },
    { text: 'صفاقس', value: 2 },
    { text: 'سوسة', value: 3 },
    { text: 'قيروان', value: 4 },
    { text: 'بنزرت', value: 5 },
    { text: 'نابل', value: 6 },
    { text: 'قفصة', value: 7 },
    { text: 'المنستير', value: 8 },
    { text: 'أخرى', value: 9 },
  ],

  3: [
    { text: 'القاهرة', value: 1 },
    { text: 'الإسكندرية', value: 2 },
    { text: 'الجيزة', value: 3 },
    { text: 'شبرا الخيمة', value: 4 },
    { text: 'بورسعيد', value: 5 },
    { text: 'السويس', value: 6 },
    { text: 'الأقصر', value: 7 },
    { text: 'أسوان', value: 8 },
    { text: 'أخرى', value: 9 },
  ],

  4: [
    { text: 'الرياض', value: 1 },
    { text: 'جدة', value: 2 },
    { text: 'مكة المكرمة', value: 3 },
    { text: 'المدينة المنورة', value: 4 },
    { text: 'الدمام', value: 5 },
    { text: 'الخبر', value: 6 },
    { text: 'تبوك', value: 7 },
    { text: 'أخرى', value: 8 },
  ],

  5: [
    { text: 'دبي', value: 1 },
    { text: 'أبو ظبي', value: 2 },
    { text: 'الشارقة', value: 3 },
    { text: 'عجمان', value: 4 },
    { text: 'رأس الخيمة', value: 5 },
    { text: 'الفجيرة', value: 6 },
    { text: 'أم القيوين', value: 7 },
    { text: 'أخرى', value: 8 },
  ],

  6: [
    { text: 'مدينة 1', value: 1 },
    { text: 'مدينة 2', value: 2 },
    { text: 'أخرى', value: 3 },
  ],
}

const jobTitles = ref([
  { value: 1, label: 'شريك' },
  { value: 2, label: 'مدير عام' },
  { value: 3, label: 'مدير' },
  { value: 4, label: 'موظف' },
  { value: 5, label: 'مشرف' },
  { value: 6, label: 'رئيس قسم' },
  { value: 7, label: 'مستشار' },
  { value: 8, label: 'مهندس' },
  { value: 9, label: 'محاسب' },
  { value: 10, label: 'أخرى' },
])

const workYearsList = Array.from({ length: 70 }, (_, i) => ({
  title: `${i + 1} سنة`,
  value: i + 1,
}))

const cities = computed(() => {
  return citiesMap[jobInfo.value.employmentDetails.EmployerCountryId] || []
})
// const onCountryChange = () => {
//   jobInfo.value.employmentDetails.EmployerCityId = ''
//   cities.value =
//     citiesMap[jobInfo.value.employmentDetails.EmployerCountryId] || []
// }
</script>
