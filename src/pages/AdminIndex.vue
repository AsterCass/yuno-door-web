<template>
  <q-layout view="lHh lpr lFf" container:false>
    <q-header :modelValue="headerVisible" class="index-header">
      <q-toolbar>
        <q-toolbar-title>Cask Admin</q-toolbar-title>
        <q-btn flat round dense icon="whatshot"/>
      </q-toolbar>
    </q-header>

    <div>
      <q-img
          :no-native-menu="false"
          :src="require('../assets/img/MengPo.jpg')"
          alt=""
          :ratio="16/9"
          :fit="'cover'">
      </q-img>
    </div>

    <div class="text-center">
      <img
          v-scroll-fire="bounceImage"
          src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
          style="height: 100px; width: 100px;"
      >
    </div>


    <q-page-container v-intersection="onIntersection">
      <q-page class="q-pa-md">
        <p v-for="n in 100" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
          dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
          commodi perferendis voluptate?
        </p>
      </q-page>
    </q-page-container>
  </q-layout>


  <!--  <q-btn push-->
  <!--         color="primary"-->
  <!--         label="Push"-->
  <!--         @click="toDoc">-->
  <!--    this is a push-->
  <!--  </q-btn>-->


</template>

<script>
import {ref} from 'vue'

export default {
  name: "AdminIndex",
  setup() {
    // https://quasar.dev/vue-directives/intersection
    let headerVisible = ref(false)

    function onIntersection(entry) {
      headerVisible.value = entry.isIntersecting
    }

    //return
    return {
      headerVisible,
      onIntersection,

      // https://quasar.dev/vue-directives/scroll-fire
      bounceImage(el) {
        // in this example, when the `<div>` comes into view,
        // we bounce it for 2 seconds

        el.classList.add('animate-bounce')

        setTimeout(() => {
          // we make sure the node is still in DOM
          // (user hasn't navigated away from the Vue component
          // rendering our `<div>`)
          // so we don't generate an error
          if (document.body.contains(el)) {
            // then remove the helper class to
            // stop bouncing
            el.classList.remove('animate-bounce')
          }
        }, 20000)
      }


    }
  }

}
</script>

<style lang="sass" scoped>

.index-header
  left: 0
  right: 0
  top: 20px
  margin: auto
  width: 80%
  text-align: center
  opacity: 0.7
  background: white
  color: #1D1D1D
  border-radius: 15px

.animate-bounce
  animation: q-bounce 2s infinite

@keyframes q-bounce
  0%, 20%, 50%, 80%, 100%
    transform: translateY(0)
  40%
    transform: translateY(-30px)
  60%
    transform: translateY(-15px)


</style>