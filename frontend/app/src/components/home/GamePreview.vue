<script setup>
import { h } from "vue";
import GamePreviewInfo from "@/components/home/GamePreviewInfo.vue";

const props = defineProps({ game: Object });

const homeTeam = props.game.teams.find(
  (team) => team.id === props.game.homeTeamId
);
const awayTeam = props.game.teams.find(
  (team) => team.id === props.game.awayTeamId
);

const TeamLogo = (props) => {
  return h(
    "div",
    {
      class: "text-center mb-2",
    },
    [
      h("img", {
        class: "w-20 h-20 object-contain",
        src: props.src,
        alt: `${props.name} logo`,
      }),
      h("span", { class: "text-xs text-gray-800 text-center" }, props.name),
    ]
  );
};

const TeamScore = (props) => {
  return h(
    "span",
    {
      class: [
        "text-4xl font-bold",
        props.score > props.opponentScore ? "text-green-700" : "text-gray-800",
      ],
    },
    props.score
  );
};
</script>

<template>
  <div class="p-5 border-2 border-gray-700 bg-white rounded-md shadow-lg">
    <div
      class="grid grid-cols-[112px_auto_112px] grid-rows-[repeat(2,_auto)] justify-items-center items-center mb-5 mx-auto"
    >
      <team-logo :src="homeTeam.logoUrl" :name="homeTeam.name" />
      <team-score
        :score="game.homeTeamScore"
        :opponent-score="game.awayTeamScore"
        class="row-start-2"
      />

      <div class="row-start-1 row-end-3 text-center">
        <game-preview-info
          :season="game.season"
          :date="game.date"
          :basketball-reference-url="game.basketballReferenceUrl"
        />
      </div>

      <team-logo :src="awayTeam.logoUrl" :name="awayTeam.name" />
      <team-score
        :score="game.awayTeamScore"
        :opponent-score="game.homeTeamScore"
      />
    </div>

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
  </div>
</template>
