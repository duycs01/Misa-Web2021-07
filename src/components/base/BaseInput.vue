<template>
  <div class="input">
    <label v-if="label" class="label" :for="id">
      {{ label }}
      <span v-if="required" class="required">
        (
        <i>*</i>)
      </span>
    </label>
    <div class="input-group">
      <input
        :tabindex="tabindex"
        :id="id"
        class="input"
        :class="[
                 {'pl-12': iconLeft === true},
                 {'pr-12': iconRight === true},
                 classes,

                ]"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event.target)"
      />
      <div class="icon-left" v-if="iconLeft">
        <slot name="icon"></slot>
      </div>
      <div class="icon-right" v-if="iconRight">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",

  inheritAttrs: false,

  props: {
    id: {
      type: String,
      default() {
        return `text-input-${this._uid}`;
      }
    },
    type: {
      type: String,
      default: "text"
    },
    value: String,
    label: String,
    placeholder: String,
    classes: String,
    tabindex: String,
    iconLeft: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    select() {
      this.$refs.input.select();
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end);
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Input.css");
@import url("../../assets/css/base/Tooltip.css");

</style>