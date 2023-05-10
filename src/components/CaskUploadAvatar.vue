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
            <q-img :src="isDatabaseAvatar?userData.avatar:currentAvatarBase64"/>
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

import {defineProps, onMounted, onUnmounted, ref, watch} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import {updateAvatar} from "@/api/user";
import {refreshLoginMessage} from "@/utils/store";

//notify
const notify = useQuasar().notify

defineProps({
  userData: {
    id: "",
    avatar: ""
  }
})

//avatar ref value
let uploadDialogShow = ref(false)
let currentAvatar = ref(null);
let currentAvatarBase64 = ref("")
//是否展示初始头像
let isDatabaseAvatar = ref(true)

//init fileRead
let reader = new FileReader();
reader.onload = function () {
  currentAvatarBase64.value = this.result
};


function showUploadDialog(isShow) {
  uploadDialogShow.value = isShow
}

function closeDialogShow() {
  uploadDialogShow.value = false
}

function saveAvatar() {
  let formData = new FormData();
  formData.append('file', currentAvatar.value, currentAvatar.value.name)
  updateAvatar(formData).then(res => {
    if (200 === res.data.status) {
      //数据重新初始化
      refreshLoginMessage()
      isDatabaseAvatar.value = true
      uploadDialogShow.value = false
      notify({
        message: "头像保存成功",
        position: 'top-right',
        type: 'positive',
        timeout: 1000
      })
    } else {
      notify({
        message: "文件数据不合法，请更换或者重新编辑文件后上传",
        position: 'top-right',
        type: 'warning',
        timeout: 1000
      })
    }
  })
}

//监控文件上传
watch(currentAvatar, () => {
  isDatabaseAvatar.value = false
  reader.readAsDataURL(currentAvatar.value);
})

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