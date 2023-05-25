<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar class="row justify-between">
      <div class="col-4 row justify-start">
        <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="home" to="/"/>
        <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book-bookmark" label="essay" to="/essay/list"/>
        <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book" label="article" to="/article/list"/>
        <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-clapperboard" label="video" to="/video/collection"/>
      </div>
      <div class="col-4 row justify-center">
        <q-toolbar-title shrink>Aster Casc</q-toolbar-title>
      </div>
      <div class="col-4 row justify-end">
        <LoginUserAvatar/>
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup>
import LoginUserAvatar from "@/components/LoginUserAvatar.vue";
import {defineProps} from "vue";


defineProps({
  headerVisible: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";
@import "@/styles/cask-dialog-style.scss";
@import "@/styles/cask-primary-style.scss";


</style>