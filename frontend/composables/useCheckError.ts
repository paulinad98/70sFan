type StatusConfig = {
  [key: number]: string;
};

const STATUS_CONFIG : StatusConfig = {
  401: 'authError',
};

export function useCheckError() {
  function checkError(statusCode: number) :string {
    if (statusCode >= 200 && statusCode < 300) return '';

    return STATUS_CONFIG[statusCode];
  }

  return { checkError };
}
