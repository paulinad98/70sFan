import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useFetchApi } from "@/composables/useFetchApi";
import { useUserStore } from "@/stores/user";

export function useAuth() {
  const route = useRoute();
  const router = useRouter();

  const { useFetch } = useFetchApi();
  const storeUser = useUserStore();

  const error = ref("customError");
  const isLoading = ref(true);

  onMounted(() => {
    handleQueryError();
    setToken();
    handleAuth();

    isLoading.value = false;
  });

  function handleQueryError() {
    if (isError()) return;

    const queryError = route.query.error;
    if (!queryError) return;

    error.value = queryError;
  }

  function setToken() {
    if (isError()) return;

    const token = route.query.token;
    if (!token) {
      error.value = "authError";
      return;
    }

    storeUser.setUserToken(token);
  }

  async function handleAuth() {
    if (isError()) return;

    const response = await useFetch({
      method: "GET",
      endpoint: "oauth/user",
    });

    handleAuthResponse(response);
  }

  function handleAuthResponse(response) {
    if (response.data.ok) {
      autorizeUser();
      return;
    }

    if (response.status === 401) {
      error.value = "authError";
    }
  }

  function autorizeUser() {
    localStorage.setItem("token", route.query.token);
    router.push({ name: "home" });
  }

  function isError() {
    return error.value !== "customError";
  }

  return { error, isLoading };
}
