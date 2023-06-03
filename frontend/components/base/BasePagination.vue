<script setup lang="ts">
import { computed } from 'vue';
import NextIcon from '@/components/icons/NextIcon.vue';
import PrevIcon from '@/components/icons/PrevIcon.vue';

import PaginationButton from '@/components/base/pagination/PaginationButton';
import PaginationFirstpageButton from '@/components/base/pagination/PaginationFirstpageButton';
import PaginationLastpageButton from '@/components/base/pagination/PaginationLastpageButton';

import {
  setPaginationPagesArray,
  getNextPage,
  getPrevPage,
} from '@/utils/pagination';

interface Props {
  lastPage: number
  modelValue: number,
  maxPageDisplay?: 5 | 7 | 9 | 11 | 13 | 15,
}

const props = withDefaults(defineProps<Props>(), {
  maxPageDisplay: 5,
});

// pagination logic
const pagesArray: ComputedRef<number[]> = computed(() => setPaginationPagesArray(
  props.maxPageDisplay,
  props.lastPage,
  props.modelValue,
));

const nextPage: ComputedRef<number> = computed(() => getNextPage(props.modelValue, props.lastPage));

const prevPage: ComputedRef<number> = computed(() => getPrevPage(props.modelValue));

// update page
const emits = defineEmits(['update:modelValue', 'change']);

function updatePage(page: number) {
  emits('update:modelValue', page);
  emits('change', page);
}
</script>

<template>
  <nav v-if="lastPage > 1" aria-label="pagination">
    <ul class="inline-flex items-center">
      <pagination-button
        @click="updatePage(prevPage)"
        :page="prevPage"
        :currentPage="modelValue"
      >
        <span class="sr-only">Previous</span>
        <prev-icon />
      </pagination-button>

      <pagination-firstpage-button
        :currentPage="modelValue"
        :maxPageDisplay="maxPageDisplay"
        @click="updatePage(1)"
      />

      <pagination-button
        :key="`page-${page}`"
        v-for="page in pagesArray"
        @click="updatePage(page)"
        :page="page"
        :currentPage="modelValue"
      />

      <pagination-lastpage-button
        :currentPage="modelValue"
        :maxPageDisplay="maxPageDisplay"
        :lastPage="lastPage"
        @click="updatePage(lastPage)"
      />

      <pagination-button
        @click="updatePage(nextPage)"
        :page="nextPage"
        :currentPage="modelValue"
      >
        <span class="sr-only">Next</span>
        <next-icon />
      </pagination-button>
    </ul>
  </nav>
</template>
