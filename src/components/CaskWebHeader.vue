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
      <div v-if="isLoginStatus" class="user-simple">
        {{ userData.nickName }}
        <q-btn round color="white" @click="logoutMethod" class="header-user-avatar">
          <q-avatar size="40px">
            <img :src="userData.avatar" alt=""/>
          </q-avatar>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
  <CaskLogin/>
</template>

<script setup>

import {computed, defineProps, onMounted, onUnmounted, ref} from "vue";
import CaskLogin from "@/components/CaskLogin.vue";
import emitter from "@/utils/bus";
import {getLoginData, isLogin, logout} from "@/utils/store";
import {userLogin} from "@/utils/share-data";


//user data
let userData = ref({
  avatar: '',
  nickName: '',
})
//user login share data
const userLoginData = userLogin()

let isLoginStatus = computed(() => userLoginData.isLogin)

defineProps({
  headerVisible: {
    type: Boolean,
    default: false
  }
})

function showLoginDiaLog() {
  emitter.emit('showLoginDiaLogEven')
}

//登录操作
function loginMethod() {
  userData.value = getLoginData()
}

//登出操作
function logoutMethod() {
  logout()
}

//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    loginMethod()
  }
}

onMounted(() => {
  emitter.on("loginMessageEvent", loginMessage)
  if (isLogin()) {
    loginMethod()
  }
})

onUnmounted(() => {
  emitter.off("loginMessageEvent")
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

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

</style>