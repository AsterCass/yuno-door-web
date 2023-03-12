<template>
  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="headerVisible"/>

    <div>
      <q-img class="index-img"
             :no-native-menu="false"
             :src="require('../assets/img/backgroud.png')"
             alt=""
             :ratio="16/9"
             :fit="'cover'">
      </q-img>
    </div>

    <div class="index-main">
      <q-page-container v-intersection="onIntersection">
        <q-page class="q-pa-md">
          <p v-for="n in 100" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
            dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
            commodi perferendis voluptate? 字体观察 备案 即使 网站
          </p>

        </q-page>
      </q-page-container>
    </div>

    <CopyrightFooter/>


    <!--        https://animate.style/-->
    <q-page-sticky position="bottom" :offset="[0, 100]">
      <div :hidden="rollerGuideHidden">
        <q-img
            class="roller-guide"
            :src="require('../assets/ico/downward_line.png')"
            style="height: 150px; width: 150px;"
            alt=""/>
      </div>
    </q-page-sticky>

    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>

  </q-layout>
</template>

<script>
import {ref} from 'vue'
import CopyrightFooter from '@/components/CopyrightFooter.vue'
import CaskWebHeader from '@/components/CaskWebHeader.vue'
import CaskWebFab from "@/components/CaskWebFab.vue";
import {useRouter} from 'vue-router'
import 'animate.css';


export default {
  name: "AdminIndex",
  components: {CopyrightFooter, CaskWebHeader, CaskWebFab},
  setup() {

// https://quasar.dev/vue-directives/intersection
// https://quasar.dev/vue-directives/scroll-fire
    let headerVisible = ref(false)
    let rollerGuideHidden = ref(false)
    const router = useRouter()

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

    //router
    const toArticle = () => {
      router.push('/article/detail')
    }

    return {
      toArticle,
      headerVisible,
      rollerGuideHidden,
      onIntersection,
    }

  }
}
</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.roller-guide
  animation: fadeOutDown 1.7s infinite

.index-img
  z-index: -1

//这里猫猫队踩大坑 backdrop-filter或者filter相关元素是和opacity冲突的，无法达到预期预期效果
//离谱的是如果希望达到不透明的效果需要 background-color: white 中来调整a的比例
.index-main
  text-align: center
  margin: -5rem 5rem 5rem 5rem
  //background-color: white
  //opacity: 0.8
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 15px


</style>