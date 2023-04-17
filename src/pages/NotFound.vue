<template>
  <div style="text-align: center; padding-top: 15em;">
    <h2>
      404 Not Found
    </h2>
    <p style="font-size: 1.1rem">
      页面地址错咯 回到主页重新看看吧
    </p>
    <br>
    <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="主页" to="/"/>
  </div>

  <div style="position: absolute; bottom: 0; right: 0;left: 0">
    <CopyrightFooter/>
  </div>

</template>

<script setup>
import CopyrightFooter from "@/components/CopyrightFooter.vue";
</script>

<style lang="sass" scoped>
.headerBtn
  font-size: 1.5rem
  padding-top: 0.8rem
  font-weight: bold

</style>