<template>
  <div>
    <div v-if="!isLoginStatus">
      <q-btn label="登录" @click="showLoginDiaLog" class="head-login"/>
    </div>
    <div class="user-simple" v-if="isLoginStatus">
      <q-btn round flat dense icon="fa-solid fa-bell" class="q-mr-xs"/>
      <!--      todo-->
      <!--      <q-btn round flat dense icon="fa-solid fa-bell" class="q-mr-xs">-->
      <!--        <q-badge color="green-10" text-color="white" floating>-->
      <!--          1-->
      <!--        </q-badge>-->
      <!--      </q-btn>-->


      {{ userData.nickName }}
      <q-btn round color="white" class="header-user-avatar" to="/space"
             v-on:mouseover="userMenuTouchOver" v-on:mouseleave="userMenuTouchLeave">
        <q-avatar size="40px">
          <q-img :src="userData.avatar"/>
        </q-avatar>

        <q-menu :model-value="userMenuShow"
                v-on:mouseover="userMenuTouchOver" v-on:mouseleave="userMenuTouchLeave"
                style="background-color:rgba(0,0,0,0);box-shadow:none;backdrop-filter: none"
                transition-hide="fade" transition-duration="800" no-parent-event
                anchor="bottom middle" self="top middle" :offset="[0, 3]">

          <q-item>
            <q-card class="user-data-card column q-pa-md">
              <div class="column items-center">
                <q-avatar size="100px">
                  <q-img :src="userData.avatar"/>
                </q-avatar>
                <div class="q-mt-md q-mb-xs user-simple text-white">
                  {{ userData.nickName }}
                </div>
              </div>
              <q-separator spaced="0.5rem" size="0.05rem"/>
              <q-btn class="dialog-btn-margin-sec" to="/space" label="个人中心"/>
              <q-btn class="dialog-btn-margin-warn" @click="logoutMethod" label="登出"/>
            </q-card>
          </q-item>

        </q-menu>

      </q-btn>


    </div>
  </div>
  <CaskLogin/>

</template>

<script setup>

//user data
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {getLoginData, getLoginToken, isLogin, logout} from "@/utils/store";
import {delay} from "@/utils/delay-exe";
import CaskLogin from "@/components/CaskLogin.vue";

let userData = ref({
  id: '',
  avatar: '',
  nickName: '',
})
let isLoginStatus = ref(true)
//user menu
let onDesignatedZone = ref(false)
let userMenuShow = ref(false)

//弹出登录框
function showLoginDiaLog() {
  emitter.emit('showLoginDiaLogEven')
}

//登录操作
function loginMethod() {
  userData.value = getLoginData()
}

//登出操作
function logoutMethod() {
  logout(userData.value.id)
}

//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    loginMethod()
    isLoginStatus.value = true
  } else {
    isLoginStatus.value = false
  }
}

//感知更新数据事件
function refreshLoginMessage(data) {
  if (data) {
    userData.value = data
  }
}

//感知菜单鼠标进入事件
function userMenuTouchOver() {
  onDesignatedZone.value = true
  userMenuShow.value = onDesignatedZone.value
}

//感知菜单鼠标离开事件
function userMenuTouchLeave() {
  onDesignatedZone.value = false
  delay(200).then(() => {
    userMenuShow.value = onDesignatedZone.value
  })
}

onMounted(() => {
  //login and data init
  emitter.on("loginMessageEvent", loginMessage)
  emitter.on("refreshLoginMessageEvent", refreshLoginMessage)
  userData.value = getLoginData()
  isLoginStatus.value = null != getLoginToken()
  isLogin()
})

onUnmounted(() => {
  emitter.off("loginMessageEvent", loginMessage)
  emitter.off("refreshLoginMessageEvent", refreshLoginMessage)
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-dialog-style.scss"

.user-simple
  font-family: Roboto Slab, sans-serif
  font-size: 1.1rem

.header-user-avatar
  margin-left: 0.25rem

.head-login
  margin: 0.5rem
  text-align: center
  color: white
  min-width: 5rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 0.8rem


.user-data-card
  color: $cask_dark_jungle_green

  background-image: linear-gradient(#4DB7AC 50%, white)
  box-shadow: 5 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)
  border-radius: 1rem
  font-size: 1rem
  line-height: 1.625
  margin: 5%
  min-width: 200px
  min-height: 200px

</style>