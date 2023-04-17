<template>


  <div class="row admin-article-list-base">

    <div class="col-12 row justify-between admin-article-list-head">
      <div>
        <q-icon name="style" size="1em"/>
        {{ listName }}
      </div>
      <div class="justify-end admin-article-list-head-tag" :hidden="hideTagEnum">
        <q-toggle v-for="(item, index) in articleTagEnums" :key="index" keep-color
                  :color="item.color" :label="item.name" v-model="selection" :val="item.code"/>
      </div>
    </div>
    <q-infinite-scroll @load="onLoad" :offset="250" class="col-12 row justify-center" :disable="scrollDisable">
      <q-intersection transition="scale" once v-for="(item, index) in articleList" :key="index"
                      class="col-xs-10 col-lg-5" style="margin: 0.5rem">
        <CaskArticleListCard :intro="item"/>
      </q-intersection>
      <template v-slot:loading>
        <div class="row justify-center admin-article-list-loading">
          <q-spinner-cube color="dark" size="2rem"/>
        </div>
      </template>
    </q-infinite-scroll>

  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref, defineProps, watch} from "vue";
import emitter from '@/utils/bus';
import CaskArticleListCard from "@/views/CaskArticleListCard.vue";
import {getBlogList} from "@/api/base";
import {simplePage} from "@/utils/page";
import {articleTagEnums} from '@/utils/article-tag'

const props = defineProps({
  listName: {
    type: String,
    default: "列表"
  },
  listType: {
    type: Number,
    default: 1
  },
  hideTagEnum: {
    type: Boolean,
    default: true
  }
})

let selection = ref([])
let articleList = ref([])
let currentPage = ref(0)
let currentParam = ref({})
let scrollDisable = ref(true)

watch(selection, () => {
  searchArticleListMethod()
})

function onLoad(index, done) {
  ++currentPage.value
  //参数插入
  currentParam.value.articleType = props.listType
  getBlogList(simplePage(currentParam.value, currentPage.value)).then(res => {
    if (null != res.data.data && 0 !== res.data.data.length) {
      articleList.value.push(...res.data.data)
      done()
    } else {
      //获取所有数据后关闭无限滚动
      scrollDisable.value = true
    }
  })
}

function searchArticleListMethod(keywordParam) {
  //数据重置
  currentPage.value = 1
  articleList.value.splice(0)
  //参数插入
  currentParam.value.keyword = keywordParam
  currentParam.value.articleType = props.listType
  //标签参数
  if (0 !== selection.value.length) {
    // Object.defineProperty(currentParam.value, tags, )
    currentParam.value.tags = selection.value.join()
  } else {
    currentParam.value.tags = null
  }
  getBlogList(simplePage(currentParam.value, currentPage.value)).then(res => {
    articleList.value.push(...res.data.data)
    //首次请求完成后开启无限滚动
    scrollDisable.value = false
  })
}

onMounted(() => {
  emitter.on('searchArticleList', searchArticleListMethod)
  searchArticleListMethod()
})

onUnmounted(() => {
  emitter.off('searchArticleList')
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-article-list-head-tag
  font-family: Roboto Slab, sans-serif
  font-size: 1rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  font-weight: 400
  max-width: 30%

.admin-article-list-head
  font-family: Roboto Slab, sans-serif
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400

.admin-article-list-base
  padding: 1%

.admin-article-list-loading
  margin: 2rem 50rem

</style>