<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import { useHandleModal } from "@/composables/useHandleModal";
import { useSetForm } from "@/composables/useSetForm";

const { isActive, toggleModal } = useHandleModal();

const { form: teamForm, setupInput, resetForm } = useSetForm();

setupInput({ name: "teamName", label: "Name", map: teamForm });
setupInput({ name: "teamLogoUrl", label: "Logo url", map: teamForm });

const sendForm = () => {
  resetForm();
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
              :label="teamForm.get('teamName').label"
              :error="teamForm.get('teamName').error"
              v-model="teamForm.get('teamName').value"
            ></base-input>
            <br class="my-2.5 block content-['']" />
            <base-input
              type="text"
              :label="teamForm.get('teamLogoUrl').label"
              :error="teamForm.get('teamLogoUrl').error"
              v-model="teamForm.get('teamLogoUrl').value"
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
