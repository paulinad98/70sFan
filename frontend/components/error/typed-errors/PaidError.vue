<script setup>
import ErrorHeader from '@/components/error/ErrorHeader.vue';
import ErrorLink from '@/components/error/ErrorLink.vue';
import ErrorLayout from '@/components/error/ErrorLayout.vue';

const config = useRuntimeConfig();
const PATREON_URL = config.public.patreonUrl;
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
