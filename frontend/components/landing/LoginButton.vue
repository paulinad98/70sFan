<template>
  <div class="flex items-center lg:order-2">
    <a
      :href="url"
      class="text-white bg-purple-700 hover:bg-gray-500 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
    >
      Sign with Pareon
    </a>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export default {
  setup() {
    const runtimeConfig = useRuntimeConfig();

    const clientId = runtimeConfig.public.patreonClientId;
    const redirectUri = runtimeConfig.public.patreonRedirectUri;

    const url = ref(
      `https://patreon.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`,
    );

    return { url };
  },
};
</script>
