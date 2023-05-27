<template>

  <div class="cask-video-main-frame">
    <div class="q-mt-md" v-for="(videoCate, count) in videoColCategory" :key="videoCate.title">
      <h4 class="simple-sec-header cask-text-secondary-deep-color">
        <q-icon class="q-mr-md" :name="`${videoCate.icon}`"/>
        {{ videoCate.title }}
      </h4>
      <div class="row" v-if="0 !== videoCate.refer.value.length">
        <div class="q-ma-lg" v-for="item in videoCate.refer.value" :key="item.id"
             style="height: 320px; width: 180px">
          <CaskVideoColCard :video-col-data="item"/>
        </div>
      </div>
      <div v-else>
        <div class="q-ma-md" style="height: 320px; width: 180px">
          <CaskVideoColCard :is-empty="true"/>
        </div>
      </div>
      <q-separator v-if="count !== videoColCategory.length-1" spaced="1.5rem" size="0.05rem"/>
    </div>
  </div>


</template>

<script setup>
import CaskVideoColCard from "@/components/CaskVideoColCard.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {getAdminVideoCol, getPersonVideoCol} from "@/api/video";
import emitter from "@/utils/bus";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import {getLoginData} from "@/utils/store";
import {customPage, customPageNP} from "@/utils/page";

//user data
let userData = ref({
  id: "",
})
//public video
let publicVideoColList = ref([])
//my video
let myVideoColList = ref([])
//admin video
let adminVideoColList = ref([])
//col category
const videoColCategory = [
  {icon: "fa-solid fa-box-open", title: "公共视频", refer: publicVideoColList},
  {icon: "fa-solid fa-user-secret", title: "站长视频", refer: adminVideoColList},
  {icon: "fa-solid fa-user", title: "我的视频", refer: myVideoColList},
]

//个人视频更新
function updatePersonVideoCol() {
  if (userData.value.id && 0 !== userData.value.id.length) {
    let param = {userId: userData.value.id}
    getPersonVideoCol(customPage(param)).then(res => {
      if (200 === res.status) {
        myVideoColList.value = res.data
      }
    })
  }
}

//种类视频
function getCateVideo() {
  getAdminVideoCol(customPageNP(0, 100)).then(res => {
    if (200 === res.status) {
      adminVideoColList.value = res.data
    }
  })
  getPersonVideoCol().then(res => {
    if (200 === res.status) {
      publicVideoColList.value = res.data
    }
  })
  updatePersonVideoCol()
}


//登录通知
function loginMessageEventVideoCol(isOnLogin) {
  if (isOnLogin) {
    userData.value = getLoginData()
    updatePersonVideoCol()
  } else {
    myVideoColList.value = []
  }
}

//登录刷新通知
function refreshUserDataEventVideoCol(data) {
  if (data) {
    userData.value = data
    updatePersonVideoCol()
  }
}


onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //登录事件
  emitter.on("loginMessageEvent", loginMessageEventVideoCol)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserDataEventVideoCol)
  //分类视频数据
  getCateVideo();
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessageEventVideoCol)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserDataEventVideoCol)
})


</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";

.cask-video-main-frame {
  margin: 3% 5%;
  min-height: 20rem;
}

</style>