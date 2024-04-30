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
        <div id="htmlContent" class="col-6 bg-amber-1">
          <div style="width: 800px;font-family: 'Microsoft YaHei UI',serif; padding: 20px;">
            something just xx xx like this 中文
          </div>
        </div>
        <div class="col-6">
          <!--          <iframe v-show="base64URL !== '' " :src="base64URL" frameborder="0"-->
          <!--                  style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"-->
          <!--                  allowfullscreen>-->

          <!--          </iframe>-->

          <div v-html="htmlRet" class="blogMarkDown"></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import {NotoScVfs} from '@/utils/pdf-font-base64';
import markdownit from 'markdown-it'
import {importStyle} from "@/utils/marked-factory";


// let base64URL = ref("")
let htmlRet = ref("")


onMounted(() => {

  importStyle()

  const md = markdownit('default', {
    html: true,
    linkify: true,
    typographer: true,
  })

  md.renderer.rules.heading_open = (tokens, idx) => {
    console.log(tokens, idx)
    return '<' + tokens[idx].tag + ' style="color: blue; font-size: 24px;">';
  };
  htmlRet.value = md.render("## 前言");


  console.log(htmlRet.value)


  pdfMake.vfs = NotoScVfs;
  pdfMake.fonts = {
    NotoSc: {
      normal: 'NotoSc-Regular.ttf',
      bold: 'NotoSc-Regular.ttf',
      italics: 'NotoSc-Regular.ttf',
      bolditalics: 'NotoSc-Regular.ttf',
    },
  }

  let dataText = htmlToPdfmake(htmlRet.value);

  console.log(dataText)

  const docDefinition = {
    content: dataText,
    defaultStyle: {
      font: 'NotoSc'
    },
  };

// Create a PDF document
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

// Download or display the PDF document
  pdfDocGenerator.download('document.pdf');


})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"


</style>

<style lang="sass">


</style>