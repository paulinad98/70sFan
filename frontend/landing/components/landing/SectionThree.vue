<template>
  <section class="bg-primary-50">
    <div
      class="items-center max-w-screen-xl px-4 py-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6"
    >
      <div class="flex flex-col items-center">
        <breakdowns class="w-10 h-10 mb-2 md:w-12 md:h-12 text-gray-200" />
        <h3 class="mb-2 text-2xl font-bold text-white">99.99%</h3>
        <p class="font-light text-gray-300">NBA Legends Breakdowns</p>
      </div>
      <div class="flex flex-col items-center">
        <svg
          class="w-10 h-10 mb-2 md:w-12 md:h-12 text-gray-200"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
          ></path>
        </svg>
        <h3 class="mb-2 text-2xl font-bold text-white">92</h3>
        <p class="font-light text-gray-300">Patreon Subscribers</p>
      </div>
      <div class="flex flex-col items-center">
        <games class="w-10 h-10 mb-2 md:w-12 md:h-12 text-gray-200" />
        <h3 class="mb-2 text-2xl font-bold text-white">100+</h3>
        <p class="font-light text-gray-300">Rare Classic Games</p>
      </div>
    </div>
  </section>
</template>

<script>
import Breakdowns from "@/components/icons/Breakdowns.vue";
import Games from "@/components/icons/Games.vue";

export default {
  components: {
    Breakdowns,
    Games,
  },
};
</script>
