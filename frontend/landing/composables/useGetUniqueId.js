let UUID = 0;

export function useGetUniqueId() {
  const getId = () => {
    UUID += 1;
    return UUID;
  };

  return { getId };
}
