<template>

  <div class="space-right-title">
    基本资料
  </div>
  <q-separator spaced="1rem" size="0.05rem" inset/>
  <div class="row justify-center">
    <div class="col-10">


      <div class="q-mt-md">
        用户名/登录账号：
      </div>

      <q-input class="dialog-btn-small" v-model="userData.account" filled color="black" disable/>
      <div class="q-mt-md">
        邮箱：
      </div>

      <q-input class="dialog-btn-small" v-model="userData.mail" filled color="black" disable/>
      <div class="q-mt-md">
        昵称：
      </div>
      <q-input class="dialog-btn-small" placeholder="昵称" v-model="userData.nickName"
               filled color="black" lazy-rules hide-bottom-space
               :rules="[ val => checkNickName(val) || '昵称不允许超过20个字符，并且不能含有某些特殊字符']"/>

      <div class="q-mt-md">
        性别：
      </div>
      <q-select class="dialog-btn-small" v-model="refGender"
                options-cover filled color="black" :options="genderOptEnum"/>

      <div class="row q-mt-md justify-between">
        <div class="col-5">
          <div>
            姓：
          </div>
          <q-input class="dialog-btn-small " placeholder="姓" v-model="userData.lastName"
                   filled color="black" lazy-rules hide-bottom-space
                   :rules="[ val => checkName(val) || '姓氏不合法']"/>
        </div>
        <div class="col-6">
          <div>
            名：
          </div>
          <q-input class="dialog-btn-small" placeholder="名" v-model="userData.firstName"
                   filled color="black" lazy-rules hide-bottom-space
                   :rules="[ val => checkName(val) || '名字不合法']"/>
        </div>
      </div>

      <div class="q-mt-md">
        生日：
      </div>
      <q-input class="dialog-btn-small" placeholder="生日" v-model="userData.birth"
               type="date" filled color="black"/>

      <div class="q-mt-md">
        个性签名：
      </div>
      <q-input class="dialog-btn-small" placeholder="个性签名（50字以内）" type="textarea"
               v-model="userData.motto" filled color="black" hide-bottom-space
               :rules="[ val => checkMotto(val) || '签名不允许超过50个字符']"/>


    </div>
  </div>

  <div class="row justify-evenly space-card-btn-group">
    <q-btn class="dialog-btn-margin-long" @click="saveProfile">保存</q-btn>
    <q-btn class="dialog-btn-margin-long" @click="resetProfile">重置</q-btn>
  </div>


</template>

<script setup>


//save user info
import {checkMotto, checkName, checkNickName} from "@/utils/format-check";
import {updateInfo} from "@/api/user";
import {getLoginData, refreshLoginMessage} from "@/utils/store";
import {useQuasar} from "quasar";
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import {getGenderObj} from "@/utils/gender-opt";
import emitter from "@/utils/bus";
import {genderOptEnum} from "@/utils/gender-opt";


const props = defineProps({
  userData: {
    type: Object,
  }
})
//notify
const notify = useQuasar().notify
//user data
let userData = ref({
  id: "",
  avatar: "",
  account: "",
  mail: "",
  gender: 0,
  birth: "",
  motto: "",
  firstName: "",
  lastName: "",
  nickName: ""
})
//gender
let refGender = ref(null);


//notify
function regWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

function saveProfile() {
  //check
  if (!checkNickName(userData.value.nickName)) {
    regWarningNotify("昵称格式错误")
    return
  }
  if (!checkName(userData.value.firstName)) {
    regWarningNotify("名字格式错误")
    return
  }
  if (!checkName(userData.value.lastName)) {
    regWarningNotify("姓氏格式错误")
    return
  }
  if (!checkMotto(userData.value.motto)) {
    regWarningNotify("个性签名格式错误")
    return
  }
  //set gender
  userData.value.gender = refGender.value.category
  updateInfo(userData.value).then(res => {
    const status = res.data.status
    if (200 === status) {
      notify({
        message: "保存成功",
        position: 'top-right',
        type: 'positive',
        timeout: 1000
      })
      refreshLoginMessage()
    } else {
      regWarningNotify("保存失败：" + res.data.message)
    }
  })
}

//init user info
function initProfile() {
  userData.value = props.userData
  refGender.value = getGenderObj(props.userData.gender)
}

//reset user info
function resetProfile() {
  refreshLoginMessage()
}

//登录事件
function loginMessage(isOnLogin) {
  if (isOnLogin) {
    let loginData
    loginData = getLoginData()
    userData.value = loginData
    refGender.value = getGenderObj(loginData.gender)
  }
}

//刷新数据
function refreshUserData(data) {
  if (data) {
    userData.value = data
  }
}


onMounted(() => {
  //初始化登录信息
  initProfile()
  //登录事件
  emitter.on("loginMessageEvent", loginMessage)
  //数据更新事件
  emitter.on("refreshLoginMessageEvent", refreshUserData)
})

onUnmounted(() => {
  //删除登录事件
  emitter.off("loginMessageEvent", loginMessage)
  //删除数据更新事件
  emitter.off("refreshLoginMessageEvent", refreshUserData)
})


</script>

<style scoped lang="scss">
@import "@/styles/cask-dialog-style.scss";

.space-right-title {
  margin-top: 1rem;
  font-family: '华文行楷', sans-serif;
  text-align: center;
  font-size: 2.5rem;
}

.space-card-input-name {
  align-items: center
}


.space-card-btn-group {
  height: 3rem;
  margin: 2rem 0;
}

</style>


<style lang="scss">

.not-allow-resize {
  .q-textarea .q-field__native {
    resize: none;
  }
}

</style>