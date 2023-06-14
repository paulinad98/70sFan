<script setup>
import GamePreviewLayout from './GamePreviewLayout.vue';
import TextSkeleton from '../skeleton/TextSkeleton.vue';

const TeamLogoSeleton = () => h(
  'div',
  { class: 'text-center mb-2' },
  [
    h('div', { class: 'w-20 h-20 bg-gray-300 animate-pulse mb-2' }),
    h('text-skeleton', { class: 'mx-auto h-3 w-12' }),
  ],
);
</script>

<template>
    <game-preview-layout>
        <template #team-1>
            <team-logo-seleton/>
            <text-skeleton class="row-start-2 h-5 w-10"/>
        </template>

        <template #game-preview-info>
            <text-skeleton class="mb-1 mx-auto h-3 w-12"/>
            <text-skeleton class="mb-3 mx-auto h-3 w-8"/>
            <text-skeleton class="mb-3 mx-auto h-3 w-16"/>
        </template>

        <template #team-2>
            <team-logo-seleton/>
            <text-skeleton class="h-5 w-10"/>
        </template>

        <template #bottom>
            <text-skeleton class="h-3 w-9/12 mb-1"/>
            <text-skeleton class="h-3 mb-1"/>
            <text-skeleton class="h-3 w-6/12"/>

            <div class="h-40 bg-gray-300 animate-pulse mt-2"></div>
        </template>
    </game-preview-layout>
</template>
