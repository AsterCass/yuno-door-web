<template>
  <div class="row justify-center">


    <div class="video-player-title col-lg-11 col-md-7 col-xs-11">
      <div class="cask-primary-card-header-center">
        <h1>
          {{ currentPlayVideoData.videoName }}
        </h1>
      </div>
    </div>

    <div id="videoContainer" class="col-12">
      <video id="videoPlayer" ref="videoPlayer" class="vjs-16-9 video-js"></video>
    </div>


    <CaskCommentTree v-if="currentPlayVideoData.id && 0 !== currentPlayVideoData.id.length"
                     class="col-12 q-mt-md" :main-id="currentPlayVideoData.id"/>


  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import videoJs from "video.js";
import emitter from "@/utils/bus";
import CaskCommentTree from "@/components/CaskCommentTree.vue";


let videoPlayer = ref(null)
let myPlayer = ref(null)
let currentPlayVideoData = ref({})


function initPlayer(res) {
  //config
  let opt = {
    poster: "",
    controls: true,
    sources: [
      {
        src: res,
        type: 'video/mp4',
      }
    ],
    controlBar: {
      remainingTimeDisplay: {
        displayNegative: false
      }
    },
    playbackRates: [0.5, 1, 2, 3]
  }
  //player
  myPlayer.value = videoJs(videoPlayer.value, opt, () => {
    myPlayer.value.log('onPlayerReady');
  });

  myPlayer.value.on("play", function () {

  });
  myPlayer.value.on("pause", function () {

  });
  myPlayer.value.on("seeked", function () {

  });
}

function startPlayVideo(videoData) {
  //初始化数据
  currentPlayVideoData.value = videoData
  //初始化播放器
  initPlayer(videoData.videoRes)
  //加载评论树
  emitter.emit("rebuildCommentTree", videoData.id)
}


onMounted(() => {
  emitter.on('startPlayVideo', startPlayVideo)
})

onUnmounted(() => {
  emitter.off('startPlayVideo', startPlayVideo)
  //卸载播放器
  myPlayer.value.dispose()
})


</script>


<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "@/styles/cask-primary-style.scss";
@import "video.js/dist/video-js.css";

</style>


