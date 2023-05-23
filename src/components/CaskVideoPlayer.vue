<template>
  <div class="row justify-center">

    <!--    <h6 class="simple-sec-header ">-->
    <!--      {{ videoData.videoCollectionId }} : {{ videoData.videoName }}-->
    <!--    </h6>-->

    <div class="video-player-title col-lg-11 col-md-7 col-xs-11">
      <div class="cask-primary-card-header-center">
        <h1>
          {{ videoData.videoName }}
        </h1>
      </div>
    </div>

    <div id="videoContainer" class="col-12">
      <video id="videoPlayer" ref="videoPlayer" class="vjs-16-9 video-js"
             style="border-radius: 25px"></video>
    </div>


    <div id="videoPlayerX"></div>


    <CaskCommentTree v-if="currentPlayVideoData.id && 0 !== currentPlayVideoData.id.length"
                     class="col-12 q-mt-md" :main-id="currentPlayVideoData.id"/>


  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import videoJs from "video.js";
import emitter from "@/utils/bus";
import CaskCommentTree from "@/components/CaskCommentTree.vue";
import DPlayer from 'dplayer';
// import Barrage from 'barrage-ui';
// import example from 'barrage-ui/example.json';

defineProps({
  videoData: {
    id: "",
    videoRes: "",
    videoTitle: "",
  }
})

let videoPlayer = ref(null)
let myPlayer = ref(null)
let currentPlayVideoData = ref({})

function startPlayVideo(videoData) {
  currentPlayVideoData.value = videoData
  emitter.emit("rebuildCommentTree", videoData.id)
  myPlayer.value.src({type: 'video/mp4', src: videoData.videoRes});
}

function initPlayer(barrage) {
  //config
  let opt = {
    poster: "",
    controls: true,
    sources: [
      {
        src: 'https://api.astercasc.com/ushio/video/play/VC1648909883875289/1.mp4',
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
    // barrage.play()
  });
  myPlayer.value.on("pause", function () {
    barrage.pause()
  });
  myPlayer.value.on("seeked", function () {
    // barrage.goto(myPlayer.value.currentTime() * 1000);
  });

}

//弹幕相关 https://barrage-ui.netlify.app/
//https://github.com/parksben/masking-danmaku-demo/blob/master/src/app.js
// function initBarrage() {
//   //加载弹幕
//   return new Barrage({
//     container: document.getElementById('videoContainer'), // 父级容器
//     data: example, // 弹幕数据
//     config: {
//       // 全局配置项
//       duration: -1, // 弹幕循环周期(单位：毫秒)
//       defaultColor: '#fff', // 弹幕默认颜色
//     },
//   })
// }

//初始化播放器
function initPlayerX() {
  const dp = new DPlayer({
    container: document.getElementById('videoPlayerX'),
    autoplay: false,
    theme: '#FADFA3',
    loop: true,
    lang: 'zh-cn',
    screenshot: true,
    hotkey: true,
    preload: 'auto',
    volume: 0.1,
    mutex: true,
    playbackSpeed: [0.5, 0.75, 1, 1.5, 2, 3],
    video: {
      url: 'https://api.astercasc.com/ushio/video/play/VC1648909883875289/1.mp4',
      type: 'auto',
    },
    subtitle: {
      url: 'dplayer.vtt',
      type: 'webvtt',
      fontSize: '25px',
      bottom: '10%',
      color: '#b7daff',
    },
    contextmenu: [
      {
        text: 'custom1',
        link: 'https://github.com/DIYgod/DPlayer',
      },
      {
        text: 'custom2',
        click: (player) => {
          console.log(player);
        },
      },
    ],
    highlight: [
      {
        time: 20,
        text: '这是第 20 秒',
      },
      {
        time: 120,
        text: '这是 2 分钟',
      },
    ],
  });
  console.log(dp)
}


onMounted(() => {
  emitter.on('startPlayVideo', startPlayVideo)
  //初始化弹幕
  // initBarrage()
  //初始化播放器
  initPlayer({})
  //初始化播放器
  initPlayerX()

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


.video-player-title {
  margin-top: 5%;
  margin-bottom: 1%;
}


</style>