<template>
  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="true"/>


    <div style="z-index: -1">
      <q-img class="index-img"
             :no-native-menu="false"
             src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg1-half.jpg"
             placeholder-src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg1-half-dim.jpg"
             alt=""
             :ratio="3"
             :fit="'cover'">
      </q-img>
    </div>

    <div class="page-main-card row">
      <div class="col-4 space-card-left row justify-center">
        <div class="col-12 justify-center space-head">
          <q-avatar size="150px">
            <q-img :src="userData.avatar"/>
          </q-avatar>

          <div class="space-head-modify">
            <q-btn label="修改头像" class="dialog-btn-margin" @click="modifyAvatar">
            </q-btn>
          </div>
        </div>

        <div class="col-12 row">
          <q-tabs
              v-model="currentTab"
              vertical inline-label
              indicator-color="transparent"
              active-color="secondary"
              class="col-12"
          >
            <q-tab class="space-left-tab" name="profile" icon="fa-solid fa-address-card" label="基本资料"/>
            <q-tab class="space-left-tab" name="article" icon="fa-solid fa-book" label="我的文章"/>
            <q-tab class="space-left-tab" name="friend" icon="fa-solid fa-user-group" label="我的好友"/>
            <q-tab class="space-left-tab" name="security" icon="fa-solid fa-user-shield" label="账号安全"/>
            <q-tab class="space-left-tab" name="setting" icon="fa-solid fa-gear" label="账号设置"/>
          </q-tabs>
        </div>
        <div class="col-12 row space-profile-integrity">
          资料完整度：{{ Math.floor(profileIntegrity * 100) }}%
          <q-linear-progress stripe rounded size="10px" :value="profileIntegrity" color="secondary" class="q-mt-sm"/>
        </div>
      </div>
      <div class="col-8">
        <q-tab-panels
            v-model="currentTab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
            class="space-card-right"
        >
          <q-tab-panel name="profile">
            <CaskUserProfile :user-data="userData"/>
          </q-tab-panel>
          <q-tab-panel name="article">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.5rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="friend">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.5rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="security">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.5rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="setting">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.5rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

    </div>

  </q-layout>

  <CaskUploadAvatar :user-data="userData"/>
  <CopyrightFooter/>

</template>

<script setup>
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {
  computed,
  onMounted,
  onUnmounted,
  ref
} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import {getLoginData, refreshLoginMessage} from "@/utils/store";
import emitter from "@/utils/bus";
import CaskUploadAvatar from "@/components/CaskUploadAvatar.vue";
import {useRouter} from "vue-router";
import CaskUserProfile from "@/views/CaskUserProfile.vue";

//无数据跳转
const thisRouter = useRouter()
//user data
let userData = ref({
  id: "",
  avatar: "",
  account: "",
  mail: "",
  gender: 0,
  birth: "",
  motto: "",
  firstName: "",
  lastName: "",
  nickName: ""
})
//设置栏目
let currentTab = ref("profile")
//资料完整度
let profileIntegrity
//计算资料完整度
profileIntegrity = computed(() => {
  let curIntegrity = 0;
  if (null != userData.value.birth && 0 !== userData.value.birth.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.firstName && 0 !== userData.value.firstName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.lastName && 0 !== userData.value.lastName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.nickName && 0 !== userData.value.nickName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.motto && 0 !== userData.value.motto.length) {
    curIntegrity += 0.2
  }
  return curIntegrity
})

//reset user info
function resetProfile() {
  refreshLoginMessage()
}

//modify avatar
function modifyAvatar() {
  emitter.emit("showUploadDialogEven", true)
}

//登录事件
function loginMessage(isOnLogin) {
  if (isOnLogin) {
    let loginData
    loginData = getLoginData()
    userData.value = loginData
  } else {
    thisRouter.push({
      path: '/notLogin'
    })
  }
}

//刷新数据
function refreshUserData(data) {
  if (data) {
    userData.value = data
  }
}

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  //初始化登录信息
  resetProfile()
  //登录事件
  emitter.on("loginMessageEvent", loginMessage)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserData)
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessage)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserData)
})
</script>

<style scoped lang="scss">
@import "@/styles/cask-dialog-style.scss";

.page-main-card {
  margin: -5% 10% 5% 10%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
  min-height: 600px;
}

.space-card-left {
  text-align: center;
  padding: 3%;
}

.space-head {
  margin: 0.5rem 2%;
}

.space-head-modify {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.space-profile-integrity {
  height: 3rem;
}

.space-card-right {
  border-radius: 0 50px 50px 0;
}

.space-right-coming-soon {
  font-family: Roboto Slab, sans-serif;
  text-align: center;
  height: 50rem;
  padding: 40% 0;
  font-size: 3rem;
}

</style>

<style lang="scss">

.space-left-tab {
  margin: 2rem 2%;
  height: 3rem;

  .q-tab__label {
    font-size: 1.5rem;
  }
}

</style>