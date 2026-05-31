import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const generate = (count, prefix, extraFields = {}) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    isActive: Math.random() > 0.3,
    ...extraFields(i + 1),
  }))

export const useCountriesStore = defineStore('countries', () => {
  const items = ref(
    generate(23, 'country', (i) => ({
      code:
        [
          'LY',
          'EG',
          'SA',
          'AE',
          'KW',
          'QA',
          'BH',
          'OM',
          'JO',
          'IQ',
          'SY',
          'LB',
          'TN',
          'MA',
          'DZ',
          'SD',
          'YE',
          'PS',
          'SO',
          'MR',
          'DJ',
          'KM',
          'TR',
        ][i - 1] || `C${i}`,
      name:
        [
          'ليبيا',
          'مصر',
          'السعودية',
          'الإمارات',
          'الكويت',
          'قطر',
          'البحرين',
          'عمان',
          'الأردن',
          'العراق',
          'سوريا',
          'لبنان',
          'تونس',
          'المغرب',
          'الجزائر',
          'السودان',
          'اليمن',
          'فلسطين',
          'الصومال',
          'موريتانيا',
          'جيبوتي',
          'جزر القمر',
          'تركيا',
        ][i - 1] || `دولة ${i}`,
      citiesCount: Math.floor(Math.random() * 50) + 2,
    })),
  )
  const loading = ref(false)
  const page = ref(1)
  const pageSize = 10

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))
  const pagedItems = computed(() => {
    const s = (page.value - 1) * pageSize
    return items.value.slice(s, s + pageSize)
  })

  function toggle(item) {
    const found = items.value.find((i) => i.id === item.id)
    if (found) found.isActive = !found.isActive
  }

  function add(data) {
    items.value.unshift({ id: Date.now(), isActive: true, ...data })
  }

  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})

export const useCitiesStore = defineStore('cities', () => {
  const countryNames = ['ليبيا', 'مصر', 'السعودية', 'الإمارات', 'الكويت']
  const items = ref(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      isActive: Math.random() > 0.3,
      name:
        [
          'طرابلس',
          'بنغازي',
          'مصراتة',
          'الزاوية',
          'البيضاء',
          'سبها',
          'الخمس',
          'زليتن',
          'أجدابيا',
          'درنة',
          'توكرة',
          'ترهونة',
          'غريان',
          'يفرن',
          'الجفرة',
          'مزدة',
          'براك',
          'أوباري',
          'غات',
          'مرزق',
          'القيقب',
          'طبرق',
          'الكفرة',
          'تازربو',
          'هون',
          'شحات',
          'تمنهنت',
          'المرج',
          'الأبيار',
          'سوسة',
        ][i] || `مدينة ${i + 1}`,
      countryId: Math.floor(Math.random() * 5) + 1,
      countryName: countryNames[Math.floor(Math.random() * 5)],
    })),
  )
  const loading = ref(false)
  const page = ref(1)
  const pageSize = 10
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))
  const pagedItems = computed(() => {
    const s = (page.value - 1) * pageSize
    return items.value.slice(s, s + pageSize)
  })
  function toggle(item) {
    const f = items.value.find((i) => i.id === item.id)
    if (f) f.isActive = !f.isActive
  }
  function add(data) {
    items.value.unshift({ id: Date.now(), isActive: true, ...data })
  }
  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }
  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})

export const useRegionsStore = defineStore('regions', () => {
  const items = ref([
    {
      id: 1,
      isActive: true,
      regionNumber: 1,
      name: 'المنطقة الغربية',
      branchCount: 18,
    },
    {
      id: 2,
      isActive: true,
      regionNumber: 2,
      name: 'المنطقة الشرقية',
      branchCount: 15,
    },
    {
      id: 3,
      isActive: true,
      regionNumber: 3,
      name: 'المنطقة الجنوبية',
      branchCount: 8,
    },
    {
      id: 4,
      isActive: true,
      regionNumber: 4,
      name: 'المنطقة الوسطى',
      branchCount: 10,
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
  function toggle(item) {
    const f = items.value.find((i) => i.id === item.id)
    if (f) f.isActive = !f.isActive
  }
  function add(data) {
    items.value.unshift({
      id: Date.now(),
      isActive: true,
      regionNumber: items.value.length + 1,
      ...data,
    })
  }
  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }
  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})

export const useBanksStore = defineStore('banks', () => {
  const items = ref([
    {
      id: 1,
      isActive: true,
      code: '001',
      name: 'مصرف الجمهورية',
      branchCount: 12,
    },
    {
      id: 2,
      isActive: true,
      code: '002',
      name: 'مصرف الوحدة',
      branchCount: 10,
    },
    {
      id: 3,
      isActive: true,
      code: '003',
      name: 'المصرف التجاري الوطني',
      branchCount: 9,
    },
    {
      id: 4,
      isActive: true,
      code: '004',
      name: 'مصرف الصحاري',
      branchCount: 7,
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
  function toggle(item) {
    const f = items.value.find((i) => i.id === item.id)
    if (f) f.isActive = !f.isActive
  }
  function add(data) {
    items.value.unshift({ id: Date.now(), isActive: true, ...data })
  }
  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }
  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})

export const useBranchesStore = defineStore('branches', () => {
  const items = ref([
    {
      id: 1,
      isActive: true,
      branchCode: '00101',
      name: 'فرع طرابلس المركزي',
      bankId: 1,
      bankName: 'مصرف الجمهورية',
      regionId: 1,
      regionName: 'المنطقة الغربية',
    },
    {
      id: 2,
      isActive: true,
      branchCode: '00102',
      name: 'فرع سوق الجمعة',
      bankId: 1,
      bankName: 'مصرف الجمهورية',
      regionId: 1,
      regionName: 'المنطقة الغربية',
    },
    {
      id: 3,
      isActive: true,
      branchCode: '00201',
      name: 'فرع بنغازي الرئيسي',
      bankId: 2,
      bankName: 'مصرف الوحدة',
      regionId: 2,
      regionName: 'المنطقة الشرقية',
    },
    {
      id: 4,
      isActive: true,
      branchCode: '00301',
      name: 'فرع مصراتة',
      bankId: 3,
      bankName: 'المصرف التجاري الوطني',
      regionId: 4,
      regionName: 'المنطقة الوسطى',
    },
    {
      id: 5,
      isActive: true,
      branchCode: '00401',
      name: 'فرع سبها',
      bankId: 4,
      bankName: 'مصرف الصحاري',
      regionId: 3,
      regionName: 'المنطقة الجنوبية',
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
  function toggle(item) {
    const f = items.value.find((i) => i.id === item.id)
    if (f) f.isActive = !f.isActive
  }
  function add(data) {
    items.value.unshift({ id: Date.now(), isActive: true, ...data })
  }
  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }
  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})

export const useNationalitiesStore = defineStore('nationalities', () => {
  const items = ref([
    {
      id: 1,
      isActive: true,
      nationalityNumber: '001',
      name: 'ليبية',
      countryId: 1,
      countryName: 'ليبيا',
    },
    {
      id: 2,
      isActive: true,
      nationalityNumber: '002',
      name: 'تونسية',
      countryId: 1,
      countryName: 'تونس',
    },
    {
      id: 3,
      isActive: true,
      nationalityNumber: '003',
      name: 'مصرية',
      countryId: 2,
      countryName: 'مصر',
    },
    {
      id: 4,
      isActive: true,
      nationalityNumber: '004',
      name: 'سعودية',
      countryId: 3,
      countryName: 'السعودية',
    },
    {
      id: 5,
      isActive: true,
      nationalityNumber: '005',
      name: 'امريكية',
      countryId: 4,
      countryName: 'امريكا',
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
  function toggle(item) {
    const f = items.value.find((i) => i.id === item.id)
    if (f) f.isActive = !f.isActive
  }
  function add(data) {
    items.value.unshift({ id: Date.now(), isActive: true, ...data })
  }
  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) items.value[idx] = { ...items.value[idx], ...data }
  }
  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  return { items, pagedItems, loading, page, totalPages, toggle, add, update, remove }
})
