<template>
  <div>
    this place play video, collection id = {{ colId }}
  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import emitter from "@/utils/bus";
import {getLoginData} from "@/utils/store";
import {useRouter} from "vue-router";
import {getVideoListByColId} from "@/api/video";
import {useQuasar} from "quasar";

//router
const thisRouter = useRouter()
//notify
const notify = useQuasar().notify

function videoPlayWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

//props
const props = defineProps({
  colId: {
    type: String,
    default: ""
  },
  vdoId: {
    type: String,
    default: ""
  }
})
//用户数据
let userData = ref({
  id: "",
})

//数据初始化
function initVideoPlayData() {
  userData = ref({})
}

//获取视频数据
function getCollectionVideos() {
  let userId = userData.value.id
  if (!userId || 0 === userId.length) {
    thisRouter.push({
      path: '/notLogin'
    })
  }
  let param = {collectionId: props.colId}
  getVideoListByColId(param).then(res => {
    const data = res.data
    if (data.status && 200 !== data.status) {
      videoPlayWarningNotify(data.message)
    } else if (data && 0 === data.length) {
      thisRouter.push({
        path: '/noAuth'
      })
    } else {
      //todo
      console.log(data)
    }
  })


}

//登录通知
function loginMessageEventVideoPlay(isOnLogin) {
  if (isOnLogin) {
    userData.value = getLoginData()
  } else {
    userData.value = {}
  }
  getCollectionVideos()
}

//刷新数据
function refreshUserDataEventVideoPlay(data) {
  if (data) {
    userData.value = data
  }
  getCollectionVideos()
}

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //数据初始化
  initVideoPlayData()
  //登录事件
  emitter.on("loginMessageEvent", loginMessageEventVideoPlay)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserDataEventVideoPlay)
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessageEventVideoPlay)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserDataEventVideoPlay)
})

</script>

<style scoped>

</style>