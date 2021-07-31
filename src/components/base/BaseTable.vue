<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th class="text-center">#</th>
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
          :value="row.idTable"
          @dblclick="$emit('clickRow', row.idTable)"
        >
          <td>
            <base-check-box @change.native="$emit(`checked`,row.EmployeeId)" />
          </td>
          <td
            v-for="(item, index) in rowsTable(row)"
            :key="index"
            :class="item.className"
          >{{formatValue(item)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Common from "../../assets/js/commom.js";
import BaseCheckBox from "./BaseCheckBox.vue";
export default {
  components: { BaseCheckBox },
  props: {
    headTable: {
      type: Array,
      require
    },
    dataTable: {
      type: Array,
      require
    },
    idTable: {
      type: String,
      require
    }
  },
  component: {
    BaseCheckBox
  },
  methods: {
    /**
     * Hàm lấy dữ liệu của row theo head table
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

    /**
     * Hàm format dữ liệu theo định dạng
     */
    formatValue(item) {
      switch (item.value) {
        case "DateOfBirth":
          return Common.formatDate(item.name);
        case "Salary":
          return Common.formatMoney(item.name);
        case "Gender":
          return Common.formatGenderToName(item.name);
        case "WorkStatus":
          return Common.formatWorkStatusToName(item.name);
        default:
          return item.name;
      }
    }
  }
};
</script>