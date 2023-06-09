<template>
  <q-card class="admin-article-list-card">
    <q-card-section class="row">
      <div class="col-8">
        <div class="admin-article-list-card-title">
          <h6> {{ intro.articleTitle }}</h6>
        </div>
      </div>
      <div class="col-4 row justify-end">
        <q-avatar class="admin-article-list-card-head">
          <q-img :src="require('../assets/img/head.jpg')"/>
        </q-avatar>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="admin-article-list-card-brief">
        {{ intro.articleBrief }}
      </div>

    </q-card-section>
    <q-separator spaced=".25rem" size="0.05rem" inset/>
    <q-card-section class="row justify-between">
      <div class="col-8">
        <div class="text-subtitle2">创建时间：{{ intro.createTime }}</div>
        <div class="text-subtitle2">更新时间：{{ intro.updateTime }}</div>
      </div>
      <div class="col-4">
        <q-btn class="admin-article-list-card-in"
               :to="`/article/detail?articleId=${intro.id}`" target="_blank">Go
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col admin-article-list-card-tag">
        <q-icon v-for="(item, index) in articleTagDesList" :key="index" name="fa-solid fa-bookmark" size="2rem"
                :color="item.color">
          <q-tooltip transition-show="rotate" transition-hide="rotate"
                     anchor="top middle" self="top middle"
                     :style="`color:white;background-color: ${item.rbg}`">
            {{ item.name }}
          </q-tooltip>
        </q-icon>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps, ref} from "vue";
import {getArticleTagDescList} from "@/utils/article-tag";

const props = defineProps({
  intro: {
    id: "",
    articleTitle: "",
    articleBrief: "",
    articleTagList: [],
    createTime: "",
    updateTime: "",
  },
});

let articleTagDesList = ref(getArticleTagDescList(props.intro.articleTagList))


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-article-list-card
  color: $cask_dark_jungle_green
  background-color: white
  box-shadow: 5 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)
  border-radius: 1rem
  font-size: 1rem
  line-height: 1.625
  margin: 6%

.admin-article-list-card-brief
  word-wrap: break-word
  -webkit-box-orient: vertical
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 3


.admin-article-list-card-title
  padding: 1rem
  text-align: left
  transform: translateY(-15%)
  margin: -1.5rem 0 0  -2rem
  width: fit-content
  background-image: linear-gradient(195deg, #42424a, #191919)
  color: $cask_base_white
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4)
  border-radius: 1rem

  h6
    font-size: 1.4rem
    font-weight: 600
    color: white
    margin: 0
    font-family: Roboto Slab, sans-serif
    text-transform: unset

.admin-article-list-card-tag
  height: 2rem
  margin: 0 0 -2rem 0

.admin-article-list-card-in
  text-align: center
  color: white
  background-image: linear-gradient(195deg, #42424a, #191919)
  margin-bottom: -3rem
  width: 80%
  height: 100%
  border-radius: 2rem


</style>