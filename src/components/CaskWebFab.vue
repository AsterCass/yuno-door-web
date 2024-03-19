<template>
  <div class="q-mt-md row justify-center">

    <q-fab
        class="q-fab-bt"
        label-position="bottom"
        glossy
        icon="fa-solid fa-flag-checkered"
        direction="down"
        hide-label
    >

      <q-fab-action label-class="bg-red-5 text-grey-1 text-weight-bold"
                    label-style="opacity: .9!important"
                    label="Home" hide-label external-label glossy class="q-fab-sub-left-bt"
                    to="/" icon="fa-solid fa-house"/>


      <!--      <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled"-->
      <!--                    label="Article" hide-label external-label glossy class="q-fab-sub-right-bt"-->
      <!--                    to="/article/list" icon="fa-solid fa-book"/>-->
      <!--      <q-fab-action label-class="bg-grey-3 text-grey-10 text-weight-bold disabled"-->
      <!--                    label="Video" hide-label external-label glossy class="q-fab-sub-left-bt"-->
      <!--                    to="/video/collection" icon="fa-solid fa-clapperboard"/>-->


      <!--The default padding for QFab is “md” and for QFabAction is “sm”.
      However, you can use padding prop to customize it (accepts CSS units too):-->

      <!--这个地方组件有问题，如果使用了external-label，则hide-label属性不会生效，
      这里只能使用external-label做隐藏变量，hide-label始终隐藏，
      但是external-label解除时候hide-label会自动变为true，即使强制改成false也会发生抖动，
      所以这里只能强制将label名称改成空字符串，关闭组件的时候再赋值回去
      不知道这个问题后续会不会修复-->
      <q-fab
          label-class="bg-brown-6 text-grey-1 text-weight-bold"
          label-style="opacity: .9!important"
          :label="fabExternMap.get('Media').name" glossy class="fix-fab-action-for-fab-media"
          :external-label="fabExternMap.get('Media').labelVisible"
          icon="fa-solid fa-photo-film" direction="right" padding="sm"
          @update:modelValue="updateMediaFab"
          ref="mediaCollectionFab"
      >
        <q-fab-action label-class="bg-brown-6 text-grey-1 text-weight-bold"
                      padding="5px 25px" class="q-fab-sub-media-btn" style="margin: 0 1.5rem 0 1.5rem!important;"
                      label="Essay题记" external-label label-position="bottom"
                      to="/essay/list" icon="fa-solid fa-book-bookmark"/>
        <q-fab-action label-class="bg-brown-6 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-media-btn" style="margin-right: 1.5rem!important;"
                      label="Article备录" external-label label-position="bottom"
                      to="/article/list" icon="fa-solid fa-book"/>
        <q-fab-action label-class="bg-brown-6 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-media-btn" style="margin-right: 1.5rem!important;"
                      label="Video视频" external-label label-position="bottom"
                      to="/video/collection" icon="fa-solid fa-clapperboard"/>
        <q-fab-action label-class="bg-brown-6 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-media-btn" style="margin-right: 1.5rem!important;"
                      label="Music音乐" external-label label-position="bottom"
                      @click="fabKitInDeveloping" icon="fa-solid fa-headphones"/>
      </q-fab>


      <q-fab-action label-class="bg-orange-8 text-grey-1 text-weight-bold"
                    label-style="opacity: .9!important"
                    label="Board" hide-label external-label glossy class="q-fab-sub-board-bt"
                    to="/board" icon="fa-solid fa-clipboard"/>


      <q-fab
          label-class="bg-blue-8 text-grey-1 text-weight-bold"
          label-style="opacity: .9!important"
          :label="fabExternMap.get('Game').name" glossy class="fix-fab-action-for-fab-right"
          :external-label="fabExternMap.get('Game').labelVisible"
          icon="fa-solid fa-trophy" direction="right" padding="sm"
          @update:modelValue="updateGameFab"
          ref="gameCollectionFab"
      >
        <q-fab-action label-class="bg-blue-8 text-grey-1 text-weight-bold"
                      padding="5px 25px" class="q-fab-sub-game-btn" style="margin:0 1.5rem 0 1.5rem!important;"
                      label="Hextris" external-label label-position="bottom"
                      @click="toHex" icon="mdi-hexagon-slice-6"/>
        <q-fab-action label-class="bg-blue-8 text-grey-1 text-weight-bold"
                      padding="5px 25px" class="q-fab-sub-game-btn" style="margin-right: 1.5rem!important;"
                      label="Mikutap" external-label label-position="bottom"
                      @click="toMik" icon="fa-solid fa-music"/>
      </q-fab>


      <q-fab
          label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
          label-style="opacity: .9!important"
          :label="fabExternMap.get('Kit').name" glossy class="fix-fab-action-for-fab-left"
          :external-label="fabExternMap.get('Kit').labelVisible"
          icon="fa-solid fa-toolbox" direction="right" padding="sm"
          @update:modelValue="updateKitFab"
          ref="kitCollectionFab"
      >

        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin:0 1.5rem 0 1.5rem!important;"
                      label="Steam游戏查询" external-label label-position="bottom"
                      to="/tools/steam/search" icon="fa-brands fa-square-steam"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="SQL生成Kotlin类" external-label label-position="bottom"
                      to="/tools/code/sql2kotlin" icon="fa-solid fa-object-group"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="时间戳格式转换" external-label label-position="bottom"
                      to="/tools/timestamp" icon="fa-solid fa-clock-rotate-left"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="QR二维码生成" external-label label-position="bottom"
                      to="/tools/qrcode" icon="fa-solid fa-qrcode"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="Md5加密" external-label label-position="bottom"
                      to="/tools/md5" icon="fa-solid fa-location-pin-lock"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="Base64图片转换" external-label label-position="bottom"
                      to="/tools/imgBase64" icon="fa-solid fa-camera-rotate"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="表情包电子包浆" external-label label-position="bottom"
                      @click="fabKitInDeveloping" icon="fa-solid fa-face-grin-tongue-wink"/>
        <q-fab-action label-class="bg-deep-purple-5 text-grey-1 text-weight-bold"
                      label-style="opacity: .9!important"
                      padding="5px 25px" class="q-fab-sub-sub-btn" style="margin-right: 1.5rem!important;"
                      label="Audio在线剪辑" external-label label-position="bottom"
                      @click="fabKitInDeveloping" icon="fa-solid fa-scissors"/>
      </q-fab>


    </q-fab>
  </div>
</template>

<script setup>
import {getCurrentInstance, ref} from 'vue'
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

const pageInstance = getCurrentInstance();

let fabExternMap = ref(new Map([
  ["Media", {name: "Media", labelVisible: true, domRef: "mediaCollectionFab"}],
  ["Game", {name: "Game", labelVisible: true, domRef: "gameCollectionFab"}],
  ["Kit", {name: "Kit", labelVisible: true, domRef: "kitCollectionFab"}],
]))

function toHex() {
  window.open('https://game.astercasc.com/G-Hextris/', "_blank");
}

function toMik() {
  window.open('https://aidn.jp/mikutap/', "_blank");
}


function updateExternFab(isActionsVisible, curFabName) {
  //operate else collection fab
  if (isActionsVisible) {
    fabExternMap.value.forEach((value, key) => {
      if (key !== curFabName) {
        pageInstance.refs[value.domRef].hide()
      }
    })
  }
  //operate label show
  if (isActionsVisible) {
    fabExternMap.value.get(curFabName).name = ""
  } else {
    fabExternMap.value.get(curFabName).name = curFabName
  }
  fabExternMap.value.get(curFabName).labelVisible = !isActionsVisible
}

function updateMediaFab(isActionsVisible) {
  updateExternFab(isActionsVisible, "Media")
}

function updateGameFab(isActionsVisible) {
  updateExternFab(isActionsVisible, "Game")
}

function updateKitFab(isActionsVisible) {
  updateExternFab(isActionsVisible, "Kit")
}


//功能正在开发中
function fabKitInDeveloping() {
  notify({
    color: "cyan-9",
    message: "该功能正在开发中...",
    position: 'top-left',
    type: 'info',
    timeout: 2000
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";

.q-fab-bt {
  color: rgba($cask_base_grey, 0.9);
  background-color: rgb(50, 100, 100);
  margin-bottom: 18rem;
  //opacity: 0.9;
}

.q-fab-sub-right-bt {
  margin-left: 2rem !important;
  color: rgba($cask_base_grey, 0.9);
  background-color: rgb(50, 100, 100);
}

.q-fab-sub-left-bt {
  margin-right: 2rem !important;
  color: rgba($cask_base_grey, 0.9);
  background-color: rgb(239, 83, 80);
}


.q-fab-sub-media-btn {
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(121, 85, 72);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
}

.q-fab-sub-board-bt {
  margin-right: 2rem !important;
  color: rgba($cask_base_grey, 0.9);
  background-color: rgb(245, 124, 0);
}

.q-fab-sub-game-btn {
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(25, 118, 210);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
}

.q-fab-sub-sub-btn {
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(126, 87, 194);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
}


</style>


<style lang="scss">


.fix-fab-action-for-fab-media {
  margin-left: 1.75rem;
  margin-top: 5px;
  margin-bottom: 5px;
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(121, 85, 72);

  .q-btn {
    margin: 0 !important;
  }
}

.fix-fab-action-for-fab-right {
  margin-left: 1.75rem;
  margin-top: 5px;
  margin-bottom: 5px;
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(25, 118, 210);

  .q-btn {
    margin: 0 !important;
  }
}

.fix-fab-action-for-fab-left {
  margin-right: 1.75rem;
  margin-top: 5px;
  margin-bottom: 5px;
  color: rgba(#F1F2F3, 0.9);
  background-color: rgb(126, 87, 194);

  .q-btn {
    margin: 0 !important;
  }
}

</style>