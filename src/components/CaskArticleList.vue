<template>


  <div class="row admin-article-list-base">

    <div class="col-12 row justify-between admin-article-list-head">
      <div>
        <q-icon name="style" size="1em"/>
        文章列表
      </div>
      <div class="justify-end admin-article-list-head-tag">
        <q-toggle color="blue" label="Blue" v-model="selection" val="blue"/>
        <q-toggle color="yellow" label="Yellow" v-model="selection" val="yellow"/>
        <q-toggle color="green" label="Green" v-model="selection" val="green"/>
        <q-toggle color="red" label="Red" v-model="selection" val="red"/>
        <q-toggle color="blue" label="Blue" v-model="selection" val="blue"/>
        <q-toggle color="yellow" label="Yellow" v-model="selection" val="yellow"/>
        <q-toggle color="green" label="Green" v-model="selection" val="green"/>
        <q-toggle color="red" label="Red" v-model="selection" val="red"/>
      </div>
    </div>

    <div class="col-3" v-for="count in 30" :key="count">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section>
          {{ lorem }}
        </q-card-section>

        <q-separator dark/>

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

let selection = ref(['yellow', 'red'])
let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
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

.my-card-2
  padding: 1%
  width: 50%
  max-width: 300px

.my-card
  margin: 5%

</style>