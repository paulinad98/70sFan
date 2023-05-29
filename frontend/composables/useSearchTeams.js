import { computed, ref } from 'vue';
import { useTeamStore } from '@/stores/team';

export default function useSearchTeams(props) {
  const storeTeam = useTeamStore();
  const teamsIdValue = ref(props.modelValue.teamsId);

  const teamsId = computed(() => ({
    name: 'teamsId',
    label: 'Teams',
    options: storeTeam.options,
    mode: 'tags',
    value: teamsIdValue,
  }));

  return { teamsId };
}
