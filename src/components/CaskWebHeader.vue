<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar>
      <q-toolbar-title>Cask Admin</q-toolbar-title>
      <q-btn flat dense icon="fa-solid fa-book" label="article" @click="toArticle"/>
    </q-toolbar>
  </q-header>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: 'AdminArticleDetail',
  props: {
    headerVisible: Boolean
  },
  setup() {
    const router = useRouter()
    const toArticle = () => {
      router.push('/article/list')
    }
    return {
      toArticle
    }
  }

}

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.index-header
  left: 0
  right: 0
  top: 20px
  margin: auto
  width: 80%
  color: $cask_base_black
  text-align: center
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)
  border-radius: 15px

</style>