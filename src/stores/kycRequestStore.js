import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// export const useKycRequestStore = defineStore('kycRequests', () => {
//   const items = ref([
//     {
//       id: 1,
//       KycRequestType: 1, // 1  for individual, 2  for corporate
//       KycModelTypeId: 1,
//       KycRequestNumber: '20260101',
//       AccountNumber: '123456789',
//       AccountType: 1, // شخصي أو قاصر
//       BranchId: 1,
//       KycPartyName: 'محمد عبدالحكيم',
//       UserId: 1,
//       KycPartyId: 1,
//       Beneficiary: true,
//       BranchName: 'فرع طرابلس المركزي',
//       KycModelName: 'مواطن ليبي',
//       status: 1,
//     },
//     {
//       id: 2,
//       KycRequestType: 1,
//       KycModelTypeId: 2,
//       KycRequestNumber: '20260102',
//       AccountNumber: '987654321',
//       AccountType: 2,
//       BranchId: 2,
//       KycPartyName: 'أحمد علي',
//       UserId: 2,
//       KycPartyId: 2,
//       Beneficiary: false,
//       BranchName: 'فرع بنغازي الرئيسي',
//       KycModelName: 'أجنبي مقيم',
//       status: 2,
//     },
//     {
//       id: 3,
//       KycRequestType: 1,
//       KycModelTypeId: 3,
//       KycRequestNumber: '20260103',
//       AccountNumber: '555123789',
//       AccountType: 1,
//       BranchId: 3,
//       KycPartyName: 'سالم محمد',
//       UserId: 3,
//       KycPartyId: 3,
//       Beneficiary: true,
//       BranchName: 'فرع مصراتة',
//       KycModelName: 'أجنبي غير مقيم',
//       status: 0,
//     },
//     {
//       id: 4,
//       KycRequestType: 2,
//       KycModelTypeId: 20,
//       KycRequestNumber: '20260104',
//       AccountNumber: '222333444',
//       AccountType: 2,
//       BranchId: 1,
//       KycPartyName: 'شركة النور للتجارة',
//       UserId: 4,
//       KycPartyId: 4,
//       Beneficiary: false,
//       BranchName: 'فرع طرابلس المركزي',
//       KycModelName: 'شركات خاصة',
//       status: 1,
//     },
//     {
//       id: 5,
//       KycRequestType: 2,
//       KycModelTypeId: 21,
//       KycRequestNumber: '20260105',
//       AccountNumber: '333444555',
//       AccountType: 1,
//       BranchId: 2,
//       KycPartyName: 'شركة المستقبل',
//       UserId: 5,
//       KycPartyId: 5,
//       Beneficiary: false,
//       BranchName: 'فرع بنغازي الرئيسي',
//       KycModelName: 'شركات عامة',
//       status: 0,
//     },
//     {
//       id: 6,
//       KycRequestType: 2,
//       KycModelTypeId: 30,
//       KycRequestNumber: '20260106',
//       AccountNumber: '444555666',
//       AccountType: 2,
//       BranchId: 3,
//       KycPartyName: 'منظمة الخير',
//       UserId: 6,
//       KycPartyId: 6,
//       Beneficiary: false,
//       BranchName: 'فرع مصراتة',
//       KycModelName: 'منظمات ومؤسسات',
//       status: 2,
//     },
//   ])

//   const loading = ref(false)
//   const page = ref(1)
//   const pageSize = 10

//   const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

//   const pagedItems = computed(() => {
//     const s = (page.value - 1) * pageSize
//     return items.value.slice(s, s + pageSize)
//   })

//   function approve(id) {
//     const item = items.value.find((i) => i.id === id)
//     if (item) item.status = 1
//   }

//   function reject(id) {
//     const item = items.value.find((i) => i.id === id)
//     if (item) item.status = 2
//   }

//   function update(data) {
//     const idx = items.value.findIndex((i) => i.id === data.id)
//     if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
//   }

//   return {
//     items,
//     pagedItems,
//     loading,
//     page,
//     totalPages,
//     approve,
//     reject,
//     update,
//   }
// })

export const useKycRequestStore = defineStore('kycRequests', () => {
  const items = ref([
    {
      id: 1,
      status: 'pending',
      KycRequestType: 1,
      KycModelName: 'مواطن ليبي',
      submittedAt: '2026-05-28',
      fullName: 'محمد عمر الطاهر',
      nationalId: '218041197803',
      birthDate: '12 / 03 / 1978',
      nationality: 'ليبي',
      gender: 'ذكر',
      maritalStatus: 'متزوج',
      phone: '0912 345 678',
      email: 'm.tahir@mail.ly',
      country: 'ليبيا',
      city: 'طرابلس',
      region: 'السياحية',
      address: 'شارع عمر المختار، بناية 17',
      employer: 'شركة الخليج للتجارة',
      jobTitle: 'مدير مبيعات',
      sector: 'القطاع الخاص',
      monthlyIncome: '4,500 د.ل',
      incomeSource: 'راتب شهري',
      accountPurpose: 'مدفوعات يومية',
      documents: [{ type: 'بطاقة الهوية', name: 'national_id.pdf', url: '#' }],
    },
    {
      id: 2,
      status: 'pending',
      KycRequestType: 1,
      KycModelName: 'مواطن ليبي',
      submittedAt: '2026-05-30',
      fullName: 'فاطمة علي المريمي',
      nationalId: '318091199204',
      birthDate: '09 / 09 / 1992',
      nationality: 'ليبية',
      gender: 'أنثى',
      maritalStatus: 'عزباء',
      phone: '0923 456 789',
      email: 'f.mreimi@gmail.com',
      country: 'ليبيا',
      city: 'بنغازي',
      region: 'الهواري',
      address: 'شارع جمال عبدالناصر، عمارة النور',
      employer: 'وزارة التعليم',
      jobTitle: 'معلمة',
      sector: 'القطاع الحكومي',
      monthlyIncome: '3,200 د.ل',
      incomeSource: 'راتب شهري',
      accountPurpose: 'ادخار',
      documents: [{ type: 'بطاقة الهوية', name: 'national_id.pdf', url: '#' }],
    },
    {
      id: 3,
      status: 'approved',
      KycRequestType: 2,
      KycModelName: 'منظمات ومؤسسات',
      submittedAt: '2026-05-20',
      fullName: 'خالد سالم البرعصي',
      nationalId: '119051198506',
      birthDate: '05 / 06 / 1985',
      nationality: 'ليبي',
      gender: 'ذكر',
      maritalStatus: 'متزوج',
      phone: '0934 567 890',
      email: 'k.barasi@outlook.com',
      country: 'ليبيا',
      city: 'مصراتة',
      region: 'القصر أحمد',
      address: 'طريق المطار، حي الوحدة',
      employer: 'مصرف الجمهورية',
      jobTitle: 'محاسب أول',
      sector: 'القطاع المصرفي',
      monthlyIncome: '6,000 د.ل',
      incomeSource: 'راتب شهري',
      accountPurpose: 'تحويلات تجارية',
      documents: [
        { type: 'بطاقة الهوية', name: 'national_id.pdf', url: '#' },
        { type: 'كشف الراتب', name: 'salary_slip.pdf', url: '#' },
        { type: 'عقد العمل', name: 'contract.pdf', url: '#' },
      ],
    },
    {
      id: 4,
      status: 'rejected',
      KycRequestType: 1,
      KycModelName: 'شركاء خاصة',
      submittedAt: '2026-05-22',
      rejectReason: 'المستندات المرفقة غير مكتملة — يرجى إرفاق إثبات السكن',
      fullName: 'سالم موسى الورفلي',
      nationalId: '420031197001',
      birthDate: '03 / 01 / 1970',
      nationality: 'ليبي',
      gender: 'ذكر',
      maritalStatus: 'متزوج',
      phone: '0945 678 901',
      email: 'salem.w@yahoo.com',
      country: 'ليبيا',
      city: 'سبها',
      region: 'المنشية',
      address: 'حي السلام، بلوك 4',
      employer: 'مقاول مستقل',
      jobTitle: 'مقاول',
      sector: 'القطاع الخاص',
      monthlyIncome: '8,000 د.ل',
      incomeSource: 'أعمال حرة',
      accountPurpose: 'تمويل مشاريع',
      documents: [{ type: 'بطاقة الهوية', name: 'national_id.pdf', url: '#' }],
    },
    {
      id: 5,
      status: 'pending',
      KycRequestType: 1,
      KycModelName: 'مواطن ليبي',
      submittedAt: '2026-06-01',
      fullName: 'أحمد إبراهيم الكوني',
      nationalId: '517062000112',
      birthDate: '17 / 06 / 2000',
      nationality: 'ليبي',
      gender: 'ذكر',
      maritalStatus: 'أعزب',
      phone: '0956 789 012',
      email: 'ahmed.kouni@gmail.com',
      country: 'ليبيا',
      city: 'الزاوية',
      region: 'حرابة',
      address: 'شارع الاستقلال، منزل 22',
      employer: 'شركة ليبيا للاتصالات',
      jobTitle: 'مهندس شبكات',
      sector: 'القطاع الخاص',
      monthlyIncome: '5,500 د.ل',
      incomeSource: 'راتب شهري',
      accountPurpose: 'مدفوعات إلكترونية',
      documents: [
        { type: 'بطاقة الهوية', name: 'national_id.pdf', url: '#' },
        { type: 'كشف الراتب', name: 'payslip_may.pdf', url: '#' },
      ],
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
    if (item) item.status = 'approved'
  }

  function reject(id, reason) {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.status = 'rejected'
      item.rejectReason = reason
    }
  }

  return { items, pagedItems, loading, page, totalPages, approve, reject }
})
