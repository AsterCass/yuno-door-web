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
             style="z-index: 1; margin-right: -5rem; height: 100px">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/girl_read_1.png"
          >
          </q-img>
        </div>
        <div class="col-2"
             style="z-index: 1; margin-right: -7.5rem; height: 100px">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/boy_write_1.png"
          >
          </q-img>
        </div>
        <div class="col-2" style="z-index: 1; margin-right: -29%; margin-top: 5.5%; height: 100px">
          <div class="column items-end q-mt-xl">
            <q-toggle keep-color color="green-10" label="更新日志" val="updateLog" v-model="commentTypeList"/>
            <q-toggle keep-color color="brown-10" label="用户评论" val="userComment" v-model="commentTypeList"/>
          </div>
        </div>
        <div class="col-5"
             style="z-index: 0;  margin-top: -20%">
          <q-img
              src="https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/illustration/moon_bg.png"
          >
          </q-img>
        </div>
      </div>
    </div>

    <div style="z-index: 5">
      <div class="message-board-main" style="z-index: 0">

        <div class="code-generator-tag-title" style="margin-bottom: 2rem">
          <div class="row items-center">
            <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-clipboard" size="1em"/>
            网站留言板
          </div>
        </div>

        <div v-for="(comment, index) in commentTree" :key="index">

          <div class="row">
            <div class="col-2 column items-center q-mt-md">
              <div class="column items-center" style="width: 160px">
                <div class="column items-center">
                  <q-avatar size="130px" style="filter: blur(3px);">
                    <q-img :src="comment.commentUserAvatar"/>
                  </q-avatar>
                  <q-btn round color="translate"
                         @click="goToUserSpace(comment.commentUserId)" style="margin-top: -125.5px">
                    <q-avatar size="120px">
                      <q-img :src="comment.commentUserAvatar"/>
                    </q-avatar>
                  </q-btn>
                </div>
              </div>
              <div class="simple-bold-little-title-secondary text-center to-space-user-id"
                   style="margin-top: .8rem; " @click="goToUserSpace(comment.commentUserId)">
                {{ comment.commentUserName }}
              </div>
              <div class="q-mb-md">
                <q-badge v-if="null != comment.commentUserRoleType" class="q-mx-xs q-py-xs q-px-sm"
                         style="transform: translateY(-.13rem)"
                         :color="getRoleTypeObj(comment.commentUserRoleType).color"
                         :label="getRoleTypeObj(comment.commentUserRoleType).label">
                  <q-icon
                      :name="getRoleTypeObj(comment.commentUserRoleType).logo"
                      class="q-ml-xs"
                  />
                </q-badge>
                <q-badge v-if="null != comment.commentUserGender" class="q-mx-xs q-py-xs q-px-sm"
                         style="transform: translateY(-.13rem)"
                         :color="getGenderObj(comment.commentUserGender).color"
                         :label="getGenderObj(comment.commentUserGender).label">
                </q-badge>
              </div>
            </div>

            <div class="justify-between col q-pt-lg q-px-md simple-content">

              <div style="min-height: 8rem">
                {{ comment.commentContent }}
              </div>

              <div>
                <div class="row justify-end q-mt-md simple-content-semi">
                  <div class="row items-center">
                    {{ comment.ipAddressName }}&#32;·&#32;{{ comment.floorNumber }}楼
                    &#32;·&#32;{{ comment.commentTime }}
                  </div>
                  <q-btn v-if="(null == comment.webSubClose || comment.webSubClose) && 0 === comment.childData.length"
                         flat dense class="q-ml-sm q-pa-sm"
                         @click="comment.webSubClose = false; comment.webReplyMainSubId=comment.id"
                         style="color: #629DD1;border-radius: .5rem" label="回复"/>
                  <q-btn v-else-if="comment.webSubClose && 0 !== comment.childData.length" flat dense
                         class="q-ml-sm q-pa-sm"
                         @click="comment.webSubClose = false"
                         style="color: #629DD1;"
                         :label="`回复(${comment.childData.length})`"/>
                  <q-btn v-else flat dense class="q-ml-sm q-py-sm q-px-md" @click="comment.webSubClose = true"
                         style="color: #629DD1; background-color: #eee;
                          border-radius: .5rem .5rem 0 0" label="收起回复"/>

                </div>
                <Transition name="resize-fade">
                  <div v-if="!comment.webSubClose" style="background-color: #eee; border-radius: 1rem 0 1rem 1rem;">
                    <div v-if="0 !== comment.childData.length" class="q-pb-xs q-px-xs q-pt-lg">
                      <div v-for="(childComment, childIndex) in comment.childData" :key="childIndex" class="q-mt-md">
                        <div class="row justify-center">
                          <div class="column items-center" style="width: 80px">
                            <div class="column items-center">
                              <q-avatar size="45px" style="filter: blur(2px);">
                                <q-img :src="childComment.commentUserAvatar"/>
                              </q-avatar>
                              <q-btn @click="goToUserSpace(childComment.commentUserId)" color="translate" round
                                     style="margin-top: -42.5px">
                                <q-avatar size="40px">
                                  <q-img :src="childComment.commentUserAvatar"/>
                                </q-avatar>
                              </q-btn>
                            </div>
                          </div>
                          <div class="col-10">
                            <div>
                              <div class="simple-bold-little-title-mini">
                            <span @click="goToUserSpace(childComment.commentUserId)"
                                  class="q-mr-xs to-space-user-id">
                              {{ childComment.commentUserName }}
                            </span>
                                <q-badge v-if="null != childComment.commentUserRoleType"
                                         :color="getRoleTypeObj(childComment.commentUserRoleType).color"
                                         :label="getRoleTypeObj(childComment.commentUserRoleType).label">
                                </q-badge>
                                <span class="simple-content-tag">
                              &#32;·&#32;{{ childComment.commentTime }}&#32;·&#32;{{ childComment.ipAddressName }}
                            </span>
                              </div>
                            </div>
                            <div class="simple-content-mini">
                            <span v-if=" comment.id !== childComment.mainSubUserId"
                                  @click="goToUserSpace(childComment.mainSubUserId)"
                                  class="cask-text-thirdly-color to-space-user-id">
                            @{{ childComment.mainSubUserName }}:
                            </span>
                              {{ childComment.commentContent }}
                            </div>
                            <div class="row justify-end">
                              <q-btn flat dense label="回复" class="q-px-md"
                                     @click="comment.webReplyMainSubId = childComment.id;
                                   comment.webReplyMainSubName = childComment.commentUserName;
                                   comment.webReplyMainContext = childComment.commentContent;"
                                     style="color: #629DD1;border-radius: .5rem"/>
                            </div>
                          </div>
                        </div>

                        <q-separator v-if="childIndex < comment.childData.length - 1" size="0.05rem" spaced=".1rem"
                                     style="margin-right: 32px; margin-left: 32px"/>
                        <div v-else-if="!comment.webReplyMainSubId" class="row justify-center q-mb-md">
                          <q-btn push style="background-color: #355540; color: white"
                                 @click="comment.webReplyMainSubId = comment.id" label="吾有一言，请诸位静听"/>
                        </div>
                      </div>
                    </div>
                    <div v-if="comment.webReplyMainSubId" class="q-pb-xs q-px-xs q-pt-lg">
                      <span v-if="comment.webReplyMainSubName" class="q-mx-xl q-px-md cask-text-thirdly-color">
                        @{{ comment.webReplyMainSubName }}&#32;:
                      </span>
                      <q-input
                          v-model="comment.webReplyContext" type="textarea"
                          :placeholder="`${comment.webReplyMainSubName ?
                          '回复：' + comment.webReplyMainContext : '' }`"
                          class="q-mx-xl cask-textarea-input-base" borderless
                          :input-style="{fontSize: '1rem', color:'black', opacity:'0.75',
                          letterSpacing: '.023rem', lineHeight:'1.3rem',
                          border: '2.5px solid #888', backgroundColor:'#ddd', margin: '0.5rem',
                          padding: '1rem', resize: 'none',height: '8rem', borderRadius: '12px',
                          overflowWrap: 'anywhere'} "/>
                      <div class="row justify-end q-mx-xl">
                        <q-btn v-if="comment.webReplyMainSubName"
                               class="cask-simple-btn-margin-blue-small" label="取消 @"
                               @click="comment.webReplyMainSubId = comment.id; comment.webReplyMainSubName=''"/>
                        <q-btn class="cask-simple-btn-margin-sec-small" label="提交"
                               @click="submitComment(comment)"/>
                      </div>
                    </div>

                    <div v-if="0 !== comment.childData.length || comment.webReplyMainSubId" class="q-my-md"/>
                  </div>
                </Transition>
              </div>

            </div>
          </div>

          <q-separator spaced=".5rem" size="0.05rem" style="margin-right: 32px; margin-left: 32px"/>

        </div>

        <div v-if="dataLoaded" class="row justify-center q-my-xl">
          <q-pagination
              v-model="commentPageNo" :max="commentPageSize" class="roboto-slab"
              color="green-10" gutter="10px" :max-pages="8" size="1rem"
              boundary-numbers direction-links
          />
        </div>
        <div v-else style="margin: 5rem 0">
          <div class="row justify-center">
            <q-spinner-facebook size="100px" color="light-green-8"/>
          </div>
          <div class="text-center simple-bold-little-title-secondary" style="margin-top: 1rem!important;">
            数据加载中...
          </div>
        </div>

        <div class="row">

          <div class="col-2 column items-center">

            <div class="column items-center" style="width: 160px">
              <div class="column items-center">
                <q-avatar size="130px" style="filter: blur(3px);">
                  <q-img :src="userData.avatar"/>
                </q-avatar>
                <q-btn round color="translate"
                       @click="goToUserSpace(userData.id)" style="margin-top: -125.5px">
                  <q-avatar size="120px">
                    <q-img :src="userData.avatar"/>
                  </q-avatar>
                </q-btn>
              </div>
            </div>
            <div class="simple-bold-little-title-secondary text-center to-space-user-id"
                 style="margin-top: .8rem; " @click="goToUserSpace(userData.id)">
              {{ userData.nickName }}
            </div>


          </div>
          <div class="col" style="margin-right: 5rem">
            <q-input
                v-model="websiteReplyContext" type="textarea"
                placeholder="吾有一言，请诸位静听"
                class="q-mx-md cask-textarea-input-base" borderless
                :input-style="{fontSize: '1rem', color:'black', opacity:'0.75',
                          letterSpacing: '.023rem', lineHeight:'1.3rem',
                          border: '2.5px solid #888', backgroundColor:'#ddd', margin: '.8rem 0 ',
                          padding: '1rem', resize: 'none',height: '15rem', borderRadius: '12px',
                          overflowWrap: 'anywhere'} "/>
            <div class="row justify-end q-mx-md q-mb-md">
              <q-btn class="cask-simple-btn-margin-sec" label="提交"
                     @click="submitComment()"/>
            </div>
          </div>

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
import {getGenderObj} from "@/utils/enums/gender-opt";
import {getRoleTypeObj} from "@/utils/enums/role-type"
import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import emitter from "@/utils/bus";

//notify
const notify = useQuasar().notify
//router
const thisRouter = useRouter()
//data load
let dataLoaded = ref(false)
//filter
let commentTypeList = ref(["updateLog", "userComment"])
//comment tree
let commentPageNo = ref(1)
let commentPageSize = ref(20)
let commentSum = ref(0)
let commentOriginObj = ref({
  tree: [],
  sum: 0
})
let commentTree = ref([
  {
    webSubClose: null,
    webReplyMainSubId: null,
    webReplyMainSubName: null,
    webReplyMainContext: null,
    webReplyContext: null,
    commentUserId: "",
    commentUserName: "",
    commentContent: "",
    commentTime: "",
    ipAddressName: "",
    floorNumber: 1,
    commentUserAvatar: "",
    likeNum: 0,
    isLike: 0,
    commentUserGender: null,
    commentUserRoleType: 0,
    childData: [{
      mainSubId: "",
      mainSubUserId: "",
      mainSubUserName: "",
      likeNum: 0,
      isLike: 0,
      replyNum: 0,
    }],
  }
])
let websiteReplyContext = ref("")
//user data
let userData = ref({})

function initData() {
  userData.value = getLoginData();
  if (!userData.value.id) {
    userData.value.avatar = "https://picsum.photos/100/100"
    userData.value.nickName = "游客"
  }
  commentSum.value = 0;
  commentTree.value = [];
}

function caskCommentTreeLoginMethod(isLogin) {
  if (isLogin) {
    userData.value = getLoginData();
  } else {
    userData.value = {};
    userData.value.avatar = "https://picsum.photos/100/100"
    userData.value.nickName = "游客"
  }
  refreshCommentTree("AT1638054363974995");
}

function refreshCommentTree(inputMainId) {
  getCommentTree(inputMainId).then(res => {
    const status = res.data.status
    if (200 === status) {
      commentOriginObj.value = res.data.data
      commentSum.value = commentOriginObj.value.sum
      commentTree.value = commentTree2TwoLevelTree(commentOriginObj.value.tree)
      dataLoaded.value = true
    }
  })
}

function submitComment(comment) {
  console.log(comment)
  notify({
    message: "评论成功",
    position: 'top',
    type: 'positive',
    timeout: 1500
  })
}

function goToUserSpace(userId) {
  if (!userId || "UV" === userId.substring(0, 2)) {
    notify({
      message: "用户不存在",
      position: 'top',
      type: 'negative',
      timeout: 1500
    })
    return
  }
  let userSpaceUrl = thisRouter.resolve({
    path: `/space`,
    query: {id: userId}
  })
  window.open(userSpaceUrl.href, "_blank")
}

onMounted(() => {
  initData();
  refreshCommentTree("AT1638054363974995");
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  emitter.on("loginMessageEvent", caskCommentTreeLoginMethod)
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  emitter.off("loginMessageEvent", caskCommentTreeLoginMethod)
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

.index-img
  z-index: -1


.resize-fade-enter-active
  transition: all 0.5s ease-out

.resize-fade-leave-active
  max-height: 20rem
  transition: all 0.5s ease-out

.resize-fade-enter-from,
.resize-fade-leave-to
  max-height: 0
  opacity: 0
  transform: translateY(-20rem)


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

.to-space-user-id:hover
  cursor: pointer
  opacity: 0.8
//text-decoration: underline


</style>