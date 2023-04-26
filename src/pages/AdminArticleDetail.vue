<template>
  <q-layout view="lHh lpr lFf" container:false>
    <CaskWebHeader :headerVisible="extendVisible"/>
    <CaskArticleDetail :article-id="articleId"/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>
    <CopyrightFooter/>

  </q-layout>
</template>
<!--marked document https://marked.js.org/using_advanced#options.-->
<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {onMounted, onUnmounted, ref, defineProps} from "vue";
import CaskArticleDetail from "@/views/CaskArticleDetail.vue";
import emitter from "@/utils/bus";
import {addStyle, removeStyle} from "@/utils/document-style-helper";

defineProps({
  articleId: {
    type: String,
    default: "AT123"
  }
})

let baseElement = ref({})
let extendVisible = ref(true)

function screenEventHandler() {
  //屏幕宽高决定是否展示导航页
  extendVisible.value = !(document.documentElement.clientWidth < document.documentElement.clientHeight)
  emitter.emit("adminArticleResizing", extendVisible.value)
}

onMounted(() => {
  //底色渲染
  addStyle("background-color:#EFF2F5")
  //该页面所有链接均打开新标签，不在本页面打开，目的兼容markdown语法
  let base = document.createElement("base")
  base.setAttribute("target", "_blank")
  document.querySelector('head').append(base)
  baseElement.value = base
  //添加监控屏幕改变事件
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);

})

onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
  document.querySelector('head').removeChild(baseElement.value)
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
  //取消底色渲染
  removeStyle("background-color:#EFF2F5")
})


</script>


<style lang="scss" scoped>


</style>