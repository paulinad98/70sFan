import { ref } from "vue";
import { useFetchApi } from "@/composables/useFetchApi";

export const tableStructure = {
  team: ["id", "name", "url"],
  game: [
    "id",
    "home team",
    "away team",
    "home score",
    "away score",
    "season",
    "game",
    "basketball reference",
    "description",
  ],
};

export function usePanelData() {
  const { useFetch } = useFetchApi();

  const data = ref({ team: [], game: [] });

  const requests = [setTeamData, setGameData];

  async function setTeamData() {
    const { data: teams } = await useFetch({ method: "GET", endpoint: "team" });

    teams.forEach(({ id, name, logoUrl }) => {
      data.value["team"].push([id, name, logoUrl]);
    });
  }

  async function setGameData() {
    const { data: games } = await useFetch({ method: "GET", endpoint: "game" });

    games.forEach((game) => {
      const { awayTeamId, homeTeamId } = game;

      const awayTeamName = game.teams.find(
        (team) => team.id === awayTeamId
      ).name;
      const homeTeamName = game.teams.find(
        (team) => team.id === homeTeamId
      ).name;

      data.value["game"].push([
        game.id,
        game.homeTeamScore,
        homeTeamName,
        game.awayTeamScore,
        awayTeamName,
        game.season,
        game.gameUrl,
        game.basketballReferenceUrl,
        game.description,
      ]);
    });
  }

  return { data, requests };
}

const teamDataForm = [
  {
    name: "name",
    label: "Name",
    validators: ["required"],
  },
  {
    name: "logoUrl",
    label: "Logo url",
    validators: ["required"],
  },
];

const gameDataForm = [
  {
    name: "gameDate",
    label: "Date",
    validators: ["required"],
  },
  {
    name: "gameSeason",
    label: "Season",
    validators: ["required"],
  },
  {
    name: "homeTeamId",
    label: "homeTeamId",
    validators: ["required"],
  },
  {
    name: "awayTeamId",
    label: "awayTeamId",
    validators: ["required"],
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

export const panelForms = {
  team: teamDataForm,
  game: gameDataForm,
};
