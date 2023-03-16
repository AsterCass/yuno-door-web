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

    <div class="column admin-show-base-game-content">

      <div class="col-2 admin-show-base-title">
        <q-icon name="fa-solid fa-trophy" size="1em"/>
        游戏分享
      </div>
      <div class="col-10">
        <CaskGameSimpleList/>
      </div>
      <!--      <div class="col-10 row justify-start">-->
      <!--        <div class="col-4 row admin-show-game-cell">-->
      <!--          <q-btn @click="changeHex" :ripple="false" unelevated class="col-12 admin-show-game-btn">-->
      <!--            <q-carousel-->
      <!--                transition-prev="scale"-->
      <!--                transition-next="scale"-->
      <!--                transition-duration=1000-->
      <!--                animated-->
      <!--                infinite-->
      <!--                v-model="hex"-->
      <!--                height=100%-->
      <!--                style="border-radius: 2rem"-->
      <!--                class="admin-show-game-cell-carousel">-->
      <!--              <q-carousel-slide class="admin-show-game-cell-inner" name="hex"-->
      <!--                                :img-src="require('../assets/img/Hextris.png')"/>-->
      <!--              <q-carousel-slide class="admin-show-game-cell-inner" name="hexDesc">-->
      <!--                <div class="admin-show-game-cell-desc">-->
      <!--                  <h6>-->
      <!--                    {{ gameInfo.hexDesc.title }}-->
      <!--                  </h6>-->
      <!--                  <p v-for="count in gameInfo.hexDesc.desc" :key="count">-->
      <!--                    {{ count }}-->
      <!--                  </p>-->
      <!--                  <q-btn label="Go Play"/>-->
      <!--                </div>-->
      <!--              </q-carousel-slide>-->
      <!--            </q-carousel>-->

      <!--          </q-btn>-->
      <!--        </div>-->


      <!--        <div class="col-4 row admin-show-game-cell">-->
      <!--          <q-btn @click="changeMik" :ripple="false" unelevated class="col-12 admin-show-game-btn">-->
      <!--            <q-carousel-->
      <!--                transition-prev="scale"-->
      <!--                transition-next="scale"-->
      <!--                transition-duration=1000-->
      <!--                animated-->
      <!--                infinite-->
      <!--                v-model="mik"-->
      <!--                height=100%-->
      <!--                style="border-radius: 2rem"-->
      <!--                class="admin-show-game-cell-carousel">-->
      <!--              <q-carousel-slide class="admin-show-game-cell-inner" name="mik"-->
      <!--                                :img-src="require('../assets/img/Mikutap.png')"/>-->
      <!--              <q-carousel-slide class="admin-show-game-cell-inner" name="mikDesc">-->
      <!--                <div class="admin-show-game-cell-desc">-->
      <!--                  <h6>-->
      <!--                    {{ gameInfo.mikDesc.title }}-->
      <!--                  </h6>-->
      <!--                  <p v-for="count in gameInfo.mikDesc.desc" :key="count">-->
      <!--                    {{ count }}-->
      <!--                  </p>-->
      <!--                  <q-btn label="Go Play"/>-->
      <!--                </div>-->
      <!--              </q-carousel-slide>-->
      <!--            </q-carousel>-->

      <!--          </q-btn>-->
      <!--        </div>-->


      <!--      </div>-->


    </div>

  </div>
</template>

<script setup>

import {ref} from "vue";
import CaskArticleListCard from "@/components/CaskArticleListCard.vue";
import CaskGameSimpleList from "@/components/CaskGameSimpleList.vue";

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliquafdasfdasfsdafda fasdfjdlsaf' +
    'lafjldasjflasdfjdsjf fljadslfjdslajfl fldsjafldsj fl lfjasdlfjdsal f fdlasjfldasj  fljdsaldfj flasjfdlj' +
    'fdasljfldsa lfjasdlf lafjl flsajf ldsajfl fjslafj lasjfl lfj lsa flajf la.')
const items = ref([{key: lorem.value}, {key: lorem.value}, {key: lorem.value}])


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