<script setup lang="ts">
import AppFooter from '@/components/app/AppFooter.vue';
import AppNavigation from '@/components/app/AppNavigation.vue';
import TheHeader from '@/components/landing/TheHeader.vue';
import SectionOne from '@/components/landing/SectionOne.vue';
import SectionTwo from '@/components/landing/SectionTwo.vue';
import SectionThree from '@/components/landing/SectionThree.vue';
import SectionFour from '@/components/landing/SectionFour.vue';
import JoinUs from '@/components/landing/JoinUs.vue';
import LoginButton from '@/components/landing/LoginButton.vue';

definePageMeta({
  layout: 'landing',
});
</script>

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
