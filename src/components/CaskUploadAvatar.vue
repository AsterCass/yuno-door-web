<template>
  <div>
    <q-dialog :model-value="uploadDialogShow" @hide="closeDialogShow"
              transition-show="fade" transition-hide="fade">
      <q-card class="dialog-frame justify-between items-center">

        <div class="dialog-sec-header q-mt-md q-mb-lg">
          头像预览
        </div>


        <div>
          <q-avatar size="200px">
            <q-img :src="userData.avatar"/>
          </q-avatar>
        </div>

        <q-file class="q-ma-md" outlined v-model="currentAvatar"
                accept=".jpg,.jpeg,.png" max-file-size="512000" @rejected="fileNotAllow"
                label="请上传大小在 500kb 以内的 jpg/jpeg/png 图片"/>

        <div class="q-mt-lg">
          <q-btn label="保存" @click="saveAvatar" class="dialog-btn-margin-middle"/>
        </div>


      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>

import {defineProps, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

defineProps({
  userData: {
    id: "",
    avatar: ""
  }
})

let uploadDialogShow = ref(false)
let currentAvatar = ref(null);


function showUploadDialog(isShow) {
  uploadDialogShow.value = isShow
}

function closeDialogShow() {
  uploadDialogShow.value = false
}

function saveAvatar() {
  console.log(currentAvatar.value)
}

function fileNotAllow() {
  notify({
    message: "图片不满足条件，请重新上传",
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}


onMounted(() => {
  emitter.on('showUploadDialogEven', showUploadDialog)
})

onUnmounted(() => {
  emitter.off('showUploadDialogEven')
})


</script>

<style scoped lang="sass">
@import "@/styles/cask-dialog-style.scss"

</style>