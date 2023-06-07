<template>
  <div class="video-play-frame row">

    <div class="row justify-end video-play-epi col-md-4 col-12" v-show="!smallScreen">

      <q-img class="article-anchors-special" :src="`${vdoColData.collectionImg}`" :fit="'cover'"
             style="filter: blur(50px)">
      </q-img>

      <q-scroll-area class="article-anchors video-play-list-scroll" delay="100">
        <h1 class="video-play-list-scroll-title">播放列表</h1>
        <q-list class="video-play-list-scroll-item">
          <q-item :id="item.id" clickable v-ripple
                  v-for="(item, index) in vdoListData"
                  :key="index"
                  @click="playThisVideo(index)"
                  :class="{'video-play-list-scroll-item-playing': item.id === vdoId}"
          >
            <q-item-section>
              <p>
                {{ vdoColData.collectionName }}&#32;:&#32;第&#32;{{ item.videoNum }}&#32;集
              </p>
            </q-item-section>
          </q-item>
        </q-list>


      </q-scroll-area>


    </div>

    <div v-if="dataFinish && colDataFinish" class="col justify-start video-play-admin col-md-8 col-12">
      <CaskVideoPlayerD/>
    </div>


  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import emitter from "@/utils/bus";
import {addCurVideoData, getLoginData} from "@/utils/store";
import {useRouter} from "vue-router";
import {getVideoListByColId, geVideoColDetail} from "@/api/video";
import {useQuasar} from "quasar";
import CaskVideoPlayerD from "@/components/CaskVideoPlayerD.vue";
import {extend} from "quasar";


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
//数据准备完成
let dataFinish = ref(false)
let colDataFinish = ref(false)
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
  videoCollectionId: '',
})
//视频组数据
let vdoListData = ref([])
//视频集数据
let vdoColData = ref({})

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
      let index = data.findIndex((vdo) => {
        return vdo.id === props.vdoId
      })
      if (-1 === index) {
        extend(true, vdoData.value, data[0])
      } else {
        extend(true, vdoData.value, data[index])
      }
      addCurVideoData(extend(true, vdoData.value,
          {colSize: vdoListData.value.length}))
      dataFinish.value = true
    }
  })
  geVideoColDetail(props.colId).then(res => {
        const data = res.data
        if (data.status && 200 !== data.status) {
          videoPlayWarningNotify(data.message)
        } else {
          addCurVideoData({colName: data.collectionName})
          vdoColData.value = data
          colDataFinish.value = true
        }
      }
  )
}

//视频数据加载完成后续操作
function execDataFinish() {
  //播放集数居中
  videoItemGo(props.vdoId)
}

//播放
function playThisVideo(index) {
  let videoData = vdoListData.value[index];
  extend(true, vdoData.value, addCurVideoData(videoData))
  thisRouter.push({
    query: {colId: vdoData.value.videoCollectionId, vdoId: vdoData.value.id}
  })
  emitter.emit("changeVideoPlay", vdoData.value)
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

//播放集数居中
function videoItemGo(id) {
  const target = document.getElementById(id);
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
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
  //播放事件
  emitter.on("playThisVideoEvent", playThisVideo)
  //视频数据准备完成时间
  emitter.on("videoDataIsFinish", execDataFinish)
  //添加监控屏幕改变事件
  screenEventHandler()
  //event
  window.addEventListener("resize", screenEventHandler);
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessageEventVideoPlay)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserDataEventVideoPlay)
  //播放事件
  emitter.off("playThisVideoEvent", playThisVideo)
  //视频数据准备完成时间
  emitter.off("videoDataIsFinish", execDataFinish)
})

</script>

<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "@/styles/cask-dialog-style.scss";
@import "@/styles/cask-primary-style.scss";

.video-play-list-scroll {
  background-color: rgba(0, 0, 0, 0);
  border-bottom: groove 5px #2B5853;
  border-top: groove 5px #2B5853;

  .video-play-list-scroll-title {
    text-shadow: 1px 1px 2px white, -1px 1px 2px white,
    1px -1px 2px white, -1px -1px 2px white;
  }

  .video-play-list-scroll-item {
    color: white;
    text-shadow: 1px 1px 2px $cask_dark_jungle_green, -1px 1px 2px $cask_dark_jungle_green,
    1px -1px 2px $cask_dark_jungle_green, -1px -1px 2px $cask_dark_jungle_green;

    .video-play-list-scroll-item-playing {
      background-image: linear-gradient(195deg, #447550, #2B5853 50%);
      border-radius: 1.5rem;
    }
  }

}

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