<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BaseTable from "@/components/base/BaseTable.vue";

import { onMounted, ref } from "vue";

import { useHandleModal } from "@/composables/useHandleModal";
import { useSetForm } from "@/composables/useSetForm";
import { useFetchApi } from "@/composables/useFetchApi";

const { isActive, toggleModal } = useHandleModal();

const { form: teamForm, setupInput, resetForm, validateForm } = useSetForm();

setupInput({
  name: "teamName",
  label: "Name",
  map: teamForm,
  validators: ["required"],
});
setupInput({
  name: "teamLogoUrl",
  label: "Logo url",
  map: teamForm,
  validators: ["required"],
});

const teamData = ref([]);

onMounted(async () => {
  const { data } = await useFetch({
    method: "GET",
    endpoint: "team",
  });

  data.forEach(({ id, name, logoUrl }) => {
    teamData.value.push([id, name, logoUrl]);
  });
});

const { useFetch } = useFetchApi();

const sendForm = async () => {
  const isError = validateForm();

  if (isError) {
    return;
  }

  const name = teamForm.value.get("teamName").value;
  const logoUrl = teamForm.value.get("teamLogoUrl").value;

  await useFetch({
    method: "POST",
    endpoint: "team",
    payload: { name, logoUrl },
  });

  resetForm();
};
</script>

<template>
  <div class="grid grid-cols-[256px_1fr] gap-14 items-start overflow-x-hidden">
    <panel-sidebar />
    <div class="max-w-full overflow-x-hidden">
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

      <header class="flex items-center gap-7 mb-5">
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
      </header>

      <base-table :headers="['ID', 'NAME', 'URL']" :rows="teamData">
        <template #action>Edit</template>
      </base-table>
    </div>
  </div>
</template>
