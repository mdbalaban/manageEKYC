import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
  }),

  actions: {
    async insertCountry(payload: any) {
      console.log('insert', payload)
      // API CALL HERE
    },

    async updateCountry(payload: any) {
      console.log('update', payload)
      // API CALL HERE
    },
  },
})
