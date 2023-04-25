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
          <q-btn label="登录" @click="loginMethod" class="dialog-btn-margin col-4"/>
          <q-btn label="注册" @click="registryMethod" class="dialog-btn-margin col-4"/>
        </div>

      </q-card>
    </q-dialog>
  </div>
  <CaskRegistry/>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import CaskRegistry from "@/components/CaskRegistry.vue";
import {authLogin} from "@/utils/user-auth"

//notify
const notify = useQuasar().notify

let loginDiaLog = ref(false)
let account = ref("")
let passwd = ref("")

function showLoginDiaLog() {
  loginDiaLog.value = true
}

function closeLogin() {
  loginDiaLog.value = false
}

function loginMethod() {
  authLogin(account.value, passwd.value, notify)
}

//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    loginDiaLog.value = false
  }
}


function registryMethod() {
  loginDiaLog.value = false
  emitter.emit('showRegistryDialogEven')
}

onMounted(() => {
  emitter.on('showLoginDiaLogEven', showLoginDiaLog)
  emitter.on("loginMessageEvent", loginMessage)
})

onUnmounted(() => {
  emitter.off('showLoginDiaLogEven')
  emitter.off("loginMessageEvent")
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask-dialog-style.scss"

</style>