<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" persistent scrollable>
    <v-card>
      <v-toolbar flat color="primary" height="60">
        <v-btn icon color="white" @click="close">
          <v-icon>fas fa-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold text-white">
          مراجعة طلب KYC — {{ customer?.fullName }}
        </v-toolbar-title>
        <v-spacer />
        <v-chip :color="statusColor" variant="flat" size="small" class="me-4 font-weight-bold">
          {{ statusLabel }}
        </v-chip>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-container class="py-6" style="max-width: 960px">
          <v-row class="mb-4">
            <v-col v-for="f in personalFields" :key="f.label" cols="6" md="3">
              <div class="text-caption">{{ f.label }}</div>
              <div>{{ f.value }}</div>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <v-row class="mb-4">
            <v-col v-for="f in addressFields" :key="f.label" cols="6" md="3">
              <div class="text-caption">{{ f.label }}</div>
              <div>{{ f.value }}</div>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <v-row class="mb-4">
            <v-col v-for="f in financialFields" :key="f.label" cols="6" md="3">
              <div class="text-caption">{{ f.label }}</div>
              <div>{{ f.value }}</div>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <v-row class="mb-6">
            <v-col v-for="doc in customer?.documents" :key="doc.type" cols="12" sm="6" md="4">
              <v-card
                variant="outlined"
                :href="doc.url"
                target="_blank"
                rounded="lg"
                class="pa-3 d-flex align-center"
              >
                <div class="flex-1">
                  <div class="text-caption text-medium-emphasis">{{ doc.type }}</div>
                  <div class="text-body-2 font-weight-medium">{{ doc.name }}</div>
                </div>
                <v-spacer />
                <v-icon color="primary" size="32">fas fa-file-pdf</v-icon>
              </v-card>
            </v-col>
          </v-row>

          <v-expand-transition>
            <div v-if="showRejectReason">
              <v-divider class="mb-4" />
              <div class="d-flex align-center gap-2 mb-3">
                <v-icon icon="fas fa-briefcase" color="primary" size="20" />
                <span class="text-subtitle-1 font-weight-bold text-primary"> سبب رفض الطلب </span>
              </div>
              <v-textarea
                v-model="rejectReason"
                placeholder="اكتب سبب رفض الطلب..."
                variant="outlined"
                rows="3"
                rounded="lg"
                class="mb-4"
              />
            </div>
          </v-expand-transition>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions class="pa-4 d-flex justify-center gap-4">
        <v-btn
          v-if="!showRejectReason"
          color="error"
          variant="tonal"
          prepend-icon="fas fa-close-circle"
          rounded="lg"
          :disabled="loading"
          @click="showRejectReason = true"
        >
          رفض الطلب
        </v-btn>

        <template v-if="showRejectReason">
          <v-btn
            variant="tonal"
            rounded="lg"
            @click="((showRejectReason = false), (rejectReason = ''))"
          >
            إلغاء
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            prepend-icon="fas fa-close-circle"
            rounded="lg"
            :loading="loading"
            :disabled="!rejectReason.trim()"
            @click="confirmAction('reject')"
          >
            تأكيد الرفض
          </v-btn>
        </template>

        <v-btn
          v-if="!showRejectReason"
          color="success"
          variant="flat"
          prepend-icon="fas fa-check-circle"
          rounded="lg"
          :loading="loading"
          @click="confirmAction('approve')"
        >
          قبول الطلب
        </v-btn>

        <v-btn
          v-if="!showRejectReason"
          variant="tonal"
          prepend-icon="fas fa-close"
          rounded="lg"
          @click="close"
        >
          إغلاق
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="confirmDialog" max-width="420" persistent>
      <v-card rounded="xl">
        <v-card-text class="pa-6 text-center">
          <v-icon :color="pendingAction === 'approve' ? 'success' : 'error'" size="56" class="mb-3">
            {{ pendingAction === 'approve' ? 'fas fa-check-circle' : 'fas fa-close-circle' }}
          </v-icon>
          <div class="text-h6 font-weight-bold mb-2">
            {{ pendingAction === 'approve' ? 'تأكيد القبول' : 'تأكيد الرفض' }}
          </div>
          <div class="text-body-2 text-medium-emphasis">
            {{
              pendingAction === 'approve'
                ? `هل تريد قبول طلب KYC الخاص بـ ${customer?.fullName}؟`
                : `هل تريد رفض الطلب بسبب: "${rejectReason}"؟`
            }}
          </div>
        </v-card-text>
        <v-card-actions class="pa-4 gap-2">
          <v-btn variant="tonal" rounded="lg" @click="confirmDialog = false">إلغاء</v-btn>
          <v-spacer />
          <v-btn
            :color="pendingAction === 'approve' ? 'success' : 'error'"
            variant="flat"
            rounded="lg"
            :loading="loading"
            @click="executeAction"
          >
            {{ pendingAction === 'approve' ? 'نعم، قبول' : 'نعم، رفض' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

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
