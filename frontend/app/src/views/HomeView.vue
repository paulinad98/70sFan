<script setup>
import BaseForm from "@/components/base/BaseForm.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import BaseMultiselect from "@/components/base/BaseMultiselect.vue";

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
    name: "seasonsId",
    label: "Seasons",
    store: storeSeason,
    mode: "tags",
  },
  {
    name: "teamsId",
    label: "Teams",
    store: storeTeam,
    mode: "tags",
  },
  {
    name: "seasonPhase",
    label: "Season Phase",
    store: {
      options: [
        { value: "RS", label: "Regular" },
        { value: "Playoffs", label: "Playoffs" },
      ],
    },
    mode: "single",
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
    <base-form @submit="sendForm()" autocomplete="off">
      <template :key="`input-${input.name}`" v-for="input in inputs">
        <base-multiselect
          v-model="getInput(input).value"
          :options="input.store.options"
          :label="getInput(input).label"
          :mode="input.mode"
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
