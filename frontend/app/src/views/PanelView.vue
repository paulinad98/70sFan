<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BaseTable from "@/components/base/BaseTable.vue";

import { defineProps, onMounted, watch } from "vue";

import { useHandleModal } from "@/composables/useHandleModal";
import { useSetForm } from "@/composables/useSetForm";
import { useFetchApi } from "@/composables/useFetchApi";
import {
  panelForms,
  tableStructure,
  usePanelData,
} from "@/composables/usePanelData";

const { isActive, toggleModal } = useHandleModal();
const { useFetch } = useFetchApi();
const { form, setupInput, resetForm, validateForm, clearForm } = useSetForm();
const { data, requests } = usePanelData();

const props = defineProps({ tab: { type: String, default: "team" } });

watch(
  () => props.tab,
  () => {
    clearForm();

    panelForms[`${props.tab}`].forEach(({ name, label, validators }) => {
      setupInput({
        name,
        label,
        map: form,
        validators,
      });
    });
  },
  { immediate: true }
);

onMounted(() => {
  Promise.all(requests.map((request) => request()));
});

const sendForm = async () => {
  const isError = validateForm();

  if (isError) return;

  const body = {};

  form.value.forEach((_value, key) => {
    body[key] = form.value.get(key).value;
  });

  await useFetch({
    method: "POST",
    endpoint: props.tab,
    payload: body,
  });

  resetForm();
};
</script>

<template>
  <div class="grid grid-cols-[256px_1fr] gap-14 items-start overflow-x-hidden">
    <panel-sidebar />
    <div class="max-w-full overflow-x-hidden">
      <base-modal v-model="isActive">
        <template #header> Add {{ tab }} </template>

        <template #body>
          <base-form @submit="sendForm()">
            <template
              :key="input.name"
              v-for="input in panelForms[`${props.tab}`]"
            >
              <base-input
                :type="input.type || 'text'"
                :label="form.get(input.name).label"
                :error="form.get(input.name).error"
                v-model="form.get(input.name).value"
              ></base-input>
              <br class="my-2.5 block content-['']" />
            </template>
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

      <base-table :headers="tableStructure[tab]" :rows="data[`${props.tab}`]" />
    </div>
  </div>
</template>
