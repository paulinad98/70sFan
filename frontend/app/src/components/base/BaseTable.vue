<script setup>
defineProps({
  headers: {
    type: Array,
  },
  rows: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table
    class="text-sm text-left text-gray-500 border-collapse w-auto shadow-md sm:rounded-lg grid overflow-x-auto"
    :class="`grid-cols-[repeat(${headers.length + 1},_auto)]`"
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
          class="px-6 py-3 whitespace-nowrap text-xs text-white uppercase bg-primary-50"
        >
          <span class="sr-only">Edit</span>
        </th>
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

        <td class="px-6 py-4 bg-white border-b hover:bg-gray-50">
          <a href="#" class="font-medium text-blue-600 hover:underline">
            <slot name="action"></slot>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
