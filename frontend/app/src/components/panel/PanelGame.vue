<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseForm from "@/components/base/BaseForm.vue";

import PanelLayout from "@/components/panel/PanelLayout.vue";

import { onMounted, ref } from "vue";

import { useSetForm } from "@/composables/useSetForm";
import { useFetchApi } from "@/composables/useFetchApi";

const { form: gameForm, setupInput, resetForm, validateForm } = useSetForm();
const { useFetch } = useFetchApi();

const inputs = [
  {
    name: "date",
    label: "Date",
    type: "date",
    validators: ["required"],
  },
  {
    name: "season",
    label: "Season",
    validators: ["required"],
  },
  {
    name: "homeTeamId",
    label: "homeTeamId",
    validators: [],
  },
  {
    name: "awayTeamId",
    label: "awayTeamId",
    validators: [],
  },
  {
    name: "homeTeamScore",
    label: "homeTeamScore",
    validators: ["required"],
  },
  {
    name: "awayTeamScore",
    label: "awayTeamScore",
    validators: ["required"],
  },
  {
    name: "gameUrl",
    label: "gameUrl",
    validators: ["required"],
  },
  {
    name: "basketballReferenceUrl",
    label: "basketballReferenceUrl",
    validators: ["required"],
  },
  {
    name: "description",
    label: "description",
    validators: [],
  },
];

const gameData = ref([]);

inputs.forEach(({ name, label, validators }) => {
  setupInput({
    name,
    label,
    map: gameForm,
    validators,
  });
});

onMounted(async () => {
  const { data } = await useFetch({
    method: "GET",
    endpoint: "game",
  });
  data.forEach((game) => {
    gameData.value.push([
      game.id,
      game.homeTeamScore,
      game.awayTeamScore,
      game.season,
      game.gameUrl,
      game.basketballReferenceUrl,
      game.description,
    ]);
  });
});

const sendForm = async () => {
  const isError = validateForm();
  if (isError) {
    return;
  }
  const name = gameForm.value.get("gameName").value;
  const logoUrl = gameForm.value.get("gameLogoUrl").value;

  await useFetch({
    method: "POST",
    endpoint: "game",
    payload: { name, logoUrl },
  });
  resetForm();
};
</script>

<template>
  <panel-layout>
    <template #modal>
      <base-form @submit="sendForm()">
        <base-input
          :key="`input-${input.name}`"
          v-for="input in inputs"
          :type="input.type || 'text'"
          :label="gameForm.get(`${input.name}`).label"
          :error="gameForm.get(`${input.name}`).error"
          v-model="gameForm.get(`${input.name}`).value"
        ></base-input>
        <br class="my-2.5 block content-['']" />
      </base-form>
    </template>
    <template #table>
      <base-table
        :headers="[
          'id',
          'home team',
          'away team',
          'home score',
          'away score',
          'season',
          'game',
          'basketball reference',
          'description',
        ]"
        :rows="gameData"
      ></base-table>
    </template>
  </panel-layout>
</template>
