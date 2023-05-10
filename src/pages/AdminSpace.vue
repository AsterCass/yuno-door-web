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
            <div class="space-right-title">
              基本资料
            </div>
            <q-separator spaced="1rem" size="0.05rem" inset/>
            <div class="row">
              <div class="col-12 row justify-start">
                <div class="column justify-center col-3 space-card-input-name">
                  用户名/登录账号：
                </div>
                <q-input class="col-7 dialog-btn-small" placeholder="用户名/登录账号" v-model="userData.account"
                         filled color="black" disable/>
              </div>
              <div class="col-12 row justify-start">
                <div class="column justify-center col-3 space-card-input-name">
                  邮箱：
                </div>
                <q-input class="dialog-btn-small" placeholder="邮箱" v-model="userData.mail"
                         filled color="black" disable/>
              </div>
              <div class="col-12 row justify-start">
                <div class="column justify-center col-3 space-card-input-name">
                  昵称：
                </div>
                <q-input class="col-7 dialog-btn-small-contain-valid" placeholder="昵称" v-model="userData.nickName"
                         filled color="black" lazy-rules
                         :rules="[ val => checkNickName(val) || '昵称不允许超过20个字符，并且不能含有某些特殊字符']"/>
              </div>
              <div class="col-12 row justify-start">
                <div class="column justify-center col-3 space-card-input-name">
                  性别：
                </div>
                <q-select class="col-7 dialog-btn-small" v-model="refGender"
                          options-cover filled color="black" :options="genderOptEnum"/>
              </div>
              <div class="col-12 row justify-center">
                <div class="col-5 row">
                  <div class="column justify-center col-3 space-card-input-name">
                    姓：
                  </div>
                  <q-input class="col-7 dialog-btn-small-contain-valid" placeholder="姓" v-model="userData.lastName"
                           filled color="black" lazy-rules
                           :rules="[ val => checkName(val) || '姓氏不合法']"/>
                </div>
                <div class="col-5 row">
                  <div class="column justify-center col-3 space-card-input-name">
                    名：
                  </div>
                  <q-input class="col-7 dialog-btn-small-contain-valid" placeholder="名" v-model="userData.firstName"
                           filled color="black" lazy-rules
                           :rules="[ val => checkName(val) || '名字不合法']"/>
                </div>
              </div>
              <div class="col-12 row justify-start">
                <div class="column justify-center col-3 space-card-input-name">
                  生日：
                </div>
                <q-input class="col-7 dialog-btn-small" placeholder="生日" v-model="userData.birth"
                         type="date" filled color="black"/>
              </div>
              <div class="col-12 row justify-start not-allow-resize">
                <div class="column justify-center col-3 space-card-input-name">
                  个性签名：
                </div>
                <q-input class="col-7 dialog-btn-small-contain-valid" placeholder="个性签名（50字以内）"
                         v-model="userData.motto" type="textarea" filled color="black"
                         :rules="[ val => checkMotto(val) || '签名不允许超过50个字符']"/>
              </div>
            </div>

            <div class="row justify-evenly space-card-btn-group">
              <q-btn class="dialog-btn-margin-long" @click="saveProfile">保存</q-btn>
              <q-btn class="dialog-btn-margin-long" @click="resetProfile">重置</q-btn>
            </div>
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
import {computed, onMounted, onUnmounted, ref} from "vue";
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import {isLogin, getLoginData, refreshLoginMessage} from "@/utils/store";
import {genderOptEnum, getGenderObj} from "@/utils/gender-opt";
import {checkName, checkMotto, checkNickName} from "@/utils/format-check";
import {updateInfo} from "@/api/user";
import {useQuasar} from "quasar";
import emitter from "@/utils/bus";
import CaskUploadAvatar from "@/components/CaskUploadAvatar.vue";
import {useRouter} from "vue-router";

//notify
const notify = useQuasar().notify
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
//gender
let refGender = ref(null);
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


//notify
function regWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

//save user info
function saveProfile() {
  //check
  if (!checkNickName(userData.value.nickName)) {
    regWarningNotify("昵称格式错误")
    return
  }
  if (!checkName(userData.value.firstName)) {
    regWarningNotify("名字格式错误")
    return
  }
  if (!checkName(userData.value.lastName)) {
    regWarningNotify("姓氏格式错误")
    return
  }
  if (!checkMotto(userData.value.motto)) {
    regWarningNotify("个性签名格式错误")
    return
  }
  //set gender
  userData.value.gender = refGender.value.category
  updateInfo(userData.value).then(res => {
    const status = res.data.status
    if (200 === status) {
      notify({
        message: "保存成功",
        position: 'top-right',
        type: 'positive',
        timeout: 1000
      })
      refreshLoginMessage()
    } else {
      regWarningNotify("保存失败：" + res.data.message)
    }
  })
}

//reset user info
function resetProfile() {
  isLogin()
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
    refGender.value = getGenderObj(loginData.gender)
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
  emitter.off("loginMessageEvent")
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent")
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

.space-right-title {
  margin-top: 1rem;
  font-family: '华文行楷', sans-serif;
  text-align: center;
  font-size: 2.5rem;
}

.space-right-coming-soon {
  font-family: Roboto Slab, sans-serif;
  text-align: center;
  height: 50rem;
  padding: 40% 0;
  font-size: 3rem;
}

.space-card-input-name {
  align-items: center
}

.space-card-btn-group {
  height: 3rem;
  margin: 2rem 0;
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

.not-allow-resize {
  .q-textarea .q-field__native {
    resize: none;
  }
}

</style>