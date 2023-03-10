<template>
  <q-btn push
         color="primary"
         label="Push"
  @click="toDoc">
    this is a push
  </q-btn>
</template>

<script>
export default {
  name: "AdminIndex",

  methods: {
    toDoc() {
      this.$router.push({
        name: 'adminDoc',
      })
    }
  }

}
</script>

<style scoped>

</style>