const STATUS_CONFIG = {
  401: "authError",
};

export function useCheckError() {
  function checkError(statusCode) {
    if (statusCode >= 200 && statusCode < 300) return "";

    return STATUS_CONFIG[statusCode];
  }

  return { checkError };
}
