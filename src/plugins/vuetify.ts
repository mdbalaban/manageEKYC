import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { ar } from 'vuetify/locale'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1A3A6B',
          secondary: '#2D6BE4',
          accent: '#00C6AE',
          surface: '#FFFFFF',
          background: '#F0F4FF',
          error: '#E53935',
          success: '#00C853',
          warning: '#FFB300',
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'xl' },
  },
  locale: {
    locale: 'ar',
    messages: { ar },
  },
  icons: {
    defaultSet: 'fa',

    aliases,

    sets: {
      fa,
      mdi,
    },
  },
})
