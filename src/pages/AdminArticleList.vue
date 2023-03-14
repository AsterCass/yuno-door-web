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

    <div class="row justify-center article-list-search">
      <q-input
          rounded
          outlined
          placeholder="输入查询文章关键词"
          v-model="text"
          class="col-9 article-list-base article-list-search-input"
          standout="bg-white text-grey-10"
      >
      </q-input>

      <div class="col-2">
        <q-btn
            push round size="1rem"
            class="col-1 article-list-search-btn" icon="fa-solid fa-magnifying-glass"/>
      </div>

    </div>

    <div class="article-list-base article-list-main">
      <q-page-container>
        <q-page class="q-pa-md">
          <p v-for="n in 10" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
            dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
            commodi perferendis voluptate? 字体观察 备案 即使 网站
          </p>
        </q-page>
      </q-page-container>
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
import {ref} from 'vue'

let text = ref("")

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


.article-list-base
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)

.article-list-search-btn
  background-image: linear-gradient(195deg, #42424a, #191919)
  color: $cask_base_white


.article-list-search-input
  border-radius: 30px
  font-size: 1rem
  line-height: 1.625
  height: 2rem
  margin-right: 1rem


.article-list-search
  align-items: center
  margin: -11% 35% 0 35%

.article-list-main
  margin: 5rem 2rem 5rem 2rem
  border-radius: 15px

</style>