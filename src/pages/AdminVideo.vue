<template>

  <div style="margin-top: 10em" class="row justify-center">

    <h2 style="margin-bottom: 5rem;text-align: center" class="col-12">
      视频播放测试地址
    </h2>
    <div class="row justify-center">
      <!--      <q-video-->
      <!--          class="col-6"-->
      <!--          :ratio="16/9"-->
      <!--          src="http://localhost:8005/video/test"-->
      <!--      />-->
      <video style="height: 27rem;width: 48rem" ref="videoPlayer" class="video-js"></video>


    </div>


  </div>


</template>

<script setup>
import {onMounted, onUnmounted, ref, defineProps} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import videoJs from 'video.js';


let videoPlayer = ref(null)
let myPlayer = ref(null)

// https://github.com/videojs/video.js
// https://videojs.com/
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {
        poster: "",
        controls: true,
        sources: [
          {
            src: "http://localhost:8005/video/play/VC1648909883875289/1.mp4",
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
    }
  }
})


onMounted(() => {
  console.log(props.options.poster)
  //初始化播放器
  myPlayer.value = videoJs(videoPlayer.value, props.options, () => {
    myPlayer.value.log('onPlayerReady', this);
  });
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //卸载播放器
  myPlayer.value.dispose()
})

</script>

<style scoped>
@import "video.js/dist/video-js.css";

</style>