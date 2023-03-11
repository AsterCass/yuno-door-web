<template>
  <q-layout view="lHh lpr lFf" container:false>
  <h1>this is a article</h1>
  <q-page-sticky position="left" :offset="[25, 25]">
    <CaskWebFab/>
  </q-page-sticky>
  </q-layout>
</template>

<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";

</script>

<style scoped>

</style>