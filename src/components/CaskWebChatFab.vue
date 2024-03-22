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
            <div v-for="(item, index) in chattingData" :key="index"
                 v-on:mouseover="item.webShowCloseBtn = true" v-on:mouseleave="item.webShowCloseBtn = false">
              <q-item clickable v-ripple class="row justify-between chat-main-card-avatar-row"
                      :focused="item.chatId === webChattingFocusChat.chatId"
                      @click="webChattingFocusChat = item">
                <div class="row items-center">
                  <q-btn round push color="white" class="q-mr-md" :to="`/space?id=${item.userId}`">
                    <q-avatar size="50px">
                      <q-img :src="item.chatAvatar"/>
                    </q-avatar>
                  </q-btn>
                  <div>
                    <div class="simple-bold-small-title-secondary q-ml-xs limit-user-nickname-length">
                      {{ item.chatName }}
                    </div>
                    <div class="limit-user-nickname-length">
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
                </div>
                <div class="row items-center" v-show="item.webShowCloseBtn">
                  <q-btn
                      round dense flat unelevated class="no-margin"
                      color="grey-8" size="12px"
                      icon="fa-solid fa-circle-xmark"
                  />
                </div>
              </q-item>
              <q-separator spaced="8px" size="0.125rem" style="opacity: 0.3" inset/>
            </div>
          </q-list>
        </q-scroll-area>

        <q-separator vertical inset/>

        <div v-if="webChattingFocusChat.chatId" class="col column chat-main-card-frame">
          <div class="chat-main-card-frame-header">
            <div class="row items-center">
              <q-btn round push color="white" class="q-mr-md" :to="`/space?id=${webChattingFocusChat.userId}`">
                <q-avatar size="70px">
                  <q-img :src="webChattingFocusChat.chatAvatar"/>
                </q-avatar>
              </q-btn>
              <div>
                <div class="simple-bold-little-title-secondary">
                  {{ webChattingFocusChat.chatName }}
                </div>
                <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                         :color="getGenderObj(webChattingFocusChat.userGender).color"
                         :label="getGenderObj(webChattingFocusChat.userGender).label">
                </q-badge>
                <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                         :color="getRoleTypeObj(webChattingFocusChat.userRoleType).color"
                         :label="getRoleTypeObj(webChattingFocusChat.userRoleType).label">
                  <q-icon
                      :name="getRoleTypeObj(webChattingFocusChat.userRoleType).logo"
                      class="q-ml-xs"
                  />
                </q-badge>
              </div>
            </div>
          </div>
          <q-separator spaced="8px" size="0.125rem" style="opacity: 0.5" inset
                       color="green-10"
          />

          <div class="col-grow chat-main-card-frame-body">
            <div id="chat-body-infinite-id" style="max-height: 25rem; overflow: auto;">
              <q-infinite-scroll @load="loadMoreChatRecord" :offset="250" :disable="webChattingFocusChat.scrollDisable"
                                 scroll-target="#chat-body-infinite-id" reverse>
                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="light-green-10" size="40px"/>
                  </div>
                </template>
                <div v-for="(item, index) in webChattingFocusChat.userChattingData" :key="index"
                     class="q-mx-sm">
                  <q-chat-message
                      :name="item.sendUserNickname"
                      :avatar="item.sendUserAvatar"
                      :text="[item.message]"
                      text-color="grey-1"
                      bg-color="light-green-10"
                      :sent="item.sendUserId === userData.id"
                  />
                </div>
              </q-infinite-scroll>
            </div>


          </div>

          <div class="row chat-main-card-frame-input">
            <q-input
                v-model="webChattingFocusChat.webInputText" type="textarea"
                @keydown.enter.prevent="sendChatMsg"
                placeholder="使用Enter发送，Ctrl+Enter换行"
                class="col-grow q-ml-md cask-textarea-input-base" borderless
                :input-style="{fontSize: '.95rem', color:'black', opacity:'0.75',
                          letterSpacing: '.023rem', lineHeight:'1.3rem', fontFamily:'Roboto Slab, sans-serif',
                          border: '2.5px solid #888', backgroundColor:'#ddd', margin: '.8rem 0 ',
                          padding: '.6rem', resize: 'none',height: '4.5rem', borderRadius: '12px',
                          overflowWrap: 'anywhere'} ">
            </q-input>
            <div class="row items-center">
              <q-btn round unelevated flat color="green-10" icon="fa-solid fa-paper-plane"
                     @click="sendChatMsg"/>
            </div>
          </div>

        </div>


      </q-card>
    </q-fab>


    <div id="wave-1" class="wave"/>
    <div id="wave-2" class="wave"/>
  </div>

</template>

<script setup>
import {getGenderObj} from "@/utils/enums/gender-opt";
import {getRoleTypeObj} from "@/utils/enums/role-type"
import {onMounted, onUnmounted, ref} from "vue";
import {delay} from "@/utils/delay-exe";
import emitter from "@/utils/bus";
import {getWebLoginData, getWebLoginToken, webIsLogin} from "@/utils/store";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";
import {useQuasar} from "quasar";
import {moreMessage} from "@/api/chat";

// const BASE_ADD = process.env.VUE_APP_BASE_ADD
//notify
const notify = useQuasar().notify
//user
let userData = ref({})
let userToken = ref("")
//socket
let socket = ref(null)
let stompClient = ref(null)
let socketConnected = ref(false)
//chat
let webChattingFocusChat = ref({
  chatId: "",
  userChattingData: [],
  scrollDisable: false,
});
let chattingData = ref([
  {
    chatId: "UCT17706927965552189",
    chatType: 0,
    userId: "YU1650800808415219",
    chatName: "刹那握住了未来",
    chatAvatar: "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-user/avatar/YU1650800808415219.jpg",
    userGender: 0,
    userRoleType: 2,
    userChattingData: [],
    webShowCloseBtn: false,
    webInputText: "",
    webScrollDisable: false
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

function sendChatMsg(event) {
  if (event.ctrlKey) {
    webChattingFocusChat.value.webInputText += '\n'
  } else {
    if (userToken.value) {
      socketSend(webChattingFocusChat.value.chatId, webChattingFocusChat.value.webInputText)
    } else {
      notify({
        message: "未登录用户暂时不支持发送消息喔，您的相关建议或者意见可以在网站留言板中留言🤭",
        position: 'top-right',
        type: 'warning',
        timeout: 5000
      })
    }
    webChattingFocusChat.value.webInputText = ''
  }
}

function loadMoreChatRecord(index, done) {
  let lastMsgId = ""
  if (webChattingFocusChat.value.userChattingData && 0 !== webChattingFocusChat.value.userChattingData.length) {
    lastMsgId = webChattingFocusChat.value.userChattingData[0].messageId
  }
  moreMessage({lastMessage: lastMsgId, chatId: webChattingFocusChat.value.chatId}).then(res => {
    const status = res.data.status
    if (200 !== status) {
      return
    }
    if (null != res.data.data && 0 !== res.data.data.length) {
      let inputData = res.data.data.reverse()
      webChattingFocusChat.value.userChattingData.splice(0, 0,
          ...inputData)
      done()
    } else {
      webChattingFocusChat.value.scrollDisable = true
    }
  })

}


function loginMessage(isSuccess) {
  if (isSuccess) {
    userData.value = getWebLoginData()
    userToken.value = getWebLoginToken()
  } else {
    userData.value = {}
    userToken.value = ""
  }
}

function baseDataInit() {
  if (webIsLogin()) {
    userData.value = getWebLoginData()
    userToken.value = getWebLoginToken()
  }
}

function socketInit() {
  if (userToken.value) {
    // socket.value = new SockJS(BASE_ADD + "yui/chat-websocket/socketAuthNoError?User-Token=" + userToken.value)
    socket.value = new SockJS("http://localhost:8000/yui/chat-websocket/socketAuthNoError?User-Token=" + userToken.value);
    stompClient.value = Stomp.over(socket.value)
    stompClient.value.connect(
        {},
        () => {
          socketConnected.value = true;
          stompClient.value.subscribe("/user/" + userToken.value + "/message/receive", callback => {
            const data = JSON.parse(callback.body)
            for (let singleChatting of chattingData.value) {
              if (singleChatting.chatId === data.fromChatId) {
                singleChatting.userChattingData.push(
                    {
                      chatTimeStamp: 0,
                      sendUserId: data.sendUserId,
                      sendUserAvatar: data.sendUserAvatar,
                      sendUserNickname: data.sendUserNickname,
                      message: data.sendMessage,
                    })
                let scrollerDiv = document.getElementById("chat-body-infinite-id")
                delay(100).then(() => {
                  scrollerDiv.scrollTo({top: scrollerDiv.scrollHeight, behavior: 'smooth'})
                })
              }
            }
          });
          stompClient.value.subscribe("/announcement/receive", () => {
            // console.log(tick);
          });
        },
        error => {
          console.log(error);
          socketConnected.value = false;
        }
    )
  }
}

function socketSend(chatId, message) {
  if (stompClient.value && stompClient.value.connected) {
    const msg = {chatId: chatId, message: message};
    stompClient.value.send("/socket/message/send", JSON.stringify(msg));
  }
}


onMounted(() => {
  baseDataInit()
  socketInit()
  emitter.on("loginMessageEvent", loginMessage)
})

onUnmounted(() => {
  emitter.off("loginMessageEvent", loginMessage)
})



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
  height: 40rem;
  width: 60rem;
  margin: 0 1.5rem 35rem 0;
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
      padding: 4px 4px 4px 8px;
      border-radius: .8rem;
      color: $cask_dark_jungle_green;
      font-family: Roboto Slab, sans-serif;
    }
  }
}

.chat-main-card-frame {
  margin: .5rem;

  .chat-main-card-frame-body {
    padding: .5rem;
    color: grey;
    font-family: Roboto Slab, sans-serif;
    font-size: 1rem;
    line-height: 1.8rem;
    min-height: 20px;
    white-space: pre-line;

    ::-webkit-scrollbar {
      overflow: visible;
      z-index: 12;
      background: transparent;
      height: 12px;
      width: 14px;
    }

    ::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: $cask_cactus;
      opacity: 0.1;
      border-radius: 10px;
      z-index: 12;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      transition: background-color .28s ease-in-out;
      margin: 4px;
      min-height: 32px;
      min-width: 32px;
    }
  }
}


.limit-user-nickname-length {
  width: 12rem;
  -webkit-box-flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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


<style lang="scss">

.chat-main-card-frame-body {
  .q-message-text:last-child {
    min-height: 38px;
    display: inline-block;
  }

  .q-message-text--sent {
    float: right
  }

  .q-message-label {
    margin: 0;
  }
}

</style>



