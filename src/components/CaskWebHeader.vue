<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar class="row justify-between">
      <div class="col-4 row justify-start">

        <q-btn class="headerBtn" flat dense stack no-caps icon="fa-solid fa-house" label="Home" to="/"/>

        <q-btn class="headerBtn" flat dense stack no-caps icon="fa-solid fa-photo-film" label="Media"
               v-on:mouseover="mediaMenuTouchOver" v-on:mouseleave="mediaMenuTouchLeave" @click="mediaMenuShow=true">
          <q-menu :model-value="mediaMenuShow"
                  v-on:mouseover="mediaMenuTouchOver" v-on:mouseleave="mediaMenuTouchLeave"
                  style="background-color:rgba(0,0,0,0);box-shadow:none;backdrop-filter: none"
                  transition-hide="fade" transition-duration="800" no-parent-event
                  self="top middle" :offset="[-100, 3]">
            <q-item>
              <q-card class="header-kit-card row q-pa-sm">

                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-book" label="Article备录" to="/article/list"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-book-bookmark" label="Essay题记" to="/essay/list"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-clapperboard" label="Video视频" to="/video/collection"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-headphones" label="Music音乐" @click="headerKitInDeveloping"/>
              </q-card>
            </q-item>
          </q-menu>
        </q-btn>

        <q-btn class="headerBtn" flat dense stack no-caps icon="fa-solid fa-toolbox" label="Kit"
               v-on:mouseover="kitMenuTouchOver" v-on:mouseleave="kitMenuTouchLeave" @click="kitMenuShow=true">
          <q-menu :model-value="kitMenuShow"
                  v-on:mouseover="kitMenuTouchOver" v-on:mouseleave="kitMenuTouchLeave"
                  style="background-color:rgba(0,0,0,0);box-shadow:none;backdrop-filter: none"
                  transition-hide="fade" transition-duration="800" no-parent-event
                  self="top middle" :offset="[-100, 3]">
            <q-item>
              <q-card class="header-kit-card row q-pa-sm">

                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-brands fa-square-steam" label="Steam游戏查询" to="/steam/search"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-object-group" label="SQL生成Kotlin类" to="/code/generator"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-face-grin-tongue-wink" label="表情包电子包浆" @click="headerKitInDeveloping"/>
                <q-btn class="col-6 subHeaderBtn q-my-sm" flat dense stack no-caps
                       icon="fa-solid fa-scissors" label="Audio在线剪辑" @click="headerKitInDeveloping"/>
              </q-card>
            </q-item>
          </q-menu>
        </q-btn>


        <q-btn class="headerBtn" flat dense stack no-caps icon="fa-solid fa-clipboard"
               label="Board" @click="headerKitInDeveloping"/>

      </div>
      <div class="col-4 row justify-center">
        <q-toolbar-title shrink style="font-family: Roboto Slab, sans-serif;letter-spacing: -.01rem">
          Aster Casc
        </q-toolbar-title>
        <q-btn class="q-mr-md" flat dense stack icon="fa-solid fa-sitemap" to="/profile">
          <q-tooltip class="roboto-slab normal-letter-span bg-secondary" :offset="[0, 5]">
            Website Profile
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-4 row justify-end">
        <LoginUserAvatar/>
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup>
import LoginUserAvatar from "@/components/LoginUserAvatar.vue";
import {defineProps, ref} from "vue";
import {delay} from "@/utils/delay-exe";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

defineProps({
  headerVisible: {
    type: Boolean,
    default: false
  }
})


//user menu
let onKitZone = ref(false)
let kitMenuShow = ref(false)
let onMediaZone = ref(false)
let mediaMenuShow = ref(false)


//感知菜单鼠标进入事件
function kitMenuTouchOver() {
  if (!mediaMenuShow.value) {
    onKitZone.value = true
    kitMenuShow.value = onKitZone.value
  }
}

function mediaMenuTouchOver() {
  if (!kitMenuShow.value) {
    onMediaZone.value = true
    mediaMenuShow.value = onMediaZone.value
  }
}

//感知菜单鼠标离开事件
function kitMenuTouchLeave() {
  onKitZone.value = false
  delay(300).then(() => {
    kitMenuShow.value = onKitZone.value
  })
}

function mediaMenuTouchLeave() {
  onMediaZone.value = false
  delay(300).then(() => {
    mediaMenuShow.value = onMediaZone.value
  })
}

//功能正在开发中
function headerKitInDeveloping() {
  notify({
    color: "cyan-9",
    message: "该功能正在开发中...",
    position: 'top-left',
    type: 'info',
    timeout: 2000
  })
}


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-dialog-style.scss"
@import "@/styles/cask-primary-style.scss"
@import "@/styles/cask-little-mini-style.scss"


.header-kit-card
  color: $cask_base_black
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 1rem

  font-family: Roboto Slab, sans-serif
  line-height: 1.625
  margin: 5%
  width: 300px
  min-height: 150px


</style>