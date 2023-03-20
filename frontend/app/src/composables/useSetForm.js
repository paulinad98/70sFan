import { ref } from "vue";

import { useValidateInput } from "@/composables/useValidateInput";

export function useSetForm() {
  const form = ref(new Map());

  const setupInputs = (inputs) => {
    inputs.forEach(({ name, label, validators = [] }) => {
      const { error, value, reset, addValidator, validate } =
        useValidateInput();

      addValidator(validators);

      form.value.set(name, { label, error, value, reset, validate });
    });
  };

  const validateForm = () => {
    let isError = false;

    form.value.forEach((input) => {
      const error = input.validate();

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
    setupInputs,
    resetForm,
    validateForm,
    clearForm,
    getPayloadFrom,
  };
}
