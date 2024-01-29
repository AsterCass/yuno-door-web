<template>
  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-camera-rotate" size="1em"/>
        Base64图片转换
      </div>
    </div>

    <div class="row justify-center" style="margin: 2% 2% 1% 2%;">
      <div class="col-12 row justify-center">

        <div class="col">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              Base64编码转图片
            </div>
          </div>

          <div class="q-mx-lg" id="inputBase64Div">
            <q-input v-model="inputBase64Code" class="q-ml-md col-9 cask-textarea-input-base"
                     color="grey" hide-bottom-space borderless type="textarea"
                     :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '1rem', resize: 'none',height: '20rem',
                       overflowWrap: 'anywhere'} "/>
          </div>

          <div class="row justify-center">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="转换" @click="base64ConvertImg()"/>
            </div>
          </div>

          <div v-show="inputBase64Finish" class="row justify-center q-my-md q-mx-xl">
            <q-img height="20rem" fit="contain"
                   :src="inputBase64CodeRes"/>
          </div>

          <div class="row justify-center" v-show="inputBase64Finish">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="下载" @click="downloadImg()"/>
            </div>
          </div>

        </div>

        <q-separator class="col-1" spaced=".5rem" size="0.125rem" inset vertical/>

        <div class="col">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              图片转Base64编码
            </div>
          </div>

          <div class="q-ma-lg">
            <q-file class="q-ma-md" borderless v-model="currentInputImg" color="grey-8"
                    accept=".jpg,.jpeg,.png,.webp,.gif" max-file-size="2048000"
                    @rejected="warnMsg('图片不满足条件，请重新上传')"
                    label="请上传大小在 2M 以内的 jpg/jpeg/png/gif/webp 图片（点击上传或者将图片拖进输入框）"
                    style="background-color: #ddd; border-radius: .5rem; font-size: 1.1rem; margin: .5rem;
                  padding-left: 1rem; opacity: 0.75;"/>
          </div>


          <div v-show="inputImgConvertFinish" class="row justify-center q-my-md q-mx-xl">
            <q-img height="20rem" fit="contain"
                   :src="currentInputImgBase64"/>
          </div>

          <div class="q-ma-lg">
            <q-input v-model="currentInputImgBase64"
                     class="cask-textarea-input-base"
                     color="grey" hide-bottom-space borderless type="textarea" readonly style="opacity: 0.75;"
                     :input-style="{fontSize: '1.1rem', color:'black', borderRadius: '.5rem', backgroundColor:'#ddd',
                   margin: '0.5rem', padding: '1rem', resize: 'none',height: '20rem',
                   overflowWrap: 'anywhere', overflowX: 'hidden'} "/>
          </div>

          <div class="row justify-center" v-show="inputImgConvertFinish">
            <q-btn class="cask-simple-btn-margin-pri" label="复制" @click="copyBase64(currentInputImgBase64)"/>
          </div>


        </div>

      </div>
    </div>


  </div>
</template>

<script setup>

import {ref, watch} from "vue";
import {useQuasar} from "quasar";

const notify = useQuasar().notify
let currentInputImg = ref(null);
let currentInputImgBase64 = ref("");
let inputImgConvertFinish = ref(false)

let inputBase64Code = ref("")
let inputBase64CodeRes = ref("")
let inputBase64Type = ref("")
let inputBase64Finish = ref(false)

//check base64
async function isBase64UrlImage(base64String) {
  try {
    //check prefix
    const replacePat = /^data:image\/((jpg)|(jpeg)|(png)|(gif)|(webp));base64,/
    base64String = base64String.replace(replacePat, '')
    //check base
    window.atob(base64String);
    //check img
    let knownTypes = {
      '/': 'data:image/jpg;base64,',
      'i': 'data:image/png;base64,',
      'R': 'data:image/gif;base64,',
      'U': 'data:image/webp;base64,',
    }
    let knownTypesSimple = {
      '/': 'jpg',
      'i': 'png',
      'R': 'gif',
      'U': 'webp',
    }
    if (!knownTypes[base64String[0]]) {
      warnMsg("无法识别的图片类型")
    } else {
      let image = new Image()
      image.src = knownTypes[base64String[0]] + base64String

      return await (new Promise((resolve) => {
        image.onload = function () {
          if (image.height === 0 || image.width === 0) {
            warnMsg("Base64编码错误")
            resolve(false)
            return;
          }
          resolve(true)
          inputBase64Type.value = knownTypesSimple[base64String[0]]
          inputBase64CodeRes.value = image.src
          inputBase64Finish.value = true
        }
        image.onerror = () => {
          resolve(false)
          warnMsg("Base64编码错误")
        }
      }))
    }

  } catch (e) {
    warnMsg("不支持的图片类型或者Base64编码错误")
  }
}


//init fileRead
let reader = new FileReader();
reader.onload = function () {
  currentInputImgBase64.value = this.result
  inputImgConvertFinish.value = true
};

//监控文件上传
watch(currentInputImg, () => {
  reader.readAsDataURL(currentInputImg.value);
})

//监控输入Base64修改
watch(inputBase64Code, () => {
  inputBase64Finish.value = false
  inputBase64CodeRes.value = ""
})

function base64ConvertImg() {
  //fix site
  const inputBase64Div = document.getElementById('inputBase64Div');
  let inputBaseTextArea = inputBase64Div.getElementsByClassName('q-placeholder')[0]
  inputBaseTextArea.scrollTop = inputBaseTextArea.scrollHeight;
  inputBaseTextArea.scrollLeft = 0
  //convert
  isBase64UrlImage(inputBase64Code.value)
}

function downloadImg() {
  let link = document.createElement('a');
  link.download = 'output.' + inputBase64Type.value;
  link.href = inputBase64CodeRes.value
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyBase64(text) {
  if (!navigator.clipboard) {
    warnMsg("复制失败")
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
    warnMsg("复制失败")
  });
}

function warnMsg(msg) {
  notify({
    message: msg,
    position: 'top',
    type: 'warning',
    timeout: 1500
  })
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