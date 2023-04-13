import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    id: null,
    fullName: "",
    token: null,
  });

  function setUser({ id, full_name }) {
    user.value = { id, fullName: full_name };
  }

  function setUserToken(token) {
    user.value.token = token;
  }

  function getToken() {
    if (!user.value.token) {
      return "";
    }

    return user.value.token;
  }

  function getTokenFromLS() {
    const token = localStorage.getItem("token");
    if (!token) return;

    setUserToken(token);
  }

  return { user, setUser, setUserToken, getToken, getTokenFromLS };
});
