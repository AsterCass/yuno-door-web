<template>

  <div class="row justify-center">
    <div class="video-player-title col-lg-11 col-md-7 col-xs-11">
      <div class="cask-primary-card-header-center">
        <h1>
          {{ currentPlayVideoData.videoName }}
        </h1>
      </div>
    </div>

    <div id="videoPlayer"></div>

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

let currentPlayVideoData = ref({})

function initPlayerD() {
  const dp = new DPlayer({
    container: document.getElementById('videoPlayer'),
    hotkey: true,
    video: {
      url: 'https://api.astercasc.com/ushio/video/play/VC1648909883875289/1.mp4',
      type: 'auto',
    },
    danmaku: {
      id: currentPlayVideoData.value.id,
      api: 'https://www.baidu.com'    //这里填写弹幕地址
    },
    apiBackend: defaultApiBackend,
  });

  console.log("finish init dp", dp)
}

function startPlayVideoCommon(videoData) {
  //获取数据
  currentPlayVideoData.value = videoData
  //初始化播放器
  initPlayerD()
  //加载评论树
  emitter.emit("rebuildCommentTree", videoData.id)
}


onMounted(() => {
  emitter.on('startPlayVideo', startPlayVideoCommon)
})


onUnmounted(() => {
  emitter.off('startPlayVideo', startPlayVideoCommon)
})


</script>
<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "@/styles/cask-primary-style.scss";

</style>

<style lang="scss">
@import "@/styles/fix-dplayer-barrage.scss";

</style>

