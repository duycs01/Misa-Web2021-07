<template>
  <div
    @keyup="nextItem($event)"
    @blur="open=false"
    @focus="open = !open"
    :tabindex="tabindex"
    class="combo-box"
  >
    <div class="select">
      <input
        type="text"
        class="text"
        @blur="open=false"
        @focus="open = !open"
        :class="open? 'border-primary':''"
        :data-value="selector.value"
        v-model="selector.name"
      />
      <span class="icon" :class="open? 'bg-gray-4':''">
        <i :class="open? 'rotate-180':''" class="fas fa-chevron-down"></i>
      </span>
    </div>
    <div v-show="open" class="options" :class="classUp">
      <div
        v-for="(item) in options"
        :key="item[select.value]"
        class="option-item"
        :value="item[select.value]"
        @click="selected(item)"
        :class="selector.value == item[select.value]? 'active': ''"
      >
        <span class="icon">
          <i class="fas fa-check"></i>
        </span>
        <span class="text">{{item[select.name]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  props: {
    select: {
      type: Object,
      default: () => {},
      required: true
    },
    options: {
      type: Array,
      default: () => {},
      required: true
    },
    optionDefault: {
      type: Object,
      default: () => {}
    },
    tabindex: {
      type: String
    },
    classUp: {
      type: String
    }
  },

  data() {
    return {
      open: false,
      selector: {
        name: "",
        value: ""
      }
    };
  },
  methods: {
    /**
     * sự kiện click option item
     */
    selected(value) {
      if (this.options && this.select) {
        let optionItem = this.options.find(item => {
          if (item[this.select.value] == value[this.select.value]) {
            return item;
          }
        });
        if (optionItem) {
          this.selector = {
            name: optionItem[this.select.name],
            value: optionItem[this.select.value]
          };
          this.$emit("selected", this.selector.value);
        }
        this.open = false;
      }
    },
    nextItem(e) {
      if (e.keyCode == 38) {
        console.log("arow up", this.selector);
      } else if (e.keyCode == 40) {
        console.log("arow down", this.selector);
      }
    }
  },
  watch: {
    optionDefault: {
      immediate: true,
      handler() {
        if (this.optionDefault && this.select && this.options) {
          this.selected(this.optionDefault);
        }
      }
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Combobox.css");
</style>