<script>
import { defineComponent } from "vue";

import TeamIcon from "@/components/icons/TeamIcon.vue";
import GameIcon from "@/components/icons/GameIcon.vue";

export default defineComponent({
  name: "PanelSidebar",
  components: {
    TeamIcon,
    GameIcon,
  },
});
</script>

<template>
  <aside class="w-64" aria-label="Sidebar">
    <div
      class="px-3 py-4 overflow-y-auto rounded bg-gray-50 divide-y divide-gray-200 border border-primary-50"
    >
      <span class="text-base text-gray-900 font-medium px-2 mb-2">
        Admin Panel
      </span>
      <ul class="mt-3 pt-2">
        <li class="my-2">
          <a
            href="#"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <team-icon
              class="w-6 h-6 pl-1 text-primary-50 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">Teams</span>
          </a>
        </li>
        <li class="my-2">
          <a
            href="#"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <game-icon
              class="w-7 h-7 text-primary-50 transition duration-75 group-hover:text-gray-900"
            />
            <span class="ml-3">Games</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
