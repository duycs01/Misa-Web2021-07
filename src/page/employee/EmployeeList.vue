<template>
  <div class="content">
    <div class="title">
      <div class="name-table">Danh sách nhân viên</div>
      <div class="flex gap-4">
        <base-button
          :id="`btn-delete`"
          :text="'Xóa nhân viên'"
          :iconLeft="true"
          class="bg-red"
          v-if="showDelete"
          @click.native="openPopupDelete = true"
        >
          <i class="fas fa-trash-alt"></i>
        </base-button>
        <base-button
          :id="`btn-add`"
          :text="'Thêm nhân viên'"
          :iconLeft="true"
          @click.native="openDetail()"
        >
          <img
            src="../../assets/icon/add.png"
            alt="add"
          />
        </base-button>
      </div>
    </div>
    <div class="control">
      <base-input
        icon
        :id="`txtSeach`"
        :placeholder="`Tìm kiếm theo mã, tên hoặc số điện thoại`"
        style="width:320px;"
      >
        <template v-slot:icon>
          <img
            src="../../assets/icon/search.png"
            alt="search"
          />
        </template>

      </base-input>
      <div class="filter-department">
        <base-dropdown
          :selected="departments.select"
          :value="departments.value"
        >
          <base-dropdown-option
            v-for="item in departments.data"
            :key="item.DepartmentId"
            :class="departments.value==item.DepartmentId?'active':''"
            :value="item.DepartmentId"
            :option="item.DepartmentName"
            @click.native="checkedItem({departments:item})"
          >
          </base-dropdown-option>
          <base-dropdown-option
            :class="departments.value=='0'?'active':''"
            :value="'0'"
            :option="'Tất cả phòng ban'"
            @click.native="checkedItem({departments:''})"
          >
          </base-dropdown-option>
        </base-dropdown>
      </div>
      <div class="filter-employeePositon">
        <base-dropdown
          :selected="positions.select"
          :value="positions.value"
        >
          <base-dropdown-option
            v-for="item in positions.data"
            :key="item.PositionId"
            :class="positions.value==item.PositionId? 'active':''"
            :value="item.PositionId"
            :option="item.PositionName"
            @click.native="checkedItem({positions:item})"
          >
          </base-dropdown-option>
          <base-dropdown-option
            :class="positions.value=='0'? 'active':''"
            :value="'0'"
            :option="'Tất cả vị trí'"
            @click.native="checkedItem({positions:''})"
          >
          </base-dropdown-option>
        </base-dropdown>
      </div>
      <base-button
        :id="`btn-refresh`"
        :iconLeft="true"
        class="btn-refresh"
      >
        <img
          src="../../assets/icon/refresh.png"
          alt="refresh"
        >
      </base-button>
    </div>
    <base-table
      :idTable='employees.idTable'
      :headTable="employees.headTable"
      :dataTable="employees.data"
      @clickRow="clickRowOpenDetail"
      @checked="showBtnDelete"
    />
    <Pagination />
    <EmployeeDetail
      v-if="open"
      :formData="formData"
      @closeDetail="closeDetail()"
    />
    <BasePopup
      v-if="openPopupDelete"
      @closePopup="closePopup"
      @cancelPopup="closePopup"
      @deletePopup="deleteItem"
    />
  </div>
</template>
<script>
import BaseButton from "../../components/base/BaseButton.vue";
import {
  BaseDropdown,
  BaseDropdownOption
} from "../../components/base/baseDropdown/ExportBaseDropdown";
import EmployeesAPI from "../../apis/components/EmployeesAPI";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";
import Pagination from "../../components/base/BasePagination.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import BaseTable from "../../components/base/BaseTable.vue";
import BasePopup from "../../components/base/BasePopupWarning.vue";

export default {
  components: {
    BaseDropdown,
    BaseDropdownOption,
    BaseButton,
    Pagination,
    BaseInput,
    EmployeeDetail,
    BaseTable,
    BasePopup
  },
  created() {
    /**
     * Gọi api tất cả nhân viên
     */
    EmployeesAPI.getAllData()
      .then(res => {
        this.employees.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    /**
     * Gọi api lấy tất cả vị trí
     */
    PositionsAPI.getAllData()
      .then(res => {
        this.positions.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    /**
     * Gọi api lấy tất cả phòng ban
     */
    DepartmentsAPI.getAllData()
      .then(res => {
        this.departments.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      employees: {
        tableId: "EmployeeId",
        data: [],
        headTable: [
          {
            name: "Mã Nhân Viên",
            value: "EmployeeCode",
            className: "text-left",
            format: "text"
          },
          {
            name: "Họ và tên",
            value: "FullName",
            className: "text-left",
            format: "text"
          },
          {
            name: "Giới tính",
            value: "Gender",
            className: "text-center",
            format: "formatGender"
          },
          {
            name: "Email",
            value: "Email",
            className: "text-left",
            format: "text"
          },
          {
            name: "Ngày sinh",
            value: "DateOfBirth",
            className: "text-center",
            format: "formatDate"
          },

          {
            name: "Điện thoại",
            value: "PhoneNumber",
            className: "text-center",
            format: "text"
          },
          {
            name: "Chức vụ",
            value: "PositionName",
            className: "text-left",
            format: "text"
          },
          {
            name: "Phòng ban",
            value: "DepartmentName",
            className: "text-left",
            format: "text"
          },
          {
            name: "Mức lương",
            value: "Salary",
            className: "text-right",
            format: "formatMoney"
          },
          {
            name: "Tình trạng công việc",
            value: "WorkStatus",
            className: "text-left",
            format: "formatWorkStatus"
          }
        ]
      },
      positions: {
        data: [],
        select: "Tất cả vị trí",
        value: "0"
      },
      departments: {
        data: [],
        select: "Tất cả phòng ban",
        value: "0"
      },
      open: false,
      formData: {},
      showDelete: false,
      openPopupDelete: false
    };
  },
  methods: {
    /**
     * Hàm sử lí select dropdown
     */
    checkedItem(item) {
      if (item.positions || item.positions == "") {
        if (item.positions !== "") {
          this.positions.select = item.positions.PositionName;
          this.positions.value = item.positions.PositionId;
        } else {
          this.positions.select = "Tất cả vị trí";
          this.positions.value = "0";
        }
      }
      if (item.departments || item.departments == "") {
        if (item.departments !== "") {
          this.departments.select = item.departments.DepartmentName;
          this.departments.value = item.departments.DepartmentId;
        } else {
          this.departments.select = "Tất cả phòng ban";
          this.departments.value = "0";
        }
      }
    },
    // Hàm sử lí mở poppup detail
    openDetail() {
      this.open = true;
      this.formData = {};
    },
    closeDetail() {
      this.open = false;
    },
    clickRowOpenDetail(row) {
      // console.log("row", row); // lấy được row mà k cần call api
      // Lấy dữ liệu bằng api
      EmployeesAPI.getDataById(row.EmployeeId)
        .then(res => {
          this.formData = res.data;
          console.log("open form", this.formData);
          this.open = true;
        })
        .catch(err => {
          err;
        });
    },
    showBtnDelete(e) {
      console.log(e);
      this.showDelete = true;
    },
    deleteItem() {
      let inputChecked = document.querySelectorAll("input[type=checkbox]");
      for (let i = 0; i < inputChecked.length; i++) {
        if (inputChecked[i].checked) {
          let parentInput = inputChecked[i].parentNode.parentNode.parentNode;
          let valueOfRow = parentInput.getAttribute("value");
          EmployeesAPI.deleteDataById(valueOfRow);
          this.openPopupDeleted = false;
        }
      }
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheContent.css");
@import url("../../assets/css/base/Table.css");
</style>