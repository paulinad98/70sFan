<script setup>
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import { useTeamStore } from "@/stores/team";
import { useQuery } from "vue-query";
import { useFetchApi } from "@/composables/useFetchApi";

import { useSetForm } from "@/composables/useSetForm";

const { useFetch, setQuery } = useFetchApi();

const storeTeam = useTeamStore();
useQuery("teams", storeTeam.getTeams);

const {
  form: searchForm,
  setupInput,
  resetForm,
  validateForm,
  getPayloadFrom,
} = useSetForm();

const inputs = [
  {
    name: "season",
    label: "Season",
    validators: [],
  },
  {
    name: "homeTeamId",
    label: "homeTeamId",
    validators: [],
    select: true,
  },
  {
    name: "awayTeamId",
    label: "awayTeamId",
    validators: [],
    select: true,
  },
];

inputs.forEach(({ name, label, validators }) => {
  setupInput({
    name,
    label,
    map: searchForm,
    validators,
  });
});

const sendForm = async () => {
  const isError = validateForm();
  if (isError) {
    return;
  }

  const payload = getPayloadFrom();

  const query = setQuery(payload);

  const { data } = await useFetch({
    method: "GET",
    endpoint: `game?${query}`,
  });

  console.log(data);

  resetForm();
};
</script>

<template>
  <div>
    <div class="h-screen">
      <base-form @submit="sendForm()">
        <template :key="`input-${input.name}`" v-for="input in inputs">
          <base-select
            v-if="input.select"
            :label="searchForm.get(input.name).label"
            :error="searchForm.get(input.name).error"
            v-model="searchForm.get(input.name).value"
            :options="storeTeam.teamOptions"
          />
          <base-input
            v-else
            :type="input.type || 'text'"
            :label="searchForm.get(`${input.name}`).label"
            :error="searchForm.get(`${input.name}`).error"
            v-model="searchForm.get(`${input.name}`).value"
          />
          <br class="my-2.5 block content-['']" />
        </template>
      </base-form>
    </div>
  </div>
</template>
