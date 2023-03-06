<script setup>
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BasePagination from "@/components/base/BasePagination.vue";

import GamePreview from "@/components/home/GamePreview.vue";

import { ref, onMounted } from "vue";

import { useTeamStore } from "@/stores/team";
import { useQuery } from "vue-query";
import { useFetchApi } from "@/composables/useFetchApi";
import { useSetForm } from "@/composables/useSetForm";
import { useSeasonStore } from "@/stores/season";

const { useFetch, setQuery } = useFetchApi();

const storeSeason = useSeasonStore();
const storeTeam = useTeamStore();

const stores = {
  season: storeSeason,
  team: storeTeam,
};

useQuery("teams", storeTeam.getTeams);
useQuery("seasons", storeSeason.getSeasons);

const games = ref([]);
const currentPage = ref(1);
const meta = ref({});
onMounted(() => {
  sendForm();
});

const {
  form: searchForm,
  setupInput,
  validateForm,
  getPayloadFrom,
} = useSetForm();

const inputs = [
  {
    name: "season",
    label: "Season",
    select: true,
    store: "season",
  },
  {
    name: "homeTeamId",
    label: "Home team",
    validators: [],
    select: true,
    store: "team",
  },
  {
    name: "awayTeamId",
    label: "Away team",
    validators: [],
    select: true,
    store: "team",
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

  const query = setQuery({ ...payload, page: currentPage.value });

  const { data } = await useFetch({
    method: "GET",
    endpoint: `game?${query}`,
  });

  games.value = data.games;
  meta.value = data.meta;
};

function getInput(input) {
  return searchForm.value.get(input.name);
}
</script>

<template>
  <div class="grid grid-cols-[250px_auto] gap-14">
    <base-form @submit="sendForm()">
      <template :key="`input-${input.name}`" v-for="input in inputs">
        <base-select
          :label="getInput(input).label"
          :error="getInput(input).error"
          v-model="getInput(input).value"
          :options="stores[input.store][`${input.store}Options`]"
        />
        <br class="my-2.5 block content-['']" />
      </template>
    </base-form>

    <main>
      <div
        class="grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-10"
      >
        <game-preview :key="game.id" v-for="game in games" :game="game" />
      </div>
      <base-pagination
        class="text-center mt-8"
        @change="sendForm()"
        v-if="meta.lastPage"
        v-model="currentPage"
        :lastPage="meta.lastPage"
      />
    </main>
  </div>
</template>
