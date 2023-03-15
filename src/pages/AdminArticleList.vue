<template>
  <q-layout view="lHh lpr lFf" container:false>

    <div>
      <q-img class="index-img"
             :no-native-menu="false"
             :src="require('../assets/img/backgroud-half.png')"
             alt=""
             :ratio="3"
             :fit="'cover'">
      </q-img>
    </div>
    <CaskSearch/>


    <div class="article-list-base article-list-main">
      <CaskArticleList/>
    </div>

    <CopyrightFooter/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import {onMounted, onUnmounted} from "vue";
import CopyrightFooter from '@/components/CopyrightFooter.vue'
import CaskSearch from "@/components/CaskSearch.vue";
import CaskArticleList from "@/components/CaskArticleList.vue";

onMounted(() => {
  //底色渲染
  document.querySelector('body').setAttribute('style', 'background-color:#EFF2F5')
})

onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.index-img
  z-index: -1

.article-list-main
  margin: 5rem 2rem 5rem 2rem
  border-radius: 15px
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  min-height: 600px

</style>