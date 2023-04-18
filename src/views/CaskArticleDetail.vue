<template>
  <div class="row justify-center article-layout">
    <div class="col-4 row justify-end">
      <q-scroll-area class="article-anchors" delay="100" :hidden="!extendVisible">
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
                <a :href="`#/article/detail?articleId=${item.articleId}`">{{ item.title }}</a>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-for="item in shortfallAnchorsData" :key="item">
              <q-item-section>
                <a :href="`#/article/detail?articleId=${item.id}`">{{ item.articleTitle }}</a>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </div>
    <div class="col-xs-12 col-lg-8 row justify-lg-start justify-xs-center">
      <div class="col-xs-12 col-lg-10 article-body">
        <div class="article-title">
          <h1>{{ blogMeta.articleTitle }}</h1>
          <p>创建时间: {{ blogMeta.createTime }}</p>
          <p>更新时间: {{ blogMeta.updateTime }}</p>
        </div>
        <div class="article-context">
          <div>
            <div v-html="markdownToHtml" class="blogMarkDown"></div>
          </div>
        </div>
      </div>
      <div class="col-xs-0 col-lg-2"></div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, onMounted, defineProps, onUnmounted} from "vue";
import {getBlogContent, getBlogMeta, getBlogList} from "@/api/base";
import {marked} from "marked";
import hljs from "highlight.js";
import {decrypt} from '@/utils/crypto'
import {headToHtmlTag} from "@/utils/head-to-html-tag";
import {customPageNP} from "@/utils/page";


const props = defineProps({
  articleId: {
    type: String,
    default:
        "AT123"
  },
  extendVisible: {
    type: Boolean,
    default: true
  }
})


let blogContent = ref("")
let blogMeta = ref({
  articleTitle: "Loading...",
  createTime: "1970-01-01",
  updateTime: "1970-01-01",
  refArticleList: [],
  articleBrief: "description",
  articleKeyList: [],
})

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
let headKeywordMeta = ref({})
let headDescriptionMeta = ref({})
let headOgDescriptionMeta = ref({})

//跳转
function togo(id) {
  const target = document.getElementById(id);
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
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
  headKeywordMeta = metaKeyword
  //description
  let metaDescription = document.createElement('meta');
  metaDescription.setAttribute("name", "description")
  metaDescription.setAttribute("content", blogMeta.value.articleBrief)
  document.querySelector('head').append(metaDescription)
  headDescriptionMeta = metaDescription
  //og:description
  let metaOgDescription = document.createElement('meta')
  metaOgDescription.setAttribute("property", "og:description")
  metaOgDescription.setAttribute("content", blogMeta.value.articleBrief)
  document.querySelector('head').append(metaOgDescription)
  headOgDescriptionMeta = metaOgDescription
}

//文章标签取消
function articleDocumentDown() {
  document.querySelector('head').removeChild(headKeywordMeta)
  document.querySelector('head').removeChild(headDescriptionMeta)
  document.querySelector('head').removeChild(headOgDescriptionMeta)
}

//请求后端获取文章内容
function getBlogContentMethod() {
  getBlogContent({id: props.articleId}).then(res => {
    decrypt(res.data).then(text => {
          blogContent.value = text
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
  })
}

//markdown转html
const markdownToHtml = computed(() => {
  return marked(blogContent.value,
      {
        "highlight": function (markdown) {
          return hljs.highlightAuto(markdown).value
        }
      }
  )
})

onMounted(() => {
  //markdown代码渲染
  hljs.highlightAll()
  //获取文章信息
  getBlogContentMethod()
  //获取文章元数据
  getBlogMetaMethod()
})

onUnmounted(() => {
  //文章标签取消
  articleDocumentDown()
})


</script>

<!--代码样式选择 https://highlightjs.org/static/demo/-->
<style lang="scss" scoped>
@import "@/styles/blog.markdown.css";
@import "@/styles/cask.sass";
@import "../../node_modules/highlight.js/styles/hybrid.css";


.article-anchors {
  margin-right: 1rem;
  margin-bottom: 5rem;
  width: 20%;
  height: 60%;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);
  border-radius: 0.5rem;
  padding: 2rem;
  position: fixed;
  opacity: 0.8;

  p, a {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.625;
    font-weight: 300;
    font-family: Roboto Slab, sans-serif;
  }


  h1 {
    font-size: 1.875rem;
    line-height: 1.375;
    font-weight: 600;
    color: $cask_dark_jungle_green;
    margin-bottom: 1rem;
    margin-top: 0;
    font-family: Roboto Slab, sans-serif;
    //letter-spacing: -.05rem
    text-transform: unset;
  }

}

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
  padding: 0 3rem 3rem 3rem;
  min-height: 800px;
}


</style>