<template>
  <v-container fluid>
    <div
      class="d-flex align-center mb-5"
      style="gap: 10px; flex-direction: row-reverse; justify-content: flex-end"
    >
      <div>
        <div class="font-weight-black text-subtitle-1 text-right">بيانات شهادة الميلاد</div>

      </div>
    </div>

    <!-- <v-row class="mb-3" align="stretch">

      <v-col cols="12" sm="3">
        <div class="kyc-square-box kyc-preview-area">
          <template v-if="previewUrl">
            <img :src="previewUrl" class="kyc-preview-img" />
          </template>

          <template v-else>
            <v-icon icon="fas fa-file-alt" size="48" color="grey-lighten-2" />

            <div class="text-caption text-grey mt-2">ستظهر صورة شهادة الميلاد هنا</div>
          </template>
        </div>
      </v-col>
    </v-row> -->


    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.nid"
          label="الرقم الوطني"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.registerId"
          label="رقم قيد العائلة"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.motherName"
          label="اسم الأم"
          variant="outlined"
          density="compact"
          rounded
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="form.nameAr"
          label="الاسم الثلاثي بالعربي"
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
    </v-row>
  </v-container>
</template>

<script setup>

import { ref,  reactive } from 'vue'


// const previewUrl = ref(null)

const form = reactive({
  nid: '',
  registerId: '',
  motherName: '',
  nameAr: '',
  lastName: '',
  birthDate: '',
})

</script>
