<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import PanelLayout from "@/components/panel/PanelLayout.vue";

import { useSetForm } from "@/composables/useSetForm";
import { useTeamStore } from "@/stores/team";

const { form: teamForm, setupInput, resetForm, validateForm } = useSetForm();

const storeTeam = useTeamStore();

const inputs = [
  {
    name: "teamName",
    label: "Name",
    validators: ["required"],
  },
  {
    name: "teamLogoUrl",
    label: "Logo url",
    validators: ["required"],
  },
];

inputs.forEach(({ name, label, validators }) => {
  setupInput({
    name,
    label,
    map: teamForm,
    validators,
  });
});

const sendForm = async () => {
  const isError = validateForm();
  if (isError) {
    return;
  }
  const name = teamForm.value.get("teamName").value;
  const logoUrl = teamForm.value.get("teamLogoUrl").value;

  storeTeam.postTeam({ name, logoUrl });

  resetForm();
};
</script>

<template>
  <panel-layout tab="team">
    <template #modal>
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
    <template #table>
      <base-table
        :headers="['ID', 'NAME', 'URL']"
        :rows="storeTeam.teamData"
      ></base-table>
    </template>
  </panel-layout>
</template>
