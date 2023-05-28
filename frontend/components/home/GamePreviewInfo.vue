<script setup>
defineProps({
  season: String,
  date: String,
  basketballReferenceUrl: String,
});
</script>

<template>
  <span class="text-xl font-medium tracking-wider text-gray-900 block mb-1">
    {{ season }}
  </span>
  <time
    class="block text-xs font-light tracking-wide mb-3 uppercase"
    datetime="1998-10-12"
  >
    {{
      new Date(date).toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }}
  </time>
  <a
    class="text-base font-medium text-blue-600 hover:underline"
    :href="basketballReferenceUrl"
  >
    Basketball Reference
  </a>
</template>
