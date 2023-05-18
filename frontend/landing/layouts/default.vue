<script setup>
import AppFooter from "@/components/globalComponents/app/AppFooter.vue";
import AppNavigation from "@/components//globalComponents/app/AppNavigation.vue";
</script>

<template>
  <div class="bg-primary-300 min-h-screen flex flex-col justify-between">
    <app-navigation />
    <div class="pt-28 px-10 2xl:px-5 max-w-screen-2xl mx-auto">
      <slot />
    </div>
    <app-footer />
  </div>
</template>

<style scoped></style>
