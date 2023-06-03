<template>
  <header class="bg-primary-50 py-11">
    <div
      class="grid lg:grid-cols-12 max-w-screen-2xl
      px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16  lg:pt-28"
    >
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="max-w-2xl mb-6
          text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white"
        >
          Basketball history
        </h1>
        <p
          class="max-w-2xl mb-8
          font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl leading-relaxed"
        >
          I am running the channel on YouTube about basketball history. My main
          work is about collecting rare, unseen NBA footage from late 1950s to
          late 1980s. I am also creating long video breakdowns of some forgotten
          NBA legends from that period. If you are also basketball fan, help me
          purchasing footage from archives and private collectors.
        </p>
        <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <a
            href="https://www.youtube.com/channel/UCQ-frNSTRgnLPgm9JWaL6Vw"
            class="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3
            text-sm font-medium text-center text-white border
             border-purple-700 rounded-lg  hover:bg-purple-700 focus:ring-4 focus:ring-gray-100"
          >
            <youtube class="w-4 h-4 mr-2" />

            View on YouTube
          </a>
          <a
            href="https://www.patreon.com/70sFan"
            class="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 mb-2 mr-2
            text-sm font-medium text-white
            bg-purple-700 rounded-lg focus:outline-none hover:bg-gray-500
            focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            <patreon class="w-4 h-4 mr-2" />

            View on Patreon
          </a>
        </div>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex lg:justify-end">
        <img
          class="rounded-xl"
          src="~/assets/img/header-img.jpg"
          alt="hero image"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import Youtube from '@/components/icons/Youtube.vue';
import Patreon from '@/components/icons/Patreon.vue';
</script>
