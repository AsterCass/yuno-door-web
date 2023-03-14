<template>
  <div style="background: #3E3630;height: 800px;padding: 1rem;" class="column justify-center">
    <div style="background: #B56536;height: 300px; margin: 1rem" class="row">
      <div style="background: #447550;height: 50px; width: 80px;margin: 20px"></div>
      <div style="background: #447550;height: 50px; width: 80px;margin: 20px"></div>
      <div style="background: #447550;height: 50px; width: 80px;margin: 20px"></div>
    </div>
    <div class="row justify-center blogClass">
      <div class="blogTag"></div>
      <div class="blogContent"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.blogClass {
  background: #2B5853;
  height: 300px;
  width:400px;
  margin: 1rem;
  padding: 40px 20px 40px 20px;
}
.blogTag {
  background: #447550;
  height: 50px;
  width: 80px;
  margin-right: 10px;
}

.blogContent {
  background: #447550;
  height: 500px;
  width: 200px;
  margin-left: 10px;
}

</style>