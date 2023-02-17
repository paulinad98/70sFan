<script setup></script>

<template>
  <div class="max-w-md p-5 border-2 border-gray-700 rounded-md shadow-lg">
    <div
      class="grid grid-cols-[112px_auto_112px] grid-rows-[repeat(2,_auto)] justify-items-center items-center mb-5 mx-auto"
    >
      <img
        class="w-28 h-28 object-contain col-start-1"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2560px-Los_Angeles_Lakers_logo.svg.png"
        alt=""
      />
      <span class="row-start-2 text-4xl font-bold text-gray-800">120</span>
      <div class="row-start-1 row-end-3 text-center">
        <span
          class="text-xl font-medium tracking-wide text-gray-900 block mb-1"
        >
          1988/1989
        </span>
        <time
          class="block text-xs font-light tracking-wider mb-3 uppercase"
          datetime="1998-10-12"
        >
          November 12, 1988</time
        >
        <a class="text-base font-medium text-blue-600 hover:underline" href="">
          Basketball Reference
        </a>
      </div>
      <img
        class="w-28 h-28 object-contain"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2560px-Los_Angeles_Lakers_logo.svg.png"
        alt=""
      />
      <span class="text-4xl font-bold text-green-700">138</span>
    </div>
    <p class="mb-4 text-sm leading-normal">
      The datetime attribute of this element is used translate the time into a
      machine-readable format so that browsers can offer to add date reminders
      through the user's calendar, and search engines can produce smarter search
      results.
    </p>
    <iframe
      width="408"
      height="245"
      src="https://www.youtube.com/embed/QsD5eUxIssM"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>
