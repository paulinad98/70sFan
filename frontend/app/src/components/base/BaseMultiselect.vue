<script setup>
import Multiselect from "@vueform/multiselect";
import { useGetUniqueId } from "@/composables/useGetUniqueId";
import { ref } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array],
  },
  options: {
    type: Array,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

const { getId } = useGetUniqueId();
const id = `base-input-${getId()}`;

const selectItems = ref(null);
</script>

<template>
  <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
    {{ label }}
  </label>
  <Multiselect
    @select="$emit('update:modelValue', selectItems)"
    @deselect="$emit('update:modelValue', selectItems)"
    v-model="selectItems"
    :options="options"
    mode="tags"
    searchable
    :placeholder="label"
    :id="id"
  />
</template>

<style>
@import "@vueform/multiselect/themes/tailwind.css";

.multiselect-tag {
  @apply bg-primary-50;
}

.multiselect.is-active {
  @apply ring-primary-200;
}
</style>
