import { defineAsyncComponent } from 'vue';
import capitalize from '@/utils/capitalize';

type ErrorTypes = 'authError' | 'paidError' | 'customError';

export function useErrorComponents() {
  const ERROR_TYPES: ErrorTypes[] = ['authError', 'paidError', 'customError'];
  const ERROR_COMPONENTS: {
    [key: string]: ReturnType<typeof defineAsyncComponent>;
  } = {};

  ERROR_TYPES.forEach((error) => {
    const capitalizedError = capitalize(error);
    const componentPath = `../components/error/typed-errors/${capitalizedError}.vue`;

    ERROR_COMPONENTS[error] = defineAsyncComponent(() => import(/* @vite-ignore */ componentPath));
  });

  return { ERROR_COMPONENTS };
}
