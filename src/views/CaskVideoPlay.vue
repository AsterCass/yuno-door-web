<template>
  <div class="video-play-frame row">

    <div class="row justify-end video-play-epi col-md-4 col-12" v-show="!smallScreen">
      <q-scroll-area class="article-anchors" delay="100">
        <h1>播放列表</h1>
        <q-list>
          <q-item clickable v-ripple
                  v-for="item in vdoListData"
                  :key="item.id"
                  @click="playThisVideo(item)">
            <q-item-section>
              <p>
                {{ item.videoName }}
              </p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>

    <div class="col justify-start video-play-admin col-md-8 col-12">
      <CaskVideoPlayer :video-data="vdoData"/>
    </div>


  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import emitter from "@/utils/bus";
import {getLoginData} from "@/utils/store";
import {useRouter} from "vue-router";
import {getVideoListByColId} from "@/api/video";
import {useQuasar} from "quasar";
import CaskVideoPlayer from "@/components/CaskVideoPlayer.vue";

//router
const thisRouter = useRouter()
//notify
const notify = useQuasar().notify

function videoPlayWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

//props
const props = defineProps({
  colId: {
    type: String,
    default: ""
  },
  vdoId: {
    type: String,
    default: ""
  }
})
//小屏幕
let smallScreen = ref(false)
//用户数据
let userData = ref({
  id: "",
})
//视频数据
let vdoData = ref({
  id: '',
  videoName: '',
  videoRes: '',
})
//视频组数据
let vdoListData = ref([])

//数据初始化
function initVideoPlayData() {
  userData.value = getLoginData()
  vdoData.value = {}
}

//获取视频数据
function getCollectionVideos() {
  let userId = userData.value.id
  if (!userId || 0 === userId.length) {
    thisRouter.push({
      path: '/notLogin'
    })
  }
  let param = {collectionId: props.colId}
  getVideoListByColId(param).then(res => {
    const data = res.data
    if (data.status && 200 !== data.status) {
      videoPlayWarningNotify(data.message)
    } else if (data && 0 === data.length) {
      thisRouter.push({
        path: '/noAuth'
      })
    } else {
      vdoListData.value = data
      vdoData.value = data[0]
      emitter.emit('startPlayVideo', vdoData.value)
    }
  })
}

//播放
function playThisVideo(videoData) {
  vdoData.value = videoData
  emitter.emit('startPlayVideo', vdoData.value)
}

//登录通知
function loginMessageEventVideoPlay(isOnLogin) {
  if (isOnLogin) {
    userData.value = getLoginData()
  } else {
    userData.value = {}
  }
  getCollectionVideos()
}

//刷新数据
function refreshUserDataEventVideoPlay(data) {
  if (data) {
    userData.value = data
  }
  getCollectionVideos()
}

//屏幕改变事件
function screenEventHandler() {
  //小屏幕判断
  smallScreen.value = document.documentElement.clientWidth < 1024
}

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //数据初始化
  initVideoPlayData()
  //视频数据获取
  getCollectionVideos()
  //登录事件
  emitter.on("loginMessageEvent", loginMessageEventVideoPlay)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserDataEventVideoPlay)
  //添加监控屏幕改变事件
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessageEventVideoPlay)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserDataEventVideoPlay)
})

</script>

<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "@/styles/cask-dialog-style.scss";
@import "@/styles/cask-primary-style.scss";

.video-play-frame {
  margin: 3% 7%;


  .video-play-admin {
    padding: 2%;
  }

  .video-play-epi {
    padding: 2%;

    .video-play-epi-card {
      min-height: 20%;
      max-height: 50%;
      position: fixed;
      text-align: center;
      padding: 2%;
      border-radius: 5%;
    }

  }
}

</style>