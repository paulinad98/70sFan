<script setup>
import BaseForm from "@/components/base/BaseForm.vue";
import BaseMultiselect from "@/components/base/BaseMultiselect.vue";

import { useSetForm } from "@/composables/useSetForm";
import { useFetchApi } from "@/composables/useFetchApi";
import { useTeamStore } from "@/stores/team";
import { useSeasonStore } from "@/stores/season";

import { onMounted } from "vue";

const props = defineProps({ modelValue: Object });
const emit = defineEmits(["update:modelValue"]);
defineExpose({ sendForm });

const storeSeason = useSeasonStore();
const storeTeam = useTeamStore();

const { useFetch } = useFetchApi();
const {
  form: searchForm,
  setupInputs,
  validateForm,
  getPayloadFrom,
} = useSetForm();

onMounted(() => {
  sendForm();
});

const inputs = [
  {
    name: "seasonsId",
    label: "Seasons",
    store: storeSeason,
    mode: "tags",
  },
  {
    name: "teamsId",
    label: "Teams",
    store: storeTeam,
    mode: "tags",
  },
  {
    name: "seasonPhase",
    label: "Season Phase",
    store: {
      options: [
        { value: "RS", label: "Regular" },
        { value: "Playoffs", label: "Playoffs" },
      ],
    },
    mode: "single",
  },
];

setupInputs(inputs);

async function sendForm() {
  const isError = validateForm();
  if (isError) return;

  const payload = getPayloadFrom();

  const { data } = await useFetch({
    method: "GET",
    endpoint: `game`,
    payload: { ...payload, page: props.modelValue.currentPage },
  });

  emit("update:modelValue", {
    data: data.games,
    meta: data.meta,
    currentPage: props.modelValue.currentPage,
  });
}

function getInput(input) {
  return searchForm.value.get(input.name);
}
</script>

<template>
  <base-form @submit="sendForm()" autocomplete="off">
    <template :key="`input-${input.name}`" v-for="input in inputs">
      <base-multiselect
        v-model="getInput(input).value"
        :options="input.store.options"
        :label="input.label"
        :mode="input.mode"
      />
      <br class="my-2.5 block content-['']" />
    </template>
  </base-form>
</template>
