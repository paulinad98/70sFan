<script setup>
import { onMounted, ref } from 'vue';
import BaseForm from '@/components/base/BaseForm.vue';
import GameSearchForm from '@/components/game/GameSearchForm.vue';

import { useFetchApi } from '@/composables/useFetchApi';

defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);
defineExpose({ sendForm });

const form = ref({
  seasonsId: [],
  teamsId: [],
  seasonPhase: null,
});

const { useFetch } = useFetchApi();

onMounted(() => {
  sendForm();
});

async function sendForm(page = 1) {
  const payload = {};

  Object.keys(form.value).forEach((key) => {
    if (form.value[key]) {
      payload[key] = form.value[key];
    }
  });

  const { data } = await useFetch({
    method: 'GET',
    endpoint: 'game',
    payload: { ...payload, page },
  });

  emit('update:modelValue', {
    data: data.games,
    meta: data.meta,
    currentPage: page,
  });
}
</script>

<template>
  <base-form @submit="sendForm()" autocomplete="off">
    <game-search-form v-model="form" />
  </base-form>
</template>
