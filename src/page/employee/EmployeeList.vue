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
          @click.native="openPopupDelete = true"
          v-if="listDeleteId.length"
        >
          <i class="fas fa-trash-alt"></i>
        </base-button>
        <base-button
          :id="`btn-add`"
          :text="'Thêm nhân viên'"
          :iconLeft="true"
          @click.native="openDetail()"
        >
          <img src="../../assets/icon/add.png" alt="add" />
        </base-button>
      </div>
    </div>
    <div class="control">
      <base-input
        :iconLeft="true"
        :id="`txtSeach`"
        :placeholder="`Tìm kiếm theo mã, tên hoặc số điện thoại`"
        style="width:320px;"
      >
        <template v-slot:icon>
          <img src="../../assets/icon/search.png" alt="search" />
        </template>
      </base-input>
      <div class="filter-department">
        <BaseDropdown
          v-if="departments.data.length"
          :tabindex="13"
          :select="departments.select"
          :options="departments.data"
          :optionDefault="departments.optionDefault"
        ></BaseDropdown>
      </div>
      <div class="filter-employeePositon">
        <BaseDropdown
          v-if="positions.data.length"
          :tabindex="13"
          :select="positions.select"
          :options="positions.data"
          :optionDefault="positions.optionDefault"
        ></BaseDropdown>
      </div>
      <base-button :id="`btn-refresh`" :iconLeft="true" class="btn-refresh">
        <img src="../../assets/icon/refresh.png" alt="refresh" />
      </base-button>
    </div>
    <base-table
      v-if="employees.data.length"
      :tableId="employees.tableId"
      :headTable="employees.headTable"
      :dataTable="employees.data"
      @clickRow="clickRowOpenDetail"
      @checked="rowChecked"
    />
    <Pagination />
    <EmployeeDetail
      v-if="open==true"
      :formData="formData"
      @closeDetail="closeDetail"
      @saveDetail="saveEmployee"
    />
    <BasePopup
      v-if="openPopupDelete"
      @closePopup="openPopupDelete=false"
      @cancelPopup="openPopupDelete=false"
      @deletePopup="deleteEmployee"
    />
  </div>
</template>
<script>
import BaseButton from "../../components/base/BaseButton";
import BaseDropdown from "../../components/base/BaseDropdown.vue";
import EmployeesAPI from "../../apis/components/EmployeesAPI";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";
import Pagination from "../../components/base/BasePagination.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import BaseTable from "../../components/base/BaseTable.vue";
import BasePopup from "../../components/base/BasePopupWarning.vue";
import modalEmployee from "../../model/ModelEmployee";

export default {
  components: {
    BaseDropdown,
    BaseButton,
    Pagination,
    BaseInput,
    EmployeeDetail,
    BaseTable,
    BasePopup
  },
  mounted() {
    this.getAllDataEmployee();
    this.getAllDataPosition();
    this.getAllDataDepartment();
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
      departments: {
        data: [],
        select: {
          name: "DepartmentName",
          value: "DepartmentId"
        },
        optionDefault: {
          DepartmentName: "Tất cả phòng ban",
          DepartmentId: "0"
        }
      },
      positions: {
        data: [],
        select: {
          name: "PositionName",
          value: "PositionId"
        },
        optionDefault: {
          PositionName: "Tất cả vị trí",
          PositionId: "0"
        }
      },
      open: false,
      openPopupDelete: false,
      listDeleteId: [],
      formData: modalEmployee,
      formMode: 0
    };
  },
  methods: {
    /**
     * Gọi api tất cả nhân viên
     */
    getAllDataEmployee() {
      let me = this;
      try {
        EmployeesAPI.getAllData()
          .then(res => {
            me.employees.data = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi api lấy tất cả phòng ban
     */
    getAllDataPosition() {
      let me = this;
      try {
        PositionsAPI.getAllData()
          .then(res => {
            me.positions.data = res.data;
            me.positions.data.push(me.positions.optionDefault);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi api lấy tất cả phòng ban
     */
    getAllDataDepartment() {
      let me = this;
      try {
        DepartmentsAPI.getAllData()
          .then(res => {
            me.departments.data = res.data;
            me.departments.data.push(me.departments.optionDefault);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },

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
      this.formMode = 0;
    },
    closeDetail() {
      this.open = false;
    },
    clickRowOpenDetail(row) {
      let me = this;
      console.log("row", row); // lấy được row mà k cần call api
      // Lấy dữ liệu bằng api
      EmployeesAPI.getDataById(row.EmployeeId)
        .then(res => {
          console.log(res.data);
          this.formData = res.data;
          console.log("modalEmployee", this.formData);
          this.formatData();
          me.open = true;
          me.formMode = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatData() {
      if (this.formData && this.formData.Salary) {
        this.formData.Salary = this.$common.formatMoney(this.formData.Salary);
      }
      if (this.formData && this.formData.DateOfBirth) {
        this.formData.DateOfBirth = this.$common.formatDateForm(
          this.formData.DateOfBirth
        );
      }
      if (this.formData && this.formData.IdentityDate) {
        this.formData.IdentityDate = this.$common.formatDateForm(
          this.formData.IdentityDate
        );
      }
      if (this.formData && this.formData.JoinDate) {
        this.formData.JoinDate = this.$common.formatDateForm(
          this.formData.JoinDate
        );
      }
    },
    // khi checked thì lấy id
    rowChecked({ e, id }) {
      if (e.target.checked) {
        this.listDeleteId.push(id);
      } else {
        const index = this.listDeleteId.indexOf(id);
        if (index > -1) {
          this.listDeleteId.splice(index, 1);
        }
      }
    },
    /**
     * Xóa Nhân viên
     */
    deleteEmployee() {
      var me = this;
      if (me.listDeleteId.length > 0) {
        Promise.all(
          me.listDeleteId.forEach(item => {
            EmployeesAPI.deleteDataById(item);
          })
        )
          .then(res => console.log(res))
          .catch(err => alert(err, "Đã có lỗi sảy ra"))
          .finally(
            alert("Đã xóa xong!"),
            (me.openPopupDelete = false),
            EmployeesAPI.getAllData().then(res => {
              me.employees.data = res.data;
            })
          );
      }
    },

    /**
     * Thêm,Sửa Nhân viên
     */
    saveEmployee(data) {
      if (this.formMode == 0) {
        console.log(data);
        try {
          EmployeesAPI.insertData(data)
            .then(res => {
              if (res) {
                console.log(res);
                alert("Thêm thành công");
                this.getAllDataEmployee();
              }
            })
            .catch(err => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
      if (this.formMode == 1) {
        let id = data.EmployeeId;
        try {
          EmployeesAPI.updateDataById(id, data)
            .then(res => {
              if (res) {
                alert("Sửa thành công");
                this.getAllDataEmployee();
              }
            })
            .catch(err => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  watch: {
    employees: {
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal.data);
        console.log(oldVal.data);
      }
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheContent.css");
@import url("../../assets/css/base/Table.css");
</style>