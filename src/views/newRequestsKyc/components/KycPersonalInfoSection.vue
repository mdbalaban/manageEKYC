<template>
    <v-container fluid>


        <div class="d-flex align-center mb-6" style="gap: 10px">
          <div>
            <div class="font-weight-black text-subtitle-1">البيانات الشخصية</div>

          </div>
        </div>

        <v-row>
          <v-col cols="12" sm="4">
            <div class="text-caption font-weight-bold text-grey">الجنس</div>

            <v-radio-group


              inline
              validate-on="blur"
            >
              <v-radio
                v-for="g in GenderEnumList"
                :key="g.id"
                :label="g.name"
                :value="g.id"
                color="deep-purple-darken-2"
              />
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select

              item-title="name"
              item-value="id"
              label="الحالة الاجتماعية"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-users"

            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select

              item-title="label"
              item-value="value"
              label="عدد أفراد العائلة"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-user-friends"

            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field

              label="اسم الزوج أو الزوجة"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-user"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select

              item-title="label"
              item-value="value"
              label="مهنة الزوج أو الزوجة"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-briefcase"

            />
          </v-col>


          <v-col cols="12" sm="4">
            <v-text-field

              label="اذكر المهنة الأخرى"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-pen"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select


              item-title="name"
              item-value="id"
              label="المؤهل العلمي"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-graduation-cap"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="مؤهل آخر (اختياري)"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-certificate"
            />
          </v-col>
        </v-row>

        <div class="d-flex align-center mb-6 mt-4" style="gap: 10px">
          <div>
            <div class="font-weight-black text-subtitle-1">عنوان السكن / الإقامة</div>
          </div>
        </div>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="الشارع"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-road"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="المنطقة"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-map-marker-alt"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="المدينة"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-city"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="هاتف المنزل"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-phone-alt"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="رقم الهاتف"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-mobile-alt"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="البريد الإلكتروني"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-envelope"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              item-title="name"
              item-value="id"
              label="نوع السكن"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-home"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              item-title="label"
              item-value="value"
              label="هل لديك جنسية أخرى؟"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-flag"
            />
          </v-col>

          <v-col  cols="12" sm="4">
            <v-select
              item-title="label"
              item-value="value"
              label="اختر الجنسية"
              variant="outlined"
              density="compact"
              rounded
              prepend-inner-icon="fas fa-globe"
            />
          </v-col>
          <!-- <v-col cols="12">
            <internationalCardsSection
              :items="personalInfo.personInternationalCards"
              @addCard="addCard"
              @updateCard="updateCard"
              @removeCard="removeCard"
            />
          </v-col> -->
        </v-row>

    </v-container>

</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// import internationalCardsSection from '@/components/internationalCardsSection.vue'

 const GenderEnumList = [
  {
    id: 1,
    name: 'ذكر',
  },
  {
    id: 2,
    name: 'أنثى',
  },
]

// function addCard(newCard) {
//   personalInfo.value.personInternationalCards = [
//     ...personalInfo.value.personInternationalCards,
//     newCard,
//   ]
// }

// function updateCard(index, item) {
//   const cards = [...personalInfo.value.personInternationalCards]
//   cards[index] = item
//   personalInfo.value.personInternationalCards = cards
// }

// function removeCard(index) {
//   const cards = [...personalInfo.value.personInternationalCards]
//   cards.splice(index, 1)
//   personalInfo.value.personInternationalCards = cards
// }

</script>
