<template>
  <nav class="bg-primary-50 border-gray-200 py-6 fixed w-full">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto"
    >
      <app-logo class="flex items-center fill-white" />

      <div class="flex items-center lg:order-2">
        <a
          href="https://themesberg.com/product/tailwind-css/landing-page"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
        >
          Sign with Pareon
        </a>
      </div>
      <div
        class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
        >
          <!-- <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >Company</a
            >
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AppLogo from "@/components/app/AppLogo.vue";

export default {
  components: {
    AppLogo,
  },
};
</script>
