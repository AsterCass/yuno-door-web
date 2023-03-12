<template>
  <div class="q-mt-md row justify-center">
    <q-fab
        class="q-fab-bt"
        label-position="bottom"
        glossy
        icon="keyboard_arrow_down"
        direction="down"
        hide-label
    >

      <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled"
                    label="Home" hide-label external-label
                    to="/" icon="fa-solid fa-house"/>
      <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled"
                    label="Article" hide-label external-label
                    to="/article" icon="fa-solid fa-book"/>


      <!--The default padding for QFab is “md” and for QFabAction is “sm”.
      However, you can use padding prop to customize it (accepts CSS units too):-->

      <!--这个地方组件有问题，如果使用了external-label，则hide-label属性不会生效，
      这里只能使用external-label做隐藏变量，hide-label始终隐藏，
      但是external-label解除时候hide-label会自动变为true，即使强制改成false也会发生抖动，
      所以这里只能强制将label名称改成空字符串，关闭组件的时候再赋值回去
      不知道这个问题后续会不会修复-->
      <q-fab
          label-class="bg-grey-3 text-grey-10 text-weight-bold disabled"
          :label="gameName" :external-label="gameExternalLabelVisible"
          icon="fa-solid fa-trophy" direction="right" padding="sm"
          @update:modelValue="updateGameFab"
      >
        <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled" padding="5px 20px"
                      label="Hextris" hide-label external-label label-position="bottom"
                      @click="toHex" icon="mdi-hexagon-slice-6"/>
        <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled" padding="5px 20px"
                      label="Mikutap" hide-label external-label label-position="bottom"
                      @click="toMik" icon="fa-solid fa-music"/>
      </q-fab>
    </q-fab>
  </div>
</template>

<script setup>
import {ref} from 'vue'

let gameExternalLabelVisible = ref(true)
let gameName = ref("Game")

function toHex() {
  window.open('https://game.astercasc.com/G-Hextris/', "_blank");
}

function toMik() {
  window.open('https://game.astercasc.com/G-Mikutap/', "_blank");
}


function updateGameFab(isActionsVisible) {
  if (isActionsVisible) {
    gameName.value = ""
  } else {
    gameName.value = "Game"
  }
  gameExternalLabelVisible.value = !isActionsVisible
}

</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";

.q-fab-bt {
  color: $cask_dune;
  background-color: white;
  opacity: 0.8;

}


</style>