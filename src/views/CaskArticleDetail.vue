<template>
  <div class="row justify-center article-layout">

    <q-dialog v-model="picShow" position="left">
      <q-card style="max-width: 2000px; margin-left:30px; border-radius: 30px; background-color: #8F9193">
        <q-toolbar style="padding: 0">
          <q-img :height="picHeight" :width="picWidth" fit="contain" :src="picSrc">
          </q-img>
        </q-toolbar>
      </q-card>
    </q-dialog>

    <div class="col-4 row justify-end">
      <q-scroll-area class="article-anchors" delay="100" :hidden="hiddenNavigation || !innerExtendVisible">
        <div :hidden="hiddenTitleAnchors">
          <h1>导航</h1>
          <q-list>
            <q-item clickable v-ripple
                    v-for="item in titleAnchorData"
                    :key="item.title"
                    @click="togo(item.value)">
              <q-item-section>
                <p>
                  {{ item.title }}
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div :hidden="hiddenSep">
          <q-separator spaced="1.5rem" size="0.05rem"/>
        </div>

        <div :hidden="hiddenRefAnchors">
          <h1>文章推荐</h1>
          <q-list>
            <q-item clickable v-ripple v-for="item in titleRefData" :key="item">
              <q-item-section>
                <a :href="`/article/detail?articleId=${item.articleId}`">{{ item.title }}</a>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-for="item in shortfallAnchorsData" :key="item">
              <q-item-section>
                <a :href="`/article/detail?articleId=${item.id}`">{{ item.articleTitle }}</a>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </div>

    <div class="row"
         :class="{
      'col-12 justify-center': !innerExtendVisible,
      'col-8 justify-start': innerExtendVisible
    }">
      <div class="article-body"
           :class="{
        'col-12': !innerExtendVisible,
        'col-10': innerExtendVisible
      }">
        <div class="cask-primary-card-header-left">
          <h1>{{ blogMeta.articleTitle }}</h1>
          <p>创建时间: {{ blogMeta.createTime }}</p>
          <p>更新时间: {{ blogMeta.updateTime }}</p>
        </div>
        <div class="article-context">
          <div>
            <div v-html="markdownToHtml" class="blogMarkDown"></div>
          </div>
          <q-inner-loading :showing="!articleContextFinish"
                           label="数据解码中...">
          </q-inner-loading>
        </div>
      </div>


      <div class="q-mt-xl"
           style="margin-left: 1rem"
           :class="{
        'col-12': !innerExtendVisible,
        'col-10': innerExtendVisible
      }">
        <CaskCommentTree :main-id="articleId"/>
      </div>


    </div>

  </div>
</template>

<script setup>
import {computed, ref, onMounted, defineProps, onUnmounted} from "vue";
import {getBlogContent, getBlogMeta, getBlogList} from "@/api/article";
import {marked, importStyle} from "@/utils/marked-factory";
import {decrypt} from '@/utils/crypto'
import {headToHtmlTag} from "@/utils/head-to-html-tag";
import {customPageNP} from "@/utils/page";
import emitter from "@/utils/bus";
import {useRouter} from "vue-router";
import CaskCommentTree from "@/components/CaskCommentTree.vue";
import {sleep} from "@/utils/sleep";
import {delay} from "@/utils/delay-exe";


const props = defineProps({
  articleId: {
    type: String,
    default: "AT123"
  },
})

//等待左侧导航信息完全加载完后显示，防止抖动
let hiddenNavigation = ref(true)
//无数据跳转
const thisRouter = useRouter()
//基础数据
let blogContent = ref("")
let blogMeta = ref({
  articleTitle: "Loading...",
  createTime: "1970-01-01",
  updateTime: "1970-01-01",
  refArticleList: [],
  articleBrief: "description",
  articleKeyList: [],
})
//图片展示
let picShow = ref(false)
let picSrc = ref('')
let picHeight = ref('')
let picWidth = ref('')
//导航信息
let titleAnchorsNum = ref(0)
let titleAnchorData = ref([])
let hiddenTitleAnchors = ref(false)
//推荐文章信息
let titleRefNum = ref(0)
let titleRefData = ref([])
//剩余容量
let shortfallAnchorsNum = ref(0)
let shortfallAnchorsData = ref([])
//当没有推荐文章和剩余容量时候不展示标签
let hiddenRefAnchors = ref(false)
//是否隐藏分隔符
let hiddenSep = ref(false)
//页面headMeta
let headKeywordMeta = ref(null)
let headDescriptionMeta = ref(null)
let headOgDescriptionMeta = ref(null)
//附属信息是否展示
let innerExtendVisible = ref(true)
//文档是否加载完成
let articleContextFinish = ref(false)

//跳转
function togo(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
}

//文章标签渲染
function articleDocumentUp() {
  //修改标题
  document.title = blogMeta.value.articleTitle
  //添加关键信息 keywords
  let metaKeyword = document.createElement('meta');
  metaKeyword.setAttribute("name", "keywords")
  metaKeyword.setAttribute("content", blogMeta.value.articleKeyList.join(" "))
  document.querySelector('head').append(metaKeyword)
  headKeywordMeta.value = metaKeyword
  //description
  let metaDescription = document.createElement('meta');
  metaDescription.setAttribute("name", "description")
  metaDescription.setAttribute("content", blogMeta.value.articleBrief)
  document.querySelector('head').append(metaDescription)
  headDescriptionMeta.value = metaDescription
  //og:description
  let metaOgDescription = document.createElement('meta')
  metaOgDescription.setAttribute("property", "og:description")
  metaOgDescription.setAttribute("content", blogMeta.value.articleBrief)
  document.querySelector('head').append(metaOgDescription)
  headOgDescriptionMeta.value = metaOgDescription
}

//文章标签取消
function articleDocumentDown() {
  if (null !== headKeywordMeta.value) {
    document.querySelector('head').removeChild(headKeywordMeta.value)
  }
  if (null !== headDescriptionMeta.value) {
    document.querySelector('head').removeChild(headDescriptionMeta.value)
  }
  if (null !== headOgDescriptionMeta.value) {
    document.querySelector('head').removeChild(headOgDescriptionMeta.value)
  }
}

//请求后端获取文章内容
function getBlogContentMethod() {
  getBlogContent({id: props.articleId}).then(res => {
    decrypt(res.data).then(text => {
          blogContent.value = text
          articleContextFinish.value = true
        }
    )
  })
}

//左侧导航不够填充使用新日志填充
function onLoadElse(num) {
  getBlogList(customPageNP(0, num)).then(res => {
    if (null != res.data.data && 0 !== res.data.data.length) {
      shortfallAnchorsData.value = res.data.data
    }
  })
}

//请求后端获取文章meta
function getBlogMetaMethod() {
  getBlogMeta({id: props.articleId}).then(res => {
    //检查数据
    if (checkData(res.data)) {
      //获取文章信息
      getBlogContentMethod()
      //基础数据
      blogMeta.value = res.data.data
      //文章标签渲染
      articleDocumentUp()
      //渲染左栏导航信息
      titleAnchorData.value = headToHtmlTag(blogMeta.value)
      titleAnchorsNum.value = titleAnchorData.value.length
      if (0 === titleAnchorsNum.value) {
        hiddenTitleAnchors.value = true
      }
      //渲染左栏推荐信息
      titleRefData.value = blogMeta.value.refArticleList
      if (null != titleRefData.value) {
        titleRefNum.value = titleRefData.value.length
      }
      //剩余容量 容量最小值10
      let remain = 10 - titleAnchorsNum.value - titleRefNum.value
      if (remain > 0) {
        shortfallAnchorsNum.value = remain
        onLoadElse(remain)
      }
      //没有推荐文章和剩余容量时候不展示标签
      hiddenRefAnchors.value = shortfallAnchorsNum.value <= 0 && titleRefNum.value <= 0
      //当标题或者推荐任意一个隐藏时，隐藏分隔符
      hiddenSep.value = hiddenRefAnchors.value || hiddenTitleAnchors.value
      //等待左侧导航信息完全加载完后显示，防止抖动
      delay(50).then(() => {
        hiddenNavigation.value = false
      })
    }
  })
}

//markdown转html
const markdownToHtml = computed(() => {
  const html = marked.parse(blogContent.value)
  buildImgFormat()
  return html
})


async function buildImgFormat() {
  await sleep(1000);
  let imgList = document.getElementsByTagName("img");
  for (let i = 0; i < imgList.length; i++) {
    if (imgList[i].classList.length > 0) {
      continue
    }
    imgList[i].onclick = function () {
      picSrc.value = imgList[i].src
      const picWidthHeightRatio = imgList[i].width / imgList[i].height
      let picH = 0.8 * document.documentElement.clientHeight;
      let picW = picH * picWidthHeightRatio
      if (picW > 0.8 * document.documentElement.clientWidth) {
        picW = 0.8 * document.documentElement.clientWidth
        picH = picW / picWidthHeightRatio
      }
      picHeight.value = Math.round(picH) + 'px'
      picWidth.value = Math.round(picW) + 'px'
      picShow.value = true
    }
    imgList[i].style.cursor = 'zoom-in'
  }
}

//受通知屏幕改变事件
function adminArticleResizeEven(extendVisible) {
  innerExtendVisible.value = extendVisible
}

//数据请求失败跳404
function checkData(data) {
  const isEmpty = null == data.data
  if (isEmpty) {
    thisRouter.push({
      path: '/404'
    })
  }
  return !isEmpty
}

onMounted(() => {
  //随机导入code样式
  importStyle()
  //获取文章元数据
  getBlogMetaMethod()
  //受通知屏幕改变事件
  emitter.on('adminArticleResizing', adminArticleResizeEven)
})

onUnmounted(() => {
  //文章标签取消
  articleDocumentDown()
  //停止屏幕事件监听
  emitter.off('adminArticleResizing', adminArticleResizeEven)
})


</script>

<!--代码样式选择 https://highlightjs.org/static/demo/-->
<style lang="scss" scoped>
@import "@/styles/blog.markdown.css";
@import "@/styles/cask-primary-style.scss";
//@import "../../node_modules/highlight.js/styles/codepen-embed.css";

.article-layout {
  padding: 12% 2% 5% 2%
}

.article-body {
  margin-left: 1rem;
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
  position: relative;
  padding: 0 3rem 3rem 3rem;
  min-height: 400px;
}


</style>