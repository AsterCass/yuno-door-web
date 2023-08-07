<template>
  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="!smallScreen"/>

    <div class="row justify-center">

      <div class="col-2 row justify-end privacy-anchors-site" v-show="!smallScreen">
        <q-scroll-area class="article-anchors" delay="100">
          <h1>导航</h1>
          <q-list>
            <q-item clickable v-ripple
                    v-for="item in titleAnchorData"
                    :key="item.title"
                    @click="anchorTogo(item.value)">
              <q-item-section>
                <p>
                  {{ item.title }}
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="privacy-base col-lg-6 col-md-7 col-xs-11 ">
        <div class="cask-primary-card-header-center">
          <h1>
            {{ privateMetaData.articleTitle }}
          </h1>
          <p>创建时间: {{ privateMetaData.createTime }}</p>
          <p>更新时间: {{ privateMetaData.updateTime }}</p>
        </div>
        <div class="privacy-content">
          <div>
            <div v-html="markdownToHtml" class="blogMarkDown"></div>
          </div>
        </div>
      </div>
    </div>


    <CopyrightFooter/>
  </q-layout>
</template>

<script setup>
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {computed, defineProps, onMounted, onUnmounted, ref} from "vue";
import {getBlogContent, getBlogList} from "@/api/article";
import {customPage} from "@/utils/page";
import {marked} from "@/utils/marked-factory";
import {decrypt} from "@/utils/crypto";
import {headToHtmlTag} from "@/utils/head-to-html-tag";
import {addStyle, removeStyle} from "@/utils/document-style-helper";

const props = defineProps({
  articleParam: {
    type: Object,
    default: () => {
      return {articleType: 3}
    },
  }
})

//screen
let smallScreen = ref(false)
let privateMetaData = ref({
  id: ''
})
//页面基础元素
let baseElement = ref({})
//内容
let thisContent = ref("")
//导航信息
let titleAnchorData = ref([])

//导航跳转
function anchorTogo(id) {
  const target = document.getElementById(id);
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

function getPrivateMeta() {
  getBlogList(customPage(props.articleParam, 0, 1)).then(res => {
    privateMetaData.value = res.data.data[0]
    titleAnchorData.value = headToHtmlTag(privateMetaData.value)
    getBlogContent({id: privateMetaData.value.id}).then(res => {
      decrypt(res.data).then(text => {
            thisContent.value = text
          }
      )
    })
  })
}

const markdownToHtml = computed(() => {
  return marked.parse(thisContent.value)
})

function screenEventHandler() {
  //小屏幕判断
  smallScreen.value = document.documentElement.clientWidth < 1024
}

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //添加监控屏幕改变事件
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
  //获取隐私文章数据
  getPrivateMeta()
  //该页面所有链接均打开新标签，不在本页面打开，目的兼容markdown语法
  let base = document.createElement("base")
  base.setAttribute("target", "_blank")
  document.querySelector('head').append(base)
  baseElement.value = base
})

onUnmounted(() => {
  //删除页面标签基础标签
  document.querySelector('head').removeChild(baseElement.value)
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
})


</script>

<style scoped lang="scss">
@import "@/styles/cask-primary-style.scss";
@import "@/styles/blog.markdown.css";

.privacy-base {
  margin-top: 10%;
  margin-bottom: 5%;
}

.privacy-anchors-site {
  margin-top: 10%;
  padding-right: 5%;
}

.privacy-content {
  min-height: 50rem;
}

</style>