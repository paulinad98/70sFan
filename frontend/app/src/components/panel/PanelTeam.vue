<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import PanelLayout from "@/components/panel/PanelLayout.vue";

import { useSetForm } from "@/composables/useSetForm";
import { useTeamStore } from "@/stores/team";
import { useQuery } from "vue-query";

const storeTeam = useTeamStore();

const { isLoading } = useQuery("teams", storeTeam.getTeams);

const {
  form: teamForm,
  setupInput,
  resetForm,
  validateForm,
  getPayloadFrom,
} = useSetForm();

const inputs = [
  {
    name: "name",
    label: "Name",
    validators: ["required"],
  },
  {
    name: "logoUrl",
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

  const payload = getPayloadFrom();

  storeTeam.postTeam(payload);

  resetForm();
};
</script>

<template>
  <panel-layout tab="team">
    <template #modal>
      <base-form @submit="sendForm()">
        <base-input
          type="text"
          :label="teamForm.get('name').label"
          :error="teamForm.get('name').error"
          v-model="teamForm.get('name').value"
        ></base-input>
        <br class="my-2.5 block content-['']" />
        <base-input
          type="text"
          :label="teamForm.get('logoUrl').label"
          :error="teamForm.get('logoUrl').error"
          v-model="teamForm.get('logoUrl').value"
        ></base-input>
      </base-form>
    </template>
    <template #table>
      <base-table
        :headers="['ID', 'NAME', 'URL']"
        :rows="storeTeam.teamData"
        :isLoading="isLoading"
      ></base-table>
    </template>
  </panel-layout>
</template>
