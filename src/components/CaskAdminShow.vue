<template>
  <div class="admin-show-base">

    <div class="column admin-show-base-row">
      <div class="col-2 admin-show-base-title">
        <q-icon name="style" size="1em"/>
        技术备录
      </div>
      <div class="row col-10">
        <div v-for="(item, index) in items" :key="index" class="col-3" style="margin: 1rem">
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
        <div v-for="(item, index) in items" :key="index" class="col-3" style="margin: 1rem">
          <CaskArticleListCard :intro="item"/>
        </div>
        <div class="col-2 column justify-center" style="margin: 1rem">
          <q-btn label="更多" to="/article/list" class="admin-show-base-go"/>
        </div>
      </div>
    </div>

    <q-separator spaced="1.5rem" size="0.05rem" inset/>

    <div class="column test">

      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-trophy" size="1em"/>
        游戏分享
      </div>

      <div class="col-10 row justify-start">
        <div class="col-4" style="margin: 1rem">
          <q-btn @click="change" :ripple="false" class="admin-show-game-cell">
            <q-carousel
                transition-prev="flip-right"
                transition-next="flip-right"
                animated
                v-model="slide"
                height=18rem
                class="admin-show-game-cell-inner"
            >
              <q-carousel-slide class="admin-show-game-cell-inner" name="style"
                                :img-src="require('../assets/img/Hextris.png')"/>
              <q-carousel-slide class="admin-show-game-cell-inner" name="map"
                                :img-src="require('../assets/img/Hextris.png')"/>
            </q-carousel>
          </q-btn>
        </div>
        <div class="col-4" style="margin: 1rem">
          <q-btn @click="change" :ripple="false" class="admin-show-game-cell">
            <q-carousel
                transition-prev="flip-right"
                transition-next="flip-right"
                animated
                v-model="slide"
                height=18rem
                class="admin-show-game-cell-inner"
            >
              <q-carousel-slide class="admin-show-game-cell-inner" name="style"
                                :img-src="require('../assets/img/Mikutap.png')"/>
              <q-carousel-slide class="admin-show-game-cell-inner" name="map"
                                :img-src="require('../assets/img/Mikutap.png')"/>
            </q-carousel>
          </q-btn>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>

import {ref} from "vue";
import CaskArticleListCard from "@/components/CaskArticleListCard.vue";

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliquafdasfdasfsdafda fasdfjdlsaf' +
    'lafjldasjflasdfjdsjf fljadslfjdslajfl fldsjafldsj fl lfjasdlfjdsal f fdlasjfldasj  fljdsaldfj flasjfdlj' +
    'fdasljfldsa lfjasdlf lafjl flsajf ldsajfl fjslafj lasjfl lfj lsa flajf la.')
const items = ref([{key: lorem.value}, {key: lorem.value}, {key: lorem.value}])
const slide = ref('style')

function change() {
  if (slide.value === 'style') {
    slide.value = 'map'
  } else {
    slide.value = 'style'
  }
}


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-show-base
  padding: 2%

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

.admin-show-game-cell
  padding: 0
  border-radius: 2rem

.admin-show-game-cell-inner
  width: 36rem
  border-radius: 2rem

.admin-show-base-row
  min-height: 20rem

</style>