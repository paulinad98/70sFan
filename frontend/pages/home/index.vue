<script setup>
import { ref, computed } from 'vue';
import BasePagination from '@/components/base/BasePagination.vue';

import GamePreview from '@/components/game/GamePreview.vue';
import GameSearch from '@/components/game/GameSearch.vue';
import GamePreviewSkeleton from '@/components/game/GamePreviewSkeleton.vue';

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
  isLoading: true,
});

const searchForm = ref(null);

const gameComponent = computed(() => {
  if (games.value.isLoading) {
    return {
      component: GamePreviewSkeleton,
      data: Array.from({ length: 6 }, (_, index) => index).map((index) => ({
        attrs: {},
        id: index,
      })),
    };
  }

  return {
    component: GamePreview,
    data: games.value.data.map((game) => ({ id: game.id, attrs: { game } })),
  };
});

</script>

<template>
  <div class="grid grid-cols-[250px_auto] gap-14">
    <game-search ref="searchForm" v-model="games" />

    <main>
      <div
        class="grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-10"
      >
        <component :is="gameComponent.component" :key="element.id" v-for="element in gameComponent.data" v-bind="element.attrs" />
      </div>
      <base-pagination
        class="text-center mt-8"
        @change="searchForm.sendForm(games.currentPage)"
        v-if="games.meta.lastPage"
        v-model="games.currentPage"
        :lastPage="games.meta.lastPage"
      />
    </main>
  </div>
</template>
