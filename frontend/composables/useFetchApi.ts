import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useCheckError } from '@/composables/useCheckError';
import { setQuery } from '@/utils/query';

interface FetchConfig {
  method?: string;
  payload?: {
    [key: string]: string | string[];
  };
  endpoint?: string;
}

export function useFetchApi() {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  const storeUser = useUserStore();
  const router = useRouter();

  const useFetch = async ({ method = 'GET', payload = {}, endpoint = '' }: FetchConfig) => {
    const body = method !== 'GET' && JSON.stringify(payload);
    let finalEndpoint = endpoint;

    if (method === 'GET' && Object.keys(payload).length > 0) {
      finalEndpoint = `${endpoint}?${setQuery(payload)}`;
    }

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors' as RequestMode,
      credentials: 'include' as RequestCredentials,
    };

    const token: string | null = storeUser.getToken();

    if (token) {
      Object.assign(options.headers, { 'x-auth-token': token });
    }

    if (body) {
      Object.assign(options, { body });
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
