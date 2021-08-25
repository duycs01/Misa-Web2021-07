<template>
  <div class="popup">
    <div class="body-popup">
      <base-button
        :id="`btn-close-popup`"
        :iconRight="true"
        class="btn-close_custom"
        @click.native="$emit('closePopup')"
      >
        <img class="w-4 h-4" src="../../assets/icon/x.svg" alt="close" />
      </base-button>
      <div class="title-popup">{{warning.title}}</div>
      <div class="content-popup">
        <div class="icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="text">{{warning.description}}</div>
      </div>
      <div class="control-popup">
        <slot name="buttonA"></slot>
        <slot name="buttonB"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    warning: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Popup.css");
</style>