import { ref } from "vue";
import { defineStore } from "pinia";

import { useFetchApi } from "@/composables/useFetchApi";

export const useTeamStore = defineStore("team", () => {
  const { useFetch } = useFetchApi();

  const teamData = ref([]);

  function addTeam(payload) {
    teamData.value.push(payload);
  }

  async function getTeams() {
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

  return { teamData, addTeam, getTeams, postTeam };
});
