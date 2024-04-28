<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-palette" size="1em"/>
        Rgb Hex Converter
      </div>
    </div>


    <div class="row justify-center" style="margin: 2% 2% 1% 2%;">
      <div class="col-11 col-lg-11">

        <div>
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              RGB转16进制
            </div>
          </div>

          <div class="row items-center justify-center">

            <div v-show="rgbInputStyle === 'number'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Red :
                </div>
              </div>
              <q-input v-model="inputRed" class="q-ml-md" mask="###"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div v-show="rgbInputStyle === 'number'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Green :
                </div>
              </div>
              <q-input v-model="inputGreen" class="q-ml-md" mask="###"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div v-show="rgbInputStyle === 'number'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Blue :
                </div>
              </div>
              <q-input v-model="inputBlue" class="q-ml-md" mask="###"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div v-show="rgbInputStyle === 'number'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Alpha :
                </div>
              </div>
              <q-input v-model="inputAlpha" class="q-ml-md" mask="#.##"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '5rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>

            <div v-show="rgbInputStyle === 'rgb'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  RGB Code :
                </div>
              </div>
              <q-input v-model="inputRgbCode" class="q-ml-md"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '15rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>

            <div v-show="rgbInputStyle === 'rgba'" class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  RGBA Code :
                </div>
              </div>
              <q-input v-model="inputRgbaCode" class="q-ml-md"
                       color="grey" hide-bottom-space borderless
                       :input-style="{width: '15rem', fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>


            <div class="q-py-sm q-mx-md">
              <q-btn class="cask-simple-btn-margin-pri" label="转换"
                     @click="convertToHex"/>
            </div>

            <q-input v-model="hexOutput" color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                     :input-style="{width: '8rem', fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
              <template v-slot:default>
                <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                       @click="copyTextToClipboard(hexOutput)"/>
              </template>
            </q-input>

          </div>
        </div>

        <div class="row justify-center q-mt-md">
          <div class="rgb-hex-color-preview" :style="`background-color: ${hexOutput}`"/>
        </div>

        <div>
          <div class="row items-center justify-center q-mt-xl q-mb-md">
            <div class="simple-bold-title-secondary">
              16进制转RGB
            </div>
          </div>

          <div class="row items-center justify-center">

            <q-input v-model="hexInput" color="grey" hide-bottom-space borderless style="opacity: 0.75"
                     :input-style="{width: '8rem', fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
            </q-input>

            <div class="q-py-sm q-mx-md">
              <q-btn class="cask-simple-btn-margin-pri" label="转换"
                     @click="hexToRgba"/>
            </div>

            <div class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Red :
                </div>
              </div>
              <q-input v-model="outputRed" class="q-ml-md"
                       color="grey" hide-bottom-space borderless readonly
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75 !important',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Green :
                </div>
              </div>
              <q-input v-model="outputGreen" class="q-ml-md"
                       color="grey" hide-bottom-space borderless readonly
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75 !important',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Blue :
                </div>
              </div>
              <q-input v-model="outputBlue" class="q-ml-md"
                       color="grey" hide-bottom-space borderless readonly
                       :input-style="{width: '4rem', fontSize: '1.1rem', color:'black', opacity:'0.75 !important',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>
            <div class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div style="margin-right: -1rem">
                  Alpha :
                </div>
              </div>
              <q-input v-model="outputAlpha" class="q-ml-md"
                       color="grey" hide-bottom-space borderless readonly
                       :input-style="{width: '5rem', fontSize: '1.1rem', color:'black', opacity:'0.75 !important',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '0 1rem'} "/>
            </div>

            <div class="row roboto-slab q-my-sm q-px-xs">
              <div class="row items-center simple-bold-little-title">
                <div>
                  Code :
                </div>
              </div>
              <q-input v-model="outputRet" color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                       :input-style="{width: '15rem', fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
                <template v-slot:default>
                  <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                         @click="copyTextToClipboard(outputRet)"/>
                </template>
              </q-input>
            </div>
          </div>

        </div>

        <div class="row justify-center q-mt-md q-mb-xl">
          <div class="rgb-hex-color-preview" :style="`background-color: ${outputRet}`"/>
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
                  RGB输入方式：
                </div>
              </div>
              <q-radio v-model="rgbInputStyle" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="number" label="Number"/>
              <q-radio v-model="rgbInputStyle" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="rgb" label="RGB"/>
              <q-radio v-model="rgbInputStyle" checked-icon="task_alt" color="grey-10"
                       unchecked-icon="panorama_fish_eye" val="rgba" label="RGBA"/>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";
import {notifyTopNegative, notifyTopPositive} from "@/utils/global-notify";
//notify
const notify = useQuasar().notify

let inputRgbCode = ref("rgb(68, 117, 80)")
let inputRgbaCode = ref("rgba(68, 117, 80, 1)")

let inputRed = ref('68')
let inputGreen = ref('117')
let inputBlue = ref('80')
let inputAlpha = ref("1.00")
let hexOutput = ref("#447550")

let hexInput = ref("#447550")
let outputRed = ref(68)
let outputGreen = ref(117)
let outputBlue = ref(80)
let outputAlpha = ref("1.00")
let outputRet = ref("rgb(68, 117, 80)")

let rgbInputStyle = ref("number")

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    notifyTopNegative("拷贝失败", 1000, notify)
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    notifyTopPositive("拷贝成功", 1000, notify)
  }, function () {
    notifyTopNegative("拷贝失败", 1000, notify)
  });
}

function convertToHex() {
  let redNum = 0, greenNum = 0, blueNum = 0, alphaNum = 1;
  if ('number' === rgbInputStyle.value) {
    redNum = parseInt(inputRed.value);
    greenNum = parseInt(inputGreen.value);
    blueNum = parseInt(inputBlue.value);
    alphaNum = parseFloat(inputAlpha.value);
  } else if ('rgb' === rgbInputStyle.value) {
    let rgbCheck = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/
    let input = inputRgbCode.value.toLowerCase().replaceAll(" ", "")
    if (!input || !input.match(rgbCheck)) {
      notifyTopNegative("RGB输入格式错误，请检查", 1000, notify)
      return
    }
    let inputList = input.replace(/[a-z()]/g, '').split(',')
    redNum = parseInt(inputList[0])
    greenNum = parseInt(inputList[1])
    blueNum = parseInt(inputList[2])
  } else if ('rgba' === rgbInputStyle.value) {
    let rgbaCheck = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/
    let input = inputRgbaCode.value.toLowerCase().replaceAll(" ", "")
    if (!input || !input.match(rgbaCheck)) {
      notifyTopNegative("RGBA输入格式错误，请检查", 1000, notify)
      return
    }
    let inputList = input.replace(/[a-z()]/g, '').split(',')
    redNum = parseInt(inputList[0])
    greenNum = parseInt(inputList[1])
    blueNum = parseInt(inputList[2])
    alphaNum = parseFloat(inputList[3])
  } else {
    notifyTopNegative("选项错误，请检查", 1000, notify)
    return
  }
  rgbaConvertToHex(redNum, greenNum, blueNum, alphaNum)
}

function rgbaConvertToHex(redNum, greenNum, blueNum, alphaNum) {
  console.log(redNum, greenNum, blueNum, alphaNum)
  //check
  if (redNum > 255 || greenNum > 255 || blueNum > 255 || alphaNum > 1) {
    notifyTopNegative("RGB输入格式错误，请检查", 1000, notify)
    return
  }
  //convert
  const redHex = redNum.toString(16).padStart(2, '0');
  const greenHex = greenNum.toString(16).padStart(2, '0');
  const blueHex = blueNum.toString(16).padStart(2, '0');
  const alphaHex = Math.round(alphaNum * 255).toString(16).padStart(2, '0');
  if ('ff' === alphaHex) {
    hexOutput.value = `#${redHex}${greenHex}${blueHex}`
  } else {
    hexOutput.value = `#${redHex}${greenHex}${blueHex}${alphaHex}`
  }
}

function hexToRgba() {
  let hexCode = hexInput.value
  if (hexCode.startsWith('#')) {
    hexCode = hexCode.slice(1);
  }
  let hexCheck = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
  if (!hexCode || !hexCode.match(hexCheck)) {
    notifyTopNegative("16进制输入格式错误，请检查", 1000, notify)
    return
  }
  // Parse
  let redNum, greenNum, blueNum, alphaNum = 1; // Default alpha value to 1 (fully opaque)
  if (hexCode.length === 3) {
    redNum = parseInt(hexCode[0] + hexCode[0], 16);
    greenNum = parseInt(hexCode[1] + hexCode[1], 16);
    blueNum = parseInt(hexCode[2] + hexCode[2], 16);
  } else if (hexCode.length === 6) {
    redNum = parseInt(hexCode.slice(0, 2), 16);
    greenNum = parseInt(hexCode.slice(2, 4), 16);
    blueNum = parseInt(hexCode.slice(4, 6), 16);
  } else if (hexCode.length === 8) {
    redNum = parseInt(hexCode.slice(0, 2), 16);
    greenNum = parseInt(hexCode.slice(2, 4), 16);
    blueNum = parseInt(hexCode.slice(4, 6), 16);
    alphaNum = (parseInt(hexCode.slice(6, 8), 16) / 255).toFixed(2);
  } else {
    notifyTopNegative("16进制输入格式错误，请检查", 1000, notify)
  }
  //ret
  outputRed.value = parseInt(`${redNum}`)
  outputGreen.value = parseInt(`${greenNum}`)
  outputBlue.value = parseInt(`${blueNum}`)
  outputAlpha.value = `${alphaNum}`
  if (1 === alphaNum) {
    outputRet.value = `rgb(${redNum}, ${greenNum}, ${blueNum})`;
  } else {
    outputRet.value = `rgba(${redNum}, ${greenNum}, ${blueNum}, ${alphaNum})`;
  }

}



</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

.rgb-hex-color-preview
  width: 8rem
  height: 2.5rem
  border-radius: 1rem

</style>
