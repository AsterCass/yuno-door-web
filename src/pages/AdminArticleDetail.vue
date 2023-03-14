<template>
  <q-layout view="lHh lpr lFf" container:false>
    <CaskWebHeader :headerVisible="true"/>
    <CaskArticleDetail/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>
    <CopyrightFooter/>

  </q-layout>
</template>
<!--marked document https://marked.js.org/using_advanced#options.-->
<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {onMounted, onUnmounted, ref} from "vue";
import CaskArticleDetail from "@/components/CaskArticleDetail.vue";

let baseElement = ref({})

onMounted(() => {
  //底色渲染
  document.querySelector('body').setAttribute('style', 'background-color:#EFF2F5')
  //该页面所有链接均打开新标签，不在本页面打开，目的兼容markdown语法
  let base = document.createElement("base")
  base.setAttribute("target", "_blank")
  document.querySelector('head').append(base)
  baseElement = base
})

onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
  document.querySelector('head').removeChild(baseElement)
})

</script>


<style lang="scss" scoped>


</style>