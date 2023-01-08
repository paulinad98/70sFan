<script setup>
import TeamIcon from "@/components/icons/TeamIcon.vue";
import GameIcon from "@/components/icons/GameIcon.vue";
import PanelSidebarLink from "@/components/panel/PanelSidebarLink.vue";
</script>

<template>
  <aside class="w-64 bg-white" aria-label="Sidebar">
    <div
      class="px-3 py-4 overflow-y-auto rounded divide-y divide-gray-200 border border-primary-50"
    >
      <span class="text-base text-gray-900 font-medium px-2 mb-2">
        Admin Panel
      </span>
      <ul class="mt-3 pt-2">
        <panel-sidebar-link tab="teams" default>
          <template #icon>
            <team-icon class="w-6 h-6 pl-1 text-primary-50" />
          </template>
          <template #text> Teams </template>
        </panel-sidebar-link>

        <panel-sidebar-link tab="games">
          <template #icon>
            <game-icon class="w-7 h-7 text-primary-50" />
          </template>
          <template #text> Games </template>
        </panel-sidebar-link>
      </ul>
    </div>
  </aside>
</template>
