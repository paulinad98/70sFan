import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useFetchApi } from '@/composables/useFetchApi';
import { useUserStore } from '@/stores/user';

export function useAuth() {
  const route = useRoute();
  const router = useRouter();

  const { useFetch } = useFetchApi();
  const storeUser = useUserStore();

  const error = ref('customError');
  const isLoading = ref(true);

  onMounted(async () => {
    handleQueryError();
    setToken();

    await handleAuth();

    isLoading.value = false;
  });

  function handleQueryError() {
    if (isError()) return;

    const queryError = route.query.error?.toString();
    if (!queryError) return;

    error.value = queryError;
  }

  function setToken() {
    if (isError()) return;

    const { token } = route.query;
    if (!token) {
      error.value = 'authError';
      return;
    }

    storeUser.setUserToken(token);
  }

  async function handleAuth() {
    if (isError()) return;

    const response = await useFetch({
      method: 'GET',
      endpoint: 'oauth/user',
    });

    const isResponseOk = response?.status && response?.data?.ok;

    if (!isResponseOk) {
      throw new Error('Error in auth');
    }

    await handleAuthResponse(response);
  }

  async function handleAuthResponse(response: { data: { ok: boolean }; status: number }) {
    if (response.data.ok) {
      await autorizeUser();
      return;
    }

    if (response.status === 401) {
      error.value = 'authError';
    }
  }

  async function autorizeUser() {
    const token = route.query.token?.toString();

    if (!token) {
      throw new Error('Error in auth');
    }

    localStorage.setItem('token', token);
    await router.push({ name: 'home' });
  }

  function isError(): boolean {
    return error.value !== 'customError';
  }

  return { error, isLoading };
}
