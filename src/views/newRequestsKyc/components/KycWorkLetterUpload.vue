<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6" style="gap: 10px">
      <div>
        <div class="font-weight-black text-subtitle-1">رسالة جهة العمل أو الشؤون المحلية</div>
        <div class="text-caption text-grey">قم برفع صورة من رسالة جهة العمل أو الشؤون المحلية</div>
      </div>
    </div>

    <v-row class="mb-3" align="stretch">
      <v-col cols="12" sm="8">
        <div
          class="kyc-square-box kyc-upload-area"
          style="height: 180px; cursor: pointer"
          @click="$refs.workLetterInput?.click()"
        >
          <input
            ref="workLetterInput"
            type="file"
            accept="image/*,.pdf"
            hidden
            @change="onFileChange"
          />

          <v-icon size="40" color="deep-purple-lighten-3">fas fa-cloud-upload-alt</v-icon>

          <div class="font-weight-bold mt-2" style="color: #6d28d9">
            {{ previewUrl ? 'تغيير الصورة/الملف' : 'اضغط لرفع صورة رسالة ' }}
          </div>
          <div class="text-caption text-grey mt-1">PNG, JPG, PDF حتى 5MB</div>

          <v-btn
            v-if="previewUrl"
            icon
            size="x-small"
            class="kyc-remove-btn"
            @click.stop="removeFile"
          >
            <v-icon size="x-small" color="red">fas fa-times</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="kyc-square-box kyc-preview-area" style="height: 180px">
          <template v-if="previewUrl">
            <img
              :src="previewUrl"
              class="kyc-preview-img"
              style="max-height: 100%; max-width: 100%"
            />
          </template>
          <template v-else>
            <v-icon size="48" color="grey-lighten-2">fas fa-file-alt</v-icon>
            <div class="text-caption text-grey mt-2">ستظهر صورة الرسالة هنا</div>
          </template>
        </div>
      </v-col>
    </v-row>
    <div class="text-center mb-4">
      <v-progress-linear
        :active="showProgress"
        :indeterminate="showProgress"
        color="deep-purple-accent-4"
      ></v-progress-linear>
      <v-btn
        v-if="file && !showProgress"
        rounded="pill"
        color="deep-purple-darken-2"
        elevation="2"
        :disabled="!previewUrl"
        @click="UploadDocument"
        class="px-8"
      >
        <v-icon start icon="fas fa-magic" size="small" />

        رفع صورة الرسالة
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUploadDocumentStore } from '../../../stores/uploadDocumentStore.js'
import { useNotificationStore } from '../../../stores/alertNotificationStore.js'
import { KycDocumentTypeEnum } from '../../../dataModels/requestKycEnums'

const props = defineProps({
  imageUrlProp: null,
})

const uploadDocumentStore = useUploadDocumentStore()
const notificationStore = useNotificationStore()
const route = useRoute()

const previewUrl = ref(null)
const file = ref(null)
const showProgress = ref(false)
const workLetterInput = ref(null)

watch(
  () => props.imageUrlProp,
  (data) => {
    console.log(data)
    previewUrl.value = data ?? previewUrl.value
  },
  { immediate: true },
)

const onFileChange = (e) => {
  const selectedFile = e.target.files[0]
  if (!selectedFile) return
  file.value = selectedFile
  previewUrl.value = URL.createObjectURL(selectedFile)
}

const removeFile = () => {
  workLetterInput.value.value = ''
  file.value = null
  previewUrl.value = null
  showProgress.value = false
}

const UploadDocument = async () => {
  try {
    if (!file.value) return
    showProgress.value = true
    await uploadDocumentStore.UploadDocumentWithoutOcr({
      file: file.value,
      partyId: route.params.id,
      kycDocumentType: KycDocumentTypeEnum.EmploymentLetter,
    })

    file.value = null
    showProgress.value = false
  } catch (error) {
    showProgress.value = false
    notificationStore.showMessage(error, '#1d262d')
    file.value = null
    previewUrl.value = null
  }
}
</script>
