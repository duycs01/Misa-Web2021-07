<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th class="text-center"></th>
          <th>#</th>
          <th
            v-for="(item) in headTable"
            :key="item.name"
            :value="item.value"
            :format="item.format"
            :class="item.className? item.className:'text-left'"
          >{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row,index) in dataTable"
          :key="index"
          :value="row[tableId]"
          :class="{ 'bg-focus' :indexOfRow(row[tableId]) !== -1}"
          @click="selectRow(row[tableId])"
          @dblclick="$emit('clickRow', row)"
        >
          <td>
            <div class="check-box">
              <input type="checkbox" :checked="indexOfRow(row[tableId]) !== -1? true: false" />
              <span class="checkmark"></span>
            </div>
          </td>
          <td class="text-center">{{index}}</td>
          <td
            v-for="(item, index) in rowsTable(row)"
            :key="index"
            :class="item.className"
          >{{formatValue(item)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    headTable: {
      type: Array,
      require
    },
    dataTable: {
      type: Array,
      require
    },
    tableId: {
      type: String,
      require
    }
  },

  data() {
    return {
      listDelete: [],
      rowSelected: false,
      checked: false
    };
  },
  methods: {
    /**
     * Hàm Chọn hàng để xóa
     * CreatedBy: duylv - 21/07/2021
     */
    selectRow(value) {
      this.rowSelected = !this.rowSelected;
      let rowIndex = this.listDelete.indexOf(value);
      if (rowIndex !== -1) {
        this.listDelete.splice(rowIndex, 1);
      } else {
        this.listDelete.push(value);
      }

      this.$emit("checked", this.listDelete);
    },

    /**
     * Hàm lấy dữ liệu của row theo head table
     * CreatedBy: duylv - 21/07/2021
     */
    rowsTable(row) {
      let listValue = [];
      let valueItem;
      this.headTable.forEach(item => {
        valueItem = {
          value: item.value,
          name: row[item.value],
          className: item.className
        };
        listValue.push(valueItem);
      });
      return listValue;
    },

    indexOfRow(row) {
      return this.listDelete.indexOf(row);
    },

    /**
     * Hàm format dữ liệu theo định dạng
     * CreatedBy: duylv - 21/07/2021
     */
    formatValue(item) {
      return this.$common.formatValue(item);
    }
  },
  watch: {
    /**
     * theo dõi object dataTable khi thay đổi
     * CreatedBy: duylv - 12/08/2021
     *  */

    dataTable: {
      deep: true,
      handler(newVal) {
        this.rowsTable(newVal);
        this.listDelete = [];
      }
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Checkbox.css");
</style>