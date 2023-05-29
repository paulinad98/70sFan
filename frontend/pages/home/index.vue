<script setup>
import { ref } from 'vue';
import BasePagination from '@/components/base/BasePagination.vue';

import GamePreview from '@/components/game/GamePreview.vue';
import GameSearch from '@/components/game/GameSearch.vue';

import { useTeamStore } from '@/stores/team.js';
import { useSeasonStore } from '@/stores/season.js';

const storeSeason = useSeasonStore();
const storeTeam = useTeamStore();

storeTeam.getTeams();
storeSeason.getSeasons();

const games = ref({
  data: [],
  meta: {},
  currentPage: 1,
});

const searchForm = ref(null);
</script>

<template>
  <div class="grid grid-cols-[250px_auto] gap-14">
    <game-search ref="searchForm" v-model="games" />

    <main>
      <div
        class="grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-10"
      >
        <game-preview :key="game.id" v-for="game in games.data" :game="game" />
      </div>
      <base-pagination
        class="text-center mt-8"
        @change="searchForm.sendForm()"
        v-if="games.meta.lastPage"
        v-model="games.currentPage"
        :lastPage="games.meta.lastPage"
      />
    </main>
  </div>
</template>
