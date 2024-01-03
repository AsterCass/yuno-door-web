<template>
  <q-layout view="lHh lpr lFf" container:false>

    <CaskWebHeader :header-visible="true"/>

    <div style="z-index: -1">
      <q-img class="index-img"
             :no-native-menu="false"
             src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg3-half.jpg"
             placeholder-src=
                 "https://astercasc-web-admin-1256368017.cos.ap-shanghai.myqcloud.com/admin-web-img/bg3-half-dim.jpg"
             alt=""
             :ratio="2.5"
             :fit="'cover'">
      </q-img>
    </div>

    <div v-if="!userId" class="page-main-card row">
      <div class="col-4 space-card-left row justify-center">
        <div class="col-12 justify-center space-head">
          <q-avatar size="150px">
            <q-img :src="userData.avatar"/>
          </q-avatar>

          <div class="space-head-modify">
            <q-btn label="修改头像" class="dialog-btn-margin" @click="modifyAvatar">
            </q-btn>
          </div>
        </div>

        <div class="col-12 row">
          <q-tabs
              v-model="currentTab"
              vertical inline-label
              indicator-color="transparent"
              active-color="secondary"
              class="col-12"
          >
            <q-tab class="space-left-tab" name="profile" icon="fa-solid fa-address-card" label="基本资料"/>
            <q-tab class="space-left-tab" name="article" icon="fa-solid fa-book" label="我的文章"/>
            <q-tab class="space-left-tab" name="friend" icon="fa-solid fa-user-group" label="我的好友"/>
            <q-tab class="space-left-tab" name="security" icon="fa-solid fa-user-shield" label="账号安全"/>
            <q-tab class="space-left-tab" name="setting" icon="fa-solid fa-gear" label="账号设置"/>
          </q-tabs>
        </div>
        <div class="col-12 row space-profile-integrity">
          资料完整度：{{ Math.round(profileIntegrity * 100) }}%
          <q-linear-progress stripe rounded size="10px" :value="profileIntegrity" color="secondary" class="q-mt-sm"/>
        </div>
      </div>
      <div class="col-8">
        <q-tab-panels
            v-model="currentTab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
            class="space-card-right"
        >
          <q-tab-panel name="profile">
            <CaskUserProfile :user-data="userData"/>
          </q-tab-panel>
          <q-tab-panel name="article">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.8rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="friend">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.8rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="security">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.8rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="setting">
            <div class="space-right-coming-soon">
              COMING SOON
              <div style="font-size: 0.8rem">
                敬请期待
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div v-else-if="existUser" class="page-main-card">

      <div class="row justify-center" style="transform: translateY(-55%);">
        <div class="col"/>
        <q-btn round :ripple="false" style="padding: .15rem"
               class="col-auto shadow-15 page-main-card-for-avatar cursor-inherit">
          <q-avatar size="10rem" class="">
            <q-img :src="inspectUserData.avatar"/>
          </q-avatar>
        </q-btn>
        <div class="col ">
          <div style="position: absolute; bottom: .25rem; right: 2.5rem">
            <q-btn v-if="0 === alreadyFollow" label="关注" color="light-green-10" push
                   @click="followMethod(true)"/>
            <q-btn v-else-if="1 === alreadyFollow" label="取消关注" color="light-green-10" outline push
                   @click="followMethod(false)"/>
            <q-btn v-else label="不能关注自己喔" color="light-green-10" disable push/>
          </div>
        </div>
      </div>

      <div style="transform: translateY(-5rem);">
        <!--部分元素居中，部分元素居右，忽略左方元素-->
        <div class="dialog-sec-header row justify-center">
          <div class="col">
          </div>
          <div class="col-auto">
            {{ inspectUserData.nickName }}
          </div>
          <div class="col">
            <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                     :color="getRoleTypeObj(inspectUserData.roleType).color"
                     :label="getRoleTypeObj(inspectUserData.roleType).label">
              <q-icon
                  :name="getRoleTypeObj(inspectUserData.roleType).logo"
                  class="q-ml-xs"
              />
            </q-badge>
          </div>
        </div>

        <div class="q-my-lg row justify-center simple-content-semi">
          <q-icon :color="inspectUserData.mail? 'orange-6' : 'grey-6' "
                  name="fa-solid fa-envelope" class="q-mr-sm" size="1.25rem"/>
          {{ inspectUserData.mail ? inspectUserData.mail : 'None or Hide' }}
          <q-separator class="q-mx-md" vertical inset/>
          <q-icon :color="inspectUserData.socialLink.qq? 'blue-6' : 'grey-6' "
                  name="fa-brands fa-qq" class="q-mr-sm" size="1.25rem"/>
          {{ inspectUserData.socialLink.qq ? inspectUserData.socialLink.qq : 'None or Hide' }}
          <q-separator class="q-mx-md" vertical inset/>
          <q-icon :color="inspectUserData.socialLink.wechat? 'green-6' : 'grey-6' "
                  name="fa-brands fa-weixin" class="q-mr-sm" size="1.25rem"/>
          {{ inspectUserData.socialLink.wechat ? inspectUserData.socialLink.wechat : 'None or Hide' }}
          <q-separator class="q-mx-md" vertical inset/>
          <q-icon :color="inspectUserData.socialLink.github? 'black' : 'grey-6' "
                  name="eva-github" class="q-mr-sm" size="1.25rem"/>
          {{ inspectUserData.socialLink.github ? inspectUserData.socialLink.github : 'None or Hide' }}
        </div>

        <div class="q-my-lg row justify-center simple-bold-little-title">
          <div>
            关注：{{ inspectUserData.community.followNum }}
          </div>
          <q-separator class="q-mx-md" vertical inset/>
          <div>
            粉丝：{{ inspectUserData.community.fansNum }}
          </div>
          <q-separator class="q-mx-md" vertical inset/>
          <div>
            好友：{{ inspectUserData.community.friendNum }}
          </div>
          <q-separator class="q-mx-md" vertical inset/>
          <div>
            博文：{{ inspectUserData.articleNum }}
          </div>
          <q-separator class="q-mx-md" vertical inset/>
          <div>
            杂谈：{{ inspectUserData.essayNum }}
          </div>
        </div>

        <!-- support '\n' or '\t'-->
        <div class="q-my-lg text-center simple-content-semi" style="white-space: pre-line">
          {{ inspectUserData.motto }}
        </div>

        <div class="q-my-lg row justify-center">
          <div class="col-7 simple-bold-title-secondary">
            <q-tabs
                v-model="inspectUserTab"
                align="justify"
                narrow-indicator
                active-bg-color="green-1"
                class=" q-mb-lg"
            >
              <q-tab class=" q-mx-md" style="border-radius: 1rem;" name="articles" label="TA的博文"/>
              <q-tab class="q-mx-md" style="border-radius: 1rem" name="essays" label="TA的杂谈"/>
              <q-tab class="q-mx-md" style="border-radius: 1rem" name="friends" label="TA的好友"/>
            </q-tabs>
          </div>

          <div class="col-11">
            <q-tab-panels
                v-model="inspectUserTab"
                animated
                transition-prev="jump-right"
                transition-next="jump-left"
                transition-duration="500"
                class="bg-transparent"
            >
              <!--隐藏滚动条-->
              <q-tab-panel name="articles" class="row justify-center overflow-hidden">
                <div v-for="(item, index) in inspectUserArticleList" :key="index"
                     class="col-xs-12 col-lg-6">
                  <CaskArticleListCard :intro="item"/>
                </div>

                <div v-if="inspectUserArticleList.length >= 4" class="col-11 row justify-end">
                  <q-btn class="simple-bold-little-title" rounded
                         icon-right="fa-solid fa-circle-chevron-right" flat label="MORE"
                         :to="`/article/list?author=${inspectUserData.id}`"/>
                </div>
              </q-tab-panel>
              <q-tab-panel name="essays" class="row justify-center overflow-hidden">
                <div v-for="(item, index) in inspectUserEssayList" :key="index"
                     class="col-xs-12 col-lg-6">
                  <CaskArticleListCard :intro="item"/>
                </div>
                <div v-if="inspectUserEssayList.length >= 4" class="col-11 row justify-end">
                  <q-btn class="simple-bold-little-title" rounded
                         icon-right="fa-solid fa-circle-chevron-right" flat label="MORE"
                         :to="`/essay/list?author=${inspectUserData.id}`"/>
                </div>
              </q-tab-panel>
              <q-tab-panel name="friends" class="row justify-start overflow-hidden">
                <div v-for="(item, index) in inspectUserData.friendList" :key="index" class="q-ma-lg">
                  <div class="row items-center">
                    <q-btn round push color="white" class="q-mr-md" :to="`/space?id=${item.id}`">
                      <q-avatar size="80px">
                        <q-img :src="item.avatar"/>
                      </q-avatar>
                    </q-btn>
                    <div>
                      <div class="simple-bold-little-title-secondary">
                        {{ item.nickName }}
                      </div>
                      <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                               :color="getGenderObj(item.gender).color"
                               :label="getGenderObj(item.gender).label">
                      </q-badge>
                      <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                               :color="getRoleTypeObj(item.roleType).color"
                               :label="getRoleTypeObj(item.roleType).label">
                        <q-icon
                            :name="getRoleTypeObj(item.roleType).logo"
                            class="q-ml-xs"
                        />
                      </q-badge>
                    </div>
                  </div>

                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>


      </div>

    </div>
    <div v-else class="page-main-card"/>


  </q-layout>

  <CaskUploadAvatar :user-data="userData"/>
  <CopyrightFooter/>

</template>

<script setup>
import CaskWebHeader from "@/components/CaskWebHeader.vue";
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {
  computed, defineProps,
  onMounted,
  onUnmounted,
  ref, watch
} from "vue";
import {getRoleTypeObj} from "@/utils/enums/role-type"
import {addStyle, removeStyle} from "@/utils/document-style-helper";
import {getLoginData, refreshLoginMessage} from "@/utils/store";
import emitter from "@/utils/bus";
import CaskUploadAvatar from "@/components/CaskUploadAvatar.vue";
import {useRouter} from "vue-router";
import CaskUserProfile from "@/views/CaskUserProfile.vue";
import {follow, userDetailSimple} from "@/api/user";
import {useQuasar} from "quasar";
import {getBlogList, getBlogListCount} from "@/api/article";
import {customPage} from "@/utils/page";
import CaskArticleListCard from "@/views/CaskArticleListCard.vue";
import {getGenderObj} from "@/utils/enums/gender-opt";

//notify
const notify = useQuasar().notify
// props
const props = defineProps({
  userId: {
    type: String,
    default: ""
  }
})

//无数据跳转
const thisRouter = useRouter()
//user data
let userData = ref({
  id: "",
  avatar: "",
  account: "",
  mail: "",
  qq: "",
  wechat: "",
  github: "",
  gender: 0,
  birth: "",
  motto: "",
  firstName: "",
  lastName: "",
  nickName: "",
  roleType: 1,
})
let inspectUserData = ref({
  id: "",
  avatar: "",
  account: "",
  mail: "",
  gender: 0,
  birth: "",
  motto: "",
  nickName: "",
  roleType: 1,
  socialLink: {
    qq: "",
    wechat: "",
    github: "",
  },
  community: {
    followNum: 0,
    fansNum: 0,
    friendNum: 0,
  },
  articleNum: 0,
  essayNum: 0,
  friendList: [],
})
let inspectUserArticleList = ref([])
let inspectUserEssayList = ref([])
let inspectUserTab = ref("articles")
let existUser = ref(false)
let alreadyFollow = ref(0)
//设置栏目
let currentTab = ref("profile")
//资料完整度
let profileIntegrity
//计算资料完整度
profileIntegrity = computed(() => {
  let curIntegrity = 0;
  if (null != userData.value.birth && 0 !== userData.value.birth.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.firstName && 0 !== userData.value.firstName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.lastName && 0 !== userData.value.lastName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.nickName && 0 !== userData.value.nickName.length) {
    curIntegrity += 0.2
  }
  if (null != userData.value.motto && 0 !== userData.value.motto.length) {
    curIntegrity += 0.2
  }
  return curIntegrity
})

//reset user info
function resetProfile() {
  refreshLoginMessage()
}

//modify avatar
function modifyAvatar() {
  emitter.emit("showUploadDialogEven", true)
}

//登录事件
function loginMessage(isOnLogin) {
  if (isOnLogin) {
    let loginData
    loginData = getLoginData()
    userData.value = loginData
  } else {
    thisRouter.push({
      path: '/notLogin'
    })
  }
}

//刷新数据
function refreshUserData(data) {
  if (data) {
    userData.value = data
  }
}

// 关注/取关
function followMethod(isFollow) {
  follow({isFollow: isFollow, userId: inspectUserData.value.id}).then(res => {
    console.log(res)
  })
}


// get inspect user article data
function searchArticleListMethod(articleType, authorId) {
  //参数插入
  let currentParam = {articleType: articleType, authorId: authorId}
  getBlogList(customPage(currentParam, 0, 4)).then(res => {
    if (1 === articleType) {
      inspectUserArticleList.value = []
      inspectUserArticleList.value.push(...res.data.data)
    } else if (2 === articleType) {
      inspectUserEssayList.value = []
      inspectUserEssayList.value.push(...res.data.data)
    }
  })
  getBlogListCount(customPage(currentParam, 0, 4)).then(res => {
    if (1 === articleType) {
      inspectUserData.value.articleNum = res.data.data
    } else if (2 === articleType) {
      inspectUserData.value.essayNum = res.data.data
    }
  })
}

function updateUserData() {
  if (props.userId) {
    //pre
    inspectUserTab.value = "articles"
    //call
    userDetailSimple({userId: props.userId}).then(res => {
      const status = res.data.status
      if (200 !== status) {
        throw status
      }
      // load data
      inspectUserData.value = res.data.data
      // article data
      searchArticleListMethod(1, inspectUserData.value.id)
      searchArticleListMethod(2, inspectUserData.value.id)
      // show user detail
      existUser.value = true
    }).catch(() => {
      notify({
        message: "用户不存在",
        position: 'top',
        type: 'negative',
        timeout: 1000
      })
    })
  } else {
    //初始化登录信息
    resetProfile()
    //登录事件
    emitter.on("loginMessageEvent", loginMessage)
    //数据更新事件
    emitter.on("refreshLoginMessageEvent", refreshUserData)
  }
}

onMounted(() => {
  //底色渲染
  addStyle("background-color: rgb(239, 242, 245)")
  updateUserData()
})

onUnmounted(() => {
  //取消底色渲染
  removeStyle("background-color: rgb(239, 242, 245)")
  if (props.userId) {
    //...
  } else {
    //删除登录事件
    emitter.off("loginMessageEvent", loginMessage)
    //删除数据更新事件
    emitter.off("refreshLoginMessageEvent", refreshUserData)
  }
})

watch(() => props.userId, () => {
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessage)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserData)
  //rebuild
  updateUserData()
})

</script>

<style scoped lang="scss">
@import "@/styles/cask-dialog-style.scss";
@import "@/styles/cask-little-mini-style.scss";

.page-main-card {
  margin: -8% 10% 5% 10%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
  min-height: 600px;
}

.page-main-card-for-avatar {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
}

.space-card-left {
  text-align: center;
  padding: 3%;
}

.space-head {
  margin: 0.5rem 2%;
}

.space-head-modify {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.space-profile-integrity {
  height: 3rem;
}

.space-card-right {
  border-radius: 0 50px 50px 0;
}

.space-right-coming-soon {
  font-family: Roboto Slab, sans-serif;
  text-align: center;
  height: 50rem;
  padding: 40% 0;
  font-size: 3rem;
}

</style>

<style lang="scss">

.space-left-tab {
  margin: 2rem 2%;
  height: 3rem;

  .q-tab__label {
    font-size: 1.5rem;
  }
}

.simple-bold-little-title {
  .on-right {
    margin-left: 8px;
  }
}

</style>