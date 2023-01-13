<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import { ref } from "vue";

import { useHandleModal } from "@/composables/useHandleModal";

const { isActive, toggleModal } = useHandleModal();

const teamForm = ref({
  teamName: { name: "", label: "Name" },
  teamLogoUrl: { name: "", label: "Logo url" },
});

const sendForm = () => {
  console.log(teamForm.value);
};
</script>

<template>
  <div class="flex gap-14 items-start">
    <panel-sidebar />
    <div class="flex items-center gap-7">
      <base-modal v-model="isActive">
        <template #header>Add team</template>

        <template #body>
          <base-form @submit="sendForm()">
            <base-input
              type="text"
              :label="teamForm.teamName.label"
              v-model="teamForm.teamName.name"
              class="mb-2.5"
            ></base-input>
            <base-input
              type="text"
              :label="teamForm.teamLogoUrl.label"
              v-model="teamForm.teamLogoUrl.name"
              class="mb-4"
            ></base-input>
          </base-form>
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

      <h1 class="text-2xl text-gray-900 font-medium">
        Panel -
        <span class="capitalize">{{ $route.params.tab || "Teams" }}</span>
      </h1>
      <base-button
        @click="toggleModal()"
        class="bg-primary-50 hover:bg-gray-700"
      >
        <template #prevIcon><plus-icon class="w-2 h-2 mr-2" /></template> Add
      </base-button>
    </div>
  </div>
</template>
