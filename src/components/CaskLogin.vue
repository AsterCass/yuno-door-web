<template>
  <div>
    <q-dialog :model-value="loginDiaLog" @hide="closeLogin"
              transition-show="fade" transition-hide="fade">
      <q-card class="dialog-frame column justify-between">

        <div class="dialog-header">
          System Login
          <div class="dialog-tag">
            登录解锁系统隐藏区域
          </div>
        </div>


        <div>
          <q-input class="dialog-input" placeholder="账号" v-model="account"
                   filled color="black"/>
          <q-input class="dialog-input" placeholder="密码" v-model="passwd"
                   filled color="black" :type="'password'"/>
        </div>


        <div class="row justify-around dialog-btn-comb">
          <q-btn label="登 录" @click="loginMethod" class="dialog-btn-margin col-8" :disable="loginBtnDisable"/>
          <!--          <q-btn label="注册" @click="registryMethod" class="dialog-btn-margin col-4"/>-->
        </div>

        <div class="row justify-evenly">
          <q-btn flat no-wrap class="same-a-btn" @click="resetPasswdMethod" label="重置密码"/>
          <q-btn flat no-wrap class="same-a-btn" @click="registryMethod" label="注册账号"/>
        </div>

      </q-card>
    </q-dialog>
  </div>
  <CaskRegistry/>
  <CaskResetPassword/>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import CaskRegistry from "@/components/CaskRegistry.vue";
import {authLogin} from "@/utils/user-auth"
import CaskResetPassword from "@/components/CaskResetPassword.vue";

//notify
const notify = useQuasar().notify

let loginDiaLog = ref(false)
let account = ref("")
let passwd = ref("")

//防抖动
let loginBtnDisable = ref(false)

function showLoginDiaLog() {
  loginDiaLog.value = true
}

function closeLogin() {
  loginDiaLog.value = false
}

function loginMethod() {
  loginBtnDisable.value = true
  authLogin(account.value, passwd.value, notify)
}

//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    loginDiaLog.value = false
  }
  loginBtnDisable.value = false
}


function registryMethod() {
  loginDiaLog.value = false
  emitter.emit('showRegistryDialogEven')
}

function resetPasswdMethod() {
  loginDiaLog.value = false
  emitter.emit('showResetPassDialogEven')
}

onMounted(() => {
  emitter.on('showLoginDiaLogEven', showLoginDiaLog)
  emitter.on("loginMessageEvent", loginMessage)
})

onUnmounted(() => {
  emitter.off('showLoginDiaLogEven', showLoginDiaLog)
  emitter.off("loginMessageEvent", loginMessage)
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask-dialog-style.scss"
@import "@/styles/cask-little-mini-style.scss"

</style>