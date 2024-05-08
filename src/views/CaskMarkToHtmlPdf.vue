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
                       padding: '1rem', resize: 'none',height: '30rem', lineHeight: '1.4',
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


          <div class="row justify-evenly">
            <div class="q-py-sm">
              <q-btn class="cask-simple-btn-margin-pri" label="复制Html代码" @click="copyTextToClipboard()"/>
            </div>
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
import pdfMake from 'pdfmake-cn/build/pdfmake';
import {marked} from "@/utils/marked-factory";
import htmlToPdfmake from "html-to-pdfmake";
import juice from 'juice';
import markdownCss from '!!raw-loader!@/styles/output-pdf.css';
import {notifyTopNegative, notifyTopPositive} from "@/utils/global-notify";
import {useQuasar} from "quasar";

const LOCAL_URL = process.env.VUE_APP_SERVER_ADD
const notify = useQuasar().notify
const preMarkdown =
    `# 一级标题

这里是一些表格

| Parameter  | Required | Description                                                                                           |
|------------|----------|-------------------------------------------------------------------------------------------------------|
| \`markdown\` | Required | The markdown content to convert                                                                       |
| \`css\`      | Optional | CSS styles to apply                                                                                   |
| \`engine\`   | Optional | The PDF conversion engine, can be \`weasyprint\`, \`wkhtmltopdf\` or \`pdflatex\`, defaults to \`weasyprint\` |

## 二级标题

这里是一些代码

\`\`\`java
System.out.println("Hello World");
\`\`\`
以及一些内置代码\`int  a = 1;\`

### 三级标题

这里是一些链接[AsterCasc](www.astercasc.com)、[steam游戏史地查询](https://www.astercasc.com/tools/steam/search)

#### 四级标题
1. 这里是一些有序列表
2. 对于元素进行排序
#### 五级标题

* 或许你也需要无需列表
* 用于元素整理
  * 以及一些子列表
* 回到父级列表

##### 六级标题

最后这里是最为常见的**加重**语句`

let htmlRet = ref("")
let htmlRetInlined = ref("")
let inputMarkdown = ref(preMarkdown)

function initToPdfSetting() {
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  // pdfMake.fonts = {
  //   NotoSc: {
  //     normal: 'NotoSc-Regular.ttf',
  //     bold: 'NotoSc-Regular.ttf',
  //     italics: 'NotoSc-Regular.ttf',
  //     bolditalics: 'NotoSc-Regular.ttf',
  //   },
  // }
  pdfMake.fonts = {
    NotoSc: {
      normal: LOCAL_URL + 'fonts/NotoSerifSC-Regular.otf',
      bold: LOCAL_URL + 'fonts/NotoSerifSC-Regular.otf',
      italics: LOCAL_URL + 'fonts/NotoSerifSC-Regular.otf',
      bolditalics: LOCAL_URL + 'fonts/NotoSerifSC-Regular.otf',
    },
  }
}

function changeInputMarkdown() {
  htmlRet.value = marked.parse(inputMarkdown.value)
  htmlRetInlined.value = juice(htmlRet.value, {
    extraCss: markdownCss
  })
}

function copyTextToClipboard() {
  if (!navigator.clipboard) {
    notifyTopNegative("拷贝失败", 1000, notify)
    return;
  }
  navigator.clipboard.writeText(htmlRetInlined.value).then(function () {
    notifyTopPositive("拷贝成功", 1000, notify)
  }, function () {
    notifyTopNegative("拷贝失败", 1000, notify)
  });
}

function exportPdf() {
  let dataText = htmlToPdfmake(htmlRetInlined.value, {
    removeExtraBlanks: true,
    defaultStyles: {
      p: {margin: [0, 5, 0, 5]},
      blockquote: {margin: [0, 0, 0, 0]},
    },
    ignoreStyles: ['font-family']
  });

  const replacePat = /"text":" "/g
  let dataTextStr = JSON.stringify(dataText)
  dataTextStr = dataTextStr.replaceAll(replacePat, "\"text\":\"\"")

  const docDefinition = {
    content: JSON.parse(dataTextStr),
    defaultStyle: {
      font: 'NotoSc'
    },
  }

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.download('document.pdf');
}


onMounted(() => {
  initToPdfSetting()
  changeInputMarkdown()
})


</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"
@import "@/styles/cask-little-mini-style.scss"

</style>