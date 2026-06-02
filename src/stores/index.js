import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCountriesStore = defineStore('countries', () => {
  const items = ref([
    { id: 1, code: 'LY', name: 'ليبيا', citiesCount: 8, isActive: true },
    { id: 2, code: 'EG', name: 'مصر', citiesCount: 6, isActive: true },
    { id: 3, code: 'SA', name: 'السعودية', citiesCount: 5, isActive: true },
    { id: 4, code: 'AE', name: 'الإمارات', citiesCount: 4, isActive: true },
    { id: 5, code: 'TN', name: 'تونس', citiesCount: 3, isActive: true },
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
  const items = ref([
    {
      id: 1,
      isActive: true,
      name: 'طرابلس',
      countryId: 1,
      countryName: 'ليبيا',
    },
    {
      id: 2,
      isActive: true,
      name: 'بنغازي',
      countryId: 1,
      countryName: 'ليبيا',
    },
    {
      id: 3,
      isActive: true,
      name: 'القاهرة',
      countryId: 2,
      countryName: 'مصر',
    },
    {
      id: 4,
      isActive: true,
      name: 'الرياض',
      countryId: 3,
      countryName: 'السعودية',
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

export const useKycModelTypesStore = defineStore('kycModelTypes', () => {
  const items = ref([
    {
      id: 1,
      requestType: 1,
      modelType: 1,
      name: 'مواطن ليبي',
      icon: 'fas fa-user',
      isActive: true,
    },
    {
      id: 2,
      requestType: 1,
      modelType: 2,
      name: 'أجنبي مقيم',
      icon: 'fas fa-globe',
      isActive: true,
    },
    {
      id: 3,
      requestType: 1,
      modelType: 3,
      name: 'أجنبي غير مقيم',
      icon: 'fas fa-plane',
      isActive: true,
    },
    {
      id: 4,
      requestType: 2,
      modelType: 20,
      name: 'شركات خاصة',
      icon: 'fas fa-building',
      isActive: true,
    },
    {
      id: 5,
      requestType: 2,
      modelType: 21,
      name: 'شركات عامة',
      icon: 'fas fa-briefcase',
      isActive: true,
    },
    {
      id: 6,
      requestType: 2,
      modelType: 30,
      name: 'منظمات ومؤسسات',
      icon: 'fas fa-university',
      isActive: true,
    },
  ])

  const loading = ref(false)
  const page = ref(1)
  const pageSize = 10

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  const pagedItems = computed(() => {
    const start = (page.value - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })

  function toggle(item) {
    const found = items.value.find((i) => i.id === item.id)
    if (found) found.isActive = !found.isActive
  }

  function update(data) {
    const idx = items.value.findIndex((i) => i.id === data.id)
    if (idx !== -1) {
      items.value[idx] = {
        ...items.value[idx],
        ...data,
      }
    }
  }

  return {
    items,
    pagedItems,
    loading,
    page,
    totalPages,
    toggle,
    update,
  }
})

export const useRejectMessagesStore = defineStore('rejectMessages', () => {
  const items = ref([
    {
      id: 1,
      isActive: true,
      messageType: '1',
      message: 'الوثائق غير واضحة',
    },
    {
      id: 2,
      isActive: true,
      messageType: '2',
      message: 'المعلومات غير مكتملة',
    },
    {
      id: 3,
      isActive: true,
      messageType: '3',
      message: 'الوثائق مكررة',
    },
    {
      id: 4,
      isActive: true,
      messageType: '4',
      message: 'الوثائق غير موجودة',
    },
    {
      id: 5,
      isActive: true,
      messageType: '5',
      message: 'الوثائق غير مطابقة',
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
