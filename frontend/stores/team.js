import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { useFetchApi } from "@/composables/useFetchApi";

export const useTeamStore = defineStore("team", () => {
  const { useFetch } = useFetchApi();

  const teamData = ref([]);

  const options = computed(() => {
    return teamData.value.map(([id, name]) => ({ value: id, label: name }));
  });

  function addTeam(payload) {
    teamData.value.push(payload);
  }

  async function getTeams() {
    if (teamData.value.length > 0) return Promise.resolve();

    const { data } = await useFetch({
      method: "GET",
      endpoint: "team",
    });

    data.forEach(({ id, name, logoUrl }) => {
      addTeam([id, name, logoUrl]);
    });
  }

  async function postTeam({ name, logoUrl }) {
    const {
      data: { id },
    } = await useFetch({
      method: "POST",
      endpoint: "team",
      payload: { name, logoUrl },
    });

    addTeam([id, name, logoUrl]);
  }

  return { teamData, options, addTeam, getTeams, postTeam };
});
