<template>


  <div class="row admin-article-list-base">

    <div class="col-12 row justify-between admin-article-list-head">
      <div>
        <q-icon name="style" size="1em"/>
        文章列表
      </div>
      <div class="justify-end admin-article-list-head-tag">
        <q-toggle color="dark" label="Docker" v-model="selection" val="Docker"/>
        <q-toggle color="dark" label="Linux" v-model="selection" val="Linux"/>
        <q-toggle color="dark" label="Windows" v-model="selection" val="Windows"/>
        <q-toggle color="dark" label="Java" v-model="selection" val="Java"/>
        <q-toggle color="dark" label="C/C++" v-model="selection" val="CCPlus"/>
        <q-toggle color="dark" label="Yellow" v-model="selection" val="yellow"/>
        <q-toggle color="dark" label="ML" v-model="selection" val="ML"/>
        <q-toggle color="dark" label="Sql" v-model="selection" val="Sql"/>
      </div>
    </div>
    <q-infinite-scroll @load="onLoad" :offset="250" class="col-12 row justify-center">
      <div v-for="(item, index) in items" :key="index" class="col-3">

        <q-card class="admin-article-list-card bg-secondary text-white">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            {{ item.key }}
          </q-card-section>
          <q-separator dark/>
          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <template v-slot:loading>
        <div class="row justify-center" style="margin: 2rem">
          <q-spinner-cube color="dark" size="2rem"/>
        </div>
      </template>
    </q-infinite-scroll>

  </div>

</template>

<script setup>
import {ref} from "vue";

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
let selection = ref(['yellow', 'red'])
const items = ref([{key: lorem.value}, {key: lorem.value}, {key: lorem.value}, {key: lorem.value},
  {key: lorem.value}, {key: lorem.value}, {key: lorem.value}, {key: lorem.value}])


function onLoad(index, done) {
  console.log(items)
  setTimeout(() => {
    items.value.push({key: lorem.value}, {key: lorem.value}, {key: lorem.value}, {key: lorem.value},
        {key: lorem.value}, {key: lorem.value}, {key: lorem.value}, {key: lorem.value})
    done()
  }, 1000)
}


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-article-list-head-tag
  font-family: Roboto Slab, sans-serif
  font-size: 1rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400
  max-width: 30%

.admin-article-list-head
  font-family: Roboto Slab, sans-serif
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400

.admin-article-list-base
  padding: 1%

.admin-article-list-card
  margin: 5%

</style>