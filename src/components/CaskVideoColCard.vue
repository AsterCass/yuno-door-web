<template>

  <div class="video-col-frame-main">

    <div v-if="isEmpty" class="video-col-card-new">
      <q-btn class="row video-col-card-new-inner bg-grey-3" style="padding: 1%" label="UPLOAD"
             icon="fa-solid fa-plus" text-color="green-10" stack size="25px" @click="uploadVideo"/>

      <div class="text-center q-mt-sm video-col-title">
        <div class="text-center text-grey-7 simple-content simple-a-no-underline">上传视频</div>
      </div>

    </div>

    <div v-else class="video-col-card-list">

      <q-btn class="video-col-card-img bg-white" @click="playVideoList">
        <q-img :src="`${videoColData.collectionImg}`" :ratio="9/16" style="border-radius: 1rem">
        </q-img>
      </q-btn>
      <div class="text-center video-col-card-title">
        <div class="text-center text-grey-7 simple-content simple-a-no-underline">
          {{ videoColData.collectionName }}
        </div>
      </div>

    </div>


  </div>


</template>

<script setup>
import {defineProps} from "vue";
import {useQuasar} from "quasar";
import {getVideoListByColId} from "@/api/video";
import {webIsLogin} from "@/utils/store";
import {useRouter} from "vue-router";

//视频组跳转
const thisRouter = useRouter()
//notify
const notify = useQuasar().notify
//prop
const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: false
  },
  videoColData: {
    id: ""
  }
})

function videoColWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}


function uploadVideo() {
  if (webIsLogin()) {
    videoColWarningNotify("暂未开放普通用户视频上传权限")
  } else {
    videoColWarningNotify("用户未登录，请登录后操作")
  }

}

//播放视频
function playVideoList() {
  let id = props.videoColData.id
  if (!id || 0 === id.length) {
    videoColWarningNotify("视频不小心走丢啦，刷新试试吧")
    return
  }
  let param = {collectionId: id}
  getVideoListByColId(param).then(res => {
    const data = res.data
    if (data.status && 200 !== data.status) {
      videoColWarningNotify(data.message)
    } else if (data && 0 === data.length) {
      videoColWarningNotify("当前用户无权限访问，请联系站长授权")
    } else {
      const videoUrl = thisRouter.resolve({
        path: `/video/play`,
        query: {colId: id, vdoId: data[0].id}
      })
      window.open(videoUrl.href, "_blank")
    }
  })
}


</script>

<style lang="scss" scoped>
@import "@/styles/cask-little-mini-style.scss";
@import "animate.css";

.video-col-frame-main {
  width: 100%;
  height: 100%;

  .video-col-card-new {
    width: 100%;
    height: 92%;
    border-radius: 1rem;

    .video-col-card-new-inner {
      height: 100%;
      width: 100%;
      box-shadow: 4px 4px 2px $cask_base_black;
      border-radius: 1rem;
    }
  }


  .video-col-card-list {

    .video-col-card-img {
      //animation: fadeOutDown 1.7s infinite;
      padding: 1%;
      border-radius: 1rem;
      box-shadow: 4px 4px 2px $cask_base_black;
      position: relative;
      width: 92%;
      left: 4%;
      transition-duration: .3s;
    }

    .video-col-card-title {
      transition-duration: .3s;
      margin-top: 5%;
    }
  }

  .video-col-card-list:hover {
    .video-col-card-img {
      margin: -20% -10%;
      box-shadow: 8px 8px 8px $cask_base_black;
      width: 110%;
    }

    .video-col-card-title {
      margin-top: 25%;
      font-size: 1.2rem;
    }


  }


}


</style>