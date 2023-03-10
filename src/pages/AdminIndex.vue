<template>
  <q-layout view="lHh lpr lFf" container:false>
    <q-header :reveal="toRel" class="index-header">
      <q-toolbar>
        <q-toolbar-title>Cask Admin</q-toolbar-title>
        <q-btn flat round dense icon="whatshot"/>
      </q-toolbar>
    </q-header>
    <q-img :no-native-menu="false" :src="require('../assets/img/MengPo.jpg')" alt="">
    </q-img>




    <q-page-container>
      <q-page class="q-pa-md">
        <p v-for="n in 100" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
          dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
          commodi perferendis voluptate?
        </p>
      </q-page>
    </q-page-container>
  </q-layout>


  <!--  <q-btn push-->
  <!--         color="primary"-->
  <!--         label="Push"-->
  <!--         @click="toDoc">-->
  <!--    this is a push-->
  <!--  </q-btn>-->


</template>

<script>
// import MP from '@/assets/img/MengPo-origin.png'

export default {
  name: "AdminIndex",

  methods: {
    toDoc() {
      this.$router.push({
        name: 'adminDoc',
      })
    },
    toRel() {
      return true
    }
  }

}
</script>

<style scoped>

.index-header {
  left: 0;
  right: 0;
  top: 20px;
  margin: auto;
  width: 80%;
  text-align:center;
  opacity: 0.7;
  background: white;
  color: #1D1D1D;
  border-radius: 15px;
}

</style>