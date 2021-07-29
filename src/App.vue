<template>
  <div id="app">
    <TheHeader />
    <TheMenu />
    <TheContent />
  </div>
</template>

<script lang='js'>
import TheHeader from "./components/layout/TheHeader.vue"
import TheMenu from "./components/layout/TheMenu.vue"
import TheContent from "./components/layout/TheContent.vue"

export default {
  name: "App",
  components: {
    TheHeader,
    TheMenu,
    TheContent
  },
};
</script>

<style>
@import url("./assets/css/main.css");
@import url("./assets/font/fontawesome-5.15.1/css/all.min.css");
</style>
