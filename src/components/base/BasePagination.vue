<template>
  <div class="pagination">
    <slot name="total"></slot>
    <div class="current-page">
      <button class="prev-all" @click="onClickFirstPage" :disabled="isInFirstPage">
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button class="prev" @click="onClickPreviousPage" :disabled="isInFirstPage">
        <i class="fas fa-angle-left"></i>
      </button>
      <button
        v-for="(page, index) in pages"
        :key="index"
        class="page"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{active: isPageActive(page.name)}"
      >
        <span class="number">{{page.name}}</span>
      </button>
      <button class="next" @click="onClickNextPage" :disabled="isInLastPage">
        <i class="fas fa-angle-right"></i>
      </button>
      <button class="next-all" @click="onClickLastPage" :disabled="isInLastPage">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>
    <slot name="pageSize"></slot>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 4
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    /**
     * Xử lí khi chọn trang đầu
     * CreatedBy: duylv - 21/07/2021
     */
    isInFirstPage() {
      return this.currentPage == 1;
    },

    /**
     * Xử lí khi chọn trang cuối
     * CreatedBy: duylv - 21/07/2021
     */
    isInLastPage() {
      return this.currentPage == this.totalPages;
    },

    /**
     * Xử lí tổng số trang hiển thị
     * CreatedBy: duylv - 21/07/2021
     */
    startPage() {
      if (this.currentPage == 1) {
        return 1;
      }
      if (this.currentPage == this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },

    /**
     * Xử lí tổng số trang hiển thị khi đến trang cuối
     * CreatedBy: duylv - 21/07/2021
     */
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },

    /**
     * Xử lí chọn khi load trang
     * CreatedBy: duylv - 21/07/2021
     */
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    }
  },
  methods: {
    /**
     * Hàm xử lí nút quay về đầu trang
     * CreatedBy: duylv - 21/07/2021
     */
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },

    /**
     * Hàm xử lí nút lùi về 1 trang
     * CreatedBy: duylv - 21/07/2021
     */
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },

    /**
     * Hàm xử lí chọn từng trang
     * CreatedBy: duylv - 21/07/2021
     */
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },

    /**
     * Hàm xử lí chuyển trang tiếp theo
     * CreatedBy: duylv - 21/07/2021
     */
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },

    /**
     * Hàm xử lí nút chuyển đến cuối trang
     * CreatedBy: duylv - 21/07/2021
     */
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage == page;
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Pagination.css");
.dx-fieldset{
  margin: 0;
  padding: 0;
}
</style>

<style>
input.dx-texteditor-input {
  height: 40px;
}
.dx-show-invalid-badge.dx-selectbox.dx-textbox.dx-texteditor.dx-dropdowneditor-button-visible.dx-editor-outlined.dx-texteditor-empty.dx-widget.dx-dropdowneditor.dx-dropdowneditor-field-clickable:focus{
  border-color: #01b075 !important;
}
.dx-state-hover,.dx-state-focused{
  border-color: #01b075 !important;
}
.dx-list-item-selected,.dx-state-active {
background:#01b075 !important;
color: #fff !important;
}
.dx-field-value-static, .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
    width: 70% !important;
}
.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button{
  text-align: center;
}
</style>