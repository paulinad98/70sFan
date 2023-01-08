<script setup>
import PanelSidebar from "@/components/panel/PanelSidebar.vue";
</script>

<template>
  <div class="flex gap-14">
    <panel-sidebar />
    <h1>
      Panel - <span class="capitalize">{{ $route.params.tab || "Teams" }}</span>
    </h1>
  </div>
</template>
