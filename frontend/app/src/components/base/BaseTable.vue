<script setup>
import BaseSpinner from "@/components/base/BaseSpinner.vue";

import { ref, useSlots, onMounted } from "vue";

const props = defineProps({
  headers: {
    type: Array,
  },
  rows: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["action"]);

const slots = useSlots();

const columns = ref("");
const gridTemplateCols = ref("");

onMounted(() => {
  columns.value = slots.action
    ? props.headers.length + 1
    : props.headers.length;
  gridTemplateCols.value = `repeat(${columns.value}, auto)`;
});
</script>

<template>
  <base-spinner v-if="isLoading" class="flex justify-center mt-2.5" />
  <table
    v-else
    class="text-sm text-left text-gray-500 border-collapse w-auto shadow-md sm:rounded-lg grid overflow-x-auto c-grid-template"
  >
    <thead class="contents">
      <tr class="contents">
        <th
          :key="`header-${index}`"
          v-for="(header, index) in headers"
          class="px-6 py-3 whitespace-nowrap text-xs text-white uppercase bg-primary-50"
        >
          {{ header }}
        </th>

        <th
          v-if="columns === headers.length + 1"
          class="px-6 py-3 whitespace-nowrap text-xs text-white uppercase bg-primary-50"
        ></th>
      </tr>
    </thead>
    <tbody class="contents">
      <tr :key="`row-${index}`" v-for="(row, index) in rows" class="contents">
        <td
          :key="`item-${index}`"
          v-for="(item, index) in row"
          class="px-6 py-4 bg-white border-b hover:bg-gray-50"
        >
          {{ item }}
        </td>

        <td
          v-if="columns === headers.length + 1"
          class="px-6 py-4 bg-white border-b hover:bg-gray-50"
        >
          <a
            @click="$emit(action, row)"
            href="#"
            class="font-medium text-blue-600 hover:underline"
          >
            <slot name="action"></slot>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.c-grid-template {
  grid-template-columns: v-bind(gridTemplateCols);
}
</style>
