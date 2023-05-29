<script setup>
import { computed, ref } from 'vue';

import BaseMultiselect from '@/components/base/BaseMultiselect.vue';

import { useTeamStore } from '@/stores/team';
import { useSeasonStore } from '@/stores/season';

const storeSeason = useSeasonStore();
const storeTeam = useTeamStore();

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);

const seasonsIdValue = ref(props.modelValue.seasonsId);
const teamsIdValue = ref(props.modelValue.teamsId);
const seasonPhaseValue = ref(props.modelValue.seasonPhase);

const seasonsId = computed(() => ({
  name: 'seasonsId',
  label: 'Seasons',
  options: storeSeason.options,
  mode: 'tags',
  value: seasonsIdValue,
}));

const teamsId = computed(() => ({
  name: 'teamsId',
  label: 'Teams',
  options: storeTeam.options,
  mode: 'tags',
  value: teamsIdValue,
}));

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

function onChange(value, key) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
}

</script>

<template>
    <template :key="`input-${input.name}`" v-for="input in [seasonsId, teamsId, seasonPhase]">
      <base-multiselect
        @change="onChange($event, input.name)"
        v-model="input.value"
        :options="input.options"
        :label="input.label"
        :mode="input.mode"
      />
      <br class="my-2.5 block content-['']" />
    </template>
</template>
