<script setup>
import { onMounted, ref } from 'vue';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseMultiselect from '@/components/base/BaseMultiselect.vue';

import { useFetchApi } from '@/composables/useFetchApi';
import { useTeamStore } from '@/stores/team';
import { useSeasonStore } from '@/stores/season';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);
defineExpose({ sendForm });

const storeSeason = useSeasonStore();
const storeTeam = useTeamStore();

const { useFetch } = useFetchApi();

onMounted(() => {
  sendForm();
});

const inputs = ref([
  {
    name: 'seasonsId',
    label: 'Seasons',
    store: storeSeason,
    mode: 'tags',
    value: [],
  },
  {
    name: 'teamsId',
    label: 'Teams',
    store: storeTeam,
    mode: 'tags',
    value: [],
  },
  {
    name: 'seasonPhase',
    label: 'Season Phase',
    store: {
      options: [
        { value: 'RS', label: 'Regular' },
        { value: 'Playoffs', label: 'Playoffs' },
      ],
    },
    mode: 'single',
    value: null,
  },
]);

async function sendForm() {
  const payload = {};

  inputs.value.forEach((input) => {
    if (input.value) {
      payload[input.name] = input.value;
    }
  });

  const { data } = await useFetch({
    method: 'GET',
    endpoint: 'game',
    payload: { ...payload, page: props.modelValue.currentPage },
  });

  emit('update:modelValue', {
    data: data.games,
    meta: data.meta,
    currentPage: props.modelValue.currentPage,
  });
}
</script>

<template>
  <base-form @submit="sendForm()" autocomplete="off">
    <template :key="`input-${input.name}`" v-for="input in inputs">
      <base-multiselect
        v-model="input.value"
        :options="input.store.options"
        :label="input.label"
        :mode="input.mode"
      />
      <br class="my-2.5 block content-['']" />
    </template>
  </base-form>
</template>
