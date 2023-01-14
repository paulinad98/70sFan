import { ref } from "vue";

import { useValidateInput } from "@/composables/useValidateInput";

export function useSetForm() {
  const form = ref(new Map());

  const setupInput = ({ name, label, map }) => {
    const { error, value, reset } = useValidateInput();

    map.value.set(name, { label, error, value, reset });
  };

  const resetForm = () => {
    form.value.forEach((input) => {
      input.reset();
    });
  };

  return { form, setupInput, resetForm };
}
