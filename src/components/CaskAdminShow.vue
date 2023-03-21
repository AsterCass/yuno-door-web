<template>
  <div class="admin-show-base">

    <div class="column admin-show-base-row">
      <div class="col-2 admin-show-base-title">
        <q-icon name="style" size="1em"/>
        技术备录
      </div>
      <div class="row col-10">
        <div v-for="(item, index) in articleList" :key="index" class="col-3" style="margin: 1rem">
          <CaskArticleListCard :intro="item"/>
        </div>
        <div class="col-2 column justify-center" style="margin: 1rem">
          <q-btn label="更多" to="/article/list" class="admin-show-base-go"/>
        </div>
      </div>
    </div>


    <q-separator spaced="1.5rem" size="0.05rem" inset/>

    <div class="column admin-show-base-row">
      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-book-bookmark" size="1em"/>
        生活题记
      </div>
      <div class="row col-10">
        <div v-for="(item, index) in essayList" :key="index" class="col-3" style="margin: 1rem">
          <CaskArticleListCard :intro="item"/>
        </div>
        <div class="col-2 column justify-center" style="margin: 1rem">
          <q-btn label="更多" to="/essay/list" class="admin-show-base-go"/>
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
import CaskArticleListCard from "@/components/CaskArticleListCard.vue";
import CaskGameSimpleList from "@/components/CaskGameSimpleList.vue";
import {getBlogList} from "@/api/base";
import {customPage} from "@/utils/page";


let articleList = ref([])
let essayList = ref([])

function searchArticleListMethod() {
  //参数插入
  let currentParam = {articleType: 1}
  getBlogList(customPage(currentParam, 0, 3)).then(res => {
    articleList.value.push(...res.data.data)
  })
}

function searchEssayListMethod() {
  //参数插入
  let currentParam = {articleType: 2}
  getBlogList(customPage(currentParam, 0, 3)).then(res => {
    essayList.value.push(...res.data.data)
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
  margin-left: 50%
  height: 30%
  width: 20%
  text-align: center
  color: white
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 2rem


.admin-show-base-game-content
  height: 30rem


</style>