<template>
  <div>
    this place play video
  </div>
</template>

<script setup>
//prop
import {defineProps} from "vue";

defineProps({
  colId: {
    type: String,
    default: ""
  },
  vdoId: {
    type: String,
    default: ""
  }
})

</script>

<style scoped>

</style>