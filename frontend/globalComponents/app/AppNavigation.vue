<template>
  <nav class="bg-primary-50 border-gray-200 py-6 fixed w-full">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto"
    >
      <app-logo class="flex items-center fill-white" />

      <slot></slot>
    </div>
  </nav>
</template>

<script>
import AppLogo from "./AppLogo.vue";

export default {
  components: {
    AppLogo,
  },
};
</script>
