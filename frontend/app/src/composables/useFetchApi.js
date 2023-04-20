import { useUserStore } from "@/stores/user";
import { useCheckError } from "@/composables/useCheckError";
import { useRouter } from "vue-router";
import { setQuery } from "@/utils/query";

const API_URL = import.meta.env.VITE_API_URL;
// const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export function useFetchApi() {
  const storeUser = useUserStore();
  const router = useRouter();

  const useFetch = async ({ method = "GET", payload = {}, endpoint = "" }) => {
    const body = method !== "GET" && JSON.stringify(payload);

    if (method === "GET" && Object.keys(payload).length > 0) {
      endpoint = `${endpoint}?${setQuery(payload)}`;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": storeUser.getToken(),
      },
      mode: "cors",
      credentials: "include",
    };

    if (body) {
      options.body = body;
    }

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, options);
      const statusCode = response.status;
      const data = await response.json();

      const { checkError } = useCheckError();
      const error = checkError(statusCode);

      if (error) {
        router.push({ name: "Error", params: { error } });
      }

      return { data, status: statusCode };
    } catch (error) {
      return { error };
    }
  };

  return { useFetch, setQuery };
}
