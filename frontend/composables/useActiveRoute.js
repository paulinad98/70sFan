import { useRoute } from "vue-router";
import { computed } from "vue";

export default function useActiveroute() {
  const route = useRoute();

  const activeTab = computed(() => route.params.tab);

  return { activeTab };
}
