<script setup>
import Multiselect from '@vueform/multiselect';
import { ref, watch } from 'vue';
import { useGetUniqueId } from '@/composables/useGetUniqueId';

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: [String, Number, Array],
  options: {
    type: Array,
    required: true,
  },
  mode: String,
});

const emit = defineEmits(['update:modelValue']);

const { getId } = useGetUniqueId();
const id = `base-input-${getId()}`;

const selectItems = ref(null);

watch(
  () => selectItems.value,
  () => {
    emit('update:modelValue', selectItems.value);
  },
);
</script>

<template>
  <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
    {{ label }}
  </label>
  <Multiselect
    v-bind="$attrs"
    v-model="selectItems"
    :options="options"
    :mode="mode"
    searchable
    :placeholder="label"
    :id="id"
  />
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
/* @import "@vueform/multiselect/themes/tailwind.css"; */

.multiselect-tag {
  @apply bg-primary-200;
}

.multiselect.is-active {
  @apply ring-primary-200;
}

.multiselect-option.is-selected,
.multiselect-option.is-selected.is-pointed {
  @apply bg-primary-200;
}
</style>
