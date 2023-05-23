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

    <video ref="videoPlayer" class="vjs-16-9 video-js q-my-md" style="border-radius: 25px"></video>


    <CaskCommentTree v-if="videoData.id && 0 !== videoData.id.length"
                     class="col-12 q-mt-md" :main-id="videoData.id"/>


  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import videoJs from "video.js";
import emitter from "@/utils/bus";
import CaskCommentTree from "@/components/CaskCommentTree.vue";

const props = defineProps({
  videoData: {
    id: "",
    videoRes: "",
    videoTitle: "",
  }
})

let videoPlayer = ref(null)
let myPlayer = ref(null)


function startPlayVideo(videoData) {
  myPlayer.value.src({type: 'video/mp4', src: videoData.videoRes});
}


onMounted(() => {

  emitter.on('startPlayVideo', startPlayVideo)

  console.log(props.videoData)


  let opt = {
    poster: "",
    controls: true,
    sources: [
      {
        src: 'http://localhost:8005/video/play/VC1648909883875289/1.mp4',
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


  //初始化播放器
  myPlayer.value = videoJs(videoPlayer.value, opt, () => {
    myPlayer.value.log('onPlayerReady', this);
  });

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