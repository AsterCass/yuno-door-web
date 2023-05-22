<template>
  <div class="error-page-admin text-indigo-6">
    <h2 class="text-indigo-6">
      403 Forbidden
    </h2>
    <p style="font-size: 1.1rem">
      访问该页面需要登录，请登录后访问
    </p>
    <br>
    <div class="column items-center">
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="回到主页" to="/"/>
      <q-separator spaced="1rem" size="0.05rem" inset/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-right-to-bracket"
             label="登录" @click="showLoginDiaLog"/>
    </div>

  </div>

  <CaskLogin/>
</template>

<script setup>
import CaskLogin from "@/components/CaskLogin.vue";
import emitter from "@/utils/bus";
import {onMounted, onUnmounted} from "vue";
import {useRouter} from "vue-router";

//router
const thisRouter = useRouter()

//弹出登录框
function showLoginDiaLog() {
  emitter.emit('showLoginDiaLogEven')
}

function backOriginPage(isSuccess) {
  if (isSuccess) {
    thisRouter.go(-1)
  }
}

onMounted(() => {
  emitter.on("loginMessageEvent", backOriginPage);
})

onUnmounted(() => {
  emitter.off("loginMessageEvent", backOriginPage);
})
</script>

<style lang="sass" scoped>
@import "@/styles/cask-little-mini-style.scss"

.headerBtn
  font-size: 1.5rem
  padding-top: 0.8rem
  font-weight: bold

</style>