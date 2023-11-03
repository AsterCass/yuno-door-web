<template>

  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="true"/>

    <div style="min-height: 1000px">
      1123423432
    </div>

    <CopyrightFooter/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>
  </q-layout>


</template>

<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";


</script>

<style scoped>

</style>