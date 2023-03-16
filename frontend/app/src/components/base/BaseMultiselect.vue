<script setup>
import Multiselect from "@vueform/multiselect";
import { useGetUniqueId } from "@/composables/useGetUniqueId";
import { ref, watch } from "vue";

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

const emit = defineEmits(["update:modelValue"]);

const { getId } = useGetUniqueId();
const id = `base-input-${getId()}`;

const selectItems = ref(null);

watch(
  () => selectItems.value,
  () => {
    emit("update:modelValue", selectItems.value);
  }
);
</script>

<template>
  <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
    {{ label }}
  </label>
  <Multiselect
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
