<script setup>
defineProps({
  lastPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <nav aria-label="pagination">
    <ul class="inline-flex items-center -space-x-px">
      <li>
        <button
          @click="
            $emit('update:modelValue', modelValue - 1 > 0 ? modelValue - 1 : 1),
              $emit('change')
          "
          class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Previous</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>

      <li>
        <button
          :key="`page-${page}`"
          v-for="page in lastPage"
          @click="$emit('update:modelValue', page), $emit('change')"
          aria-current="page"
          :class="
            modelValue === page
              ? 'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
              : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
          "
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          @click="
            $emit(
              'update:modelValue',
              modelValue + 1 <= lastPage ? modelValue + 1 : lastPage
            ),
              $emit('change')
          "
          class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Next</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>
