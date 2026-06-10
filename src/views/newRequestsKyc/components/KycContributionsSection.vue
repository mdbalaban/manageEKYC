<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">المساهمات الأخرى</div>
        <div class="text-caption text-grey">هل لديك مساهمات في شركات أخرى؟</div>
      </div>
    </div>

    <div class="mb-6">
      <v-btn-toggle v-model="hasContributions" mandatory rounded="lg">
        <v-btn :value="true" :color="hasContributions === true ? 'deep-purple' : undefined">
          <v-icon start>fas fa-check</v-icon>
          نعم
        </v-btn>

        <v-btn :value="false" :color="hasContributions === false ? 'deep-purple' : undefined">
          <v-icon start>fas fa-times</v-icon>
          لا
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-card
      v-if="hasContributions"
      class="pa-4"
      style="
        background: rgba(109, 40, 217, 0.02);
        border: 1px solid rgba(109, 40, 217, 0.1);
        border-radius: 12px;
      "
    >
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="font-weight-bold text-subtitle-1">قائمة المساهمات</div>

        <v-btn color="deep-purple" rounded="lg" @click="showAddDialog = true">
          <v-icon start>fas fa-plus</v-icon>
          إضافة شركة
        </v-btn>
      </div>

      <v-data-table
        v-if="items && items.length > 0"
        :headers="headers"
        :items="items"
        class="elevation-1"
        style="border-radius: 8px"
        density="compact"
        hide-default-footer
        :items-per-page="-1"
      >
        <template #item.ownershipPercentage="{ item }"> {{ item.ownershipPercentage }}% </template>
        <template #item.actions="{ item }">
          <v-icon size="small" class="ml-2" color="blue" @click="editContribution(item)">
            fas fa-edit
          </v-icon>
          <v-icon color="red" size="small" class="cursor-pointer" @click="deleteContribution(item)">
            fas fa-trash
          </v-icon>
        </template>
      </v-data-table>

      <v-alert v-else type="info" variant="tonal">
        لا توجد مساهمات مضافة. اضغط على "إضافة شركة" لإضافة مساهمة جديدة.
      </v-alert>
    </v-card>

    <v-dialog v-model="showAddDialog" max-width="600" persistent>
      <v-card class="pa-4" rounded="xl">
        <v-card-title class="font-weight-black text-subtitle-1">
          {{ titleDialog }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newContribution.companyName"
                label="اسم الشركة"
                variant="outlined"
                density="compact"
                rounded
                prepend-inner-icon="fas fa-building"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newContribution.activityType"
                label="نوع النشاط"
                variant="outlined"
                density="compact"
                rounded
                prepend-inner-icon="fas fa-briefcase"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newContribution.companyAddress"
                label="عنوان الشركة"
                variant="outlined"
                density="compact"
                rounded
                prepend-inner-icon="fas fa-map-marker-alt"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newContribution.annualIncome"
                label="الدخل السنوي"
                variant="outlined"
                density="compact"
                rounded
                prepend-inner-icon="fas fa-money-bill"
                type="number"
                min="0"
                @update:model-value="
                  (val) => {
                    if (val < 0) newContribution.annualIncome = 0
                  }
                "
              />
            </v-col>

            <v-col cols="12">
              <v-slider
                v-model="newContribution.ownershipPercentage"
                :min="1"
                :max="100"
                :step="1"
                label="نسبة الملكية (%)"
                color="deep-purple"
                class="mt-4"
              >
                <template #append>
                  <v-text-field
                    v-model="newContribution.ownershipPercentage"
                    type="number"
                    min="1"
                    max="100"
                    density="compact"
                    variant="outlined"
                    hide-details
                    style="width: 90px"
                    suffix="%"
                  />
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" color="grey" @click="cancelAdd"> إلغاء </v-btn>

          <v-btn color="deep-purple" variant="flat" rounded="xl" @click="saveContribution">
            حفظ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['updateContribution', 'addContribution', 'removeContribution'])

const hasContributions = ref(false)

const showAddDialog = ref(false)

const selectedIndex = ref(-1)

const titleDialog = computed(() =>
  selectedIndex.value === -1 ? 'إضافة مساهمة جديدة' : 'تعديل مساهمة',
)

const newContribution = ref({
  companyName: '',
  activityType: '',
  ownershipPercentage: '',
  companyAddress: '',
  annualIncome: '',
})

const headers = ref([
  {
    title: 'اسم الشركة',
    key: 'companyName',
  },
  {
    title: 'نوع النشاط',
    key: 'activityType',
  },
  {
    title: 'نسبة الملكية (%)',
    key: 'ownershipPercentage',
  },
  {
    title: 'عنوان الشركة',
    key: 'companyAddress',
  },
  {
    title: 'الدخل السنوي',
    key: 'annualIncome',
  },
  {
    title: 'الإجراءات',
    key: 'actions',
    sortable: false,
  },
])

watch(
  () => props.items,
  (newVal) => {
    if (newVal.length > 0) {
      hasContributions.value = true
    } else {
      hasContributions.value = false
    }
  },
  { immediate: true },
)

function clearData() {
  newContribution.value.companyName = ''
  newContribution.value.activityType = ''
  newContribution.value.ownershipPercentage = ''
  newContribution.value.companyAddress = ''
  newContribution.value.annualIncome = ''
  selectedIndex.value = -1
}

function cancelAdd() {
  clearData()
  showAddDialog.value = false
}

function editContribution(item) {
  const index = props.items.findIndex((x) => x === item)

  newContribution.value = { ...item }

  selectedIndex.value = index
  showAddDialog.value = true
}

function saveContribution() {
  if (selectedIndex.value == -1) {
    addContribution()
    return
  }

  updateContribution()
}

function addContribution() {
  if (
    !newContribution.value.companyName ||
    !newContribution.value.activityType ||
    !newContribution.value.ownershipPercentage ||
    !newContribution.value.companyAddress ||
    !newContribution.value.annualIncome
  )
    return

  const newItem = {
    ...newContribution.value,
  }

  emit('addContribution', newItem)
  showAddDialog.value = false
  clearData()
}

function updateContribution() {
  if (selectedIndex.value === -1) return

  const newItem = {
    ...newContribution.value,
  }

  emit('updateContribution', selectedIndex.value, newItem)
  showAddDialog.value = false
  clearData()
}

function deleteContribution(item) {
  const index = props.items.findIndex((x) => x === item)
  if (index === -1) return

  emit('removeContribution', index)
}
</script>
