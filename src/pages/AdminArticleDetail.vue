<template>
  <q-layout view="lHh lpr lFf" container:false>
    <CaskWebHeader :headerVisible="true"/>

    <div class="article-body">
      <div class="article-title">
        <h3>Privacy & Policy</h3>
        <p>更新时间: 2023年1月9日</p>
        <p>创建时间: 2022年12月20日</p>
      </div>

      <div class="article-context">
        <!--        </q-page>-->
        <h2>this is a h2</h2>
        <h3>this is a h3</h3>
        <h4>this is a h4</h4>
        <p v-for="n in 5" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
          dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
          commodi perferendis voluptate?
        </p>
      </div>
    </div>


    <q-page-sticky position="left" :offset="[25, 25]">
      <CaskWebFab/>
    </q-page-sticky>

    <CopyrightFooter/>

  </q-layout>
</template>

<script setup>
import CaskWebFab from "@/components/CaskWebFab.vue";
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {onMounted, onUnmounted} from "vue";


onMounted(() => {
  document.querySelector('body').setAttribute('style', 'background-color:#EFF2F5')
})
onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.article-body
  margin: 12rem auto
  width: 60%
  background-color: white
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)
  border-radius: 0.5rem

.article-title
  padding: 1.5rem
  text-align: left
  transform: translateY(-15%)
  margin: -2rem 1rem 0
  background-image: linear-gradient(195deg, #42424a, #191919)
  color: $cask_base_white
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4)
  border-radius: 0.5rem

  h3
    font-size: 1.875rem
    line-height: 1.375
    font-weight: 600
    color: white
    margin-bottom: 1rem
    margin-top: 0
    font-family: Roboto Slab, sans-serif
    //letter-spacing: -.05rem
    text-transform: unset

  p
    margin: 0
    opacity: 0.8
    font-size: 1rem
    line-height: 1.625
    font-weight: 300


.article-context
  font-size: 1.5rem
  padding: 3rem
  min-height: 800px


</style>