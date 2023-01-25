<script setup>
import PanelTeam from "@/components/panel/PanelTeam.vue";
import PanelGame from "@/components/panel/PanelGame.vue";

import { defineProps } from "vue";

defineProps({ tab: { type: String, default: "team" } });

const components = {
  team: PanelTeam,
  game: PanelGame,
};
</script>

<template>
  <component :is="components[tab]"></component>
</template>
