<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

import PanelLayout from "@/components/panel/PanelLayout.vue";

import { useSetForm } from "@/composables/useSetForm";

import { useTeamStore } from "@/stores/team";
import { useGameStore } from "@/stores/game";
import { useQuery } from "vue-query";

const storeTeam = useTeamStore();
const storeGame = useGameStore();

const { isLoading } = useQuery("games", storeGame.getGames);

const { form: gameForm, setupInput, resetForm, validateForm } = useSetForm();

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
    select: true,
  },
  {
    name: "awayTeamId",
    label: "awayTeamId",
    validators: [],
    select: true,
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

inputs.forEach(({ name, label, validators }) => {
  setupInput({
    name,
    label,
    map: gameForm,
    validators,
  });
});

const sendForm = async () => {
  const isError = validateForm();
  if (isError) {
    return;
  }

  const payload = {};

  inputs.forEach((input) => {
    payload[input.name] = gameForm.value.get(input.name).value;
  });

  await storeGame.postGame(payload);

  resetForm();
};
</script>

<template>
  <panel-layout tab="game">
    <template #modal>
      <base-form @submit="sendForm()">
        <template :key="`input-${input.name}`" v-for="input in inputs">
          <base-select
            v-if="input.select"
            :label="gameForm.get(input.name).label"
            :error="gameForm.get(input.name).error"
            v-model="gameForm.get(input.name).value"
            :options="storeTeam.teamOptions"
          />
          <base-input
            v-else
            :type="input.type || 'text'"
            :label="gameForm.get(`${input.name}`).label"
            :error="gameForm.get(`${input.name}`).error"
            v-model="gameForm.get(`${input.name}`).value"
          />
          <br class="my-2.5 block content-['']" />
        </template>
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
        :rows="storeGame.gameData"
        :isLoading="isLoading"
      ></base-table>
    </template>
  </panel-layout>
</template>
