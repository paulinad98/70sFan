<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";

import { useHandleModal } from "@/composables/useHandleModal";

import { defineProps } from "vue";

const { isActive, toggleModal } = useHandleModal();

defineProps({ tab: { type: String, default: "team" } });
</script>

<template>
  <div class="grid grid-cols-[256px_1fr] gap-14 items-start overflow-x-hidden">
    <panel-sidebar />
    <div class="max-w-full overflow-x-hidden">
      <base-modal v-model="isActive">
        <template #header> Add {{ tab }} </template>

        <template #body>
          <slot name="modal"></slot>
        </template>

        <template #footer>
          <base-button
            @click="toggleModal()"
            class="bg-primary-50 hover:bg-gray-700 mx-auto"
          >
            Close
          </base-button>
        </template>
      </base-modal>

      <header class="flex items-center gap-7 mb-5">
        <h1 class="text-2xl text-gray-900 font-medium">
          Panel -
          <span class="capitalize">{{ tab || "Team" }}</span>
        </h1>
        <base-button
          @click="toggleModal()"
          class="bg-primary-50 hover:bg-gray-700"
        >
          <template #prevIcon><plus-icon class="w-2 h-2 mr-2" /></template> Add
        </base-button>
      </header>

      <slot name="table"></slot>
    </div>
  </div>
</template>
