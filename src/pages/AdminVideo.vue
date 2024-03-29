<template>
  <q-layout view="lHh Lpr fff">

    <q-header class="index-header">
      <q-toolbar class="cask-video-toolbar">
        <q-btn
            flat dense round
            @click="toggleLeftDrawer"
            aria-label="Menu" icon="menu" class="q-mx-md"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs"
               to="/video/collection">
          <q-icon name="fa-solid fa-clapperboard cask-text-secondary-deep-color" size="28px"/>
          <q-toolbar-title shrink class="simple-header">
            AsterCasc Video
          </q-toolbar-title>
        </q-btn>

        <q-space/>

        <q-input class="cask-video-search" dense standout="bg-green-10" v-model="searchColNameLike"
                 placeholder="名称检索" @keyup.enter="searchVideoCollection">
          <template v-slot:prepend>
            <q-icon v-if="searchColNameLike === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="clearVideoCollection"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
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
            <q-icon name="fa-solid fa-clapperboard cask-text-secondary-deep-color" size="32px"/>
            <q-toolbar-title shrink class="simple-header">
              AsterCasc Video
            </q-toolbar-title>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item class="cask-video-drawer-header simple-bold-little-title-secondary">
            <q-item-section>
              <q-item-label>视频集合</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="videoCate in videoColCategory" :key="videoCate.title"
                  clickable class="cask-video-drawer-item q-mb-sm">
            <q-item-section avatar>
              <q-icon :name="`${videoCate.icon}`"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ videoCate.title }}</q-item-label>
            </q-item-section>
          </q-item>


          <q-separator class="q-my-md"/>


          <q-item class="cask-video-drawer-header simple-bold-little-title-secondary">
            <q-item-section>
              <q-item-label>最新上线</q-item-label>
            </q-item-section>
          </q-item>


          <q-item v-for="videoCol in lastVideoColList" :key="videoCol.id"
                  @click="playVideoList(videoCol.id)"
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
      <router-view/>
    </q-page-container>


    <q-footer>
      <CopyrightFooter/>
    </q-footer>

    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>


    <q-page-sticky position="bottom-right" :offset="[50, 75]">
      <CaskWebChatFab/>
    </q-page-sticky>


  </q-layout>


</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import LoginUserAvatar from "@/components/LoginUserAvatar.vue";
import {getAllVideoCol, getVideoListByColId} from "@/api/video";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebChatFab from "@/components/CaskWebChatFab.vue";

//视频组跳转
const thisRouter = useRouter()
//notify
const notify = useQuasar().notify

function videoColWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

//variable
let leftDrawerOpen = ref(false)
let searchColNameLike = ref('')
//latest video
let lastVideoColList = ref([
  {
    id: "",
    collectionName: "",
    collectionImg: "",
  }
])
//public video
let publicVideoColList = ref([])
//my video
let myVideoColList = ref([])
//admin video
let adminVideoColList = ref([])
//col category
const videoColCategory = [
  {icon: "fa-solid fa-box-open", title: "公共视频", refer: publicVideoColList},
  {icon: "fa-solid fa-user-secret", title: "站长视频", refer: adminVideoColList},
  {icon: "fa-solid fa-user", title: "我的视频", refer: myVideoColList},
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

//最新视频
function getLatestVideo() {
  getAllVideoCol().then(res => {
    if (200 === res.status) {
      lastVideoColList.value = res.data
    }
  })
}

//初始化最新视频
function initLatestVideo() {
  lastVideoColList.value = []
}

//播放视频
function playVideoList(id) {
  if (!id || 0 === id.length) {
    videoColWarningNotify("视频不小心走丢啦，刷新试试吧")
    return
  }
  let param = {collectionId: id}
  getVideoListByColId(param).then(res => {
    const data = res.data
    if (data.status && 200 !== data.status) {
      videoColWarningNotify(data.message)
    } else if (data && 0 === data.length) {
      videoColWarningNotify("当前用户无权限访问，请联系站长授权")
    } else {
      thisRouter.push({
        path: `/video/play`,
        query: {colId: id, vdoId: data[0].id}
      })
    }
  })
}

//检索视频
function searchVideoCollection() {
  if (searchColNameLike.value) {
    thisRouter.push({
      path: "/video/collection",
      query: {isSearch: 1, videoColNameLike: searchColNameLike.value}
    })
  } else {
    thisRouter.push({
      path: "/video/collection"
    })
  }
}

//取消检索
function clearVideoCollection() {
  searchColNameLike.value = ''
  thisRouter.push({
    path: "/video/collection"
  })
}


onMounted(() => {
  //初始化最新视频数据
  initLatestVideo()
  //更新最新视频数据
  getLatestVideo();
})

onUnmounted(() => {

})


</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";
@import "@/styles/cask-primary-style.scss";

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
    margin-right: 36px
    transition-property: margin-right
    transition-duration: .3s

    .q-item__section--avatar
      padding-left: 12px

    .q-icon
      color: $cask_base_black

    .q-item__label:not(.q-item__label--caption)
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  .cask-video-drawer-item:hover
    margin-right: 12px


</style>
