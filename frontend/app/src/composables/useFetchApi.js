const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export function useFetchApi() {
  function setQuery(payload) {
    const query = Object.keys(payload)
      .map((key) => {
        if (Array.isArray(payload[key])) {
          return payload[key].map((value) => `${key}[]=${value}`).join("&");
        } else {
          return `${key}=${payload[key]}`;
        }
      })
      .join("&");

    return query;
  }

  const useFetch = async ({ method = "GET", payload = {}, endpoint = "" }) => {
    const body = method !== "GET" && JSON.stringify(payload);

    if (method === "GET" && Object.keys(payload).length > 0) {
      endpoint = `${endpoint}?${setQuery(payload)}`;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": API_TOKEN,
      },
      mode: "cors",
    };

    if (body) {
      options.body = body;
    }

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, options);
      const data = await response.json();

      return { data };
    } catch (error) {
      return { error };
    }
  };

  return { useFetch, setQuery };
}
