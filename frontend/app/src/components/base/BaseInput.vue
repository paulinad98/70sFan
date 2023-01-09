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
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <label
    :for="id"
    class="block text-sm mb-2 font-medium"
    :class="{ 'text-red-700': error }"
  >
    {{ label }}
  </label>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    :id="id"
    class="w-full p-2.5 block border text-sm rounded-lg"
    :class="{
      'bg-red-50  border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500 ':
        error,
    }"
    :value="modelValue"
    :placeholder="label"
    :aria-describedby="error ? `${id}-error` : ''"
    :aria-invalid="error"
  />
  <p v-if="error" :id="`${id}-error`" class="mt-2 text-sm text-red-600">
    {{ error }}
  </p>
</template>
