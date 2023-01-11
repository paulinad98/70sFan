<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

import { ref, watch } from "vue";

const props = defineProps({ modelValue: { type: Boolean, required: true } });

defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        isVisible.value = newVal;
      }, 100);

      return;
    }

    isVisible.value = newVal;
  }
);
</script>

<template>
  <div
    @click.self="$emit('update:modelValue', false)"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden h-full flex justify-center items-center bg-stone-300/[.60] transition duration-50"
    :class="{ invisible: !isVisible, 'opacity-0': !modelValue }"
  >
    <div
      class="relative w-full max-w-2xl max-h-[80%] overflow-y-auto bg-white rounded-lg border border-primary-50 shadow transition duration-100"
      :class="{
        'translate-y-1 scale-100 ': modelValue,
        'scale-90 opacity-0 ': !modelValue,
      }"
    >
      <div
        class="flex items-start justify-between p-4 border-b border-gray-300 rounded-t"
      >
        <h3 class="text-xl font-semibold text-gray-900">
          <slot name="header"></slot>
        </h3>
        <base-button
          @click="$emit('update:modelValue', false)"
          class="text-gray-400 bg-transparent hover:bg-gray-50 hover:text-gray-900 rounded-lg"
        >
          <template #prevIcon>
            <close-icon class="w-5 h-5 text-primary-50" />
          </template>
        </base-button>
      </div>
      <div class="p-6">
        <slot name="body"> </slot>
      </div>

      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-300 rounded-b"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
