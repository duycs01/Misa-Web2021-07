<template>
  <button
    :id='id'
    type="button"
    class="button"
    :class="{'px-4': text && (iconLeft || iconRight), 'px-6': text && !(iconLeft || iconRight),'p-0': !text && (iconLeft || iconRight)}"
    :style="!text?'width:40px;':''"
  >
    <span
      v-if="iconLeft"
      class="icon-left"
      :class="!text?'mx-auto':''"
    >
      <slot></slot>
    </span>
    <span
      v-if="text"
      class="text"
      v-text="text"
    ></span>
    <span
      v-if="iconRight"
      class="icon-right"
      :class="!text?'mx-auto':''"
    >
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "base-button",
  props: {
    id: {
      type: String,
      require
    },
    text: String,
    iconLeft: Boolean,
    iconRight: Boolean
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Button.css");
</style>