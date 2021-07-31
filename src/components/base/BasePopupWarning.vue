<template>
  <div class="popup">
    <div class="body-popup">
      <base-button
        :id='`btn-close-popup`'
        :iconRight="true"
        class="text-black bg-gray-4 ml-auto"
        @click.native="$emit('closePopup')"
      >
        <i class="fas fa-times"></i>
      </base-button>

      <div class="title-popup">Thông báo</div>
      <div class="content-popup">
        <div class="icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="text">
          Bạn có muốn xóa thông tin đã chọn
          hay không?
        </div>
      </div>
      <div class="control-popup">
        <base-button
          :id="`btn-cancelPopup`"
          :text="'Hủy'"
          class="bg-gray-2"
          @click.native="$emit('cancelPopup')"
        >
        </base-button>
        <base-button
          :id="`btn-delete`"
          :text="'Xóa'"
          class="bg-red"
          @click.native="$emit('deletePopup')"
        >
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "./BaseButton.vue";
export default {
  components: {
    BaseButton
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Popup.css");
</style>