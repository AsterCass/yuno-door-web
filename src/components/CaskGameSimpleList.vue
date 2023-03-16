<template>
  <div class="row justify-start admin-show-game-out">
    <div class="col-4 row admin-show-game-cell">
      <q-btn @click="changeHex" :ripple="false" unelevated class="col-12 admin-show-game-btn">
        <q-carousel
            transition-prev="scale"
            transition-next="scale"
            transition-duration=1000
            animated
            infinite
            v-model="hex"
            height=100%
            style="border-radius: 2rem"
            class="admin-show-game-cell-carousel">
          <q-carousel-slide class="admin-show-game-cell-inner" name="hex"
                            :img-src="require('../assets/img/Hextris.png')"/>
          <q-carousel-slide class="admin-show-game-cell-inner" name="hexDesc">
            <div class="admin-show-game-cell-desc">
              <h6>
                {{ gameInfo.hexDesc.title }}
              </h6>
              <p v-for="count in gameInfo.hexDesc.desc" :key="count">
                {{ count }}
              </p>
              <q-btn href="https://game.astercasc.com/G-Mikutap/" target="_blank" label="Go Play"/>
            </div>
          </q-carousel-slide>
        </q-carousel>

      </q-btn>
    </div>


    <div class="col-4 row admin-show-game-cell">
      <q-btn @click="changeMik" :ripple="false" unelevated class="col-12 admin-show-game-btn">
        <q-carousel
            transition-prev="scale"
            transition-next="scale"
            transition-duration=1000
            animated
            infinite
            v-model="mik"
            height=100%
            style="border-radius: 2rem"
            class="admin-show-game-cell-carousel">
          <q-carousel-slide class="admin-show-game-cell-inner" name="mik"
                            :img-src="require('../assets/img/Mikutap.png')"/>
          <q-carousel-slide class="admin-show-game-cell-inner" name="mikDesc">
            <div class="admin-show-game-cell-desc">
              <h6>
                {{ gameInfo.mikDesc.title }}
              </h6>
              <p v-for="count in gameInfo.mikDesc.desc" :key="count">
                {{ count }}
              </p>
              <q-btn href="https://game.astercasc.com/G-Hextris/" target="_blank" label="Go Play"/>
            </div>
          </q-carousel-slide>
        </q-carousel>

      </q-btn>
    </div>


  </div>
</template>

<script setup>

import {ref} from "vue";
import gameInfo from "@/constant/game-show-desc"

const hex = ref('hex')
const mik = ref('mik')

function changeHex() {
  if (hex.value === 'hex') {
    hex.value = 'hexDesc'
  } else {
    hex.value = 'hex'
  }
}

function changeMik() {
  if (mik.value === 'mik') {
    mik.value = 'mikDesc'
  } else {
    mik.value = 'mik'
  }
}

</script>

<style lang="sass" scoped>


.admin-show-game-out
  height: 100%

  .admin-show-game-cell
    margin: 1rem
    border-radius: 2rem

    .admin-show-game-btn
      padding: 0
      border-radius: 2rem

      .admin-show-game-cell-carousel
        width: 100%

        .admin-show-game-cell-inner
          width: 100%
          text-align: center

          .admin-show-game-cell-desc
            width: 100%
            height: 100%
            padding: 1rem

</style>