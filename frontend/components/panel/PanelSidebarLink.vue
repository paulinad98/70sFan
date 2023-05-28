<script setup>
import useActiveRoute from "@/composables/useActiveRoute";

const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
  },
});

const { activeTab } = useActiveRoute();
</script>

<template>
  <li class="my-2">
    <router-link
      :to="{ name: 'Panel', params: { tab } }"
      class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
      :class="{
        'bg-gray-100': activeTab === props.tab || (!activeTab && props.default),
      }"
    >
      <slot name="icon"></slot>
      <span class="ml-3"><slot name="text"></slot></span>
    </router-link>
  </li>
</template>
