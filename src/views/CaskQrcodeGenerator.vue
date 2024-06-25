<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-qrcode" size="1em"/>
        QRCode Generator
      </div>
    </div>

    <div class="row justify-center" style="margin: 2% 2% 1% 2%; min-height: 30rem">
      <div class="row col-11 col-lg-8">
        <div class="col-8">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              二维码配置
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <!--垂直居中-->
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  值：
                </div>
              </div>
              <q-input v-model="qrValue" class="q-ml-md col-11"
                       color="grey" hide-bottom-space borderless
                       :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'}"/>
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="row">
              <!--垂直居中-->
              <div class="row items-center simple-bold-little-title">
                <div class="">
                  阵列样式：
                </div>
              </div>
              <q-radio v-model="qrType" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="square" label="方形阵列"/>
              <q-radio v-model="qrType" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="extra-rounded" label="圆矩阵列"/>
              <q-radio v-model="qrType" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="dots" label="圆点阵列"/>

            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <!--垂直居中-->
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  颜色：
                </div>
              </div>
              <q-input v-model="qrColor" class="q-ml-md col-6"
                       color="grey" hide-bottom-space borderless
                       :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'}"/>
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <!--垂直居中-->
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  背景颜色：
                </div>
              </div>
              <q-input v-model="qrBgColor" class="q-ml-md col-6"
                       color="grey" hide-bottom-space borderless
                       :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'}"/>
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <!--垂直居中-->
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  自定义中心图像：
                </div>
              </div>

              <q-input v-model="uploadImg" class="q-ml-md col-6"
                       color="grey" hide-bottom-space borderless readonly
                       :input-style="{fontSize: '1.1rem', color:'#aaa', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem', border:'dashed 2px #aaa', cursor: 'no-drop'}"/>
            </div>
          </div>

        </div>
        <div class="col-4">
          <QRCodeVue3
              :width="280"
              :height="280"
              :value="qrValue"
              :key="qrValue + qrType + qrColor + qrBgColor"
              :dotsOptions="{
                type: qrType,
                color: qrColor,
              }"
              :backgroundOptions="{
                color: qrBgColor
              }"
              :cornersSquareOptions="{
                color: qrColor,
                type: qrType,
              }"
              :cornersDotOptions="{
                color: qrColor,
              }"
              myclass="qrcode-generator-download-div"
              download
              downloadButton="qrcode-generator-download-btn"
              :downloadOptions="{
                name: qrValue + '.astercasc.qrcode',
              }"

          />
        </div>
      </div>

      <q-separator style="margin-top: 5rem" class="col-10" spaced="1.5rem" size="0.05rem" inset/>

      <div class="q-my-md row col-11 col-lg-8">
        <div class="col-8">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              二维码图片解析
            </div>
          </div>


          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <!--垂直居中-->
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  二维码图片：
                </div>
              </div>
              <!--              <q-input v-model="parseImg" class="q-ml-md col-11"-->
              <!--                       color="grey" hide-bottom-space borderless-->
              <!--                                     :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',-->
              <!--                                     borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',-->
              <!--                                     padding: '0 1rem'}"/>-->

              <q-file class="qrcode-input-file q-ml-md col-grow" borderless v-model="parseImg" color="grey"
                      hide-bottom-space accept=".jpg,.jpeg,.png" max-file-size="2048000"
                      @rejected="warnMsg('图片不满足条件，请重新上传')"
                      label="请上传大小在 2M 以内的 jpg/jpeg/png 图片（点击上传或者将图片拖进输入框）"
                      :input-style="{fontSize: '.9rem'}"
                      style="font-size: .9rem;color: black;opacity: 0.75;border-radius: .5rem;
                      background-color: #ddd;margin: .5rem;padding: 0 1rem"/>
            </div>
          </div>

          <div class="row roboto-slab q-my-sm">
            <div class="col-11 row">
              <div class="col-auto row items-center simple-bold-little-title">
                <div class="">
                  二维码解析值：
                </div>
              </div>
              <q-input v-model="parseImgText" class="q-ml-md col-grow"
                       color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                       :input-style="{fontSize: '.95rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
                <template v-slot:default>
                  <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                         @click="copyTextToClipboard(parseImgText)"/>
                </template>
              </q-input>
            </div>
          </div>

        </div>
        <div class="col-4">
          <q-img v-show="parseImgText" height="20rem" fit="contain"
                 :src="parseImgBase64"/>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";
import {ref, watch} from "vue";
import {useQuasar} from "quasar";
import jsQR from "jsqr";

const notify = useQuasar().notify
//qrcode config
let qrType = ref("square")
let qrValue = ref("https://astercasc.com")
let qrColor = ref("#004400")
let qrBgColor = ref("#FFFFFF")
let uploadImg = ref("等待开发中...")
//qr parse
let parseImg = ref(null)
let parseImgBase64 = ref("");
let parseImgText = ref("")

//init fileRead
let reader = new FileReader();
reader.onload = function () {
  parseImgBase64.value = this.result
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      parseImgText.value = code.data
    } else {
      parseImgText.value = "二维码解析失败，请确认图片含有二维码"
    }
  };
  img.src = parseImgBase64.value
};
watch(parseImg, () => {
  reader.readAsDataURL(parseImg.value);
})

function warnMsg(msg) {
  notify({
    message: msg,
    position: 'top',
    type: 'warning',
    timeout: 1500
  })
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


</style>

<style lang="scss">

.qrcode-generator-download-div {
  margin: 5rem 0 2rem 0;
}

.qrcode-input-file {
  .q-field__label {
    color: #111;
    font-size: .95rem;
  }
}


.qrcode-generator-download-btn {
  position: absolute;
  left: 50%;
  margin: .5rem 0 0 -5rem;
  border-color: transparent;
  cursor: pointer;
  font-family: Roboto Slab, sans-serif;
  text-align: center;
  color: white;
  min-height: 2.5rem;
  width: 10rem;
  background-image: linear-gradient(195deg, #447550, #2B5853);
  border-radius: 0.8rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}


</style>