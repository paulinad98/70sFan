<template>
  <div class="bg-primary-300">
    <app-navigation>
      <login-button />
    </app-navigation>
    <the-header />
    <section-one />
    <section-two />
    <section-three />
    <section-four />
    <join-us />
    <app-footer />
  </div>
</template>

<script setup>
import AppFooter from "@/components/globalComponents/app/AppFooter.vue";
import AppNavigation from "@/components/globalComponents/app/AppNavigation.vue";
import TheHeader from "@/components/landing/TheHeader.vue";
import SectionOne from "@/components/landing/SectionOne.vue";
import SectionTwo from "@/components/landing/SectionTwo.vue";
import SectionThree from "@/components/landing/SectionThree.vue";
import SectionFour from "@/components/landing/SectionFour.vue";
import JoinUs from "@/components/landing/JoinUs.vue";

definePageMeta({
  layout: "landing",
});
</script>
