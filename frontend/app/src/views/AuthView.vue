<script setup>
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import ErrorLayout from "@/components/errors/ErrorLayout.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetchApi } from "@/composables/useFetchApi";

const route = useRoute();
const router = useRouter();
const { useFetch } = useFetchApi();

const PATREON_URL = import.meta.env.VITE_PATREON_URL;
const LANDING_URL = import.meta.env.VITE_LANDING_URL;

const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  if (route.query.error) {
    error.value = route.query.error;
    return;
  }

  if (!route.query.token) return;
  const response = await useFetch({
    method: "GET",
    endpoint: "oauth/user",
  });

  if (response.data.ok) {
    localStorage.setItem("token", route.query.token);
    router.push({ name: "home" });

    return;
  }

  if (response.status === 401) {
    error.value = "not_auth";
  }
});
</script>

<template>
  <base-spinner v-if="isLoading" />

  <error-layout
    v-else
    :redirect="error === 'not_auth' ? LANDING_URL : PATREON_URL"
  >
    <template #text>
      <span v-if="error === 'not_auth'">
        You are not authorized to access this page.
      </span>
      <span v-else> You dont't have active subscription. </span>
    </template>

    <template #button>
      {{ error === "not_auth" ? "Home" : "Subscribe" }}
    </template>
  </error-layout>
</template>
