import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


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
