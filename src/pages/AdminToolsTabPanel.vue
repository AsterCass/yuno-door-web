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
             :ratio="2.5"
             :fit="'cover'">
      </q-img>
    </div>


    <CaskSearch v-if="toolTab==='steam-search'" searchPlaceholder="输入查询游戏名称（非中文游戏请用英文原名）"/>
    <div v-else>
      <div style="margin-top: -11.7%"/>
    </div>


    <div class="steam-search-list-main">

      <q-tabs
          v-model="toolTab"
          align="left" dense
          active-color="light-green-10"
      >
        <q-route-tab name="steam-search" icon="fa-brands fa-square-steam" label="Steam史低查询"
                     no-caps to="/tools/steam/search" class="tools-tab"/>
        <q-route-tab name="code-sql2kotlin" icon="fa-solid fa-object-group" label="SQL转Kotlin类"
                     no-caps to="/tools/code/sql2kotlin" class="tools-tab"/>
        <q-route-tab name="timestamp" icon="fa-solid fa-clock-rotate-left" label="时间戳格式转换"
                     no-caps to="/tools/timestamp" class="tools-tab"/>
        <q-route-tab name="qrcode" icon="fa-solid fa-qrcode" label="QR二维码生成"
                     no-caps to="/tools/qrcode" class="tools-tab"/>
      </q-tabs>

      <router-view/>
    </div>

    <CopyrightFooter/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import {onMounted, onUnmounted, ref} from "vue";
import CopyrightFooter from '@/components/CopyrightFooter.vue'
import CaskSearch from "@/components/CaskSearch.vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
})

let toolTab = ref("");

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.index-img
  z-index: -1

.tools-tab
  font-weight: 800 !important
  font-family: Roboto Slab, sans-serif
  padding: .5rem 0
  width: 12rem


.steam-search-list-main
  margin: 4rem 2rem 5rem 2rem
  border-radius: 15px
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  min-height: 600px

</style>
