<template>

  <div style="padding: 1.5%">

    <div class="code-generator-tag-title">
      <div>
        <q-icon class="q-mx-sm" name="fa-solid fa-clock-rotate-left" size="1em"/>
        Timestamp Converter
      </div>
    </div>


    <div class="row" style="margin: 2% 2% 1% 2%;height: 500px">






      <q-input class="dialog-btn-small" placeholder="生日" v-model="date"
               type="datetime-local" filled color="black"/>


      <q-btn label="修改时间" color="secondary" style="height: 5rem;" class="q-mx-lg">
        <q-popup-proxy cover
                       style="background-color: transparent; border: 0;
                           padding: 1rem;
                           box-shadow: 0 0 0; backdrop-filter: blur(0);"
                       transition-show="scale"
                       transition-hide="scale">
          <q-date
              class="q-mx-sm"
              v-model="date"
          >
          </q-date>

          <q-time
              class="q-mx-sm"
              v-model="timeWithSeconds"
              with-seconds
              format24h
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat/>
            </div>
          </q-time>
        </q-popup-proxy>
      </q-btn>


    </div>




  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

let timer = 0;

let date = ref("2019/12/30")
let timeWithSeconds = ref('10:56:00')


function updateCurDate() {
  var str = "";
  var now = new Date();

  str += "Today is: " + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();


  console.log(str)
}


//生成定时器
function timerUp() {
  timer = setInterval(() => {
    updateCurDate();
  }, 1000);
}

//删除定时器
function timerDown() {
  clearInterval(timer);
  timer = 0
}


onMounted(() => {
  timerUp()
  console.log("111111111")
})

onUnmounted(() => {
  timerDown()
  console.log("333333333333")
})

</script>

<style lang="sass" scoped>
@import "@/styles/cask.sass"

.code-generator-tag-title
  font-family: Roboto Slab, sans-serif
  letter-spacing: -.05rem
  font-size: 2.5rem
  color: $cask_dark_jungle_green
  margin-bottom: 1rem
  opacity: 0.8
  font-weight: 400


</style>