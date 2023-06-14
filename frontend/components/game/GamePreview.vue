<script setup>
import { h } from 'vue';
import GamePreviewInfo from '@/components/game/GamePreviewInfo.vue';
import GamePreviewLayout from '@/components/game/GamePreviewLayout.vue';

const props = defineProps({ game: Object, isLoading: Boolean });

const homeTeam = props.game.teams.find(
  (team) => team.id === props.game.homeTeamId,
);
const awayTeam = props.game.teams.find(
  (team) => team.id === props.game.awayTeamId,
);

const TeamLogo = (p) => h(
  'div',
  {
    class: 'text-center mb-2',
  },
  [
    h('img', {
      class: 'w-20 h-20 object-contain',
      src: p.src,
      alt: `${p.name} logo`,
    }),
    h('span', { class: 'text-xs text-gray-800 text-center' }, p.name),
  ],
);

const TeamScore = (p) => h(
  'span',
  {
    class: [
      'text-4xl font-bold',
      p.score > p.opponentScore ? 'text-green-700' : 'text-gray-800',
    ],
  },
  p.score,
);
</script>

<template>
  <game-preview-layout>
    <template #team-1>
        <team-logo :src="homeTeam.logoUrl" :name="homeTeam.name" />
        <team-score
          :score="game.homeTeamScore"
          :opponentScore="game.awayTeamScore"
          class="row-start-2"
        />
    </template>

    <template #game-preview-info>
      <game-preview-info
        :season="game.season"
        :date="game.date"
        :basketball-reference-url="game.basketballReferenceUrl"
      />
    </template>

    <template #team-2>
        <team-logo :src="awayTeam.logoUrl" :name="awayTeam.name" />
        <team-score
          :score="game.awayTeamScore"
          :opponentScore="game.homeTeamScore"
        />
    </template>

    <template #bottom>
      <p class="mb-4 text-sm leading-normal">
        {{ game.description }}
      </p>

      <div class="relative">
        <iframe
          class="w-full h-56"
          :src="game.gameUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </template>
  </game-preview-layout>
</template>
