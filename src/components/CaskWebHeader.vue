<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="home" to="/"/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book-bookmark" label="essay" to="/essay/list"/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book" label="article" to="/article/list"/>
      <q-toolbar-title>Aster Casc</q-toolbar-title>
      <q-btn label="登录" @click="showLoginDiaLog" class="head-login"/>
    </q-toolbar>
  </q-header>
  <CaskLogin/>
</template>

<script setup>

import {defineProps} from "vue";
import CaskLogin from "@/components/CaskLogin.vue";
import emitter from "@/utils/bus";

defineProps({
  headerVisible: {
    type: Boolean,
    default: false
  }
})

function showLoginDiaLog() {
  emitter.emit('showLoginDiaLogEven')
}

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.head-login
  margin: 0.5rem
  text-align: center
  color: white
  min-width: 5rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 0.8rem

.index-header
  left: 0
  right: 0
  top: 20px
  margin: auto
  width: 80%
  color: $cask_base_black
  text-align: center
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 15px

  .headerBtn
    font-size: 0.8rem
    padding-top: 0.8rem
    font-weight: bold

</style>