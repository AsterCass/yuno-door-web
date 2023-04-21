<template>
  <div>
    <q-dialog :model-value="loginDiaLog" @hide="closeLogin"
              transition-show="fade" transition-hide="fade">
      <q-card class="login-dialog-class column justify-between">

        <div class="login-dialog-header">
          Link start
        </div>

        <div>
          <q-input class="login-dialog-input" placeholder="账号" v-model="account"
                   filled color="black"/>
          <q-input class="login-dialog-input" placeholder="密码" v-model="passwd"
                   filled color="black" :type="'password'"/>
        </div>


        <div class="row justify-around login-dialog-btn-comb">
          <q-btn label="登录" @click="loginSuccess" class="login-dialog-btn col-4"/>
          <q-btn label="注册" @click="closeLogin" class="login-dialog-btn col-4"/>
        </div>

      </q-card>
    </q-dialog>
    <q-dialog :model-value="loginResult"
              :position="'top'" auto-close no-focus>
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          登录成功
          <!--          <div>-->
          <!--            <div class="text-weight-bold">The Walker</div>-->
          <!--            <div class="text-grey">Fitz & The Tantrums</div>-->
          <!--          </div>-->

          <!--          <q-space />-->

          <!--          <q-btn flat round icon="fast_rewind" />-->
          <!--          <q-btn flat round icon="pause" />-->
          <!--          <q-btn flat round icon="fast_forward" />-->
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";

let loginDiaLog = ref(false)
let loginResult = ref(false)
let account = ref("")
let passwd = ref("")

function showLoginDiaLog() {
  loginDiaLog.value = true
}

function closeLogin() {
  loginDiaLog.value = false
}

function loginSuccess() {
  loginDiaLog.value = false
  loginResult.value = true
}

onMounted(() => {
  emitter.on('showLoginDiaLogEven', showLoginDiaLog)
})

onUnmounted(() => {
  emitter.off('showLoginDiaLogEven')
})


</script>

<style lang="sass" scoped>

.login-dialog-class
  min-height: 30rem
  min-width: 30rem
  text-align: center
  padding: 2%
  border-radius: 5%

.login-dialog-header
  font-size: 3rem
  font-family: "Segoe Print", serif

.login-dialog-input
  margin: 5%

.login-dialog-btn-comb
  margin: 2%

.login-dialog-btn
  margin: 0.5rem
  text-align: center
  color: white
  min-height: 2.5rem
  min-width: 4rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 0.8rem

</style>