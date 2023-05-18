<script setup>
import { useQueryProvider } from "vue-query";

useQueryProvider();

const route = useRoute();
</script>

<template>
  <NuxtLayout :name="route.meta.layout">
    <NuxtPage />
  </NuxtLayout>
</template>
