<template>

  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="true"/>

    <div style="z-index: 0">
      <q-img
          :no-native-menu="false"
          src=
              "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg-6.jpg"
          placeholder-src=
              "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg-6-dim.jpg"
          alt=""
          :ratio="2.5"
          :fit="'cover'">
      </q-img>

      <div class="row justify-end" style="z-index: 0; margin-top: -11%">
        <div class="col-2"
             style="z-index: 1; margin-right: -5rem">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/girl_read_1.png"
          >
          </q-img>
        </div>
        <div class="col-2"
             style="z-index: 1; margin-right: -7.5rem">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/boy_write_1.png"
          >
          </q-img>
        </div>
        <div class="col-2" style="z-index: 1; margin-right: -29%; margin-top: 5.5%">
          <div class="column items-end q-mt-xl">
            <q-toggle keep-color color="green-10" label="更新日志" val="updateLog" v-model="commentTypeList"/>
            <q-toggle keep-color color="brown-10" label="用户评论" val="userComment" v-model="commentTypeList"/>
          </div>
        </div>
        <div class="col-5"
             style="z-index: 0;  margin-top: -20%;">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/moon_bg.png"
          >
          </q-img>
        </div>
      </div>
    </div>

    <div>
      <div class="message-board-main">
        <div class="code-generator-tag-title" style="margin-bottom: 2rem">
          <div class="row items-center">
            <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-clipboard" size="1em"/>
            网站留言板
          </div>
        </div>


<!--        <q-separator spaced=".5rem" size="0.2rem"/>-->

<!--        <q-separator spaced="0.5rem" size="0.05rem" color="green-5"/>-->
<!--        <q-separator spaced="0.5rem" size="0.1rem" color="brown-5"/>-->
<!--        <q-separator spaced="0.5rem" size="0.05rem" color="green-5"/>-->


        <div v-for="(comment, index) in commentTree" :key="index">
          <div class="row">

            <div class="col-2 column items-center q-mt-md">
              <div class="column items-center" style="width: 160px">
                <div class="column items-center">
                  <q-avatar size="130px" style="filter: blur(3px);">
                    <q-img :src="comment.commentUserAvatar"/>
                  </q-avatar>
                  <q-btn round color="white" :to="`/space?id=${comment.commentUserId}`" style="margin-top: -125.5px">
                    <q-avatar size="120px">
                      <q-img :src="comment.commentUserAvatar"/>
                    </q-avatar>
                  </q-btn>
                </div>
              </div>
              <div class="simple-bold-little-title-secondary" style="margin-top: .8rem">
                {{ comment.commentUserName }}
              </div>
            </div>

            <div class="col-grow">

            </div>

          </div>

          <q-separator spaced="0.5rem" size="0.05rem" style="margin-right: 32px; margin-left: 32px"/>

        </div>


      </div>
    </div>


    <CopyrightFooter/>
    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>

  </q-layout>


</template>

<script setup>
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import {getLoginData} from "@/utils/store";
import {getCommentTree} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";

// const props = defineProps({
//   mainId: {
//     type: String,
//     default: "UN_KNOW"
//   },
// })

//filter
let commentTypeList = ref(["updateLog", "userComment"])
//comment tree
let commentSum = ref(0)
let commentOriginObj = ref({
  tree: [],
  sum: 0
})
let commentTree = ref([
  {
    commentUserId: "",
    commentUserName: "",
    commentContent: "",
    commentTime: "",
    ipAddressName: "",
    commentUserAvatar: "",
    likeNum: 0,
    isLike: 0,
    childData: [{
      mainSubId: "",
      mainSubUserName: "",
      likeNum: 0,
      isLike: 0,
      replyNum: 0,
    }],
  }
])
//user data
let userData = ref({})

function initData() {
  userData.value = getLoginData();
  commentSum.value = 0;
  commentTree.value = [];
}

function refreshCommentTree(inputMainId) {
  getCommentTree(inputMainId).then(res => {
    const status = res.data.status
    if (200 === status) {
      commentOriginObj.value = res.data.data
      commentSum.value = commentOriginObj.value.sum
      commentTree.value = commentTree2TwoLevelTree(commentOriginObj.value.tree)
    }
  })
}


onMounted(() => {
  initData();
  refreshCommentTree("AT1638054363974995");
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

.index-img
  z-index: -1

.message-board-main
  position: relative
  margin: -15% 10% 5% 10%
  border-radius: 50px
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  padding: 1.5%
  min-height: 500px

.code-generator-tag-title
  font-family: Roboto Slab, sans-serif
  letter-spacing: -.05rem
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400

</style>