import { computed, ref } from "vue";

function required(value) {
  if (value.length === 0) {
    return "Value is required";
  }
}

const validatorsObject = {
  required,
};

export function useValidateInput() {
  const value = ref(null);
  const validators = ref([]);

  const reset = () => {
    value.value = null;
  };

  const validate = () => {
    let error = "";

    validators.value.every((validator) => {
      if (value.value === null) {
        value.value = "";
      }

      error = validatorsObject[validator](value.value);

      if (error) {
        return false;
      }

      return true;
    });

    return error;
  };

  const addValidator = (validator) => {
    validators.value = [...validator];
  };

  const error = computed(() => {
    if (value.value === null) {
      return "";
    }

    const msg = validate();

    return msg || "";
  });

  return { error, value, reset, addValidator, validate };
}
