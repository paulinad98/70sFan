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
  <div>
    <app-navigation />
    <RouterView />
    <app-footer />
  </div>
</template>

<style scoped></style>
