<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

import { ref, onUpdated } from "vue";

defineProps({ modelValue: { type: Boolean, required: true } });

defineEmits(["update:modelValue"]);

const modal = ref(null);

onUpdated(() => {
  if (modal.value) {
    modal.value.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <dialog
        v-if="modelValue"
        ref="modal"
        @click.self="$emit('update:modelValue', false)"
        @keydown.esc="$emit('update:modelValue', false)"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden h-full flex justify-center items-center bg-black/[.80] transition duration-300"
      >
        <div
          class="relative w-full max-w-2xl max-h-[80%] overflow-y-auto bg-white rounded-lg border border-primary-50 shadow transition duration-300"
        >
          <header
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
          </header>

          <div class="p-6">
            <slot name="body"></slot>
          </div>

          <footer
            class="flex items-center p-6 space-x-2 border-t border-gray-300 rounded-b"
          >
            <slot name="footer"></slot>
          </footer>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

.v-enter-from > div {
  @apply scale-90;
}

.v-enter-to > div {
  @apply scale-100;
}

.v-leave-to > div {
  @apply scale-75;
}
</style>
