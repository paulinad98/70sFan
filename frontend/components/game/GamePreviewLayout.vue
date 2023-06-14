<template>
  <div class="p-5 border-2 border-gray-700 bg-white rounded-md shadow-lg">
    <div
      class="grid grid-cols-[112px_auto_112px] grid-rows-[repeat(2,_auto)] justify-items-center items-center mb-5 mx-auto"
    >
        <slot name="team-1"/>
      <div class="row-start-1 row-end-3 text-center">
        <slot name="game-preview-info"/>
      </div>
        <slot name="team-2"/>
    </div>
    <slot name="bottom"/>
  </div>
</template>
