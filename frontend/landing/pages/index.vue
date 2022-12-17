<template>
  <div>
    <app-navigation />
    <the-header />
    <section-one />
    <section-two />
    <section-three />
    <join-us />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "@/components/app/AppFooter.vue";
import AppNavigation from "@/components/app/AppNavigation.vue";
import TheHeader from "@/components/landing/TheHeader.vue";
import SectionOne from "@/components/landing/SectionOne.vue";
import SectionTwo from "@/components/landing/SectionTwo.vue";
import SectionThree from "@/components/landing/SectionThree.vue";
import JoinUs from "@/components/landing/JoinUs.vue";

export default {
  components: {
    AppFooter,
    AppNavigation,
    TheHeader,
    SectionOne,
    SectionTwo,
    SectionThree,
    JoinUs,
  },
};
</script>
