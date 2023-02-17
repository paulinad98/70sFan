<script setup>
import { defineProps } from "vue";

const props = defineProps({ game: Object });

const homeTeam = props.game.teams.find(
  (team) => team.id === props.game.homeTeamId
);
const awayTeam = props.game.teams.find(
  (team) => team.id === props.game.awayTeamId
);
</script>

<template>
  <div class="max-w-md p-5 border-2 border-gray-700 rounded-md shadow-lg">
    <div
      class="grid grid-cols-[112px_auto_112px] grid-rows-[repeat(2,_auto)] justify-items-center items-center mb-5 mx-auto"
    >
      <img
        class="w-28 h-28 object-contain col-start-1"
        :src="homeTeam.logoUrl"
        :alt="`${homeTeam.name} logo`"
      />
      <span
        class="row-start-2 text-4xl font-bold"
        :class="
          game.homeTeamScore > game.awayTeamScore
            ? 'text-green-700'
            : 'text-gray-800'
        "
      >
        {{ game.homeTeamScore }}
      </span>
      <div class="row-start-1 row-end-3 text-center">
        <span
          class="text-xl font-medium tracking-wider text-gray-900 block mb-1"
        >
          {{ game.season }}
        </span>
        <time
          class="block text-xs font-light tracking-wide mb-3 uppercase"
          datetime="1998-10-12"
        >
          {{
            new Date(game.date).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </time>
        <a
          class="text-base font-medium text-blue-600 hover:underline"
          :href="game.basketballReferenceUrl"
        >
          Basketball Reference
        </a>
      </div>
      <img
        class="w-28 h-28 object-contain"
        :src="awayTeam.logoUrl"
        :alt="`${awayTeam.name} logo`"
      />
      <span
        class="text-4xl font-bold"
        :class="
          game.awayTeamScore > game.homeTeamScore
            ? 'text-green-700'
            : 'text-gray-800'
        "
      >
        {{ game.awayTeamScore }}
      </span>
    </div>
    <p class="mb-4 text-sm leading-normal">
      {{ game.description }}
    </p>
    <iframe
      width="408"
      height="245"
      :src="game.gameUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>
