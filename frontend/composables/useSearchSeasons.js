import { computed, ref } from 'vue';
import { useSeasonStore } from '@/stores/season';

export default function useSearchSeasons(props) {
  const storeSeason = useSeasonStore();
  const seasonsIdValue = ref(props.modelValue.seasonsId);

  const seasonsId = computed(() => ({
    name: 'seasonsId',
    label: 'Seasons',
    options: storeSeason.options,
    mode: 'tags',
    value: seasonsIdValue,
  }));

  return { seasonsId };
}
