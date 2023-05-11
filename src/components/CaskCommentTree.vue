<template>
  <div class=" row justify-center">
    <div class="simple-sec-header">
      <h4 style="margin-bottom: 0.2rem">
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
            <div class="row justify-end q-mt-md">
              <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-comment-dots"/>
              <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-heart"/>
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
                      <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-comment-dots"/>
                      <q-icon class="q-mx-sm" size="xs" name="fa-regular fa-heart"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="col-11">

      <div class="row justify-center">
        <div class="column items-center" style="width: 80px">
          <div class="column items-center">
            <!--            <q-avatar size="60px" style="filter: blur(6px);">-->
            <!--              <q-img :src="userData.avatar"/>-->
            <!--            </q-avatar>-->
            <!--            <q-avatar size="55px" style="margin-top: -57.5px">-->
            <!--              <q-img :src="userData.avatar"/>-->
            <!--            </q-avatar>-->
            <q-avatar size="55px" class="q-mr-lg">
              <q-img :src="userData.avatar"/>
            </q-avatar>

          </div>
        </div>
        <div class="col-10">
          <q-input placeholder="评论..." borderless hide-bottom-space lazy-rules
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
import {getCommentTree, replyComment} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";
import {checkReply} from "@/utils/format-check";
import emitter from "@/utils/bus";
import {getLoginData} from "@/utils/store";
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
    childData: [{
      mainSubId: "",
      mainSubUserName: "",
    }],
  }
])
let commentSum = ref(0)
//user data
let userData = ref({})

function initData() {
  commentTree.value = [];
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
  } else {
    userData.value = {};
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
  emitter.off("loginMessageEvent")
})

</script>

<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";

.reply-input-text {
  padding: 3rem;
  border-radius: 25rem;
}

</style>
