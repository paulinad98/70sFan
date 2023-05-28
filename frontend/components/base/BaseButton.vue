<script setup></script>

<template>
  <button
    class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
  >
    <slot name="prevIcon"></slot>
    <slot></slot>
    <slot name="nextIcon"></slot>
  </button>
</template>
