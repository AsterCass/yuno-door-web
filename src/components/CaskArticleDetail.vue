<template>
  <div class="row justify-center article-layout">
    <div class="col-4 row justify-end">
      <q-scroll-area class="article-anchors" delay="100">
        <h1>导航</h1>
        <q-list>
          <q-item clickable v-ripple
                  v-for="item in anchorTreeBackend"
                  :key="item.title"
                  @click="togo(item.value)">
            <q-item-section>
              <p>
                {{ item.title }}
              </p>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator spaced="1.5rem" size="0.05rem"/>
        <h1>相关文章</h1>
        <q-list>
          <q-item clickable v-ripple v-for="n in 5" :key="n">
            <q-item-section>
              <a href="https://www.baidu.com">母猪的产后护理</a>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
    <div class="col-8 row justify-start">
      <div class="article-body">
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
    </div>
  </div>
</template>

<script>
import {computed, ref, onMounted} from "vue";
import {getBlogContent, getBlogMeta} from "@/api/base";
import {marked} from "marked";
import hljs from "highlight.js";
import {decrypt} from '@/utils/crypto'
import {headToHtmlTag} from "@/utils/headToHtmlTag";

export default {
  name: "CaskArticleDetail",
  props: {
    articleId: {
      type: String,
      default: "AT1637653540015050"
    }
  },
  setup(props) {
    let blogContent = ref("")
    let blogMeta = ref({
      articleTitle: "Not found",
      createTime: "1970-01-01",
      updateTime: "1970-01-01",
    })
    let anchorTreeBackend = ref([])


    //跳转
    function togo(id) {
      const target = document.getElementById(id);
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
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

    //请求后端获取文章meta
    function getBlogMetaMethod() {
      getBlogMeta({id: props.articleId}).then(res => {
        blogMeta.value = res.data.data
        //请求标题信息并渲染，这里暂时先只渲染
        anchorTreeBackend.value = headToHtmlTag(blogMeta.value)
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


    return {
      togo, markdownToHtml, anchorTreeBackend, blogMeta
    }
  }
}

</script>

<!--代码样式选择 https://highlightjs.org/static/demo/-->
<style lang="scss" scoped>
@import "@/styles/blog.markdown.css";
@import "@/styles/cask.sass";
@import "~highlight.js/styles/hybrid.css";


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
  width: 80%;
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