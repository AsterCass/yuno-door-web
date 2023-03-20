<template>
  <div class="row justify-center article-list-search">

    <div class="col-2 article-list-search-btn row justify-center">
      <q-icon
          size="lg" name="fa-solid fa-magnifying-glass" class="article-list-search-icon"/>
    </div>
    <q-input
        rounded
        outlined
        placeholder="输入查询文章关键词"
        v-model="text"
        @keyup.enter="search"
        class="col-12 article-list-base article-list-search-input"
        standout="bg-white text-grey-10"
    >
    </q-input>

  </div>
</template>

<script setup>
import {ref} from "vue";
import emitter from '@/utils/mitt';

let text = ref("")

function search() {
  emitter.emit('searchArticleList', text.value)
}

</script>

<style lang="sass" scoped>

.article-list-search-icon
  background: linear-gradient(195deg, #42424a, #191919)
  padding: 10%
  color: white
  border-radius: 15px

.article-list-search-btn
  margin: 3%

.article-list-search
  align-items: center
  margin: -15% 35% 0 35%

</style>

<style lang="sass">

.article-list-search-input
  border-radius: 30px
  font-size: 1rem
  line-height: 1.625
  height: 2rem
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)
  backdrop-filter: saturate(200%) blur(30px)

  .q-field__native
    padding: 6px 12px


</style>