<template>
  <div class="error-page-admin text-indigo-6">
    <h2 class="text-indigo-6">
      403 Forbidden
    </h2>
    <p style="font-size: 1.1rem">
      用户权限不足，请联系管理员授权
    </p>
    <br>
    <div class="column items-center">
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="回到主页" to="/"/>
    </div>

  </div>

</template>

<script setup>

</script>

<style lang="sass" scoped>
@import "@/styles/cask-little-mini-style.scss"


.headerBtn
  font-size: 1.5rem
  padding-top: 0.8rem
  font-weight: bold

</style>