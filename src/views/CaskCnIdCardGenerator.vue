<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-id-card" size="1em"/>
        Id Card Generator
      </div>
    </div>


    <div class="row justify-center" style="margin: 2% 2% 1% 2%;">
      <div class="col-11 col-lg-11">

        <div>
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              基本配置
            </div>
          </div>

          <div class="row items-center justify-center">
            <div class="row roboto-slab q-my-sm">
              <div class="row">
                <div class="row items-center simple-bold-little-title">
                  <div class="">
                    所在城市：
                  </div>
                </div>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="110101" label="北京"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="310101" label="上海"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="440303" label="深圳"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="440103" label="广州"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="330102" label="杭州"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="320102" label="南京"/>
                <q-radio v-model="cityCode" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="" label="自定义"/>

                <q-input v-if="!cityCode" v-model="customCityCode" color="grey" hide-bottom-space borderless
                         style="opacity: 0.75" mask="######" placeholder="行政区划代码"
                         :input-style="{width: '9rem', height:'2.2rem', fontSize: '1rem', color:'black',
                         padding: '0 1rem', borderRadius: '.5rem', backgroundColor:'#ddd',
                         margin: '0.75rem 0.5rem 0.5rem 1rem'} ">
                </q-input>
                <q-input v-else v-model="customCityCode" color="grey" readonly
                         hide-bottom-space borderless style="opacity: 0.75" placeholder="行政区划代码"
                         :input-style="{width: '9rem', height:'2.2rem', fontSize: '1rem', color:'black',
                         padding: '0 1rem', borderRadius: '.5rem', backgroundColor:'#ddd', border:'dashed 2px #aaa',
                         margin: '0.75rem 0.5rem 0.5rem 1rem'} ">
                </q-input>
              </div>
            </div>
          </div>

          <div class="row items-center justify-center">
            <div class="row roboto-slab q-my-sm">
              <div class="row">
                <div class="row col items-center simple-bold-little-title">
                  <div class="">
                    出生年月：
                  </div>
                </div>

                <q-radio v-model="birth" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="random" label="随机"/>
                <q-radio v-model="birth" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="" label="自定义"/>


                <q-input v-if="!birth" v-model="customBirth" color="grey" hide-bottom-space borderless
                         style="opacity: 0.75"
                         :input-style="{width: '9rem', height:'2.2rem', fontSize: '1rem', color:'black',
                         padding: '0 1rem', borderRadius: '.5rem', backgroundColor:'#ddd',
                         margin: '0.75rem 0.5rem 0.5rem 1rem'} ">
                </q-input>
                <q-input v-else v-model="customBirth" color="grey" readonly
                         hide-bottom-space borderless style="opacity: 0.75"
                         :input-style="{width: '9rem', height:'2.2rem', fontSize: '1rem', color:'black',
                         padding: '0 1rem', borderRadius: '.5rem', backgroundColor:'#ddd', border:'dashed 2px #aaa',
                         margin: '0.75rem 0.5rem 0.5rem 1rem'} ">
                </q-input>


              </div>
            </div>
          </div>

          <div class="row items-center justify-center">
            <div class="row roboto-slab q-my-sm">
              <div class="row">
                <div class="row items-center simple-bold-little-title">
                  <div class="">
                    性别：
                  </div>
                </div>

                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="random" label="随机"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="0" label="女"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="1" label="男"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="2" label="武装直升飞机"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="3" label="国际恐怖组织"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="4" label="榴莲糖"/>
                <q-radio v-model="gender" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" val="5" label="不可被定义"/>

              </div>
            </div>
          </div>


          <div class="row justify-center">
            <div class="q-py-lg">
              <q-btn class="cask-simple-btn-margin-pri" label="生成" @click="generateIdCardList"/>
            </div>
          </div>


          <div v-show="showIdCardRet" class="row justify-center">
            <div class="row roboto-slab q-my-sm" v-for="(idCard, index) in idCardList" :key="index">
              <q-input v-model="idCard.id" class="q-ml-md col-grow"
                       color="grey" hide-bottom-space borderless readonly style="opacity: 0.75"
                       :input-style="{fontSize: '1.1rem', color:'black', padding: '0 1rem',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem'} ">
                <template v-slot:default>
                  <q-btn round style="color: grey; margin:0.5rem 0" dense flat icon="content_copy"
                         @click="copyTextToClipboard(idCard.id)"/>
                </template>
              </q-input>
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

let showIdCardRet = ref(false)
let cityCode = ref("330102")
let customCityCode = ref("")
let gender = ref("random")
let birth = ref("random")
let customBirth = ref("2000-01-01")
let idCardList = ref([])

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

function generateIdCardList() {
  showIdCardRet.value = false
  idCardList.value.length = 0

  let count = 12
  while (count > 0) {
    let thisId = generateIdCard()
    if (thisId === '') {
      idCardList.value.length = 0
      break
    }
    idCardList.value.push({id: thisId})
    --count
  }

  showIdCardRet.value = true
}

function generateIdCard() {

  //cityCode
  let inputCityCode = customCityCode.value
  if (cityCode.value !== '') {
    inputCityCode = cityCode.value
  }

  //birth
  let yearNum = 1950
  let monthNum = 1
  let dayNum = 1
  if (birth.value === 'random') {
    yearNum = yearNum + Math.floor(Math.random() * (70));
    monthNum = monthNum + Math.floor(Math.random() * (12));
    dayNum = dayNum + Math.floor(Math.random() * (28));
  } else {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(customBirth.value)) {
      notifyTopNegative("输入日期格式错误", 1000, notify)
      return ""
    }
    const inputDate = new Date(customBirth.value)
    if (isNaN(inputDate.getTime())) {
      notifyTopNegative("输入日期格式错误", 1000, notify)
      return ""
    }
    const [year, month, day] = customBirth.value.split("-").map(Number);
    yearNum = year
    monthNum = month
    dayNum = day
    if (inputDate.getFullYear() !== year || inputDate.getMonth() + 1 !== month || inputDate.getDate() !== day) {
      notifyTopNegative("输入日期格式错误", 1000, notify)
      return ""
    }
  }

  const year = yearNum
  const month = monthNum.toString().padStart(2, '0')
  const day = dayNum.toString().padStart(2, '0')

  let randomSerial;
  if (gender.value === '1') {
    randomSerial = Math.floor(Math.random() * 100).toString().padStart(2, '0')
        + (Math.floor(Math.random() * 5) * 2 + 1);
  } else if (gender.value === '0') {
    randomSerial = Math.floor(Math.random() * 100).toString().padStart(2, '0')
        + Math.floor(Math.random() * 5) * 2;
  } else if (gender.value === 'random') {
    randomSerial = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  } else {
    notifyTopNegative("请输入生理性别 (╯▔皿▔)╯", 1000, notify)
    return ""
  }

  const id17 = `${inputCityCode}${year}${month}${day}${randomSerial}`;

  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkDigits = "10X98765432";

  let sum = 0;
  for (let i = 0; i < id17.length; i++) {
    sum += parseInt(id17[i]) * weights[i];
  }

  const checkIndex = sum % 11;
  const checkDigit = checkDigits[checkIndex];
  return id17 + checkDigit

}

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

.rgb-hex-color-preview
  width: 15rem
  height: 1.5rem
  border-radius: 1rem

</style>
