<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar class="cask-video-toolbar">
        <q-btn
            flat dense round
            @click="toggleLeftDrawer"
            aria-label="Menu" icon="menu" class="q-mx-md"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="fa-solid fa-clapperboard" color="secondary" size="28px"/>
          <q-toolbar-title shrink class="simple-header">
            AsterCasc Video
          </q-toolbar-title>
        </q-btn>

        <q-space/>

        <q-input class="cask-video-search" dense standout="bg-secondary" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat icon="notifications" class="q-mr-xs">
            <q-badge color="secondary" text-color="white" floating>
              1
            </q-badge>
          </q-btn>
          <LoginUserAvatar/>
        </div>
      </q-toolbar>
    </q-header>


    <q-drawer
        v-model="leftDrawerOpen"
        bordered
        behavior="mobile"
        @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit cask-video-drawer">

        <q-toolbar class="q-my-sm">
          <q-toolbar-title class="row items-center">
            <q-icon name="fa-solid fa-clapperboard" color="secondary" size="32px"/>
            <q-toolbar-title shrink class="simple-header">
              AsterCasc Video
            </q-toolbar-title>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item class="cask-video-drawer-header simple-bold-little-title">
            <q-item-section>
              <q-item-label>视频集合</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable class="cask-video-drawer-item q-mb-sm">
            <q-item-section avatar>
              <q-icon name="fa-solid fa-box-open"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>公共视频</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable class="cask-video-drawer-item q-mb-sm">
            <q-item-section avatar>
              <q-icon name="fa-solid fa-user-secret"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>站长视频</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable class="cask-video-drawer-item q-mb-sm">
            <q-item-section avatar>
              <q-icon name="fa-solid fa-user"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>我的视频</q-item-label>
            </q-item-section>
          </q-item>


          <q-separator class="q-my-md"/>


          <q-item class="cask-video-drawer-header simple-bold-little-title">
            <q-item-section>
              <q-item-label>最新上线</q-item-label>
            </q-item-section>
          </q-item>


          <q-item v-for="videoCol in lastVideoColList" :key="videoCol.id"
                  clickable class="cask-video-drawer-item cask-video-drawer-latest-item q-mb-sm"
                  :style="{'background': `url(${videoCol.collectionImg}) no-repeat`, 'background-size': 'cover'}">
            <q-item-section>
              <q-item-label>{{ videoCol.collectionName }}</q-item-label>
            </q-item-section>
          </q-item>


        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="imagecontainer">

      </div>

      <router-view/>
    </q-page-container>


  </q-layout>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import LoginUserAvatar from "@/components/LoginUserAvatar.vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import emitter from "@/utils/bus";
import {getLoginData} from "@/utils/store";
import {getAllVideoCol} from "@/api/video";
import {customPageNP} from "@/utils/page";


let leftDrawerOpen = ref(false)
let search = ref('')
//user data
let userData = ref({
  id: "",
})
//latest video
let lastVideoColList = ref([
  {
    id: "",
    collectionName: "",
    collectionImg: "",
  }
])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

//登录通知
function loginMessageEventVideoCol(isOnLogin) {
  if (isOnLogin) {
    userData.value = getLoginData()
  }
}

//刷新数据
function refreshUserDataEventVideoCol(data) {
  if (data) {
    userData.value = data
  }
}

//最新视频
function getLatestVideo() {
  getAllVideoCol(customPageNP(0, 3)).then(res => {
    if (200 === res.status) {
      lastVideoColList.value = res.data
    }
  })
}

//初始化最新视频
function initLatestVideo() {
  lastVideoColList.value = []
}


onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //初始化最新视频数据
  initLatestVideo()
  //登录事件
  emitter.on("loginMessageEvent", loginMessageEventVideoCol)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserDataEventVideoCol)
  //更新最新视频数据
  getLatestVideo();

})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessageEventVideoCol)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserDataEventVideoCol)

})


</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";

.cask-video-toolbar {
  height: 4rem;

  .cask-video-search {
    width: 35%
  }
}

.cask-video-drawer-latest-item {
  text-align: center;
  color: white;
  text-shadow: 5px 5px 5px $cask_base_black, -5px 5px 5px $cask_base_black,
  5px -5px 5px $cask_base_black, -5px -5px 5px $cask_base_black;
}


</style>

<style lang="sass">
@import "@/styles/cask-little-mini-style.scss"


.cask-video-drawer

  .cask-video-drawer-header
    text-align: center

  .cask-video-drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px

    .q-icon
      color: $cask_base_black

    .q-item__label:not(.q-item__label--caption)
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem


</style>
