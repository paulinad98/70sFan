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

export function usePanelData() {
  const { useFetch } = useFetchApi();

  const data = ref({ team: [], game: [] });
  const panelForms = ref({
    team: { data: teamDataForm },
    game: { data: gameDataForm, add: addGame },
  });

  function addGame(game) {
    const { awayTeamId, homeTeamId } = game;

    const awayTeamName = game.teams.find((team) => team.id === awayTeamId).name;

    const homeTeamName = game.teams.find((team) => team.id === homeTeamId).name;

    data.value["game"].push([
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
  }
  const requests = [setTeamData, setGameData];

  const setOptionsTeams = () => {
    const options = data.value.team.map(([value, label]) => {
      return { value, label };
    });

    panelForms.value.game.data[2] = {
      ...panelForms.value.game.data[2],
      options,
      component: "BaseSelect",
    };

    panelForms.value.game.data[3] = {
      ...panelForms.value.game.data[3],
      options,
      component: "BaseSelect",
    };
  };

  async function setTeamData() {
    const { data: teams } = await useFetch({ method: "GET", endpoint: "team" });

    teams.forEach(({ id, name, logoUrl }) => {
      data.value["team"].push([id, name, logoUrl]);
    });

    setOptionsTeams();
  }

  async function setGameData() {
    const { data: games } = await useFetch({ method: "GET", endpoint: "game" });

    games.forEach((game) => {
      addGame(game);
    });
  }

  return { data, requests, panelForms };
}
