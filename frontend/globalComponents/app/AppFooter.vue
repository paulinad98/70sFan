<template>
  <footer>
    <div class="max-w-screen-xl p-4 py-6 mx-auto md:p-8 lg:p-10">
      <hr class="my-6 border-gray-700 sm:mx-auto lg:my-8" />
      <div class="text-center">
        <div class="flex justify-center">
          <app-logo class="mb-5 h-6 sm:h-9 fill-black" />
        </div>
        <span class="block text-sm text-center text-gray-700">
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
import AppLogo from "./AppLogo.vue";

import Youtube from "../icons/Youtube.vue";
import Patreon from "../icons/Patreon.vue";

export default {
  components: {
    AppLogo,

    Youtube,
    Patreon,
  },
};
</script>
