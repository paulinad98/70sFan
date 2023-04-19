<script setup>
import ErrorHeader from "@/components/error/ErrorHeader.vue";
import ErrorLink from "@/components/error/ErrorLink.vue";
import ErrorLayout from "@/components/error/ErrorLayout.vue";

const PATREON_URL = import.meta.env.VITE_PATREON_URL;
</script>

<template>
  <error-layout>
    <template #header>
      <error-header> You dont't have active subscription. </error-header>
    </template>

    <template #link>
      <error-link :href="PATREON_URL"> Subscribe </error-link>
    </template>
  </error-layout>
</template>
