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
import {computed, onMounted, onUnmounted, ref} from "vue";
import {getBlogContent, getBlogList} from "@/api/article";
import {customPage} from "@/utils/page";
import {marked} from "marked";
import {decrypt} from "@/utils/crypto";
import {headToHtmlTag} from "@/utils/head-to-html-tag";

let smallScreen = ref(false)
let privateArticleParam = ref({
  articleType: 3
})
let privateMetaData = ref({
  id: ''
})
let privateContent = ref("")
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
  getBlogList(customPage(privateArticleParam.value, 0, 1)).then(res => {
    privateMetaData.value = res.data.data[0]
    titleAnchorData.value = headToHtmlTag(privateMetaData.value)
    getBlogContent({id: privateMetaData.value.id}).then(res => {
      decrypt(res.data).then(text => {
            privateContent.value = text
          }
      )
    })
  })
}

const markdownToHtml = computed(() => {
  return marked(privateContent.value)
})

function screenEventHandler() {
  //小屏幕判断
  smallScreen.value = document.documentElement.clientWidth < 1024
}

onMounted(() => {
  //底色渲染
  document.querySelector('body').setAttribute('style', 'background-color:#EFF2F5')
  //添加监控屏幕改变事件
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
  //获取隐私文章数据
  getPrivateMeta()
})

onUnmounted(() => {
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
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