<template>
  <div
    class="option-item"
    :value="value"
  >
    <span class="icon"> <i class="fas fa-check"></i></span>
    <span class="text">
      {{option}}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
};
</script>