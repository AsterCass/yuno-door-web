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
    </div>

  </div>
</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";
import {ref} from "vue";

//qrcode config
let qrType = ref("square")
let qrValue = ref("https://astercasc.com")
let qrColor = ref("#004400")
let qrBgColor = ref("#FFFFFF")
let uploadImg = ref("开发中...")

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

<style lang="sass">

.qrcode-generator-download-div
  margin: 5rem 0 2rem 0

.qrcode-generator-download-btn
  position: absolute
  left: 50%
  margin: .5rem 0 0 -5rem
  border-color: transparent
  cursor: pointer
  font-family: Roboto Slab, sans-serif
  text-align: center
  color: white
  min-height: 2.5rem
  width: 10rem
  background-image: linear-gradient(195deg, #447550, #2B5853)
  border-radius: 0.8rem
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)

</style>