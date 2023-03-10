<script setup>
import NextIcon from "@/components/icons/NextIcon.vue";
import PrevIcon from "@/components/icons/PrevIcon.vue";

import { computed, h } from "vue";
const props = defineProps({
  lastPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
  },
  maxPage: {
    type: Number,
    default: 5,
  },
});

const emits = defineEmits(["update:modelValue", "change"]);

const limitPage = computed(() => {
  if (props.maxPage > props.lastPage) {
    return props.lastPage;
  }

  return props.maxPage;
});

const offsetPage = computed(() => {
  if (props.modelValue > props.lastPage - limitPage.value) {
    return props.lastPage - limitPage.value - 1;
  }

  return props.modelValue - 1;
});

const PaginationButton = ({ page }, { slots }) => {
  const baseClasses =
    "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";
  const highlightClasses =
    "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";

  return h(
    "li",
    h(
      "button",
      {
        onClick: () => {
          emits("update:modelValue", page);
          emits("change");
        },
        class: [
          baseClasses,
          props.modelValue === page && !slots.default && highlightClasses,
        ],
      },
      slots.default ? slots.default() : page
    )
  );
};
</script>

<template>
  <nav aria-label="pagination">
    <ul class="inline-flex items-center">
      <pagination-button :page="modelValue - 1 > 0 ? modelValue - 1 : 1">
        <span class="sr-only">Previous</span>
        <prev-icon />
      </pagination-button>

      <pagination-button v-if="modelValue !== 1" :page="1" />
      <li v-if="modelValue !== 1" class="text-gray-500 mx-1">...</li>

      <pagination-button
        :key="`page-${page}`"
        v-for="page in limitPage"
        :page="page + offsetPage"
      />

      <li
        v-if="offsetPage + limitPage + 1 !== lastPage"
        class="text-gray-500 mx-1"
      >
        ...
      </li>

      <pagination-button :page="lastPage" />

      <pagination-button
        :page="modelValue + 1 <= lastPage ? modelValue + 1 : lastPage"
      >
        <span class="sr-only">Next</span>
        <next-icon />
      </pagination-button>
    </ul>
  </nav>
</template>
