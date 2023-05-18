import { defineAsyncComponent } from "vue";

import capitalize from "@/utils/capitalize";

export function useErrorComponents() {
  const ERROR_TYPES = ["authError", "paidError", "customError"];
  const ERROR_COMPONENTS = {};

  ERROR_TYPES.forEach((error) => {
    const capitalizedError = capitalize(error);
    const componentPath = `../components/error/typed-errors/${capitalizedError}.vue`;

    ERROR_COMPONENTS[error] = defineAsyncComponent(() => import(componentPath));
  });

  return { ERROR_COMPONENTS };
}
