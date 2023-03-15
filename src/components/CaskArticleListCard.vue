<template>
  <q-card class="admin-article-list-card">
    <q-card-section class="row">
      <div class="col-8 admin-article-list-card-title">
        <h6>CICD-FRONTEND</h6>
      </div>
      <div class="col-4 row justify-end">
        <q-avatar class="admin-article-list-card-head">
          <q-img :src="require('../assets/img/head.jpg')"/>
        </q-avatar>
      </div>
    </q-card-section>
    <q-card-section>
      {{ intro.key }}
    </q-card-section>
    <q-separator spaced=".25rem" size="0.05rem"/>
    <q-card-section>
      <div class="text-subtitle2">by John Doe</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  intro: {},
});


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.admin-article-list-card
  color: $cask_dark_jungle_green
  background-color: white
  box-shadow: 5 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)
  border-radius: 1rem
  font-size: 1rem
  line-height: 1.625
  margin: 5%

.admin-article-list-card-title
  padding: 1rem
  text-align: left
  transform: translateY(-15%)
  margin: -1.5rem 5% 0  -2rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  color: $cask_base_white
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4)
  border-radius: 1rem

  h6
    font-size: 1.4rem
    font-weight: 600
    color: white
    margin: 0
    font-family: Roboto Slab, sans-serif
    text-transform: unset

</style>