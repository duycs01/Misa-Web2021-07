<template>
  <div class="popup">
    <div class="body-popup">
      <base-button
        :id="`btn-close-popup`"
        :iconRight="true"
        class="text-black bg-gray-4 ml-auto"
        @click.native="$emit('closePopup')"
      >
        <i class="fas fa-times"></i>
      </base-button>
      <div class="title-popup">{{title}}</div>
      <div class="content-popup">
        <div class="icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="text">{{description}}</div>
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
    title: { type: String, require },
    description: { type: String, require }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Popup.css");
</style>