<script setup>
import { onMounted } from 'vue';

import AppFooter from '@/components/app/AppFooter.vue';
import AppNavigation from '@/components/app/AppNavigation.vue';
import useRouterAuth from '@/composables/useRouterAuth';

const { pushToLogin } = useRouterAuth();

onMounted(() => {
  pushToLogin();
});
</script>

<template>
  <div class="bg-primary-300 min-h-screen flex flex-col justify-between">
    <app-navigation />
    <div class="pt-28 px-10 2xl:px-5 max-w-screen-2xl mx-auto w-full">
      <slot />
    </div>
    <app-footer />
  </div>
</template>

<style scoped></style>
