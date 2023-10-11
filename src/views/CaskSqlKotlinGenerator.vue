<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div>
        <q-icon class="q-mx-sm" name="fa-solid fa-object-group" size="1em"/>
        SQL convert to Kotlin Data Class
      </div>
    </div>


    <div class="row" style="margin: 2% 2% 1% 2%">

      <div class="col-12 row justify-center">

        <div class="col-8 col-lg-6 q-mr-md">
          <q-input
              v-model="inputDDL" type="textarea"
              autogrow borderless color="secondary"
              placeholder="请输入需要转换的DDL语句"
              :input-style="{fontSize: '1.1rem', backgroundColor: '#1F2124', padding: '1.2rem',
              minHeight: '300px', borderRadius: '12px', color: '#c5c7c8'}"
          />
        </div>

        <div class="col-3 q-ml-md" style="background-color: yellowgreen; min-height: 100px">

        </div>

      </div>

    </div>

  </div>


</template>

<script setup>

import {ref} from "vue";

const inputDDL = ref("")


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/blog.markdown.css"

.code-generator-tag-title
  font-family: Roboto Slab, sans-serif
  letter-spacing: -.05rem
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400


</style>