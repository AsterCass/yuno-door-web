<template>
  <div class=" row justify-center">
    <div class="simple-sec-header">
      <h4>
        {{ commentSum }} 评论
      </h4>
    </div>
    <div class="col-11 q-mx-md">
      <div v-for="(comment, index) in commentTree" :key="index">
        <div class="row justify-center q-my-lg">
          <div class="column items-center" style="width: 80px">
            <div class="column items-center">
              <q-avatar size="60px" style="filter: blur(6px);">
                <q-img :src="comment.commentUserAvatar"/>
              </q-avatar>
              <q-avatar size="55px" style="margin-top: -57.5px">
                <q-img :src="comment.commentUserAvatar"/>
              </q-avatar>
            </div>
          </div>
          <div class="col-10">
            <div>
              <div class="simple-bold-little-title">
                {{ comment.commentUserName }}
                <span class="simple-content-tag">
                  &#32;·&#32;{{ comment.commentTime }}&#32;·&#32;{{ comment.ipAddressName }}
                </span>
              </div>
            </div>
            <div class="simple-content">
              {{ comment.commentContent }}
            </div>
            <div class="row justify-end ">
              <!--              <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-comment-dots"/>-->
              <!--              <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-heart"/>-->

              <q-checkbox :model-value="false" @click="updateReplyComment(comment)"
                          :label="comment.childData.length.toString()" unchecked-icon="fa-regular fa-comment"/>
              <q-checkbox :model-value="1 === comment.isLike" @click="updateUserLike(comment)"
                          :label="comment.likeNum.toString()" color="red"
                          checked-icon="fa-solid fa-heart" unchecked-icon="fa-regular fa-heart"/>
            </div>
            <div v-if="comment.childData && 0 !== comment.childData.length">
              <div v-for="(childComment, index) in comment.childData" :key="index">
                <div class="row justify-center q-my-lg">
                  <div class="column items-center" style="width: 80px">
                    <div class="column items-center">
                      <q-avatar size="60px" style="filter: blur(6px);">
                        <q-img :src="childComment.commentUserAvatar"/>
                      </q-avatar>
                      <q-avatar size="55px" style="margin-top: -57.5px">
                        <q-img :src="childComment.commentUserAvatar"/>
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-10">
                    <div>
                      <div class="simple-bold-little-title">
                        {{ childComment.commentUserName }}
                        <span class="simple-content-tag">
                  &#32;·&#32;{{ childComment.commentTime }}&#32;·&#32;{{ childComment.ipAddressName }}
                </span>
                      </div>
                    </div>
                    <div class="simple-content">
                      <span v-if=" comment.id !== childComment.mainSubId" class="cask-text-thirdly-color">
                        @{{ childComment.mainSubUserName }}:
                      </span>
                      {{ childComment.commentContent }}
                    </div>
                    <div class="row justify-end q-mt-md">
                      <q-checkbox :model-value="false" @click="updateReplyComment(childComment)"
                                  :label="childComment.replyNum.toString()" unchecked-icon="fa-regular fa-comment"/>
                      <q-checkbox :model-value="1 === childComment.isLike" @click="updateUserLike(childComment)"
                                  :label="childComment.likeNum.toString()" color="red"
                                  checked-icon="fa-solid fa-heart" unchecked-icon="fa-regular fa-heart"
                                  indeterminate-icon="help"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="col-12 q-my-xl">

      <div class="row justify-center">
        <div class="column items-center" style="width: 80px">
          <div class="column items-center">
            <q-avatar size="55px" class="q-mr-lg">
              <q-img :src="userData.avatar"/>
            </q-avatar>

          </div>
        </div>
        <div id="cask-comment-reply" class="col-10">
          <div v-if="replySubContent.length !== 0">
            <div class="row justify-between">
              <div>
                <span class="cask-text-thirdly-color">
                  回复:{{ replySubUserName }}&#32;&#32;
                </span>
                {{ replySubContent }}
              </div>
              <div class="col-12 q-my-md row justify-end">
                <q-btn flat no-wrap class="same-a-btn" label="取消回复" @click="cancelReplySub"/>
              </div>

            </div>
          </div>
          <q-input :placeholder="0 === commentOriginObj.sum ? '还没有人评论，快来占沙发吧' : '你们说的都不对，我来'"
                   borderless hide-bottom-space lazy-rules
                   :input-style="{boxShadow: '0 0 5px 5px #2B5853',
                   backgroundImage: 'linear-gradient(195deg, #447550, #2B5853 50%)',
                   borderRadius: '12px', padding: '1.2rem', fontSize: '1rem',color: 'white'}"
                   v-model="commentContent" type="textarea" color="secondary"/>
          <div class="q-mt-md">
            <q-btn icon="mail" class="cask-simple-btn-margin-sec"
                   label="提交" @click="replyCommentMethod"/>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>

import {defineProps, onMounted, onUnmounted, ref} from "vue";
import {getCommentTree, likeComment, replyComment} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";
import {checkReply} from "@/utils/format-check";
import emitter from "@/utils/bus";
import {getLoginData, webIsLogin} from "@/utils/store";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

function commentWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

const props = defineProps({
  mainId: {
    type: String,
    default: "UN_KNOW"
  },
})
//reply content
let replySubMainId = ref(props.mainId)
let replySubUserName = ref("")
let replySubContent = ref("")
let commentContent = ref("")
//comment tree
let commentOriginObj = ref({
  tree: [],
  sum: 0
})
let commentTree = ref([
  {
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
let commentSum = ref(0)
//user data
let userData = ref({})

function initData() {
  commentTree.value = [];
}

function updateReplyComment(comment) {
  replySubMainId.value = comment.id
  replySubUserName.value = comment.commentUserName
  replySubContent.value = comment.commentContent
  const target = document.getElementById("cask-comment-reply");
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

function cancelReplySub() {
  replySubMainId.value = props.mainId
  replySubUserName.value = ""
  replySubContent.value = ""
}

function updateUserLike(comment) {
  if (!webIsLogin()) {
    commentWarningNotify("未登录用户无法点赞，请登录后操作")
    return
  }
  if (0 === comment.isLike) {
    comment.isLike = 1
    comment.likeNum = comment.likeNum + 1
  } else {
    comment.isLike = 0
    comment.likeNum = comment.likeNum - 1
  }
  likeComment(comment.id, comment.isLike)
}

function refreshCommentTree() {
  getCommentTree(props.mainId).then(res => {
    const status = res.data.status
    if (200 === status) {
      commentOriginObj.value = res.data.data
      commentSum.value = commentOriginObj.value.sum
      commentTree.value = commentTree2TwoLevelTree(commentOriginObj.value.tree)
    }
  })
}

function caskCommentTreeLoginMethod(isLogin) {
  if (isLogin) {
    userData.value = getLoginData();
    refreshCommentTree();
  } else {
    userData.value = {};
    refreshCommentTree();
  }
}

function replyCommentMethod() {
  let replyNewData = {mainId: props.mainId, mainSubId: replySubMainId.value};
  if (!checkReply(commentContent.value)) {
    commentWarningNotify("输入内容不允许为空，且不能超过500字符")
    return
  }
  replyNewData.commentContent = commentContent.value.trim()
  commentContent.value = ""
  replyComment(replyNewData).then(res => {
    const status = res.data.status
    if (200 === status) {
      notify({
        message: "回复成功",
        position: 'top-right',
        type: 'positive',
        timeout: 1000
      })
      refreshCommentTree();
    }
  })
}


onMounted(() => {
  initData();
  emitter.on("loginMessageEvent", caskCommentTreeLoginMethod)
  refreshCommentTree();
})

onUnmounted(() => {
  emitter.off("loginMessageEvent", caskCommentTreeLoginMethod)
})

</script>

<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";

.reply-input-text {
  padding: 3rem;
  border-radius: 25rem;
}

</style>
