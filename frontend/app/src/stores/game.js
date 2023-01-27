import { ref } from "vue";
import { defineStore } from "pinia";

import { useFetchApi } from "@/composables/useFetchApi";

export const useGameStore = defineStore("game", () => {
  const { useFetch } = useFetchApi();

  const gameData = ref([]);

  function addGame(payload) {
    gameData.value.push(payload);
  }

  async function getGames() {
    const { data } = await useFetch({
      method: "GET",
      endpoint: "game",
    });

    data.forEach((game) => {
      addGame([
        game.id,
        game.homeTeamId,
        game.awayTeamId,
        game.homeTeamScore,
        game.awayTeamScore,
        game.season,
        game.gameUrl,
        game.basketballReferenceUrl,
        game.description,
      ]);
    });
  }

  async function postGame({
    date,
    season,
    homeTeamScore,
    awayTeamScore,
    homeTeamId,
    awayTeamId,
    gameUrl,
    basketballReferenceUrl,
    description,
  }) {
    const {
      data: { id },
    } = await useFetch({
      method: "POST",
      endpoint: "game",
      payload: {
        date,
        season,
        homeTeamScore,
        awayTeamScore,
        homeTeamId,
        awayTeamId,
        gameUrl,
        basketballReferenceUrl,
        description,
      },
    });

    addGame([
      id,
      homeTeamId,
      awayTeamId,
      homeTeamScore,
      awayTeamScore,
      season,
      gameUrl,
      basketballReferenceUrl,
      description,
    ]);
  }

  return { gameData, addGame, getGames, postGame };
});
