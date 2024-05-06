<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div class="row items-center">
        <q-icon class="q-mx-sm q-mr-md" name="fa-solid fa-envelope-open-text" size="1em"/>
        Markdown Pdf/Html Converter
      </div>
    </div>

    <div class="row justify-center" style="margin: 2% 2% 1% 2%; min-height: 30rem">
      <div class="row col-12">


        <div class="col">
          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              Markdown 输入
            </div>
          </div>

          <div class="q-mx-lg">
            <q-input v-model="inputMarkdown" class="q-ml-md col-9 cask-textarea-input-base"
                     @update:model-value="changeInputMarkdown()"
                     color="grey" hide-bottom-space borderless type="textarea"
                     :input-style="{fontSize: '1.1rem', color:'black', opacity:'0.75',
                       borderRadius: '.5rem', backgroundColor:'#ddd', margin: '0.5rem',
                       padding: '1rem', resize: 'none',height: '30rem',
                       overflowWrap: 'anywhere'} "/>
          </div>
        </div>

        <q-separator class="col-1" spaced=".5rem" size="0.125rem" inset vertical/>

        <div class="col">

          <div class="row items-center justify-center q-mt-md q-mb-md">
            <div class="simple-bold-title-secondary">
              Html/PDF 样式
            </div>
          </div>


          <div class="q-mx-lg q-mb-lg" style="height: 30rem; overflow: auto">
            <div v-html="htmlRetInlined" class="outputHtml"></div>
          </div>


          <div class="row justify-center">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="导出PDF文件" @click="exportPdf()"/>
            </div>
          </div>


        </div>


      </div>

    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import pdfMake from 'pdfmake/build/pdfmake';
import {NotoScVfs} from '@/utils/pdf-font-base64';
import {marked} from "@/utils/marked-factory";
import htmlToPdfmake from "html-to-pdfmake";
import juice from 'juice';
import markdownCss from '!!raw-loader!@/styles/output-pdf.css';

// let base64URL = ref("")
let htmlRet = ref("")
let htmlRetInlined = ref("")
let inputMarkdown = ref("### 数组初始化\n" +
    "\n" +
    "```c\n" +
    "int a[4] = {20, 345, 700, 22};\n" +
    "int b[10]={12, 19, 22 , 993, 344};\n" +
    "int a2[3][4];\n" +
    "int b2[5][3]={ {80,75,92}, {61,65,71}, {59,63,70}, {85,87,90}, {76,77,85} };\n" +
    "int b3[5][3]={80, 75, 92, 61, 65, 71, 59, 63, 70, 85, 87, 90, 76, 77, 85};\n" +
    "//初始化多于申请的内存会被赋值为0/'\\0'/0.0\n" +
    "int nums[10] = {0};\n" +
    "char str[10] = {0};\n" +
    "float scores[10] = {0.0};\n" +
    "int a[3][3] = {{1}, {2}, {3}};\n" +
    "//自动获取内存空间大小\n" +
    "int c[] = {1, 2, 3, 4, 5};\n" +
    "char str1[] = \"something justl like this\";\n" +
    "int a[][3] = {1, 2, 3, 4, 5, 6, 7, 8, 9}; \n" +
    "//变量指定大小\n" +
    "int n;\n" +
    "scanf(\"%d\", &n);\n" +
    "int arr[n];\n" +
    "```\n" +
    "\n" +
    "### 字符数组")

function initToPdfSetting() {
  pdfMake.vfs = NotoScVfs;
  pdfMake.fonts = {
    NotoSc: {
      normal: 'NotoSc-Regular.ttf',
      bold: 'NotoSc-Regular.ttf',
      italics: 'NotoSc-Regular.ttf',
      bolditalics: 'NotoSc-Regular.ttf',
    },
  }
}

function changeInputMarkdown() {
  htmlRet.value = marked.parse(inputMarkdown.value)
  htmlRetInlined.value = juice(htmlRet.value, {
    extraCss: markdownCss
  })
  console.log(htmlRetInlined.value)
}

function exportPdf() {
  let dataText = htmlToPdfmake(htmlRetInlined.value, {
    removeExtraBlanks: true
  });
  console.log(dataText)
  const docDefinition = {
    content: dataText,
    defaultStyle: {
      font: 'NotoSc'
    },
  }

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.download('document.pdf');
}


onMounted(() => {
  initToPdfSetting()
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

</style>