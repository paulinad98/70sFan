let UUID = 0;

export function useGetUniqueId() {
  function getId(): number {
    UUID += 1;

    return UUID;
  }

  return { getId };
}
