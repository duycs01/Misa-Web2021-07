<template>
  <div class="toast-mess">
    <div class="content-mess">
      <div
        :class="[
      {'bg-red': status=='error'},
      {'bg-yellow': status=='warning'},
      {'bg-primary': status=='success'},
      {'bg-blue': status=='information'},
      ]"
        class="icon"
      >
        <i v-if="status=='error'" class="fas fa-exclamation-triangle"></i>
        <i v-if="status=='warning'" class="fas fa-exclamation-circle"></i>
        <i v-if="status=='success'" class="fas fa-check"></i>
        <i v-if="status == 'information'" class="fas fa-info"></i>
      </div>
      <div class="text">{{message}}</div>
    </div>
    <button @click="$emit('closeToast')" class="btn-close-toast">
      <i
        :class="[
      {'text-red': status=='error'},
      {'text-yellow': status=='warning'},
      {'text-primary': status=='success'},
      {'text-blue': status=='information'},
      ]"
        class="fas fa-times"
      ></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    status: { type: String, require },
    message: { type: String, require }
  },
  components: {}
};
</script>
<style scoped>
@import url("../../assets/css/base/ToastMess.css");
</style>