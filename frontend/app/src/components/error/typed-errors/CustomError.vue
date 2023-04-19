<script setup>
import ErrorHeader from "@/components/error/ErrorHeader.vue";
import ErrorLink from "@/components/error/ErrorLink.vue";
import ErrorLayout from "@/components/error/ErrorLayout.vue";

const LANDING_URL = import.meta.env.VITE_LANDING_URL;
</script>

<template>
  <error-layout>
    <template #header>
      <error-header>Something went wrong</error-header>
    </template>

    <template #link>
      <error-link :href="LANDING_URL"> Home </error-link>
    </template>
  </error-layout>
</template>
