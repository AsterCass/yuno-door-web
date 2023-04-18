<template>
  <div class="admin-show-base">

    <div class="column admin-show-base-row">
      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-book" size="1em"/>
        技术备录
      </div>
      <div class="row col-12 justify-center">
        <div class="row col-11">
          <div v-for="(item, index) in articleList" :key="index"
               class="col-xs-12 col-lg-4" style="padding: 0.5rem">
            <CaskArticleListCard :intro="item"/>
          </div>
        </div>
        <div class="col-xs-4 col-lg-1 column justify-center">
          <q-btn label="更多" to="/article/list" class="col-xs-12 col-lg-2 admin-show-base-go"/>
        </div>
      </div>
    </div>


    <q-separator spaced="1.5rem" size="0.05rem" inset/>

    <div class="column admin-show-base-row">
      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-book-bookmark" size="1em"/>
        生活题记
      </div>
      <div class="row col-12 justify-center">
        <div class="row col-11">
          <div v-for="(item, index) in essayList" :key="index"
               class="col-xs-12 col-lg-4" style="padding: 0.5rem">
            <CaskArticleListCard :intro="item"/>
          </div>
        </div>
        <div class="col-xs-4 col-lg-1 column justify-center">
          <q-btn label="更多" to="/essay/list" class="col-xs-12 col-lg-2 admin-show-base-go"/>
        </div>
      </div>
    </div>

    <q-separator spaced="1.5rem" size="0.05rem" inset/>

    <div class="column admin-show-base-game-content">

      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-trophy" size="1em"/>
        游戏分享
      </div>
      <div class="col-10">
        <CaskGameSimpleList/>
      </div>

    </div>

  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import CaskArticleListCard from "@/views/CaskArticleListCard.vue";
import CaskGameSimpleList from "@/views/CaskGameSimpleList.vue";
import {getBlogList} from "@/api/base";
import {customPage} from "@/utils/page";
import emitter from "@/utils/bus";


let articleList = ref([])
let essayList = ref([])
let articleLoaded = ref(false)
let essayLoaded = ref(false)

function searchArticleListMethod() {
  //参数插入
  let currentParam = {articleType: 1}
  getBlogList(customPage(currentParam, 0, 3)).then(res => {
    articleList.value.push(...res.data.data)
    //报告主页已经准备完毕
    articleLoaded.value = true
    if (articleLoaded.value && essayLoaded.value) {
      emitter.emit('indexDataAlready')
    }
  })
}

function searchEssayListMethod() {
  //参数插入
  let currentParam = {articleType: 2}
  getBlogList(customPage(currentParam, 0, 3)).then(res => {
    essayList.value.push(...res.data.data)
    //报告主页已经准备完毕
    essayLoaded.value = true
    if (articleLoaded.value && essayLoaded.value) {
      emitter.emit('indexDataAlready')
    }
  })
}


onMounted(() => {
  searchArticleListMethod()
  searchEssayListMethod()
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-show-base
  padding: 2%

.admin-show-base-row
  min-height: 20rem

.admin-show-base-title
  font-family: Roboto Slab, sans-serif
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  opacity: 0.8
  font-weight: 400


.admin-show-base-go
  margin: 0.5rem
  text-align: center
  color: white
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 2rem


.admin-show-base-game-content
  height: 30rem
  width: 100%


</style>