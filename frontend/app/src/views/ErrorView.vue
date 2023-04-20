<script setup>
import { useErrorComponents } from "@/composables/useErrorComponents";

const { ERROR_COMPONENTS } = useErrorComponents();

defineProps({
  error: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <component :is="ERROR_COMPONENTS[error]" />
</template>
