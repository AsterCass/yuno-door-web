<template>

  <q-card class="admin-steam-game-card">

    <q-card-section class="row">
      <div class="admin-steam-game-card-img">
        <q-img :src="checkedImgUrl" :ratio="32/15" alt="some thing"
               style="border-radius: 1rem" class="shadow-15">
          <div v-show="!checkImgUrlRes" class="absolute-full flex flex-center admin-steam-game-card-img-not-found">
            Not Found
          </div>
        </q-img>
      </div>
      <div class="col q-ml-md col-12 col-lg">
        <h6 class="col-12">
          {{ null === gameIntro.gameName ? gameIntro.dealName : gameIntro.gameName }}
        </h6>

        <div class="q-my-xs col-6" v-if="0 !== gameIntro.curPrice">
          <div class="cur-price" v-if="null !== gameIntro.regularPrice">
            常规国区价格：{{ gameIntro.regularPrice }} 元
          </div>
          <div class="cur-price" v-else>
            常规国区价格：未收录
          </div>
          <div class="lowest-price" v-if="null !==  gameIntro.lowestPrice">
            最低国区价格：{{ gameIntro.lowestPrice }} 元
          </div>
          <div class="lowest-price" v-else>
            最低国区价格：未收录
          </div>
          <div v-if="null !==  gameIntro.lowestPriceTime">
            首次最低价格时间：{{ gameIntro.lowestPriceTime }}
          </div>
          <div v-else>
            首次最低价格时间：未收录
          </div>
          <div v-if="null != gameIntro.review"
               v-html="gameIntro.review.replace('。', '')"
               class="text-right" style="font-size: .8rem; color: #d2a017"></div>
        </div>
        <div class="q-my-xs col-6" v-else>
          <div class="free-price">
            免费开玩
          </div>
        </div>


        <div class="col-6 row justify-end">
          <q-btn class="admin-steam-game-card-store-btn q-ma-md" no-caps target="_blank"
                 :href="gameIntro.storeUrl">
            Steam商店
          </q-btn>
          <q-btn class="admin-steam-game-card-store-btn q-ma-md" no-caps target="_blank"
                 @click="toShowGameDetail">
            游戏详情
          </q-btn>

        </div>

      </div>
    </q-card-section>

  </q-card>

</template>

<script setup>

import {defineProps, onMounted, ref} from "vue";
import {checkUrlAvailable} from "@/api/steam";
import emitter from "@/utils/bus";

const props = defineProps({
  gameIntro: {
    steamId: "",
    gameName: "",
    imageUrl: "",
    dealName: "",
    lowestPriceTime: "",
    storeUrl: "",
    curPrice: 0.0,
    regularPrice: 0.0,
    lowestPrice: 0.0,
    review: "",
  },
  needCheck: {
    type: Boolean,
    default: false
  },
});

let checkedImgUrl = ref("")
let checkImgUrlRes = ref(true)


//如果想在js中直接消除由于链接404导致的控制台报错，参考
//https://stackoverflow.com/questions/4500741/suppress-chrome-failed-to-load-resource-messages-in-console
//我看来下，比较麻烦，就在后端处理了，保证前端拿到的url都是后端校验过的
function checkUrlAvailableFinishMethod() {
  if (props.needCheck) {
    let param = {url: props.gameIntro.imageUrl}
    checkUrlAvailable(param).then(res => {
      if (200 === res.status && 200 === res.data.status && res.data.data) {
        checkedImgUrl.value = props.gameIntro.imageUrl
      } else {
        checkImgUrlRes.value = false
      }
    })
  } else {
    checkedImgUrl.value = props.gameIntro.imageUrl
  }
}


function toShowGameDetail() {
  emitter.emit("showGameDetail", props.gameIntro.steamId)
}

onMounted(() => {
  checkUrlAvailableFinishMethod()
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-steam-game-card
  color: $cask_dark_jungle_green
  background-color: white
  box-shadow: 5 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)
  border-radius: 1rem
  font-family: Roboto Slab, sans-serif
  font-size: .9rem
  line-height: 1.625

  .cur-price
    color: $cask_real_ruddy_brown

  .lowest-price
    color: $cask_second_deep

  .free-price
    color: $cask_third
    font-weight: 600
    font-size: 1.2rem

  h6
    color: black
    opacity: 0.75
    font-size: 1.3rem
    font-weight: 600
    margin: 0
    text-transform: unset

.admin-steam-game-card-img
  transform: translateY(-15%)
  border-radius: 1rem
  width: 25rem
  margin: -1.5rem 0 0  -2rem

.admin-steam-game-card-img-not-found
  font-size: 2rem


.admin-steam-game-card-store-btn
  text-align: center
  color: white
  font-size: 1rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 2rem


</style>