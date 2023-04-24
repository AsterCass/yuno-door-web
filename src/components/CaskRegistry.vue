<template>
  <div>
    <q-dialog :model-value="registryDialog" @hide="closeRegistry"
              transition-show="fade" transition-hide="fade">
      <q-card class="login-dialog-class column justify-between">

        <div class="login-dialog-header">
          System Registry
          <div class="login-dialog-tag">
            注册账号
          </div>
        </div>


        <div>
          <q-input class="login-dialog-input" placeholder="账号" v-model="account"
                   filled color="black"/>
          <q-input class="login-dialog-input" placeholder="密码" v-model="passwd"
                   filled color="black" :type="'password'"/>
        </div>


        <div class="row justify-around login-dialog-btn-comb">
          <q-btn label="注册" @click="registryMethod" class="login-dialog-btn col-4"/>
        </div>

      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify

let registryDialog = ref(false)
let account = ref("")
let passwd = ref("")

function showRegistryDialog() {
  console.log("reg sjh")
  registryDialog.value = true
}

function closeRegistry() {
  registryDialog.value = false
}

function registryMethod() {
  notify({
    message: "暂时不支持外部注册",
    position: 'top-right',
    type: 'warning',
    timeout: 1000
  })
}

onMounted(() => {
  emitter.on('showRegistryDialogEven', showRegistryDialog)
})

onUnmounted(() => {
  emitter.off('showRegistryDialogEven')
})


</script>

<style lang="sass" scoped>

.login-dialog-class
  min-height: 30rem
  min-width: 30rem
  text-align: center
  padding: 2%
  border-radius: 5%

.login-dialog-header
  font-size: 3rem
  font-family: Roboto Slab, sans-serif

.login-dialog-tag
  font-size: 0.5rem

.login-dialog-input
  margin: 5%

.login-dialog-btn-comb
  margin: 2%

.login-dialog-btn
  margin: 0.5rem
  text-align: center
  color: white
  min-height: 2.5rem
  min-width: 4rem
  background-image: linear-gradient(195deg, #42424a, #191919)
  border-radius: 0.8rem

</style>