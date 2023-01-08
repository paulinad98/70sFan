<template>
  <div>
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

<script>
import AppFooter from "../../globalComponents/app/AppFooter.vue";
import AppNavigation from "@/../globalComponents/app/AppNavigation.vue";
import TheHeader from "@/components/landing/TheHeader.vue";
import SectionOne from "@/components/landing/SectionOne.vue";
import SectionTwo from "@/components/landing/SectionTwo.vue";
import SectionThree from "@/components/landing/SectionThree.vue";
import SectionFour from "@/components/landing/SectionFour.vue";
import JoinUs from "@/components/landing/JoinUs.vue";
import LoginButton from "@/components/landing/LoginButton.vue";

export default {
  components: {
    AppFooter,
    AppNavigation,
    TheHeader,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    JoinUs,
    LoginButton,
  },
};
</script>
