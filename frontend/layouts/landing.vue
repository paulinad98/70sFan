<script setup lang="ts">
import { onMounted } from 'vue';
import useRouterAuth from '@/composables/useRouterAuth';

const { pushToHome } = useRouterAuth();

onMounted(() => {
  pushToHome();
});
</script>

<template>
  <slot />
</template>
