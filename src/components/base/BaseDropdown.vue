<template>
  <div :tabindex="tabindex" class="dropdown" @blur="open=false">
    <div class="select" @click="open = !open" :class="open? 'border-primary':''">
      <span class="text" :value="selector.value">{{selector.name}}</span>
      <span :class="open? 'rotate-180':''" class="icon">
        <i class="fas fa-chevron-down"></i>
      </span>
    </div>
    <div v-show="open" class="options">
      <div
        v-for="item in options"
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
      type: Number
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
    }
  },
  watch: {
    optionDefault: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (this.optionDefault && this.select && this.options)
          this.selected(this.optionDefault);
      }
    }
  }
};
</script>