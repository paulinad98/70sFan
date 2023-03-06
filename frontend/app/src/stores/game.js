import { ref } from "vue";
import { defineStore } from "pinia";

import { useTeamStore } from "@/stores/team";
import { useFetchApi } from "@/composables/useFetchApi";

export const useGameStore = defineStore("game", () => {
  const { useFetch } = useFetchApi();
  const storeTeam = useTeamStore();

  const gameData = ref([]);

  function addGame(payload) {
    gameData.value.push(payload);
  }

  async function getGames() {
    const response = await useFetch({
      method: "GET",
      endpoint: "game",
    });

    response.data.games.forEach((game) => {
      const homeTeamName = game.teams.find(
        (team) => team.id === game.homeTeamId
      ).name;
      const awayTeamName = game.teams.find(
        (team) => team.id === game.awayTeamId
      ).name;

      addGame([
        game.id,
        homeTeamName,
        awayTeamName,
        game.homeTeamScore,
        game.awayTeamScore,
        game.season,
        game.gameUrl,
        game.basketballReferenceUrl,
        game.description,
      ]);
    });
  }

  async function postGame(game) {
    const {
      data: { id },
    } = await useFetch({
      method: "POST",
      endpoint: "game",
      payload: { ...game },
    });

    const homeTeamName = storeTeam.teamData.find(
      (team) => Number(team[0]) === Number(game.homeTeamId)
    )[1];
    const awayTeamName = storeTeam.teamData.find(
      (team) => Number(team[0]) === Number(game.awayTeamId)
    )[1];

    addGame([
      id,
      homeTeamName,
      awayTeamName,
      game.homeTeamScore,
      game.awayTeamScore,
      game.season,
      game.gameUrl,
      game.basketballReferenceUrl,
      game.description,
    ]);
  }

  return { gameData, addGame, getGames, postGame };
});
