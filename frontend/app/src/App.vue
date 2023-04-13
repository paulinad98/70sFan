<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import AppFooter from "../../globalComponents/app/AppFooter.vue";
import AppNavigation from "../../globalComponents/app/AppNavigation.vue";

import { useUserStore } from "@/stores/user";

onMounted(() => {
  const storeUser = useUserStore();

  storeUser.getTokenFromLS();
});
</script>

<template>
  <div class="bg-primary-300 min-h-screen flex flex-col justify-between">
    <app-navigation />
    <div>
      <RouterView class="pt-28 px-10 2xl:px-5 max-w-screen-2xl mx-auto" />
    </div>
    <app-footer />
  </div>
</template>

<style scoped></style>
