<template>
  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-location-pin-lock" size="1em"/>
        MD5加密
      </div>
    </div>


    <div class="row justify-center" style="margin: 2% 2% 1% 2%;">
      <div class="col-8 col-lg-7">

        <div>
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              Input
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="row items-center simple-bold-little-title">
              <div class="">
                待加密字符串：
              </div>
            </div>
            <q-input v-model="waitStr" class="q-ml-md col-9"
                     color="grey" hide-bottom-space borderless
                     :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
          </div>

          <div class="row justify-center">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="加密" @click="waitStrEncrypt"/>
            </div>
          </div>

        </div>

        <div v-show="showRet">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              Output-MD5加密
            </div>
          </div>


          <div class="row roboto-slab q-my-sm" v-for="(result, index) in md5ResultList" :key="index">
            <div class="row items-center simple-bold-little-title">
              <div class="">
                {{ result.key }}：
              </div>
            </div>
            <q-input v-model="result.value" class="q-ml-md col-grow"
                     color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                     :input-style="{fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
              <template v-slot:default>
                <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                       @click="copyTextToClipboard(result.value)"/>
              </template>
            </q-input>
          </div>

        </div>

        <div v-show="showRet">
          <div class="row items-center justify-center q-mt-xl q-mb-md">
            <div class="simple-bold-title-secondary">
              Output-SHA-1加密
            </div>
          </div>

          <div class="row roboto-slab q-my-sm" v-for="(result, index) in sha1ResultList" :key="index">
            <div class="row items-center simple-bold-little-title">
              <div class="">
                {{ result.key }}：
              </div>
            </div>
            <q-input v-model="result.value" class="q-ml-md col-grow"
                     color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                     :input-style="{fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
              <template v-slot:default>
                <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                       @click="copyTextToClipboard(result.value)"/>
              </template>
            </q-input>
          </div>
        </div>

        <div v-show="showRet">
          <div class="row items-center justify-center q-mt-xl q-mb-md">
            <div class="simple-bold-title-secondary">
              Output-Keccak-256加密
            </div>
          </div>

          <div class="row roboto-slab q-my-sm" v-for="(result, index) in keccak256ResultList" :key="index">
            <div class="row items-center simple-bold-little-title">
              <div class="">
                {{ result.key }}：
              </div>
            </div>
            <q-input v-model="result.value" class="q-ml-md col-grow"
                     color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                     :input-style="{fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
              <template v-slot:default>
                <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                       @click="copyTextToClipboard(result.value)"/>
              </template>
            </q-input>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";
import CryptoJS from "crypto-js";

const notify = useQuasar().notify

let showRet = ref(false)

let md5ResultList = ref([
  {
    key: "16位小写",
    value: "",
  },
  {
    key: "16位大写",
    value: "",
  },
  {
    key: "32位小写",
    value: "",
  },
  {
    key: "32位大写",
    value: "",
  },
])

let sha1ResultList = ref([
  {
    key: "小写",
    value: "",
  },
  {
    key: "大写",
    value: "",
  },
])

let keccak256ResultList = ref([
  {
    key: "小写",
    value: "",
  },
  {
    key: "大写",
    value: "",
  },
])

let waitStr = ref("")

function waitStrEncrypt() {
  if (!waitStr.value) {
    notify({
      message: '加密字符串不能为空',
      position: 'top',
      type: 'warning',
      timeout: 1000
    })
    return
  }
  let md5Ret = CryptoJS.MD5(waitStr.value).toString()
  md5ResultList.value[0].value = md5Ret.substring(8, 24).toLowerCase()
  md5ResultList.value[1].value = md5Ret.substring(8, 24).toUpperCase()
  md5ResultList.value[2].value = md5Ret.toLowerCase()
  md5ResultList.value[3].value = md5Ret.toUpperCase()

  let sha1Ret = CryptoJS.SHA1(waitStr.value).toString()
  sha1ResultList.value[0].value = sha1Ret.toLowerCase()
  sha1ResultList.value[1].value = sha1Ret.toUpperCase()

  let keccak256Ret = CryptoJS.SHA3(waitStr.value, {outputLength: 256}).toString()
  keccak256ResultList.value[0].value = keccak256Ret.toLowerCase()
  keccak256ResultList.value[1].value = keccak256Ret.toUpperCase()

  showRet.value = true
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    notify({
      message: "拷贝失败",
      position: 'top',
      type: 'negative',
      timeout: 1000
    })
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    notify({
      message: "复制成功",
      position: 'top',
      type: 'positive',
      timeout: 1000
    })
  }, function () {
    notify({
      message: "拷贝失败",
      position: 'top',
      type: 'negative',
      timeout: 1000
    })
  });
}


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
