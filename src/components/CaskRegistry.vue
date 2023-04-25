<template>
  <div>
    <q-dialog :model-value="registryDialog" @hide="closeRegistry"
              transition-show="fade" transition-hide="fade">
      <q-card class="dialog-frame column justify-between">

        <div class="dialog-header">
          System Registry
          <div class="dialog-tag">
            注册账号
          </div>
        </div>


        <div>
          <q-input class="dialog-input-warn-first" placeholder="用户名/登录账号" v-model="account"
                   filled color="black"
                   :rules="[ val => checkAccount(val) || '账号长度在8-20位英文或数字']"/>
          <q-input class="dialog-input-warn" placeholder="邮箱" v-model="mail"
                   filled color="black" lazy-rules
                   :rules="[ val => checkIsMail(val) || '邮箱格式错误']"/>
          <q-input class="dialog-input-warn" placeholder="密码" v-model="passwd"
                   filled color="black" :type="'password'" lazy-rules
                   :rules="[ val => checkIsPasswd(val) || '密码长度需要在8-20位并且同时含有数字和大小写字母']"/>
          <q-select class="dialog-input-warn" label="性别" v-model="gender"
                    options-cover filled color="black" :options="genderOptEnum"
                    :rules="[ val => checkTrue(val) || '性别选择错误']"/>
          <div class="dialog-input-warn-last row justify-between">
            <q-input class="col-5" placeholder="验证码" v-model="confirmCode"
                     filled color="black" mask="######"/>
            <div class="col-6 row justify-center" style="padding: 0.5rem 0">
              <q-btn color="secondary" icon-right="send" :disable="sendingMail"
                     :label="sendMailLabel" @click="sendEmail"/>
            </div>
          </div>

        </div>


        <div class="row justify-around dialog-btn-comb">
          <q-btn label="注册" @click="registryMethod" class="dialog-btn-margin col-4"/>
        </div>
        <div class="dialog-tag">
          <q-checkbox v-model="againDeal" label="阅读并接受"
                      checked-icon="task_alt" unchecked-icon="panorama_fish_eye" color="black"/>
          <a :href="`#/privacy`" target="_blank">《Aster Casc隐私权保护声明》</a>
        </div>

      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import {genderOptEnum} from "@/utils/gender-opt";
import {checkIsMail, checkIsPasswd, checkAccount, checkTrue} from "@/utils/format-check";
import {sendMail, registry} from "@/api/user";
import {authLogin} from "@/utils/user-auth";


//notify
const notify = useQuasar().notify

let registryDialog = ref(false)
let account = ref("")
let mail = ref("")
let passwd = ref("")
let gender = ref(null)
let againDeal = ref(false)
let confirmCode = ref("")

//isSendMail
let sendingMail = ref(false)
let mailWaitSecond = ref(0)
let sendMailTimer = ref(0);
let sendMailLabel = ref("发送验证码")

//registry body
let registryBody = ref({
  account: "",
  mail: "",
  confirmCode: 0,
  passwd: "",
  gender: 0
})

//warning notify
function regWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

function showRegistryDialog() {
  registryDialog.value = true
}

function closeRegistry() {
  registryDialog.value = false
}

//验证码
function sendEmail() {
  sendingMail.value = true
  if (!checkIsMail(mail.value)) {
    regWarningNotify("邮箱格式错误")
    sendingMail.value = false
    return
  }

  sendMail({mail: mail.value}).then(res => {
    const status = res.data.status
    if (200 === status) {
      waitEmailSend(60)
    } else {
      regWarningNotify("邮件发送失败：" + res.data.message)
      sendingMail.value = false
    }
  })


}

//注册
function registryMethod() {
  if (!againDeal.value) {
    regWarningNotify("请勾选相关协议")
    return
  }
  if (!checkIsMail(mail.value)) {
    regWarningNotify("邮箱格式错误")
    return
  }
  registryBody.value.mail = mail.value
  if (!checkIsPasswd(passwd.value)) {
    regWarningNotify("密码格式错误")
    return
  }
  registryBody.value.passwd = passwd.value
  if (!checkAccount(account.value)) {
    regWarningNotify("账号格式错误")
    return
  }
  registryBody.value.account = account.value
  registryBody.value.gender = gender.value.category
  registryBody.value.confirmCode = confirmCode.value
  registry(registryBody.value).then(res => {
    const status = res.data.status
    if (200 === status) {
      authLogin(account.value, passwd.value, notify)
    } else {
      regWarningNotify("注册失败：" + res.data.message)
    }
  })
}


//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    registryDialog.value = false
  }
}


//生成发送邮箱定时器
function waitEmailSend(waitTimeSecond) {
  mailWaitSecond.value = waitTimeSecond;
  sendMailTimer.value = setInterval(() => {
    sendMailLabel.value = "邮件已发送 " + mailWaitSecond.value
    --mailWaitSecond.value
    if (0 > mailWaitSecond.value) {
      waitStop()
    }
  }, 1000);
}

//删除发送邮箱定时器
function waitStop() {
  clearInterval(sendMailTimer.value);
  sendMailTimer.value = 0
  sendMailLabel.value = "发送验证码"
  sendingMail.value = false
}

onMounted(() => {
  emitter.on('showRegistryDialogEven', showRegistryDialog)
  emitter.on("loginMessageEvent", loginMessage)
})

onUnmounted(() => {
  emitter.off('showRegistryDialogEven')
  emitter.off("loginMessageEvent")
})


</script>

<style lang="scss" scoped>
@import "@/styles/cask-dialog-style.scss";


.nor-btn {

}

</style>