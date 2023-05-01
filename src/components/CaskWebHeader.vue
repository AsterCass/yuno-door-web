<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="home" to="/"/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book-bookmark" label="essay" to="/essay/list"/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book" label="article" to="/article/list"/>
      <q-toolbar-title>Aster Casc</q-toolbar-title>
      <div v-if="!isLoginStatus">
        <q-btn label="登录" @click="showLoginDiaLog" class="head-login"/>
      </div>
      <div class="user-simple" v-if="isLoginStatus">
        {{ userData.nickName }}
        <q-btn round color="white" class="header-user-avatar" to="/space"
               v-on:mouseover="userMenuTouchOver" v-on:mouseleave="userMenuTouchLeave">
          <q-avatar size="40px">
            <q-img :src="userData.avatar"/>
          </q-avatar>

          <q-menu :model-value="userMenuShow"
                  v-on:mouseover="userMenuTouchOver" v-on:mouseleave="userMenuTouchLeave"
                  style="background-color:rgba(0,0,0,0);box-shadow:none;"
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
    </q-toolbar>
  </q-header>
  <CaskLogin/>
</template>

<script setup>

import {defineProps, onMounted, onUnmounted, ref} from "vue";
import CaskLogin from "@/components/CaskLogin.vue";
import emitter from "@/utils/bus";
import {getLoginData, getLoginToken, isLogin, logout} from "@/utils/store";
import {delay} from "@/utils/delay-exe";


//user data
let userData = ref({
  id: '',
  avatar: '',
  nickName: '',
})
let isLoginStatus = ref(true)
//user menu
let onDesignatedZone = ref(false)
let userMenuShow = ref(false)

defineProps({
  headerVisible: {
    type: Boolean,
    default: false
  }
})

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
  emitter.emit("loginMessageEvent", false)
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
  emitter.off("loginMessageEvent")
  emitter.off("refreshLoginMessageEvent")
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

.index-header
  left: 0
  right: 0
  top: 20px
  margin: auto
  width: 80%
  color: $cask_base_black
  text-align: center
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 15px

  .headerBtn
    font-size: 0.8rem
    padding-top: 0.8rem
    font-weight: bold

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