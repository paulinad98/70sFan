const API_URL = import.meta.env.VITE_API_URL;

export function useFetchApi() {
  const getData = async ({ method = "GET", payload = {}, endpoint = "" }) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYzZDM0Zjk5LTQwYWItNGMzMC1iYjAwLTA4ZGU4ZGJkODMxYiIsImZ1bGxfbmFtZSI6IlBhdWxpbmEgRCIsImlhdCI6MTY3MjY5Mjk5MywiZXhwIjoxNjczODE2MTkzfQ.BBP2EzpfiRkDheum-3oB9HZy4fVg6bymdmHrodCnIPY",
        },
        mode: "cors",
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      return { data };
    } catch (error) {
      return { error };
    }
  };

  return { getData };
}
