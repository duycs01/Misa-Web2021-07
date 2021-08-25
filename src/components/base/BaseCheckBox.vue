<template>
  <div class="check-box">
    <input type="checkbox" v-model="checked" />
    <span class="checkmark"></span>
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default:false
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Checkbox.css");
</style>