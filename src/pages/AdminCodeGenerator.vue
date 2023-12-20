<template>

  <q-layout view="lHh lpr lFf" container:false>

    <div>
      <q-img class="index-img"
             :no-native-menu="false"
             src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg1-half.jpg"
             placeholder-src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg1-half-dim.jpg"
             alt=""
             :ratio="3"
             :fit="'cover'">
      </q-img>
    </div>

    <div class="code-generator-main">
      <!--todo use url router different generator function, current page show various tabs-->
      <CaskSqlKotlinGenerator/>
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
import {onMounted, onUnmounted} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import CaskSqlKotlinGenerator from "@/views/CaskSqlKotlinGenerator.vue";

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
})
</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.index-img
  z-index: -1

.code-generator-main
  margin: -5rem 2rem 5rem 2rem
  border-radius: 15px
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  min-height: 600px

</style>