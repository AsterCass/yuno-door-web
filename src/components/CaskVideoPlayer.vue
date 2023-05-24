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
      <video id="videoPlayerX" ref="videoPlayer" class="vjs-16-9 video-js"
             style="border-radius: 25px"></video>
    </div>


    <div id="videoPlayer"></div>


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
import defaultApiBackend from '@/utils/barrage-build';
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

function initPlayer() {
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
    // barrage.pause()
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
function initVideoPlayer() {
  const dp = new DPlayer({
    container: document.getElementById('videoPlayer'),
    hotkey: true,
    playbackSpeed: [0.5, 0.75, 1, 1.5, 2, 3],
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
  console.log(dp)
}

onMounted(() => {
  emitter.on('startPlayVideo', startPlayVideo)
  //初始化播放器
  initPlayer({})
  //初始化播放器
  initVideoPlayer()

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


<style lang="scss">

.dplayer-menu {
  height: 0 !important;
  width: 0 !important;
}

.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;

  .dplayer-danmaku-item {
    display: inline-block;
    pointer-events: none;
    user-select: none;
    cursor: default;
    white-space: nowrap;
    text-shadow: .5px .5px .5px rgba(0, 0, 0, .5);

    &--demo {
      position: absolute;
      visibility: hidden;
    }
  }

  .dplayer-danmaku-right {
    position: absolute;
    right: 0;
    transform: translateX(100%);

    &.dplayer-danmaku-move {
      will-change: transform;
      animation-name: danmaku;
      animation-timing-function: linear;
      animation-play-state: paused;
    }
  }

  @keyframes danmaku {
    from {
      transform: translateX(100%);
    }
  }

  .dplayer-danmaku-top,
  .dplayer-danmaku-bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    visibility: hidden;

    &.dplayer-danmaku-move {
      will-change: visibility;
      animation-name: danmaku-center;
      animation-timing-function: linear;
      animation-play-state: paused;
    }
  }

  @keyframes danmaku-center {
    from {
      visibility: visible;
    }
    to {
      visibility: visible;
    }
  }
}
</style>