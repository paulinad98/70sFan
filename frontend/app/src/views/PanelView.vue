<script>
import { defineComponent } from "vue";

import PanelSidebar from "@/components/panel/PanelSidebar.vue";

export default defineComponent({
  name: "PanelView",
  components: {
    PanelSidebar,
  },
});
</script>

<template>
  <div class="flex gap-14">
    <panel-sidebar />
    <div>Panel</div>
  </div>
</template>
