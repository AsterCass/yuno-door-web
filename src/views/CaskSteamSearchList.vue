<template>
  <div class="row" style="padding: 5%">

    <div class="col-12 row justify-center">

      <CaskSteamGameCard v-show="!inLoadData" class="col-7 justify-center" style="margin: 0 0 4rem 0;"
                         v-for="item in curGameList" :key="item"
                         :gameIntro="item">
      </CaskSteamGameCard>


      <div v-show="inLoadData" class="col-12 row">
        <div class="col-12 row justify-center q-mb-xl" style="height: 8rem">
          <q-spinner-cube size="8rem" color="black"/>
        </div>
        <div class="col-12 row justify-center text-h5">
          数据查询中...
        </div>
      </div>


    </div>


  </div>
</template>

<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import CaskSteamGameCard from "@/views/CaskSteamGameCard.vue";
import {getPopularGames, searchGames} from "@/api/steam";
import emitter from "@/utils/bus";

let topGameList = ref([])
let curGameList = ref([])
let inLoadData = ref(false)

function searchPopularGameMethod() {
  getPopularGames().then(res => {
    if (200 === res.status) {
      topGameList.value.push(...res.data.data)
      curGameList.value.splice(0, curGameList.value.length)
      curGameList.value.push(...res.data.data)
    }
  })
}

function searchGameListMethod(searchGameKeyword) {
  inLoadData.value = true
  curGameList.value.splice(0, curGameList.value.length)
  if (!searchGameKeyword) {
    curGameList.value.push(...topGameList.value)
    inLoadData.value = false
    return
  }
  let param = {name: searchGameKeyword}
  searchGames(param).then(res => {
    if (200 === res.status) {
      curGameList.value.push(...res.data.data)
      inLoadData.value = false
    }
  })
}

onMounted(() => {
  emitter.on('searchArticleList', searchGameListMethod)
  searchPopularGameMethod()
})

onUnmounted(() => {
  emitter.off('searchArticleList', searchGameListMethod)
})

</script>

<style scoped>

</style>