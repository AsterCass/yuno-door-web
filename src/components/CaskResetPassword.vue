<template>
  <div>
    <q-dialog :model-value="resetPasswdDialog" @hide="closeResetPasswdDialog"
              transition-show="fade" transition-hide="fade">
      <q-card class="dialog-frame column justify-between">

        <div class="dialog-header">
          Reset Password
          <div class="dialog-tag">
            重置密码
          </div>
        </div>


        <div>
          <q-input class="dialog-input-warn-first" placeholder="邮箱" v-model="mail"
                   filled color="black" lazy-rules
                   :rules="[ val => checkIsMail(val) || '邮箱格式错误']"/>
          <q-input class="dialog-input-warn" placeholder="新密码" v-model="passwd"
                   filled color="black" :type="isPwd ? 'password' : 'text'" lazy-rules
                   :rules="[ val => checkIsPasswd(val) || '密码长度需要在8-20位并且同时含有数字和大小写字母']">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="dialog-input-warn-last row justify-between">
            <q-input class="col-5" placeholder="验证码" v-model="confirmCode"
                     filled color="black" mask="######"/>
            <div class="col-6 row justify-center" style="padding: 0.5rem 0">
              <q-btn color="secondary" icon-right="send" :disable="sendingMail"
                     :label="sendMailLabel" @click="sendEmail"/>
            </div>
          </div>

        </div>


        <div class="dialog-btn-comb">
          <q-btn label="重置密码" class="dialog-btn-margin-long col-4"
                 @click="resetPasswdMethod" :disable="btnDisable"/>
        </div>

      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import {checkIsMail, checkIsPasswd} from "@/utils/format-check";
import {sendResetMail, resetPasswd} from "@/api/user";
import {authLogin} from "@/utils/user-auth";


//notify
const notify = useQuasar().notify

let resetPasswdDialog = ref(false)
let mail = ref("")
let passwd = ref("")
let confirmCode = ref("")

//isSendMail
let sendingMail = ref(false)
let mailWaitSecond = ref(0)
let sendMailLabel = ref("发送验证码")
let sendMailTimer = 0

//passwd show or not
let isPwd = ref(true)

//防抖动
let btnDisable = ref(false)

//reset pass body
let resetPasswdBody = ref({
  account: "",
  mail: "",
  confirmCode: "",
  passwd: "",
  gender: 0
})

//warning notify
function resetPassWarningNotify(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

function showResetPasswdDialog() {
  resetPasswdDialog.value = true
}

function closeResetPasswdDialog() {
  resetPasswdDialog.value = false
}

//验证码
function sendEmail() {
  sendingMail.value = true
  if (!checkIsMail(mail.value)) {
    resetPassWarningNotify("邮箱格式错误")
    sendingMail.value = false
    return
  }
  sendResetMail({mail: mail.value}).then(res => {
    const status = res.data.status
    if (200 === status) {
      waitEmailSend(60)
    } else {
      resetPassWarningNotify("邮件发送失败：" + res.data.message)
      sendingMail.value = false
    }
  })
}

//注册
function resetPasswdMethod() {
  if (!checkIsMail(mail.value)) {
    resetPassWarningNotify("邮箱格式错误")
    return
  }
  resetPasswdBody.value.mail = mail.value
  if (!checkIsPasswd(passwd.value)) {
    resetPassWarningNotify("密码格式错误")
    return
  }
  resetPasswdBody.value.passwd = passwd.value
  btnDisable.value = true
  //set data
  resetPasswdBody.value.confirmCode = confirmCode.value
  resetPasswd(resetPasswdBody.value).then(res => {
    const status = res.data.status
    if (200 === status) {
      authLogin(mail.value, passwd.value, notify)
    } else {
      resetPassWarningNotify("重置密码失败：" + res.data.message)
    }
    btnDisable.value = false
  })
}


//感知登录事件
function loginMessage(isSuccess) {
  if (isSuccess) {
    resetPasswdDialog.value = false
  }
}


//生成发送邮箱定时器
function waitEmailSend(waitTimeSecond) {
  mailWaitSecond.value = waitTimeSecond;
  sendMailTimer = setInterval(() => {
    sendMailLabel.value = "邮件已发送 " + mailWaitSecond.value
    --mailWaitSecond.value
    if (0 > mailWaitSecond.value) {
      waitStop()
    }
  }, 1000);
}

//删除发送邮箱定时器
function waitStop() {
  clearInterval(sendMailTimer);
  sendMailTimer = 0
  sendMailLabel.value = "发送验证码"
  sendingMail.value = false
}

onMounted(() => {
  emitter.on('showResetPassDialogEven', showResetPasswdDialog)
  emitter.on("loginMessageEvent", loginMessage)
})

onUnmounted(() => {
  emitter.off('showResetPassDialogEven', showResetPasswdDialog)
  emitter.off("loginMessageEvent", loginMessage)
})


</script>

<style lang="scss" scoped>
@import "@/styles/cask-dialog-style.scss";


.nor-btn {

}

</style>