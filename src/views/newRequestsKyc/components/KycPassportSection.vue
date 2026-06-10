<template>
  <v-container fluid>
    <div
      class="d-flex align-center mb-5"
      style="gap: 10px; flex-direction: row-reverse; justify-content: flex-end"
    >
      <div>
        <div class="font-weight-black text-subtitle-1 text-right">بيانات جواز السفر</div>

      </div>
    </div>
<!--
    <v-row class="mb-3" align="stretch">

      <v-col cols="12" sm="3">
        <div class="kyc-square-box kyc-preview-area">
          <template v-if="previewUrl">
            <img :src="previewUrl" class="kyc-preview-img" />
          </template>

          <template v-else>
            <v-icon icon="fas fa-passport" size="48" color="grey-lighten-2" />

            <div class="text-caption text-grey mt-2">ستظهر صورة الجواز هنا</div>
          </template>
        </div>
      </v-col>
    </v-row> -->


    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.passportNumber"
          label="رقم الجواز"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.nameEn"
          label="الاسم بالإنجليزي"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.lastName"
          label="اللقب"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.birthDate"
          label="تاريخ الميلاد"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.birthPlace"
          label="مكان الميلاد"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.issuePlace"
          label="مكان الإصدار"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.issueDate"
          label="تاريخ الإصدار"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.expiryDate"
          label="تاريخ الانتهاء"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.countryCode"
          label="رمز البلد"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import { reactive, ref } from 'vue'


// const previewUrl = ref(null)


const form = reactive({
  passportNumber: '',
  nameEn: '',
  lastName: '',
  birthPlace: '',
  issuePlace: '',
  issueDate: '',
  birthDate: '',
  expiryDate: '',
  countryCode: '',
})


</script>
