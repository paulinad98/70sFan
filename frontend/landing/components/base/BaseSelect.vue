<script setup>
import { useGetUniqueId } from "@/composables/useGetUniqueId";

const { getId } = useGetUniqueId();

const id = `base-input-${getId()}`;

defineProps({
  error: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
  },
  options: {
    type: Array,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
    {{ label }}
  </label>
  <select
    :aria-describedby="error ? `${id}-error` : ''"
    :aria-invalid="error"
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  >
    <option value="">Select {{ label.toLocaleLowerCase() }}</option>
    <option
      :key="`select-${id}-option-${i}`"
      v-for="(option, i) in options"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
  <p v-if="error" :id="`${id}-error`" class="text-sm text-red-600">
    {{ error }}
  </p>
</template>
