<script setup>
import useSearchSeasons from '@/composables/useSearchSeasons';
import useSearchTeams from '@/composables/useSearchTeams';
import useSearchPhase from '@/composables/useSearchPhase';
import BaseMultiselect from '@/components/base/BaseMultiselect.vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);

const { seasonsId } = useSearchSeasons(props);
const { teamsId } = useSearchTeams(props);
const { seasonPhase } = useSearchPhase(props);

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
