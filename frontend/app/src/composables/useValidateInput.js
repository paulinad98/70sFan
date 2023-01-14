import { computed, ref } from "vue";

export function useValidateInput() {
  const value = ref(null);

  const reset = () => {
    value.value = null;
  };

  const error = computed(() => {
    if (value.value === null) {
      return "";
    }

    if (value.value.length === 0) {
      return "Value is required";
    }

    return "";
  });

  return { error, value, reset };
}
