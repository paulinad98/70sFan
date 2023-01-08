<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
</script>

<template>
  <div
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-modal md:h-full flex justify-center"
  >
    <div class="relative w-full max-w-2xl md:h-auto translate-y-1/4">
      <div class="relative bg-white rounded-lg border border-primary-50 shadow">
        <div
          class="flex items-start justify-between p-4 border-b border-gray-300 rounded-t"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            <slot name="header"></slot>
          </h3>
          <base-button
            @click="$emit('close')"
            class="text-gray-400 bg-transparent hover:bg-gray-50 hover:text-gray-900 rounded-lg"
          >
            <template #prevIcon>
              <close-icon class="w-5 h-5 text-primary-50" />
            </template>
          </base-button>
        </div>
        <div class="p-6 space-y-6">
          <slot name="body"></slot>
        </div>

        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-300 rounded-b"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
