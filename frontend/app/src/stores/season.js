import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { useFetchApi } from "@/composables/useFetchApi";

export const useSeasonStore = defineStore("season", () => {
  const { useFetch } = useFetchApi();

  const seasonData = ref([]);

  const seasonOptions = computed(() => {
    return seasonData.value.map(([id, years]) => ({ value: id, label: years }));
  });

  function addSeason(payload) {
    seasonData.value.push(payload);
  }

  async function getSeasons() {
    if (seasonData.value.length > 0) return Promise.resolve();

    const { data } = await useFetch({
      method: "GET",
      endpoint: "season",
    });

    data.forEach(({ id, years }) => {
      addSeason([id, years]);
    });
  }

  async function postSeason({ years }) {
    const {
      data: { id },
    } = await useFetch({
      method: "POST",
      endpoint: "season",
      payload: { years },
    });

    addSeason([id, years]);
  }

  return { seasonData, seasonOptions, addSeason, getSeasons, postSeason };
});
