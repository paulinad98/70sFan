<script setup>
import ErrorIcon from "@/components/errors/ErrorIcon.vue";

defineProps({
  redirect: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <div class="bg-gray-100">
    <div class="mt-16 m-auto text-center">
      <error-icon />

      <div class="tracking-widest mt-12">
        <span class="text-gray-500 text-xl">
          <slot name="text">Somethig went wrong</slot>
        </span>
      </div>
    </div>

    <div class="text-center mt-6">
      <a
        :href="redirect"
        class="text-gray-500 text-xl bg-gray-200 p-2.5 px-5 rounded-md hover:shadow-md"
      >
        <slot name="button">Home</slot>
      </a>
    </div>
  </div>
</template>
