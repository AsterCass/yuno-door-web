<template>

  <q-dialog maximized position="standard" v-model="chatFabIsOpen"
            no-focus no-refocus allow-focus-outside
            @hide="animalOperate(false)">
    <q-card class="row chat-main-card">
      <div class="column" style="width: 22rem;margin: .5rem 0 .5rem .5rem;">
        <q-scroll-area class="col-11 chat-main-card-avatar-list"
                       :thumb-style="{background: '#447550', width: '5px', marginRight: '8px'}">
          <q-list>
            <div v-for="(item, index) in chattingData" :key="index"
                 v-on:mouseover="item.webShowCloseBtn = true" v-on:mouseleave="item.webShowCloseBtn = false">
              <q-item clickable v-ripple class="row justify-between chat-main-card-avatar-row"
                      :focused="item.chatId === webChattingFocusChat.chatId"
                      @click="switchFocusChatting(item)">
                <div class="row items-center">
                  <q-btn round push flat color="white" class="q-mr-md">
                    <q-avatar size="50px">
                      <q-img :src="item.chatAvatar"/>
                    </q-avatar>
                    <q-badge v-show="!item.latestRead" color="red-8" rounded floating/>
                  </q-btn>
                  <div>
                    <div class="simple-bold-small-title-secondary q-ml-xs limit-user-nickname-length">
                      {{ item.chatName }}
                    </div>
                    <div v-if="item.chatUserId" class="limit-user-nickname-length">
                      <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                               :color="getGenderObj(item.chatUserGender).color"
                               :label="getGenderObj(item.chatUserGender).label">
                      </q-badge>
                      <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                               :color="getRoleTypeObj(item.chatUserRoleType).color"
                               :label="getRoleTypeObj(item.chatUserRoleType).label">
                      </q-badge>
                    </div>
                  </div>
                </div>
                <div class="row items-center" v-show="item.webShowCloseBtn">
                  <q-btn
                      round dense flat unelevated class="no-margin"
                      color="grey-8" size="12px"
                      icon="fa-solid fa-circle-xmark"
                      @click="closeThisChat(item.chatId)"
                  />
                </div>
              </q-item>
              <q-separator spaced="8px" size="0.125rem" style="opacity: 0.3" inset/>
            </div>
          </q-list>
        </q-scroll-area>
        <div class="col-1 row items-center">
          <q-toggle style="font-family: Roboto Slab, sans-serif; color: #629DD1"
                    color="#629DD1"
                    v-model="webChatShowUserGenderAndRole"
                    label="聊天框中显示用户性别及身份"
                    @click="savePersonChattingDetail({showGAR: webChatShowUserGenderAndRole})"
          />
        </div>
      </div>

      <q-separator vertical inset/>

      <div v-if="webChattingFocusChat.chatId" class="col column chat-main-card-frame">
        <div class="chat-main-card-frame-header">
          <div class="row items-center">
            <q-btn round push flat color="white" class="q-mr-md"
                   @click="jumpToUserDetail(webChattingFocusChat.chatUserId)">
              <q-avatar size="70px">
                <q-img :src="webChattingFocusChat.chatAvatar"/>
              </q-avatar>
            </q-btn>
            <div>
              <div class="simple-bold-little-title-secondary">
                {{ webChattingFocusChat.chatName }}
              </div>
              <div v-if="webChattingFocusChat.chatUserId">
                <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                         :color="getGenderObj(webChattingFocusChat.chatUserGender).color"
                         :label="getGenderObj(webChattingFocusChat.chatUserGender).label">
                </q-badge>
                <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                         :color="getRoleTypeObj(webChattingFocusChat.chatUserRoleType).color"
                         :label="getRoleTypeObj(webChattingFocusChat.chatUserRoleType).label">
                  <q-icon
                      :name="getRoleTypeObj(webChattingFocusChat.chatUserRoleType).logo"
                      class="q-ml-xs"
                  />
                </q-badge>
              </div>
            </div>
          </div>
        </div>
        <q-separator spaced="8px" size="0.125rem" style="opacity: 0.5" inset
                     color="green-10"
        />

        <div class="col-grow chat-main-card-frame-body">
          <div id="chat-body-infinite-id" style="max-height: 25rem;
             overflow: auto;">
            <q-infinite-scroll @load="loadMoreChatRecord" :offset="250" :disable="webChattingFocusChat.scrollDisable"
                               scroll-target="#chat-body-infinite-id" reverse debounce="10">
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="light-green-10" size="40px"/>
                </div>
              </template>
              <div v-for="(item, index) in webChattingFocusChat.userChattingData"
                   :key="index"
                   class="q-mx-sm">
                <q-chat-message
                    :label="item.webChatLabel ? item.webChatLabel : ''"
                    :text-color="item.sendUserId === userData.id ? 'grey-4' : 'blue-grey-5' "
                    :bg-color="item.sendUserId === userData.id ? 'light-green-10' : 'blue-grey-1' "
                    :sent="item.sendUserId === userData.id"
                >
                  <template v-slot:avatar>
                    <q-avatar style="cursor: pointer;" @click="jumpToUserDetail(item.sendUserId)">
                      <q-img :src="item.sendUserAvatar"/>
                    </q-avatar>
                  </template>
                  <template v-slot:default>
                    <div style="cursor: zoom-in; font-weight: 500"
                         v-on:mouseover="item.webFocusThisMsg=true"
                         v-on:mouseleave="item.webFocusThisMsg=false">
                      {{ item.message }}
                    </div>
                  </template>
                  <template v-slot:name>
                    <div style="font-size: 0.95rem; margin-top: .2rem">
                      {{ item.sendUserNickname }}
                      <q-badge v-show="webChatShowUserGenderAndRole" class="q-ml-xs" style="font-size: 0.75rem"
                               :color="getGenderObj(item.sendUserGender).color"
                               :label="getGenderObj(item.sendUserGender).label">
                      </q-badge>
                      <q-badge v-show="webChatShowUserGenderAndRole" class="q-ml-xs" style="font-size: 0.75rem"
                               :color="getRoleTypeObj(item.sendUserRoleType).color"
                               :label="getRoleTypeObj(item.sendUserRoleType).label">
                        <q-icon :name="getRoleTypeObj(item.sendUserRoleType).logo" class="q-ml-xs"/>
                      </q-badge>
                      <q-badge v-show="item.webFocusThisMsg" class="q-ml-xs" text-color="grey-2" color="grey-8">
                        {{ item.sendDate }}
                      </q-badge>
                    </div>
                  </template>
                </q-chat-message>
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
              :input-style="{fontSize: '.95rem', color:'rgb(50, 50, 50)', opacity:'0.75',
                          letterSpacing: '.023rem', lineHeight:'1.3rem', fontFamily:'Roboto Slab, sans-serif',
                          border: '2.5px solid #888', backgroundColor:'#ddd', margin: '.8rem 0 ',
                          padding: '.6rem', resize: 'none',height: '4.5rem', borderRadius: '12px', fontWeight:'520',
                          overflowWrap: 'anywhere'} ">
          </q-input>
          <div class="row items-center">
            <q-btn round unelevated flat color="green-10" icon="fa-solid fa-paper-plane"
                   @click="sendChatMsg"/>
          </div>
        </div>

      </div>

    </q-card>
  </q-dialog>


  <div class="q-mt-md row justify-center chat-fab-main">
    <div id="wave-1" class="wave"/>
    <div id="wave-2" class="wave"/>
    <q-btn glossy push round @click="animalOperate(true)"
           icon="fa-solid fa-headset" class="q-chat-fab-bt"/>
  </div>

</template>

<script setup>
import {getGenderObj} from "@/utils/enums/gender-opt";
import {getRoleTypeObj} from "@/utils/enums/role-type"
import {onMounted, onUnmounted, ref} from "vue";
import {delay} from "@/utils/delay-exe";
import emitter from "@/utils/bus";
import {
  getPersonChattingDetail,
  getPersonChattingRead,
  getWebLoginData,
  getWebLoginToken,
  savePersonChattingDetail,
  savePersonChattingRead,
  webIsLogin
} from "@/utils/store";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";
import {useQuasar} from "quasar";
import {chattingUsers, hideChat, moreMessage, privateInitChat, readMessage} from "@/api/chat";
import {notifyTopRightWarning, notifyTopWarning} from "@/utils/global-notify";
import {useRouter} from "vue-router";
import {messageTimeLabelBuilder, messageTimeLabelInput} from "@/utils/message-time-label";

const BASE_ADD = process.env.VUE_APP_BASE_ADD
//router
const thisRouter = useRouter()
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
let webChatShowUserGenderAndRole = ref(getPersonChattingDetail().showGAR)
let webChattingFocusChat = ref({
  chatId: "",
  userChattingData: [],
  webUserChattingDataBak: [],
  scrollDisable: false,
  latestRead: false,
});
let chattingData = ref([
  {
    chatId: "",
    chatType: 0,
    chatName: "",
    chatAvatar: "",
    chatUserId: "",
    userGender: 0,
    userRoleType: 0,
    latestRead: false,
    userChattingData: [],
    webShowCloseBtn: false,
    webInputText: "",
    webScrollDisable: false,
    webUserChattingDataBak: [],
  },
])
//fab
let chatFabIsOpen = ref(false)
let haveUnread = ref(true)
const eleWave1 = ref(null)
const eleWave2 = ref(null)

function jumpToUserDetail(userId) {
  if (userId) {
    const userSpaceUrl = thisRouter.resolve({
      path: "/space",
      query: {id: userId}
    })
    window.open(userSpaceUrl.href, "_blank")
  }
}

function checkAllRead() {
  let isAllRead = true
  if (chattingData.value && chattingData.value.length) {
    for (let count = 0; count < chattingData.value.length; ++count) {
      if (!chattingData.value[count].latestRead) {
        isAllRead = false
        break
      }
    }
  }
  if (isAllRead) {
    haveUnread.value = false
    if (!eleWave1.value.classList.contains('pause')) {
      eleWave1.value.classList.toggle('pause')
    }
    if (!eleWave2.value.classList.contains('pause')) {
      eleWave2.value.classList.toggle('pause')
    }
  } else {
    haveUnread.value = true
    if (!chatFabIsOpen.value) {
      eleWave1.value.classList.remove('pause')
      eleWave2.value.classList.remove('pause')
    }
  }
}

function animalOperate(isPause) {
  if (isPause) {
    chatFabIsOpen.value = true
    if (!eleWave1.value.classList.contains('pause')) {
      eleWave1.value.classList.toggle('pause')
    }
    if (!eleWave2.value.classList.contains('pause')) {
      eleWave2.value.classList.toggle('pause')
    }
  } else {
    chatFabIsOpen.value = false
    eleWave1.value.classList.remove('pause')
    eleWave2.value.classList.remove('pause')
  }
  //read record
  if (webChattingFocusChat.value.userChattingData &&
      0 !== webChattingFocusChat.value.userChattingData.length
      && !webChattingFocusChat.value.latestRead) {
    let firstChattingLen = webChattingFocusChat.value.userChattingData.length
    webChattingFocusChat.value.latestRead = true
    let readChatId = webChattingFocusChat.value.chatId
    let readMessageId = webChattingFocusChat.value.userChattingData[firstChattingLen - 1].messageId
    readMessage({
      chatId: readChatId,
      messageId: readMessageId
    })
    savePersonChattingRead(readChatId, readMessageId)
  }
  checkAllRead()
}

function switchFocusChatting(item) {
  if (webChattingFocusChat.value) {
    messageTimeLabelBuilder(webChattingFocusChat.value.userChattingData)
    webChattingFocusChat.value.webUserChattingDataBak = webChattingFocusChat.value.userChattingData
  }
  item.userChattingData = []
  webChattingFocusChat.value = item
  webChattingFocusChat.value.scrollDisable = false
}

function closeThisChat(chatId) {
  if (chatId === webChattingFocusChat.value.chatId) {
    webChattingFocusChat.value = {}
  }
  if (chattingData.value) {
    chattingData.value = chattingData.value.filter(item => item.chatId !== chatId);
  }
  hideChat({hideChatId: chatId})
}

function sendChatMsg(event) {
  if (event.ctrlKey) {
    webChattingFocusChat.value.webInputText += '\n'
  } else {
    if (userToken.value) {
      socketSend(webChattingFocusChat.value.chatId, webChattingFocusChat.value.webInputText)
    } else {
      notifyTopRightWarning(
          "未登录用户暂时不支持发送消息喔，您的相关建议或者意见可以在网站留言板中留言🤭", 5000, notify)
    }
    webChattingFocusChat.value.webInputText = ''
  }
}

function loadMoreChatRecord(index, done) {
  //load from bak data
  if (webChattingFocusChat.value.webUserChattingDataBak &&
      0 !== webChattingFocusChat.value.webUserChattingDataBak.length) {
    webChattingFocusChat.value.userChattingData.splice(0, 0,
        ...webChattingFocusChat.value.webUserChattingDataBak);
    webChattingFocusChat.value.webUserChattingDataBak = []
    //send read confirm
    {
      let item = webChattingFocusChat.value
      if (!item.latestRead) {
        item.latestRead = true
        if (item.userChattingData.length > 0) {
          readMessage({
            chatId: item.chatId,
            messageId: item.userChattingData[item.userChattingData.length - 1].messageId
          })
        }
      }
      checkAllRead()
    }
    done()
    return
  }
  //get last msg
  let lastMsgId = ""
  if (webChattingFocusChat.value.userChattingData && 0 !== webChattingFocusChat.value.userChattingData.length) {
    if (webChattingFocusChat.value.userChattingData.length < 10) {
      webChattingFocusChat.value.scrollDisable = true
      return
    }
    lastMsgId = webChattingFocusChat.value.userChattingData[0].messageId
  }
  //load from server
  moreMessage({lastMessage: lastMsgId, chatId: webChattingFocusChat.value.chatId}).then(res => {
    const status = res.data.status
    if (200 !== status) {
      return
    }
    if (null != res.data.data && 0 !== res.data.data.length) {
      let inputData = res.data.data.reverse()
      webChattingFocusChat.value.userChattingData.splice(0, 0,
          ...inputData)
      messageTimeLabelBuilder(webChattingFocusChat.value.userChattingData)
      webChattingFocusChat.value.latestRead = true
      let readChatId = webChattingFocusChat.value.chatId
      let readMessageId = webChattingFocusChat.value
          .userChattingData[webChattingFocusChat.value.userChattingData.length - 1].messageId
      readMessage({
        chatId: readChatId,
        messageId: readMessageId
      })
      savePersonChattingRead(readChatId, readMessageId)
      done()
    } else {
      webChattingFocusChat.value.scrollDisable = true
    }
    checkAllRead()
  })

}

function startPrivateChatWith(toUserId) {
  if (!toUserId) {
    return
  }
  let alreadyLink = false;
  if (chattingData.value && chattingData.value.length > 0) {
    for (let count = 0; count < chattingData.value.length; ++count) {
      if (chattingData.value[count].chatUserId === toUserId) {
        alreadyLink = true;
        switchFocusChatting(chattingData.value[count])
        chatFabIsOpen.value = true
        break
      }
    }
  }
  if (!alreadyLink) {
    privateInitChat({toUserId: toUserId}).then(res => {
      if (res.data && 200 === res.data.status && res.data.data) {
        //switch
        let inputData = res.data.data
        if (!inputData.userChattingData) {
          inputData.userChattingData = []
        } else {
          inputData.userChattingData = inputData.userChattingData.reverse()
        }
        inputData.webShowCloseBtn = false
        inputData.webInputText = ""
        inputData.webScrollDisable = false
        //input
        switchFocusChatting(inputData)
        chattingData.value.splice(0, 0, inputData)
        chatFabIsOpen.value = true
      } else {
        notifyTopWarning("对方不想和你聊天并扔来了一只狗🤯", 3000, notify)
      }
    })
  }
}

function loginMessage(isSuccess) {
  baseDataInit(isSuccess)
  socketInit()
}

function baseDataInit(webIsLogin) {
  if (webIsLogin) {
    userData.value = getWebLoginData()
    userToken.value = getWebLoginToken()
  } else {
    userData.value = {}
    userToken.value = ""
  }
  chattingUsers().then(res => {
    if (res.data && 200 === res.data.status && res.data.data && 0 !== res.data.data.length) {
      chattingData.value = res.data.data
      let localMsgReadMap = getPersonChattingRead();
      chattingData.value.forEach(data => {
        if (!data.userChattingData) {
          data.userChattingData = []
        } else {
          data.userChattingData = data.userChattingData.reverse()
        }
        data.webShowCloseBtn = false
        data.webInputText = ""
        data.webScrollDisable = false
        if (!userData.value.id) {
          data.latestRead = localMsgReadMap.get(data.chatId) === data.lastMessageId
        }
      })
      let firstChattingLen = chattingData.value[0].userChattingData.length
      if (0 !== firstChattingLen) {
        webChattingFocusChat.value = chattingData.value[0]
        messageTimeLabelBuilder(webChattingFocusChat.value.userChattingData)
        if (chatFabIsOpen.value && !webChattingFocusChat.value.latestRead) {
          webChattingFocusChat.value.latestRead = true
          let readChatId = webChattingFocusChat.value.chatId
          let readMessageId = webChattingFocusChat.value.userChattingData[firstChattingLen - 1].messageId
          readMessage({
            chatId: readChatId,
            messageId: readMessageId
          })
          savePersonChattingRead(readChatId, readMessageId)
        }
      }
    } else {
      chattingData.value = []
      webChattingFocusChat.value = {}
    }
    checkAllRead()
  })
}

function socketInit() {
  if (userToken.value) {
    socket.value = new SockJS(BASE_ADD + "yui/chat-websocket/socketAuthNoError?User-Token=" + userToken.value)
    // socket.value = new SockJS("http://localhost:8000/yui/chat-websocket/socketAuthNoError?User-Token=" + userToken.value);
    stompClient.value = Stomp.over(socket.value)
    stompClient.value.connect(
        {},
        () => {
          socketConnected.value = true;
          stompClient.value.subscribe("/user/" + userToken.value + "/message/receive", callback => {
            socketMsgReceiveDataParse(callback);
          });
          stompClient.value.subscribe("/user/all/message/receive", callback => {
            socketMsgReceiveDataParse(callback);
          });
          stompClient.value.subscribe("/announcement/receive", () => {
            // console.log(tick);
          });
          stompClient.value.subscribe("/error/receive", callback => {
            notifyTopRightWarning(callback.body, 3000, notify)
          });
        },
        () => {
          socketConnected.value = false;
        }
    )
  } else {
    if (stompClient.value) {
      stompClient.value.disconnect();
    }
    socketConnected.value = false;
  }
}

function socketSend(chatId, message) {
  if (stompClient.value && stompClient.value.connected) {
    const msg = {chatId: chatId, message: message};
    stompClient.value.send("/socket/message/send", JSON.stringify(msg));
  }
}

function socketMsgReceiveDataParse(callback) {
  const data = JSON.parse(callback.body)
  let alreadyLink = false
  for (let singleChatting of chattingData.value) {
    if (singleChatting.chatId === data.fromChatId) {
      alreadyLink = true
      messageTimeLabelInput(singleChatting.userChattingData, {
        chatTimeStamp: 0,
        messageId: data.sendMessageId,
        sendUserId: data.sendUserId,
        sendUserAvatar: data.sendUserAvatar,
        sendUserNickname: data.sendUserNickname,
        sendUserGender: data.sendUserGender,
        sendUserRoleType: data.sendUserRoleType,
        message: data.sendMessage,
        sendDate: data.sendDate,
      })
      if (webChattingFocusChat.value.chatId === data.fromChatId && chatFabIsOpen.value) {
        singleChatting.latestRead = true
        if (data.sendUserId !== userData.value.id) {
          readMessage({
            chatId: data.fromChatId,
            messageId: data.sendMessageId
          })
        }
      } else {
        singleChatting.latestRead = false
      }
      checkAllRead()
      let chatScrollerDiv = document.getElementById("chat-body-infinite-id")
      if (chatScrollerDiv) {
        delay(100).then(() => {
          chatScrollerDiv.scrollTo({top: chatScrollerDiv.scrollHeight, behavior: 'smooth'})
        })
      }
      break
    }
  }
  if (!alreadyLink) {
    baseDataInit(webIsLogin())
  }
}


onMounted(() => {
  baseDataInit(webIsLogin())
  socketInit()
  eleWave1.value = document.getElementById("wave-1")
  eleWave2.value = document.getElementById("wave-2")
  emitter.on("loginMessageEvent", loginMessage)
  emitter.on("toPrivateChatWith", startPrivateChatWith)
})

onUnmounted(() => {
  emitter.off("loginMessageEvent", loginMessage)
  emitter.off("toPrivateChatWith", startPrivateChatWith)
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
  width: 70rem;
  margin: 1rem 1.5rem 28rem 0;
  padding: .5rem;
  border-radius: 1rem !important;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);

  .chat-main-card-avatar-list {

    .chat-main-card-avatar-row {
      margin: .2rem 1rem .2rem .2rem;
      padding: 4px 4px 4px 8px;
      border-radius: .8rem;
      color: $cask_dark_jungle_green;
      font-family: Roboto Slab, sans-serif;
    }

    .chat-main-card-avatar-setting {
      font-family: Roboto Slab, sans-serif;
      color: $cask_cactus;
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

    ::-webkit-scrollbar-thumb {
      background-color: $cask_cactus;
    }
  }
}

::-webkit-scrollbar {
  overflow: visible;
  z-index: 12;
  background: transparent;
  height: 12px;
  width: 14px;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: $cask_base_black;
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

.q-body--dialog {
  overflow-y: scroll !important;
}

</style>



