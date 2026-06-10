<template>
  <div>
    <v-card elevation="2" rounded="lg" height="auto" class="pa-5">

      <v-row class="px-5">
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="filterData.identityNo" label="بحث عن طريق رقم الهوية" clearable density="compact"
            variant="outlined" rounded="lg" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="filterData.customerName" label="بحث عن طريق اسم العميل" clearable density="compact"
            variant="outlined" rounded="lg" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="filterData.phoneNumber" label="رقم الهاتف" clearable density="compact"
            variant="outlined" rounded="lg" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-select v-model="filterData.requestType" :items="requestTypes" item-title="name" item-value="id" clearable
            label="بحث عن طريق نوع الطلب" density="compact" variant="outlined" rounded="lg" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-select v-model="filterData.kycModelTyp" :items="kycModelTypesStore.items" item-title="name" item-value="id"
            clearable label="بحث عن طريق نوع النموذج" density="compact" variant="outlined" rounded="lg" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-select v-model="filterData.nationality" :items="nationalitiesStore.items" item-title="name" item-value="id"
            clearable label="بحث عن طريق الجنسية " density="compact" variant="outlined" rounded="lg" />
        </v-col>




      </v-row>
    </v-card>
    <v-col cols="12" class="text-center pa-4">
      <v-btn v-if="filterIsSelected" rounded="xl" color="green" @click="searchData">
        فلترة البيانات
      </v-btn>

      <v-btn v-if="isSearch" rounded="xl" color="primary" class="mx-3" @click="clearSearch">
        إلغاء البحث
      </v-btn>
    </v-col>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useNationalitiesStore, useKycModelTypesStore } from "../../../stores/index.js";


const emit = defineEmits(["search-data"]);
const nationalitiesStore = useNationalitiesStore()
const kycModelTypesStore = useKycModelTypesStore()

const isSearch = ref(false);
const requestTypes = []

const filterData = reactive({
  identityNo: "",
  customerName: "",
  phoneNumber: "",
  requestType: null,
  kycModelTyp: null,
  nationality: null,
  pageNo: 1,
  pageSize: 30,
});


const filterIsSelected = computed(() => {
  return (
    filterData.identityNo ||
    filterData.customerName ||
    filterData.phoneNumber ||
    filterData.requestType ||
    filterData.kycModelTyp ||
    filterData.nationality
  );
});

const searchData = () => {
  isSearch.value = true;
  emit("search-data", { ...filterData });
};

const clearSearch = () => {
  isSearch.value = false;

  filterData.identityNo = "";
  filterData.customerName = "";
  filterData.phoneNumber = "";
  filterData.requestType = null;
  filterData.kycModelTyp = null;
  filterData.nationality = null;

  emit("search-data", { ...filterData });
};


</script>