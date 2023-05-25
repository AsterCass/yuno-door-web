<template>

  <div class="row justify-center">
    <div class="video-player-title col-lg-11 col-md-7 col-xs-11">
      <div class="cask-primary-card-header-center">
        <h1>
          当前页面还在开发中：{{ currentPlayVideoData.videoName }}
        </h1>
      </div>
    </div>

    <div v-show="loadFinish" id="videoPlayer"></div>

    <CaskCommentTree v-if="currentPlayVideoData.id && 0 !== currentPlayVideoData.id.length"
                     class="col-12 q-mt-md" :main-id="currentPlayVideoData.id"/>
  </div>
</template>

<script setup>
import CaskCommentTree from "@/components/CaskCommentTree.vue";
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import DPlayer from "dplayer";
import defaultApiBackend from "@/utils/barrage-build";
import {getCurVideoData} from "@/utils/store"

//data
let currentPlayVideoData = ref({
  id: "",
})
//player
let videoDPlayer = ref({})
//load finish
let loadFinish = ref(false)

function initPlayerD() {
  const dp = new DPlayer({
    container: document.getElementById('videoPlayer'),
    hotkey: true,
    video: {
      url: currentPlayVideoData.value.videoRes,
      type: 'auto',
    },
    danmaku: {
      id: currentPlayVideoData.value.id,
    },
    apiBackend: defaultApiBackend,
  })
  dp.on('loadeddata', () => {
    loadFinish.value = true
  });

  videoDPlayer.value = dp;
}

function changeVideoPlayD(videoData) {
  currentPlayVideoData.value = videoData
  videoDPlayer.value.switchVideo(
      {url: currentPlayVideoData.value.videoRes},
      {id: currentPlayVideoData.value.id}
  )
  loadFinish.value = false
}

onMounted(() => {
  //更换播放资源
  emitter.on("changeVideoPlay", changeVideoPlayD)
  //数据初始化
  currentPlayVideoData.value = getCurVideoData()
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

</style>

<style lang="scss">
@import "@/styles/fix-dplayer-barrage.scss";

</style>

