<script setup>
import BaseButton from './BaseButton.vue';

defineEmits(['submit']);
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <slot></slot>
    <base-button
      class="
      mt-5 mx-auto px-2.5 py-1
      bg-primary-50 hover:bg-opacity-90
      border border-primary-50
      text-primary-50 hover:text-white"
      type="submit"
    >
      Submit
    </base-button>
  </form>
</template>
