<template>
  <v-navigation-drawer
    v-model="drawerModel"
    floating
    :location="$vuetify.locale.isRtl ? 'right' : 'left'"
    color="onSecondary"
    width="260"
  >
    <div class="pa-4 d-flex align-center" style="min-height: 72px">
      <div>
        <div class="text-white font-weight-black text-h6 lh-1">نظام الإدارة EKYC</div>
      </div>
    </div>

    <v-list density="compact" nav>
      <v-list-group v-for="group in menuGroups" :key="group.path">
        <template #activator="{ props, isOpen }">
          <v-list-item v-bind="props" :title="group.name" :prepend-icon="group.icon">
            <template #append>
              <v-icon size="12">
                {{ isOpen ? 'fa fa-chevron-down' : 'fa fa-chevron-left' }}
              </v-icon>
            </template>
          </v-list-item>
        </template>

        <v-list-item
          v-for="child in group.children"
          :key="child.path"
          :to="child.path"
          :title="child.name"
          :prepend-icon="child.icon"
        >
          <template #prepend>
            <v-icon size="18">{{ child.icon }}</v-icon>
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  drawer: Boolean,
})

const emit = defineEmits(['update:drawer'])

const drawerModel = computed({
  get: () => props.drawer,
  set: (val) => emit('update:drawer', val),
})

import { useRouter } from 'vue-router'

const router = useRouter()

const menuGroups = router.options.routes.filter((r) => r.children?.length)
</script>

<style scoped>
.nav-item .v-list-item__prepend {
  margin-inline-end: 8px !important;
}

.v-list-item--active {
  background: rgba(0, 198, 174, 0.18) !important;
}

.lh-1 {
  line-height: 1.2 !important;
}

:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 20px !important;
}
</style>
