<template>
  <div class="q-mt-md row justify-center">
    <q-fab
        class="q-fab-bt"
        v-model="defaultDropDown"
        label-position="bottom"
        glossy
        icon="keyboard_arrow_down"
        direction="down"
        :hide-label="labelVisible"
    >
      <q-fab-action :hide-label="labelVisible" @click="toHome" icon="home" label="Home"/>
      <q-fab-action :hide-label="labelVisible" @click="toArticle" icon="menu_book" label="Article"/>
    </q-fab>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

let defaultDropDown = ref(false)
let labelVisible = ref(false)
const router = useRouter()


function toHome() {
  router.push('/')
}
function toArticle() {
  router.push('/article')
}

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.q-fab-bt
  color: $cask_base_black
  background-color: white
  opacity: 0.8

</style>