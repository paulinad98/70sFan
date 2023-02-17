<script>
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import AppFooter from "../../globalComponents/app/AppFooter.vue";
import AppNavigation from "../../globalComponents/app/AppNavigation.vue";

export default defineComponent({
  name: "App",
  components: {
    RouterView,
    AppFooter,
    AppNavigation,
  },
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
