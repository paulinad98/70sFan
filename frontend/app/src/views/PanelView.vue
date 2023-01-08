<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
</script>

<template>
  <div class="flex gap-14 items-start">
    <panel-sidebar />
    <div class="flex items-center gap-7">
      <h1 class="text-2xl text-gray-900 font-medium">
        Panel -
        <span class="capitalize">{{ $route.params.tab || "Teams" }}</span>
      </h1>
      <base-button class="bg-primary-50 hover:bg-gray-700">
        <template #prevIcon><plus-icon class="w-2 h-2 mr-2" /></template> Add
      </base-button>
    </div>
  </div>
</template>
