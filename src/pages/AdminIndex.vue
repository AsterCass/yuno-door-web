<template>
  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="headerVisible"/>

    <div>
      <q-img class="index-img"
             :no-native-menu="false"
             src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg4-ab-sq.jpg"
             placeholder-src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg4-dim.jpg"
             alt=""
             :ratio="4/3"
             :fit="'cover'">
      </q-img>
    </div>

    <div id="indexMain" class="index-main">
      <CaskAdminShow v-intersection="onIntersection"/>
    </div>

    <CopyrightFooter/>


    <!--        https://animate.style/-->
    <q-page-sticky position="bottom" :offset="[0, 100]" @click="togo('indexMain')">
      <div :hidden="rollerGuideHidden">
        <q-img
            class="roller-guide"
            :src="require('../assets/ico/downward_line.png')"
            style="height: 150px; width: 150px; cursor: pointer"
            alt=""/>
      </div>
    </q-page-sticky>

    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[50, 75]">
      <CaskWebChatFab/>
    </q-page-sticky>

  </q-layout>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import CopyrightFooter from '@/components/CopyrightFooter.vue'
import CaskWebHeader from '@/components/CaskWebHeader.vue'
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskAdminShow from "@/views/CaskAdminShow.vue";
import {QSpinnerGears, useQuasar} from "quasar";
import emitter from "@/utils/bus";
import {getLoadGarbleLang} from "@/utils/enums/load-garble";
import CaskWebChatFab from "@/components/CaskWebChatFab.vue";


const load = useQuasar().loading
// https://quasar.dev/vue-directives/intersection
// https://quasar.dev/vue-directives/scroll-fire
let headerVisible = ref(false)
let rollerGuideHidden = ref(false)
let timer = 0;

function onIntersection(entry) {
  headerVisible.value = entry.isIntersecting
  rollerGuideHidden.value = entry.isIntersecting
}

// //页面滚动事件捕捉
// function doScroll({target: {documentElement: {scrollTop, clientHeight, scrollHeight}}}) {
//   if(Math.abs(scrollTop + clientHeight - scrollHeight) < 1) {
//     console.log("bottom")
//   } else {
//     console.log("not bottom")
//   }
// }
// onMounted(() => {
//   window.addEventListener('scroll', doScroll)
// })
// onUnmounted(() => {
//   window.removeEventListener('scroll', doScroll)
// })

function togo(id) {
  const target = document.getElementById(id);
  if(target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

//载入完成
function loadAlready() {
  timerDown()
  load.hide()
}

//载入中模板
const indexLoadTemplate = load.show({
  group: 'index-load-template',
  spinner: QSpinnerGears,
  message: '首次进入会稍慢，加载中...'
})

//生成定时器
function timerUp() {
  timer = setInterval(() => {
    indexLoadTemplate({message: getLoadGarbleLang()})
  }, 2000);
}

//删除定时器
function timerDown() {
  clearInterval(timer);
  timer = 0
}

onMounted(() => {
  timerUp()
  emitter.on('indexDataAlready', loadAlready)
})

onUnmounted(() => {
  emitter.off('indexDataAlready', loadAlready)
  timerDown()
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "animate.css"

.roller-guide
  animation: fadeOutDown 1.7s infinite

.index-img
  z-index: -1

//这里猫猫队踩大坑 backdrop-filter或者filter相关元素是和opacity冲突的，无法达到预期预期效果
//离谱的是如果希望达到不透明的效果需要 background-color: white 中来调整a的比例
.index-main
  margin: -5% 2% 5% 2%
  //background-color: white
  //opacity: 0.8
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 15px


</style>