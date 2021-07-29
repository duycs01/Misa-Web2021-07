<template>
  <div class="dropdown">
    <div
      class="select"
      @click="open = !open"
      :class="open? 'border-primary':''"
    >
      <span
        class="text"
        v-text="selected"
        :value="value"
      ></span>
      <span
        :class="open? 'rotate-180':''"
        class="icon"
      ><i class="fas fa-chevron-down"></i></span>
    </div>
    <div
      v-show="open"
      class="options"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  props: {
    selected: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>
<style scoped>
@import url("../../../assets/css/base/Dropdown.css");
</style>
