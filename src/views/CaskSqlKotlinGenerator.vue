<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-object-group" size="1em"/>
        SQL convert to Kotlin Data Class
      </div>
    </div>


    <div class="row" style="margin: 2% 2% 1% 2%">

      <div class="col-12 row justify-evenly">

        <div class="col-8 col-lg-6  code-generator-tag-content">
          <q-input
              v-model="inputDDL" type="textarea"
              autogrow borderless
              placeholder="请输入需要转换的DDL语句"
              :input-style="{fontSize: '1.1rem', padding: '1.2rem',
              letterSpacing: '.05rem',  border: '2.5px solid #888',opacity:'0.9',
              backgroundImage: 'linear-gradient(to bottom, #eee, #eee)',
              minHeight: '300px', borderRadius: '12px', color: '#111'}"
          />
        </div>

        <div class="col-3 col-lg-4 row justify-around">

          <div class="col-12">
            <div class="row">
              <div class="col-12 q-mt-md code-generator-setting">
                <div class="code-generator-setting-title">
                  包名称：
                </div>
                <q-input v-model="packageName" class="q-ml-md" borderless
                         color="grey" hide-bottom-space
                         :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75'}"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  时间类型：
                </div>
                <q-radio v-model="isLocalDateTime" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="LocalDateTime"/>
                <q-radio v-model="isLocalDateTime" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="Date"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  是否需要注释：
                </div>
                <q-radio v-model="isNeedComment" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="YES"/>
                <q-radio v-model="isNeedComment" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="NO"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  是否是需要转驼峰：
                </div>
                <q-radio v-model="isCamelCase" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="YES"/>
                <q-radio v-model="isCamelCase" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="NO"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  浮点类型：
                </div>
                <q-radio v-model="isBigDecimal" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="BigDecimal"/>
                <q-radio v-model="isBigDecimal" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="Double"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  NULL类型处理：
                </div>
                <q-radio v-model="isAllNullable" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="全部转为Type?类型"/>
                <q-radio v-model="isAllNullable" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="根据SQL自动转换"/>
              </div>

              <div class="col-12 col-lg-6 q-my-md code-generator-setting">
                <div class="code-generator-setting-title">
                  是否所有属性赋默认值：
                </div>
                <q-radio v-model="isSetDefaultValue" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="1" label="YES"/>
                <q-radio v-model="isSetDefaultValue" checked-icon="task_alt" color="grey-10"
                         unchecked-icon="panorama_fish_eye" :val="0" label="NO"/>
              </div>
            </div>

          </div>

        </div>

        <div class="col-12 row justify-center q-my-xl">
          <q-btn class="dialog-btn-margin-long" push
                 @click="generateSql2KotlinCode">生成
          </q-btn>
        </div>

        <div class="col-12 col-lg-6 row justify-end" v-show="generated">
          <q-btn class="code-generator-code-copy-btn"
                 push dense @click="copyCode">
            复制
          </q-btn>
          <div v-html="generateResultMarkdownToHtml"
               class="col-12 blogMarkDownLight"/>
        </div>

      </div>
    </div>
  </div>


</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {convertOptions, ddlConvertKotlinDataClass, defaultSql} from "@/utils/ddl-to-kotlin";
import {useQuasar} from "quasar";
import {importStyleLight, marked} from "@/utils/marked-factory";

const notify = useQuasar().notify

function codeGenerateNotifyFail(notifyMessage) {
  notify({
    message: notifyMessage,
    position: 'top',
    type: 'negative',
    timeout: 1000
  })
}

let inputDDL = ref("")
let packageName = ref("com.aster.extend")
let isLocalDateTime = ref(0)
let isNeedComment = ref(1)
let isBigDecimal = ref(1)
let isCamelCase = ref(1)
let isAllNullable = ref(0)
let isSetDefaultValue = ref(1)

let generated = ref(false)
let kotlinDataClassCode = ref("")
let kotlinDataClassCodeHtml = ref("")


const generateResultMarkdownToHtml = computed(() => {
  return marked.parse(kotlinDataClassCodeHtml.value)
})

function copyCode() {
  copyTextToClipboard(kotlinDataClassCode.value)
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    codeGenerateNotifyFail("拷贝失败")
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
    codeGenerateNotifyFail("拷贝失败")
  });
}

function generateSql2KotlinCode() {
  if (!inputDDL.value) {
    codeGenerateNotifyFail("DDL语句不能为空")
    return
  }
  if (!packageName.value) {
    codeGenerateNotifyFail("包名不能为空")
    return
  }

  convertOptions.packageName = packageName.value
  convertOptions.isLocalDateTime = isLocalDateTime.value
  convertOptions.isNeedComment = isNeedComment.value
  convertOptions.isBigDecimal = isBigDecimal.value
  convertOptions.isCamelCase = isCamelCase.value
  convertOptions.isAllNullable = isAllNullable.value
  convertOptions.isSetDefaultValue = isSetDefaultValue.value


  kotlinDataClassCode.value = ddlConvertKotlinDataClass(inputDDL.value)
  if (kotlinDataClassCode.value) {
    kotlinDataClassCodeHtml.value = `\`\`\`kotlin\n${kotlinDataClassCode.value}\n\`\`\``
    notify({
      message: "生成完成",
      position: 'top',
      type: 'positive',
      timeout: 1000
    })
    generated.value = true
  } else {
    codeGenerateNotifyFail("生成失败，请检查DDL正确性")
    generated.value = false
  }

}

onMounted(() => {
  //初始值设置
  inputDDL.value = defaultSql
  //随机导入code样式
  importStyleLight()
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/blog.markdown.light.css"
@import "@/styles/cask-dialog-style.scss"

.code-generator-tag-title
  font-family: Roboto Slab, sans-serif
  letter-spacing: -.05rem
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400

.code-generator-tag-content
  font-family: Roboto Slab, sans-serif

.code-generator-setting
  font-family: Roboto Slab, sans-serif

  .code-generator-setting-title
    margin-bottom: .25rem
    color: $cask_dune
    font-size: 1.25rem
    font-weight: 600

.code-generator-code-copy-btn
  margin: 0 1rem -5rem 0
  padding: .5rem
  border-radius: .2rem
  background-color: #333
  color: $cask_base_grey


</style>