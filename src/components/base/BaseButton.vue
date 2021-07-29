<template>
  <button
    type="button"
    class="button"
    :class="iconLeft || iconRight ? 'px-4' : 'px-6'"
  >
    <span v-if="iconLeft" class="icon-left">
      <slot name="icon"></slot>
    </span>
    <span class="text" v-text="text"></span>
    <span v-if="iconRight" class="icon-right">
      <slot name="icon"></slot>
    </span>
  </button>
</template>
<script>
export default {
  props: {
    text: String,
    iconLeft: Boolean,
    iconRight: Boolean,
  },
};
</script>
<style scoped>
@import url("../../assets/css/base/Button.css");
</style>