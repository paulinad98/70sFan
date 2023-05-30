<script setup>
import { useAuth } from '@/composables/useAuth';
import { useErrorComponents } from '@/composables/useErrorComponents';

import BaseSpinner from '@/components/base/BaseSpinner.vue';

const { ERROR_COMPONENTS } = useErrorComponents();
const { isLoading, error } = useAuth();
</script>

<template>
  <base-spinner v-if="isLoading" size="12" class="w-max mx-auto pt-16"  />
  <component v-else :is="ERROR_COMPONENTS[error]" />
</template>
