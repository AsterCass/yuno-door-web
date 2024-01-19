<template>
  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div>
        <q-icon class="q-mx-sm" name="fa-solid fa-camera-rotate" size="1em"/>
        Base64编码图片互转
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

          <div class="q-mx-lg">
            <q-input v-model="inputBase64Code" class="q-ml-md col-9 cask-textarea-input-base"
                     color="grey" hide-bottom-space borderless type="textarea"
                     :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '1rem', resize: 'none',height: '20rem'} "/>
          </div>

          <div class="row justify-center">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="转换" @click="base64ConvertImg()"/>
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
                    accept=".jpg,.jpeg,.png" max-file-size="5120000" @rejected="fileNotAllow()"
                    label="请上传大小在 5M 以内的 jpg/jpeg/png 图片（点击上传或者将图片拖进输入框）"
                    style="background-color: #ddd; border-radius: .5rem; font-size: 1.1rem; margin: .5rem;
                  padding-left: 1rem; opacity: 0.75;"/>
          </div>


          <div v-show="inputImgConvertFinish" class="row justify-center q-my-md">
            <q-img height="20rem" fit="contain"
                   :src="currentInputImgBase64"/>
          </div>

          <div class="q-ma-lg">
            <q-input v-model="currentInputImgBase64"
                     class="cask-textarea-input-base"
                     color="grey" hide-bottom-space borderless type="textarea" readonly style="opacity: 0.75"
                     :input-style="{fontSize: '1.1rem', color:'black', borderRadius: '.5rem', backgroundColor:'#ddd',
                   margin: '0.5rem', padding: '1rem', resize: 'none',height: '20rem'} "/>
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

function base64ConvertImg() {

}

function fileNotAllow() {
  notify({
    message: "图片不满足条件，请重新上传",
    position: 'top-right',
    type: 'warning',
    timeout: 1000
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

.cask-textarea-input-base

  .textarea
    resize: none

  ::-webkit-scrollbar
    overflow: visible
    z-index: 12
    background: transparent
    height: 12px
    width: 14px

  ::-webkit-scrollbar-thumb
    width: 10px
    background-color: #555
    border-radius: 10px
    z-index: 12
    border: 4px solid rgba(0, 0, 0, 0)
    background-clip: padding-box
    transition: background-color .28s ease-in-out
    margin: 4px
    min-height: 32px
    min-width: 32px

</style>