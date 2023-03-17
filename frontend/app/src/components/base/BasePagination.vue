<script setup>
import NextIcon from "@/components/icons/NextIcon.vue";
import PrevIcon from "@/components/icons/PrevIcon.vue";

import { setPaginationPagesArray, getHalfPages } from "@/utils/pagination";

import { h, computed } from "vue";

const props = defineProps({
  lastPage: {
    type: Number,
    required: true,
  },
  modelValue: Number,
  maxPageDisplay: {
    type: Number,
    default: 5,
    validator: (value) => value % 2 === 1,
  },
});

const emits = defineEmits(["update:modelValue", "change"]);

const pagesArray = computed(() => {
  return setPaginationPagesArray(
    props.maxPageDisplay,
    props.lastPage,
    props.modelValue
  );
});

const halfOfMaxDisplay = computed(() => {
  return getHalfPages(props.maxPageDisplay);
});

const PaginationButton = ({ page }, { slots }) => {
  const baseClasses =
    "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";
  const highlightClasses =
    "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";

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
  <nav v-if="lastPage > 1" aria-label="pagination">
    <ul class="inline-flex items-center">
      <pagination-button :page="modelValue - 1 > 0 ? modelValue - 1 : 1">
        <span class="sr-only">Previous</span>
        <prev-icon />
      </pagination-button>

      <pagination-button :page="1" />
      <li
        v-if="modelValue > maxPageDisplay - halfOfMaxDisplay + 1"
        class="text-gray-500 mx-1"
      >
        ...
      </li>

      <pagination-button
        :key="`page-${page}`"
        v-for="page in pagesArray"
        :page="page"
      />

      <li
        v-if="modelValue < lastPage - halfOfMaxDisplay - 1"
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
