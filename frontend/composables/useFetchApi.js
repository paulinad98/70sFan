import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useCheckError } from '@/composables/useCheckError';
import { setQuery } from '@/utils/query';

export function useFetchApi() {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  const storeUser = useUserStore();
  const router = useRouter();

  const useFetch = async ({ method = 'GET', payload = {}, endpoint = '' }) => {
    const body = method !== 'GET' && JSON.stringify(payload);
    let finalEndpoint = endpoint;

    if (method === 'GET' && Object.keys(payload).length > 0) {
      finalEndpoint = `${endpoint}?${setQuery(payload)}`;
    }

    const token = storeUser.getToken();
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      mode: 'cors',
      credentials: 'include',
    };

    if (body) {
      options.body = body;
    }

    try {
      const response = await fetch(`${API_URL}/${finalEndpoint}`, options);
      const statusCode = response.status;
      const data = await response.json();

      const { checkError } = useCheckError();
      const error = checkError(statusCode);

      if (error) {
        router.push({ name: 'Error', params: { error } });
      }

      return { data, status: statusCode };
    } catch (error) {
      return { error };
    }
  };

  return { useFetch, setQuery };
}
