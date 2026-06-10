<template>
  <div class="ocr-progress pa-4 mb-4">
    <div class="caption font-weight-bold mb-3 white--text">جاري المعالجة...</div>
    <div v-for="(step, i) in steps" :key="i" class="d-flex align-center mb-2" style="gap: 10px">
      <div class="step-icon" :class="stepClass(i + 1)">
        <v-icon v-if="currentStep > i" size="12" color="white">fas fa-check</v-icon>
        <v-progress-circular
          v-else-if="currentStep === i"
          indeterminate
          color="white"
          size="14"
          width="2"
        />
        <v-icon v-else size="12" color="rgba(255,255,255,0.4)">fas fa-circle</v-icon>
      </div>
      <span class="caption" :class="currentStep >= i ? 'white--text font-weight-bold' : ''">{{
        step
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OcrProgressSteps',
  props: {
    steps: { type: Array, required: true },
    currentStep: { type: Number, default: 1 },
  },
  methods: {
    stepClass(i) {
      if (this.currentStep > i) return 'step-done'
      if (this.currentStep === i) return 'step-active'
      return 'step-pending'
    },
  },
}
</script>
