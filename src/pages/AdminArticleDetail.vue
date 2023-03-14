<template>
  <q-layout view="lHh lpr lFf" container:false>
    <CaskWebHeader :headerVisible="true"/>

    <div class="row justify-center article-layout">


      <div :hidden="false" class="article-anchors">
        <!--        <q-btn @click="togo">this is a btn</q-btn>-->
        <ul
            v-for="item in anchorTree"
            :key="item.id"
            @click="togo(item.id)"
        >
          {{ item.id }}
        </ul>
      </div>

      <div class="article-body">
        <div class="article-title">
          <h1>Privacy & Policy</h1>
          <p>创建时间: 2022年12月20日</p>
          <p>更新时间: 2023年1月9日</p>
        </div>

        <div class="article-context">
          <div>
            <div v-html="markdownToHtml" class="blogMarkDown"></div>
          </div>
        </div>
      </div>


    </div>


    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>

    <CopyrightFooter/>

  </q-layout>
</template>
<!--marked document https://marked.js.org/using_advanced#options.-->
<script setup>
import hljs from "highlight.js";
import {marked} from 'marked';
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {computed, onMounted, onUnmounted, ref, nextTick} from "vue";
import {getBlogContent} from '@/api/base'

let blogContent = ref("")
let anchorTree = ref()


function togo(id) {
  console.log(id)
  const mainRoot = document.getElementById(id);
  mainRoot.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

//请求后端获取文章内容
function getBlogContentMethod() {
  const reader = new FileReader();
  getBlogContent({inputText: "123"}).then(res => {
    reader.readAsText(res.data, 'UTF-8')
  })
  reader.addEventListener(
      "load",
      () => {
        blogContent.value = reader.result
      },
      false
  );
}


//markdown转html
const markdownToHtml = computed(() => {
  const markdownToHtmlDoc = marked(blogContent.value,
      {
        "highlight": function (markdown) {
          return hljs.highlightAuto(markdown).value
        }
      }
  );
  //等到document渲染完成获取标签树
  //todo 这里直接在算markdown里面算会不会更好更快
  nextTick(() => {
    getAnchorTree()
  })
  return markdownToHtmlDoc
})

//获取文章标题锚点
function getAnchorTree() {
  anchorTree.value = document.querySelectorAll('h2, h3, h4, h5, h6')
}

onMounted(() => {
  //markdown代码渲染
  hljs.highlightAll()
  //底色渲染
  document.querySelector('body').setAttribute('style', 'background-color:#EFF2F5')
  //该页面所有链接均打开新标签，不在本页面打开，目的兼容markdown语法
  let base = document.createElement("base")
  base.setAttribute("target", "_blank")
  document.querySelector('head').append(base)
  //获取文章信息
  getBlogContentMethod()
})

onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
})

</script>

<!--代码样式选择 https://highlightjs.org/static/demo/-->

<style lang="scss" scoped>
@import "@/styles/blog.markdown.css";
@import "@/styles/cask.sass";
@import "~highlight.js/styles/hybrid.css";


.article-layout {
  padding: 12rem;
}

.article-anchors {
  margin-right: 1rem;
  margin-bottom: 5rem;
  width: 25rem;
  height: 300px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);
  border-radius: 0.5rem;
  padding: 2rem;

}

.article-body {
  margin-left: 1rem;
  width: 60rem;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);
  border-radius: 0.5rem;
}

.article-title {
  padding: 1.5rem;
  text-align: left;
  transform: translateY(-15%);
  margin: -2rem 1rem 0;
  background-image: linear-gradient(195deg, #42424a, #191919);
  color: $cask_base_white;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4);
  border-radius: 0.5rem;

  h1 {
    font-size: 1.875rem;
    line-height: 1.375;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    margin-top: 0;
    font-family: Roboto Slab, sans-serif;
    //letter-spacing: -.05rem
    text-transform: unset;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 1rem;
    line-height: 1.625;
    font-weight: 300;
  }
}

.article-context {
  padding: 0 3rem 3rem 3rem;
  min-height: 800px;
}


</style>