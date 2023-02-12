import { ref } from "vue";

import { useValidateInput } from "@/composables/useValidateInput";

export function useSetForm() {
  const form = ref(new Map());

  const setupInput = ({ name, label, map, validators = [] }) => {
    const { error, value, reset, addValidator, validate } = useValidateInput();

    addValidator(validators);

    map.value.set(name, { label, error, value, reset, validate });
  };

  const validateForm = () => {
    let isError = false;

    form.value.forEach((input) => {
      const error = input.validate();

      console.log(error);

      if (!isError && error) {
        isError = true;
      }
    });

    return isError;
  };

  const resetForm = () => {
    form.value.forEach((input) => {
      input.reset();
    });
  };

  const clearForm = () => {
    form.value.clear();
  };

  const getPayloadFrom = () => {
    const payload = {};

    form.value.forEach((input, key) => {
      if (input.value) {
        payload[key] = input.value;
      }
    });

    return payload;
  };

  return {
    form,
    setupInput,
    resetForm,
    validateForm,
    clearForm,
    getPayloadFrom,
  };
}
