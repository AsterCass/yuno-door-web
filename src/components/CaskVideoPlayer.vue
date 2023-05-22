<template>
  <div>

    <h6 class="simple-sec-header ">
      {{ videoData.videoCollectionId }} : {{ videoData.videoName }}
    </h6>

    <video ref="videoPlayer" class="vjs-16-9 video-js q-my-md" style="border-radius: 25px"></video>

    <br>
    <br>
    <br>
    <h5>
      页面未完成
    </h5>

  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import videoJs from "video.js";
import emitter from "@/utils/bus";

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
@import "video.js/dist/video-js.css";


</style>