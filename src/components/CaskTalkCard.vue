<template>

  <div>
    <q-dialog :model-value="inTalking" @hide="closeTalkDialog"
              transition-show="fade" transition-hide="fade">
      <q-card class="dialog-frame column justify-between">

        this is a talking dialog

      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import {ref} from "vue";

let inTalking = ref(false)

function closeTalkDialog() {
  inTalking.value = false
}

</script>

<style lang="sass" scoped>
@import "@/styles/cask-dialog-style.scss"
@import "@/styles/cask-little-mini-style.scss"

</style>