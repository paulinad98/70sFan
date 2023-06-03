<script setup>
import ErrorIcon from '@/components/error/ErrorIcon.vue';
</script>

<template>
  <div class="bg-gray-100">
    <div class="mt-16 m-auto text-center">
      <error-icon />

      <slot name="header"></slot>
    </div>

    <div class="text-center mt-6">
      <slot name="link"></slot>
    </div>
  </div>
</template>
