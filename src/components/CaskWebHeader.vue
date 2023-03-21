<template>
  <q-header :modelValue="headerVisible" class="index-header">
    <q-toolbar>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-house" label="home" to="/"/>
      <q-toolbar-title>Aster Cass</q-toolbar-title>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book-bookmark" label="essay" to="/essay/list"/>
      <q-btn class="headerBtn" flat dense stack icon="fa-solid fa-book" label="article" to="/article/list"/>
    </q-toolbar>
  </q-header>
</template>

<script>

export default {
  name: 'AdminArticleDetail',
  props: {
    headerVisible: Boolean
  },

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

  .headerBtn
    font-size: 0.8rem
    padding-top: 0.8rem
    font-weight: bold

</style>