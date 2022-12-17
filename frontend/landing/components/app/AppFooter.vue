<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="text-center">
        <div class="flex justify-center">
          <app-logo class="mb-5 h-6 sm:h-9" />
        </div>
        <span
          class="block text-sm text-center text-gray-500 dark:text-gray-400"
        >
          © 2023 All Rights Reserved
        </span>
        <ul class="flex justify-center mt-5 space-x-5">
          <li>
            <a href="https://www.patreon.com/70sFan">
              <youtube class="w-5 h-5" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCQ-frNSTRgnLPgm9JWaL6Vw">
              <patreon class="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import AppLogo from "@/components/app/AppLogo.vue";

import Youtube from "@/components/icons/Youtube.vue";
import Patreon from "@/components/icons/Patreon.vue";

export default {
  components: {
    AppLogo,

    Youtube,
    Patreon,
  },
};
</script>
