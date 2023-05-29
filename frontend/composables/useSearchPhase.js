import { computed, ref } from 'vue';

export default function useSearchPhase(props) {
  const seasonPhaseValue = ref(props.modelValue.seasonPhase);

  const seasonPhase = computed(() => ({
    name: 'seasonPhase',
    label: 'Season Phase',
    options: [
      { value: 'RS', label: 'Regular' },
      { value: 'Playoffs', label: 'Playoffs' },
    ],
    mode: 'single',
    value: seasonPhaseValue,
  }));

  return { seasonPhase };
}
