<script setup>
import BaseButton from "./BaseButton.vue";

defineEmits(["submit"]);
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <slot></slot>
    <base-button
      class="mt-5 text-primary-50 bg-white border border-primary-50 hover:bg-primary-50 hover:text-white mx-auto px-2.5 py-1"
      type="submit"
    >
      Submit
    </base-button>
  </form>
</template>
