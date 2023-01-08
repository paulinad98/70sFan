import { ref } from "vue";

export function useHandleModal() {
  const isActive = ref(false);

  const toggleModal = () => {
    isActive.value = !isActive.value;
  };

  return { isActive, toggleModal };
}
