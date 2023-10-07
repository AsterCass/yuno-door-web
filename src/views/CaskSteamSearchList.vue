<template>
  <div class="row" style="padding: 5%">

    <div class="col-12 row justify-center">

      <CaskSteamGameCard class="col-7 justify-center" style="margin: 0 0 4rem 0;"
                         v-for="item in topGameList" :key="item"
                         :gameIntro="item">
      </CaskSteamGameCard>

    </div>


  </div>
</template>

<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import CaskSteamGameCard from "@/views/CaskSteamGameCard.vue";
import {getPopularGames} from "@/api/steam";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

let topGameList = ref([])

function searchPopularGameMethod() {
  getPopularGames().then(res => {
    if (200 === res.status) {
      topGameList.value.push(...res.data.data)
    }
  })
}

function searchGameListMethod() {
  notify({
    color: "cyan-9",
    message: "该功能正在开发中...",
    position: 'top-left',
    type: 'info',
    timeout: 2000
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