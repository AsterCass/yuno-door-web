<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div>
        <q-icon class="q-mx-sm" name="fa-solid fa-clock-rotate-left" size="1em"/>
        Timestamp Converter
      </div>
    </div>


    <div class="row justify-center" style="margin: 2% 2% 1% 2%;">
      <div class="col-8 col-lg-5">
        <div>
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              日期转换时间戳
            </div>
          </div>

          <div class="row justify-evenly">
            <q-input v-model="dateConvertShow" standout="bg-light-green-10 text-whit" @click="timerDown">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                             style="background-color:transparent; border:0; padding:1rem;
                             box-shadow: 0 0 0; backdrop-filter:blur(0);">
                <div>
                  <div class="row">
                    <q-date
                        color="light-green-10"
                        class="q-mx-sm"
                        v-model="dateConvertDateInput">
                    </q-date>
                    <q-time
                        color="light-green-10"
                        class="q-mx-sm"
                        v-model="dateConvertTimeInput"
                        with-seconds
                        format24h>
                    </q-time>
                  </div>
                  <div class="row items-center justify-center q-my-md">
                    <q-btn v-close-popup label="保存" color="light-green-10" @click="saveDateTime"/>
                  </div>
                </div>
              </q-popup-proxy>
            </q-input>

            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="转换" @click="date2Timestamp"/>
            </div>

            <q-input standout readonly :model-value="dateConvertOutput"/>
          </div>
        </div>

        <div>
          <div class="row items-center justify-center q-mt-xl q-mb-md">
            <div class="simple-bold-title-secondary">
              时间戳转换日期
            </div>
          </div>

          <div class="row justify-evenly">
            <q-input
                standout="bg-light-green-10 text-whit"
                v-model="timestampConvertInput"
                @focus="timerDown"
            />

            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="转换" @click="timestamp2Date"/>
            </div>

            <q-input standout readonly v-model="timestampConvertOutput"/>
          </div>
        </div>

        <div>
          <div class="row items-center justify-center q-mt-xl q-mb-md">
            <div class="simple-bold-title-secondary">
              基础配置
            </div>
          </div>

          <div class="row justify-center roboto-slab">
            <div class="row">
              <!--垂直居中-->
              <div class="row items-center simple-bold-little-title">
                <div class="">
                  是否毫秒单位：
                </div>
              </div>
              <q-radio v-model="isMs" checked-icon="task_alt" color="grey-10" @click="timerUp"
                       unchecked-icon="panorama_fish_eye" :val="1" label="YES"/>
              <q-radio v-model="isMs" checked-icon="task_alt" color="grey-10" @click="timerUp"
                       unchecked-icon="panorama_fish_eye" :val="0" label="NO"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {date, useQuasar} from 'quasar'

//notify
const notify = useQuasar().notify

function codeGenerateNotifyFail(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top',
    type: 'negative',
    timeout: 1000
  })
}

//定时器
let timer = 0;
//日期转时间戳
let dateConvertDateInput = ref("")
let dateConvertTimeInput = ref("")
let dateConvertShow = ref("")
let dateConvertOutput = ref(0)
//时间戳转日期
let timestampConvertInput = ref(0)
let timestampConvertOutput = ref("")
//单位毫秒
let isMs = ref(1)


function saveDateTime() {
  const timeStamp = new Date(dateConvertDateInput.value + " " + dateConvertTimeInput.value)
  dateConvertShow.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
}

function date2Timestamp() {
  const timeStamp = new Date(dateConvertDateInput.value + " " + dateConvertTimeInput.value)
  if (isMs.value) {
    dateConvertOutput.value = Number(date.formatDate(timeStamp, 'x'))
  } else {
    dateConvertOutput.value = Number(date.formatDate(timeStamp, 'X'))
  }
}

function timestamp2Date() {
  let timeStamp
  if (isMs.value) {
    timeStamp = new Date(timestampConvertInput.value * 1)
  } else {
    timeStamp = new Date(timestampConvertInput.value * 1000)
  }
  timestampConvertOutput.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
  if (!timestampConvertOutput.value) {
    codeGenerateNotifyFail("输入有误")
  }
}

function updateCurDate() {
  const timeStamp = Date.now()
  //date to timestamp
  dateConvertDateInput.value = date.formatDate(timeStamp, 'YYYY/MM/DD')
  dateConvertTimeInput.value = date.formatDate(timeStamp, 'HH:mm:ss')
  dateConvertShow.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
  if (isMs.value) {
    dateConvertOutput.value = Number(date.formatDate(timeStamp, 'x'))
  } else {
    dateConvertOutput.value = Number(date.formatDate(timeStamp, 'X'))
  }
  //timestamp to date
  if (isMs.value) {
    timestampConvertInput.value = Number(date.formatDate(timeStamp, 'x'))
  } else {
    timestampConvertInput.value = Number(date.formatDate(timeStamp, 'X'))
  }
  timestampConvertOutput.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
}


//生成定时器
function timerUp() {
  if (0 === timer) {
    timer = setInterval(() => {
      updateCurDate();
    }, 1000);
  }
}

//删除定时器
function timerDown() {
  clearInterval(timer);
  timer = 0
}


onMounted(() => {
  updateCurDate();
  timerUp()
})

onUnmounted(() => {
  timerDown()
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

.code-generator-tag-title
  font-family: Roboto Slab, sans-serif
  letter-spacing: -.05rem
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400

</style>
