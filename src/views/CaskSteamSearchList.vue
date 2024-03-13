<template>

  <q-dialog v-model="gameDetailShow" position="left" maximized>


    <div class="game-detail-out">
      <div class="game-detail-main" :style="`height: ${gameDetailHeight};width:${gameDetailWidth};`">


        <div v-show="inLoadDetailData" class="col-12 row">
          <div class="col-12 row justify-center q-mb-xl" style="height: 6rem">
            <q-spinner-cube size="6rem" color="black"/>
          </div>
          <div class="col-12 row justify-center text-h5">
            数据查询中...
          </div>
        </div>


        <q-scroll-area v-show="!inLoadDetailData" delay="100"
                       :style="`height: ${gameDetailMainHeight};width:${gameDetailMainWidth};`">

          <h1>
            {{ gameDetailData.gameName }}
          </h1>

          <div class="steam-game-desc">
            <p>
              {{ gameDetailData.gameShortDesc }}
            </p>
            <q-carousel
                class="q-mt-md rounded-borders q-mx-md"
                :style="`height: ${gameDetailPicHeight};`"
                animated
                v-model="gameDetailCurPic"
                arrows
                infinite
            >
              <q-carousel-slide
                  class="q-pa-xs bg-grey-10 shadow-10"
                  v-for="(item, index) in gameDetailData.picList" :key="item" :name="index">
                <div class="row fit">
                  <q-img class="rounded-borders col-12 full-height"
                         :src="item.url" :placeholder-src="item.thumbnailUrl">
                  </q-img>
                </div>
              </q-carousel-slide>


            </q-carousel>

            <div v-if="gameDetailData.gameTagList" class="q-my-lg q-mx-md">
              <q-chip v-for="item in gameDetailData.gameTagList" :key="item"
                      square class="glossy shadow-3" color="grey-10" text-color="grey-4"
                      style="font-weight: 500;">
                {{ item }}
              </q-chip>
            </div>

            <div class="steam-game-desc-title">
              游戏详情
            </div>
            <div v-html="gameDetailData.gameDesc"></div>

            <div v-if="gameDetailData.supportLang">
              <div class="steam-game-desc-title">
                语言支持
              </div>
              <div v-html="gameDetailData.supportLang"></div>
            </div>


            <div v-if="gameDetailData.recommendedReq">
              <div class="steam-game-desc-title">
                推荐配置
              </div>
              <div v-html="gameDetailData.recommendedReq"></div>
            </div>

            <div v-if="gameDetailData.minimumReq">
              <div class="steam-game-desc-title">
                最低配置
              </div>
              <div v-html="gameDetailData.minimumReq"></div>
            </div>

            <div v-if="gameDetailData.gameReleaseTime" class="row justify-end q-mr-md">
              <h6>
                游戏发行日期：{{ gameDetailData.gameReleaseTime }}
              </h6>
            </div>

          </div>

        </q-scroll-area>

      </div>
    </div>
  </q-dialog>


  <div class="row" style="padding: 5%">
    <div class="col-12 row justify-center">

      <CaskSteamGameCard v-show="!inLoadData" class="col-7 justify-center" style="margin: 0 0 4rem 0;"
                         v-for="item in curGameList" :key="item"
                         :gameIntro="item" :need-check="needCheckImgUrl">
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
import {gameDetail, getPopularGames, searchGames} from "@/api/steam";
import emitter from "@/utils/bus";
import {delay} from "@/utils/delay-exe";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

let topGameList = ref([])
let curGameList = ref([])
let inLoadData = ref(false)
let needCheckImgUrl = ref(false)

let gameDetailShow = ref(false)
let gameDetailHeight = ref("0px")
let gameDetailWidth = ref("0px")
let gameDetailMainHeight = ref("0px")
let gameDetailMainWidth = ref("0px")
let gameDetailCurPic = ref(0)

let inLoadDetailData = ref(true)
let gameDetailPicHeight = ref("0px")
let gameDetailData = ref(
    {
      appId: "",
      gameName: "",
      gameDesc: "",
      gameShortDesc: "",
      supportLang: "",
      minimumReq: "",
      recommendedReq: "",
      gameTagList: [],
      picList: [{
        thumbnailUrl: "",
        url: "",
      }],
      gameReleaseTime: "",
    },
)


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
    needCheckImgUrl.value = false
    inLoadData.value = false
    return
  }
  let param = {name: searchGameKeyword}
  searchGames(param).then(res => {
    if (200 === res.status && 200 === res.data.status) {
      curGameList.value.push(...res.data.data)
      //20240313 改为直接从steam拉取图片数据，不再需要校验图片合法性
      needCheckImgUrl.value = false
      inLoadData.value = false
    } else {
      notify({
        message: "呜呜呜😭~小服务器流量访问超限了，客官待会再来吧",
        position: 'top',
        type: 'warning',
        timeout: 3000
      })
      needCheckImgUrl.value = false
      inLoadData.value = false
    }
  })
}

function showGameDetailMethod(steamId) {
  gameDetailShow.value = true
  inLoadDetailData.value = true
  gameDetailCurPic.value = 0
  gameDetail(steamId).then(res => {
    if (200 === res.status && 200 === res.data.status) {
      gameDetailData.value = res.data.data
      delay(200).then(() => {
        inLoadDetailData.value = false
      })
    } else if (200 === res.status) {
      gameDetailShow.value = false
      notify({
        message: "呜呜呜😭~解析失败了，客官请到steam商店或查看详情吧",
        position: 'top',
        color: "green-10",
        textColor: "white",
        timeout: 3000
      })
    } else {
      gameDetailShow.value = false
      notify({
        message: "服务消失啦，请联系管理员",
        position: 'top-center',
        type: 'negative',
        timeout: 1000
      })
    }
  })
}

function setBaseData() {
  gameDetailHeight.value = Math.round(0.8 * document.documentElement.clientHeight) + 'px'
  gameDetailWidth.value = Math.round(0.55 * document.documentElement.clientWidth) + 'px'

  gameDetailMainHeight.value = Math.round(0.75 * document.documentElement.clientHeight) + 'px'
  gameDetailMainWidth.value = Math.round(0.55 * document.documentElement.clientWidth) + 'px'

  gameDetailPicHeight.value = Math.round(0.55 * document.documentElement.clientHeight) + 'px'
}

onMounted(() => {
  setBaseData()
  emitter.on('searchArticleList', searchGameListMethod)
  emitter.on('showGameDetail', showGameDetailMethod)
  searchPopularGameMethod()

})

onUnmounted(() => {
  emitter.off('searchArticleList', searchGameListMethod)
  emitter.off('showGameDetail', showGameDetailMethod)
})

</script>

<style lang="scss" scoped>
@import "@/styles/game.html.css";
@import "@/styles/cask-primary-style.scss";

.game-detail-out {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;

  .game-detail-main {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    backdrop-filter: saturate(200%) blur(30px);
    opacity: 0.95;

    h1 {
      font-size: 1.875rem;
      line-height: 1.375;
      font-weight: 600;
      color: $cask_dark_jungle_green;
      margin-bottom: 1rem;
      margin-top: 0;
      font-family: Roboto Slab, sans-serif;
      text-transform: unset;
      text-align: center;
    }

  }

}

</style>