<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" persistent scrollable>
    <v-card>
      <v-toolbar flat color="onPrimary" height="60">
        <v-toolbar-title class="font-weight-bold text-white">
          مراجعة طلب KYC — {{ customer?.fullName }}
          <v-chip :color="statusColor" variant="flat" size="small" class="me-4 font-weight-bold">
            {{ statusLabel }}
          </v-chip>
        </v-toolbar-title>

        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>fas fa-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-container class="py-6" fluid>

          <KycPassportSection />

          <KycBirthCertSection />

          <KycPersonalInfoSection />

          <!-- <KycProfessionSection /> -->

          <!-- <KycEmployerSection /> -->

          <!-- <KycEmployerAddressSection /> -->

          <!-- <KycIncomeSourcesSection /> -->

          <!-- <KycAnnualIncomeSection /> -->

          <!-- <KycContributionsSection /> -->

          <!-- <KycPoliticalStatusSection /> -->

        </v-container>
      </v-card-text>


    </v-card>

  </v-dialog>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import KycPassportSection from '../components/KycPassportSection.vue'
import KycBirthCertSection from '../components/KycBirthCertSection.vue'
import KycPersonalInfoSection from '../components/KycPersonalInfoSection.vue'
// import KycProfessionSection from '../components/KycProfessionSection.vue'
// import KycEmployerSection from '../components/KycEmployerSection.vue'
// import KycEmployerAddressSection from '../components/KycEmployerAddressSection.vue'
// import KycIncomeSourcesSection from '../components/KycIncomeSourcesSection.vue'
// import KycAnnualIncomeSection from '../components/KycAnnualIncomeSection.vue'
// import KycContributionsSection from '../components/KycContributionsSection.vue'
// import KycPoliticalStatusSection from '../components/KycPoliticalStatusSection.vue'

const showSnackbar = inject('showSnackbar')

const dialog = ref(false)
const confirmDialog = ref(false)
const loading = ref(false)
const showRejectReason = ref(false)
const rejectReason = ref('')
const pendingAction = ref(null)
const customer = ref(null)

const statusLabel = computed(
  () =>
    ({ pending: 'قيد المراجعة', approved: 'مقبول', rejected: 'مرفوض' })[customer.value?.status] ??
    '',
)
const statusColor = computed(
  () =>
    ({ pending: 'warning', approved: 'success', rejected: 'error' })[customer.value?.status] ??
    'default',
)

const personalFields = computed(() => [
  { label: 'الاسم الكامل', value: customer.value?.fullName },
  { label: 'رقم الهوية', value: customer.value?.nationalId },
  { label: 'تاريخ الميلاد', value: customer.value?.birthDate },
  { label: 'الجنسية', value: customer.value?.nationality },
  { label: 'الجنس', value: customer.value?.gender },
  { label: 'الحالة الاجتماعية', value: customer.value?.maritalStatus },
  { label: 'رقم الهاتف', value: customer.value?.phone },
  { label: 'البريد الإلكتروني', value: customer.value?.email },
])

const addressFields = computed(() => [
  { label: 'الدولة', value: customer.value?.country },
  { label: 'المدينة', value: customer.value?.city },
  { label: 'المنطقة', value: customer.value?.region },
  { label: 'العنوان التفصيلي', value: customer.value?.address },
])

const financialFields = computed(() => [
  { label: 'جهة العمل', value: customer.value?.employer },
  { label: 'المسمى الوظيفي', value: customer.value?.jobTitle },
  { label: 'قطاع العمل', value: customer.value?.sector },
  { label: 'الدخل الشهري', value: customer.value?.monthlyIncome },
  { label: 'مصدر الدخل', value: customer.value?.incomeSource },
  { label: 'الغرض من الحساب', value: customer.value?.accountPurpose },
])

function open(item) {
  customer.value = item
  showRejectReason.value = false
  rejectReason.value = ''
  pendingAction.value = null
  dialog.value = true
}

function close() {
  dialog.value = false
}

function confirmAction(action) {
  pendingAction.value = action
  confirmDialog.value = true
}

async function executeAction() {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 1000))
    if (pendingAction.value === 'approve') {
      store.approve(customer.value.id)
      showSnackbar('تم قبول الطلب بنجاح', 'success')
    } else {
      store.reject(customer.value.id, rejectReason.value)
      showSnackbar('تم رفض الطلب', 'error')
    }
    confirmDialog.value = false
    close()
  } finally {
    loading.value = false
  }
}

defineExpose({ open })
</script>
