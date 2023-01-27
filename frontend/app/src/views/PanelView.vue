<script setup>
import PanelTeam from "@/components/panel/PanelTeam.vue";
import PanelGame from "@/components/panel/PanelGame.vue";

import { useTeamStore } from "@/stores/team";
import { useGameStore } from "@/stores/game";

import { defineProps, onMounted } from "vue";

const storeTeam = useTeamStore();
const storeGame = useGameStore();

defineProps(["tab"]);

const components = {
  team: PanelTeam,
  game: PanelGame,
};

onMounted(() => {
  Promise.all([storeTeam.getTeams(), storeGame.getGames()]);
});
</script>

<template>
  <component :is="components[tab]"></component>
</template>
