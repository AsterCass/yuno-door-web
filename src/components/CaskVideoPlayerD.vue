<template>

  <div class="row justify-center">
    <!--    <div class="video-player-title col-lg-11 col-md-7 col-xs-11">-->
    <!--      <div class="cask-primary-card-header-center">-->
    <!--        <h1>-->
    <!--          当前页面还在开发中-->
    <!--        </h1>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="col-12 relative-position">

      <div class="justify-between video-player-header q-px-md">
        <div class="simple-bold-title">
          {{ currentPlayVideoData.colName }}&#32;:&#32;第&#32;{{ currentPlayVideoData.videoNum }}&#32;集
        </div>
        <q-btn class="text-white" round flat dense stack icon="fa-solid fa-gear"/>
      </div>

      <div v-show="loadFinish" id="videoPlayer"></div>
      <div v-show="!loadFinish" class="video-load-screen simple-sec-header">
        <q-inner-loading :showing="!loadFinish">
          <q-spinner-cube size="10%" color="white"/>
          loading...
        </q-inner-loading>
      </div>
      <div class="video-player-footer">
        <q-toolbar class="row justify-between">
          <div class="col-8 row justify-start">
            <q-btn v-if="!isPlaying" class="text-white q-mx-xs" icon="fa-solid fa-play"
                   round flat dense stack @click="videoPlay"/>
            <q-btn v-else class="text-white q-mx-xs" icon="fa-solid fa-pause"
                   round flat dense stack @click="videoPause"/>
            <q-btn class="text-white q-mx-xs" icon="fa-solid fa-forward-step"
                   :disable="isLastVideo" round flat dense stack @click="videoPlayNext"/>
            <q-btn v-if="0 === playerSetting.volume" class="text-white q-mx-xs" icon="fa-solid fa-volume-xmark"
                   round flat dense stack @click="changeShowVolumeSlider"/>
            <q-btn v-else-if="playerSetting.volume < 0.3" class="text-white q-mx-xs" icon="fa-solid fa-volume-off"
                   round flat dense stack @click="changeShowVolumeSlider"/>
            <q-btn v-else-if="playerSetting.volume < 0.7" class="text-white q-mx-xs" icon="fa-solid fa-volume-low"
                   round flat dense stack @click="changeShowVolumeSlider"/>
            <q-btn v-else class="text-white q-mx-sm q-mx-xs" icon="fa-solid fa-volume-high"
                   round flat dense stack @click="changeShowVolumeSlider"/>

            <div id="volume-slider" v-if="showVolumeSlider" style="width: 8rem">
              <q-slider :min="0" :max="10" color="white" thumb-size="15px" v-model="volumeSliderNum"/>
            </div>

          </div>
          <div class="col-4 row justify-end">
            <q-btn class="text-white q-mx-sm" round flat dense stack icon="fa-solid fa-expand"
                   @click="videoFullScreen"/>
          </div>
        </q-toolbar>
      </div>


    </div>


    <CaskCommentTree v-if="currentPlayVideoData.id && 0 !== currentPlayVideoData.id.length"
                     class="col-12 q-mt-md" :main-id="currentPlayVideoData.id"/>
  </div>
</template>

<script setup>
import CaskCommentTree from "@/components/CaskCommentTree.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import DPlayer from "dplayer";
import defaultApiBackend from "@/utils/barrage-build";
import {getCurVideoData} from "@/utils/store"

//data
let currentPlayVideoData = ref({
  id: "",
  videoNum: 1,
  colName: "",
  colSize: 1,
})
//player
let videoDPlayer = ref({})
//load finish
let loadFinish = ref(false)
let isPlaying = ref(false)
let isLastVideo = ref(false)
//player setting
let playerSetting = ref({
  volume: 0.5,
  playbackSpeed: 1,
  showDanmaku: true,
  autoNext: true,
  autoPlay: true,
})
//volume
let showVolumeSlider = ref(false)
let volumeSliderNum = ref(5)
playerSetting.value.volume = computed(() => {
  let volPercent = (0.1 * volumeSliderNum.value).toFixed(1)
  let videoOri = videoDPlayer.value.video
  if (videoOri) {
    videoOri.volume = volPercent
  }
  return volPercent
})


function initPlayerD() {
  const dp = new DPlayer({
    container: document.getElementById('videoPlayer'),
    hotkey: true,
    theme: '#2B5853',
    playbackSpeed: [0.75, 1, 1.25, 1.5, 2, 3],
    volume: playerSetting.value.volume,
    autoplay: playerSetting.value.autoPlay,
    video: {
      url: currentPlayVideoData.value.videoRes,
      type: 'auto',
    },
    danmaku: {
      id: currentPlayVideoData.value.id,
    },
    apiBackend: defaultApiBackend,
  })
  //event
  dp.on('loadeddata', () => {
    loadFinish.value = true
  });
  dp.on('play', () => {
    isPlaying.value = true
  });
  dp.on('pause', () => {
    isPlaying.value = false
  });
  dp.on('ended', () => {
    if (!isLastVideo.value) {
      videoPlayNext()
    }
  });
  //data
  videoDPlayer.value = dp;
}

function changeVideoPlayD(videoData) {
  //data
  currentPlayVideoData.value = videoData
  //is last video
  isLastVideo.value = currentPlayVideoData.value.videoNum === currentPlayVideoData.value.colSize
  //change resource
  loadFinish.value = false
  videoDPlayer.value.switchVideo(
      {url: currentPlayVideoData.value.videoRes},
      {id: currentPlayVideoData.value.id}
  )
}

function initVideoData() {
  //base data
  currentPlayVideoData.value = getCurVideoData()
}

function videoFullScreen() {
  videoDPlayer.value.fullScreen.request()
}

function videoPlay() {
  isPlaying.value = true
  videoDPlayer.value.video.play()
}

function videoPause() {
  isPlaying.value = false
  videoDPlayer.value.video.pause()
}

function videoPlayNext() {
  emitter.emit("playThisVideoEvent", currentPlayVideoData.value.videoNum)
}

function changeShowVolumeSlider() {
  showVolumeSlider.value = !showVolumeSlider.value
}


onMounted(() => {
  //更换播放资源
  emitter.on("changeVideoPlay", changeVideoPlayD)
  //数据信息初始化
  initVideoData()
  //初始化播放器
  initPlayerD()
  //加载评论树
  emitter.emit("rebuildCommentTree", currentPlayVideoData.value.id)
})


onUnmounted(() => {
  emitter.off("changeVideoPlay", changeVideoPlayD)
})


</script>
<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "@/styles/cask-primary-style.scss";
@import "@/styles/cask-dialog-style.scss";


.video-player-header {
  display: flex;
  align-items: center;
  height: 4rem;
  color: white;
  background-image: linear-gradient(195deg, #447550, #2B5853 50%);
  border-radius: 1rem 1rem 0 0;
}

.video-player-footer {
  display: flex;
  align-items: center;
  height: 3rem;
  background-image: linear-gradient(195deg, #447550, #2B5853 50%);
  border-radius: 0 0 1rem 1rem;
}


</style>

<style lang="scss">
@import "@/styles/fix-dplayer-barrage.scss";
@import "@/styles/cask.sass";

.video-load-screen {
  padding-top: 56.25%;
  //background-image: linear-gradient(195deg, #42424a, #191919);
  background-color: black;
  color: $cask_base_white;


  .q-inner-loading {
    background: rgba(255, 255, 255, 0);
  }


}


</style>

