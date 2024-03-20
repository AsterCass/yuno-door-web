<template>

  <div class="q-mt-md row justify-center chat-fab-main">
    <q-fab
        class="q-chat-fab-bt"
        icon="fa-solid fa-headset"
        direction="left"
        hide-label
        @show="animalOperate(true)"
        @hide="animalOperate(false)"
    >
      <q-card class="row chat-main-card">

        <q-scroll-area class="chat-main-card-avatar-list"
                       :thumb-style="{background: '#447550', width: '5px', marginRight: '8px'}">
          <q-list>
            <q-item clickable v-ripple class="row justify-between chat-main-card-avatar-row"
                    v-for="(item, index) in chattingData" :key="index"
                    v-on:mouseover="item.webShowCloseBtn = true" v-on:mouseleave="item.webShowCloseBtn = false">
              <div class="row items-center">
                <q-btn round push color="white" class="q-mr-md" :to="`/space?id=${item.userId}`">
                  <q-avatar size="50px">
                    <q-img :src="item.userAvatar"/>
                  </q-avatar>
                </q-btn>
                <div>
                  <div class="simple-bold-small-title-secondary q-ml-xs">
                    {{
                      item.userNickName.length <= 10 ? item.userNickName
                          : item.userNickName.substring(0, 10) + "..."
                    }}
                  </div>
                  <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                           :color="getGenderObj(item.userGender).color"
                           :label="getGenderObj(item.userGender).label">
                  </q-badge>
                  <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                           :color="getRoleTypeObj(item.userRoleType).color"
                           :label="getRoleTypeObj(item.userRoleType).label">
                  </q-badge>
                </div>
              </div>
              <div class="row items-center" v-show="item.webShowCloseBtn">
                <q-btn
                    round dense flat unelevated
                    color="grey-9" size="12px"
                    icon="fa-solid fa-circle-xmark"
                />
              </div>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-separator vertical inset/>


      </q-card>
    </q-fab>


    <div id="wave-1" class="wave"/>
    <div id="wave-2" class="wave"/>
  </div>

</template>

<script setup>
import {getGenderObj} from "@/utils/enums/gender-opt";
import {getRoleTypeObj} from "@/utils/enums/role-type"
import {ref} from "vue";

let chattingData = ref([
  {
    userId: "YU1",
    userNickName: "AsterCasc",
    userAvatar: "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-user/avatar/default/avatar-00.png",
    userGender: 7,
    userRoleType: 1024,
    userChattingData: [
      {
        chatId: 0,
        chatTimeStamp: 0,
        sendUserId: "",
        sendMsg: "",
      }
    ],
    webShowCloseBtn: false,
  },
  {
    userId: "YU1",
    userNickName: "放大睡觉了放大萨拉附件是发到拉萨解放",
    userAvatar: "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-user/avatar/default/avatar-01.png",
    userGender: 0,
    userRoleType: 1,
    userChattingData: [
      {
        chatId: 0,
        chatTimeStamp: 0,
        sendUserId: "",
        sendMsg: "",
      }
    ],
    webShowCloseBtn: false,
  },
  {
    userId: "YU1",
    userNickName: "李四",
    userAvatar: "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-user/avatar/default/avatar-02.png",
    userGender: 1,
    userRoleType: 2,
    userChattingData: [
      {
        chatId: 0,
        chatTimeStamp: 0,
        sendUserId: "",
        sendMsg: "",
      }
    ],
    webShowCloseBtn: false,
  },
])


function animalOperate(isPause) {
  const eleWave1 = document.getElementById("wave-1")
  const eleWave2 = document.getElementById("wave-2")
  if (isPause) {
    eleWave1.classList.toggle('pause');
    eleWave2.classList.toggle('pause');
  } else {
    eleWave1.classList.remove('pause')
    eleWave2.classList.remove('pause')
  }
}


</script>


<style lang="scss" scoped>
@import "@/styles/cask.sass";

.q-chat-fab-bt {
  color: rgba($cask_base_grey, 0.9);
  background-color: rgb(2, 119, 189);
  //background-image: linear-gradient(195deg, rgb(2, 119, 189), rgb(40, 53, 174));
  height: 4rem;
  width: 4rem;
}

.chat-main-card {
  height: 30rem;
  width: 60rem;
  margin: 0 1.5rem 25rem 0;
  padding: .5rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);

  .chat-main-card-avatar-list {
    width: 20rem;
    margin: .5rem 0 .5rem .5rem;

    .chat-main-card-avatar-row {
      margin: .2rem 1rem .2rem .2rem;
      padding: 4px 0 4px 8px;
      border-radius: .8rem;
      color: $cask_dark_jungle_green;
      font-family: Roboto Slab, sans-serif;
    }
  }
}


</style>

<!--外波纹动画-->
<style lang="scss" scoped>

.chat-fab-main {
  background-color: rgb(2, 119, 189);
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
  position: relative;
}

.wave {
  position: absolute;
  background-color: inherit;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  opacity: 0.8;
  -webkit-animation: pulsing 2s ease-out infinite;
  animation: pulsing 2s ease-out infinite;
}

.wave:nth-of-type(1) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.wave:nth-of-type(2) {
  -webkit-animation-delay: -2.5s;
  animation-delay: -2.5s;
}

.wave.pause {
  animation: none;
}

@-webkit-keyframes pulsing {
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulsing {
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

</style>



