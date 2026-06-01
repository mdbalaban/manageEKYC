import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useKycRequestStore = defineStore('kycRequests', () => {
  const items = ref([
    {
      id: 1,
      KycRequestType: 1, // 1  for individual, 2  for corporate
      KycModelTypeId: 1,
      KycRequestNumber: '20260101',
      AccountNumber: '123456789',
      AccountType: 1, // شخصي أو قاصر
      BranchId: 1,
      KycPartyName: 'محمد عبدالحكيم',
      UserId: 1,
      KycPartyId: 1,
      Beneficiary: true,
      BranchName: 'فرع طرابلس المركزي',
      KycModelName: 'مواطن ليبي',
      status: 1,
    },
    {
      id: 2,
      KycRequestType: 1,
      KycModelTypeId: 2,
      KycRequestNumber: '20260102',
      AccountNumber: '987654321',
      AccountType: 2,
      BranchId: 2,
      KycPartyName: 'أحمد علي',
      UserId: 2,
      KycPartyId: 2,
      Beneficiary: false,
      BranchName: 'فرع بنغازي الرئيسي',
      KycModelName: 'أجنبي مقيم',
      status: 2,
    },
    {
      id: 3,
      KycRequestType: 1,
      KycModelTypeId: 3,
      KycRequestNumber: '20260103',
      AccountNumber: '555123789',
      AccountType: 1,
      BranchId: 3,
      KycPartyName: 'سالم محمد',
      UserId: 3,
      KycPartyId: 3,
      Beneficiary: true,
      BranchName: 'فرع مصراتة',
      KycModelName: 'أجنبي غير مقيم',
      status: 0,
    },
    {
      id: 4,
      KycRequestType: 2,
      KycModelTypeId: 20,
      KycRequestNumber: '20260104',
      AccountNumber: '222333444',
      AccountType: 2,
      BranchId: 1,
      KycPartyName: 'شركة النور للتجارة',
      UserId: 4,
      KycPartyId: 4,
      Beneficiary: false,
      BranchName: 'فرع طرابلس المركزي',
      KycModelName: 'شركات خاصة',
      status: 1,
    },
    {
      id: 5,
      KycRequestType: 2,
      KycModelTypeId: 21,
      KycRequestNumber: '20260105',
      AccountNumber: '333444555',
      AccountType: 1,
      BranchId: 2,
      KycPartyName: 'شركة المستقبل',
      UserId: 5,
      KycPartyId: 5,
      Beneficiary: false,
      BranchName: 'فرع بنغازي الرئيسي',
      KycModelName: 'شركات عامة',
      status: 0,
    },
    {
      id: 6,
      KycRequestType: 2,
      KycModelTypeId: 30,
      KycRequestNumber: '20260106',
      AccountNumber: '444555666',
      AccountType: 2,
      BranchId: 3,
      KycPartyName: 'منظمة الخير',
      UserId: 6,
      KycPartyId: 6,
      Beneficiary: false,
      BranchName: 'فرع مصراتة',
      KycModelName: 'منظمات ومؤسسات',
      status: 2,
    },
  ])

  const loading = ref(false)
  const page = ref(1)
  const pageSize = 10

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  const pagedItems = computed(() => {
    const s = (page.value - 1) * pageSize
    return items.value.slice(s, s + pageSize)
  })

  function approve(id) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.status = 1
  }

  function reject(id) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.status = 2
  }

  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }

  return {
    items,
    pagedItems,
    loading,
    page,
    totalPages,
    approve,
    reject,
    update,
  }
})
