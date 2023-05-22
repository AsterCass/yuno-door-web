<template>
  <div class="error-page-admin text-indigo-6">
    <h2 class="text-indigo-6">
      404 Not Found
    </h2>
    <p style="font-size: 1.1rem">
      页面地址错咯 回到主页重新看看吧
    </p>
    <br>
    <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="主页" to="/"/>
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