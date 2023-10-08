<template>

  <q-card class="admin-steam-game-card">

    <q-card-section class="row">
      <div class="admin-steam-game-card-img">
        <q-img :src="gameIntro.imageUrl" :ratio="32/15" alt="some thing"
               style="border-radius: 1rem" class="shadow-15">
          <template v-slot:error>
            <div class="absolute-full flex flex-center admin-steam-game-card-img-not-found">
              Not Found
            </div>
          </template>
        </q-img>
      </div>
      <div class="col q-ml-md col-12 col-lg">
        <h6 class="col-12">
          {{ gameIntro.dealName }}
        </h6>

        <div class="q-my-xs col-6">
          <div class="cur-price">
            当前国区价格：{{ gameIntro.curPrice }} 元
          </div>
          <div class="lowest-price">
            最低国区价格：{{ gameIntro.lowestPrice }} 元
          </div>
          <div>
            首次最低价格时间：{{ gameIntro.lowestPriceTime }}
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

import {defineProps} from "vue";
import emitter from "@/utils/bus";

const props = defineProps({
  gameIntro: {
    steamId: "",
    imageUrl: "",
    dealName: "",
    lowestPriceTime: "",
    storeUrl: "",
    curPrice: 0.0,
    lowestPrice: 0.0,
  },
});

function toShowGameDetail() {
  emitter.emit("showGameDetail", props.gameIntro.steamId)
}

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