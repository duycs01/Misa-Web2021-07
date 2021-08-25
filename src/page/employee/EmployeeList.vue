<template>
  <div class>
    <div class="title">
      <div class="name-table">Danh sách nhân viên</div>
      <div class="flex gap-4">
        <base-button
          :id="`btn-delete`"
          :text="'Xóa nhân viên'"
          :iconLeft="true"
          class="bg-red"
          @click.native="openPopup()"
          v-if="listDelete.length"
        >
          <i class="fas fa-trash-alt"></i>
        </base-button>
        <base-button
          :id="`btn-add`"
          :text="'Thêm nhân viên'"
          :iconLeft="true"
          @click.native="openNewDetail()"
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
        @input="search = $event"
      >
        <template v-slot:icon>
          <img src="../../assets/icon/search.png" alt="search" />
        </template>
      </base-input>
      <div class="filter-department">
        <BaseCombobox
          v-if="departments.data.length"
          :tabindex="`20`"
          :select="departments.select"
          :options="departments.data"
          :optionDefault="departments.optionDefault"
          @selected="departmentSelected = $event"
        ></BaseCombobox>
      </div>
      <div class="filter-employeePositon">
        <BaseCombobox
          v-if="positions.data.length"
          :tabindex="`21`"
          :select="positions.select"
          :options="positions.data"
          :optionDefault="positions.optionDefault"
          @selected="positionSelected = $event"
        ></BaseCombobox>
      </div>
      <base-button
        :id="`btn-refresh`"
        :iconLeft="true"
        class="btn-refresh"
        @click.native="getAllDataEmployee"
      >
        <img src="../../assets/icon/refresh.png" alt="refresh" />
      </base-button>
    </div>
    <base-table
      :tableId="employees.tableId"
      :headTable="employees.headTable"
      :dataTable="employees.data"
      :listCheck="listDelete"
      @clickRow="clickRowOpenDetail"
      @checked="getListDelete"
    />
    <Pagination
      :total-pages="totalPages"
      :total="totalRecord"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    >
      <template v-slot:total>
        <div class="total text-gray-1">
          Hiển thị
          <strong class="text-black">
            {{pageSize *(currentPage - 1) + 1}} - {{pageSize * currentPage >totalRecord?
            totalRecord:pageSize * currentPage }}/{{totalRecord}}
          </strong> nhân viên
        </div>
      </template>
      <template v-slot:pageSize>
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-value">
              <DxSelectBox
                :data-source="simpleProducts"
                @value-changed="pageSizeChange"
                display-expr="name"
                :value="pageSize"
                value-expr="value"
                drop-down-button-template="imageIcon"
              >
                <template #imageIcon="{}">
                  <i class="fas fa-sort"></i>
                </template>
              </DxSelectBox>
            </div>
          </div>
        </div>
      </template>
    </Pagination>
    <EmployeeDetail
      v-if="openFormDetail==true"
      :formData="formData"
      @closeDetail="closeDetail"
      @saveFormDetail="saveEmployee"
    />
    <BasePopup v-if="openPopupDelete" @closePopup="openPopupDelete=false" :warning="detailPopup">
      <template v-slot:buttonA>
        <base-button
          :id="`btn-cancelPopup`"
          :text="'Hủy'"
          class="bg-gray-4 text-black"
          @click.native="openPopupDelete=false"
        ></base-button>
      </template>
      <template v-slot:buttonB>
        <base-button
          :id="`btn-delete`"
          :text="'Xóa'"
          class="bg-red"
          @click.native="deleteListEmployee"
        ></base-button>
      </template>
    </BasePopup>
    <BaseToastMess
      v-if="openToast"
      :status="toastMess.status"
      :message="toastMess.mess"
      @closeToast="openToast = false"
    />
    <BaseLoading v-if="loading" />
  </div>
</template>
<script>
import EmployeesAPI from "../../apis/components/EmployeesAPI";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";
import Pagination from "../../components/base/BasePagination.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import BaseTable from "../../components/base/BaseTable.vue";
import BasePopup from "../../components/base/BasePopupWarning.vue";
import modalEmployee from "../../model/ModelEmployee";
import BaseToastMess from "../../components/base/BaseToastMess.vue";
import BaseLoading from "../../components/base/BaseLoading.vue";
import BaseCombobox from "../../components/base/BaseCombobox.vue";

import { DxSelectBox } from "devextreme-vue/select-box";

export default {
  components: {
    Pagination,
    BaseInput,
    EmployeeDetail,
    BaseTable,
    BasePopup,
    BaseToastMess,
    BaseLoading,
    BaseCombobox,
    DxSelectBox
  },
  mounted() {
    this.filterEmployee();
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
            className: "text-left",
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
          DepartmentId: ""
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
          PositionId: ""
        }
      },

      openFormDetail: false,
      openPopupDelete: false,

      listDelete: [],
      formData: modalEmployee,
      formMode: 0,

      openToast: false,

      toastMess: {
        mess: "Lấy dữ liệu thành công",
        status: "success"
      },

      detailPopup: {
        title: "",
        description: ""
      },
      positionSelected: "",
      departmentSelected: "",

      loading: false,

      currentPage: 1,
      pageSize: 10,
      simpleProducts: [
        {
          name: "10 nhân viên/trang",
          value: 10
        },
        {
          name: "20 nhân viên/trang",
          value: 20
        },
        {
          name: "30 nhân viên/trang",
          value: 30
        },
        {
          name: "40 nhân viên/trang",
          value: 40
        },
        {
          name: "50 nhân viên/trang",
          value: 50
        }
      ],
      selectedItem: {
        name: "10 nhân viên/trang",
        value: 10
      },
      totalPages: 1,
      totalRecord: 0,
      search: ""
    };
  },
  methods: {
    /**
     * Gán dữ liệu pageSize khi chọn dropdown
     * Created by duylv - 20/8/2021
     */
    pageSizeChange(e) {
      this.pageSize = e.value;
    },

    /**
     * Sự kiện chuyển page
     * Created by duylv 08/08/2021
     */
    onPageChange(page) {
      this.filterEmployee(page);
    },

    /**
     * Phân trang và lọc dữ liệu
     * Created by duylv - 22/8/2021
     */
    filterEmployee(page) {
      if (page) {
        this.currentPage = page;
      }
      this.loading = true;
      var filters = `GetEmployeePaging?filterName=${this.search}&departmentId=${this.departmentSelected}&positionId=${this.positionSelected}&pageSize=${this.pageSize}&pageIndex=${this.currentPage}`;
      let me = this;
      EmployeesAPI.getDataById(filters)
        .then(res => {
          me.employees.data = res.data.Data;
          me.totalPages = res.data.TotalPage;
          me.totalRecord = res.data.TotalRecord;

          if (res) this.loading = false;
        })
        .catch(error => {
          if (error) this.loading = false;

          this.toastMess = this.$statusCode.checkStatus(error.response);
          this.showToastMess();
        });
    },

    /**
     * Gọi api lấy tất cả phòng ban
     * Created by duylv 26/07/2021
     */
    getAllDataPosition() {
      let me = this;
      PositionsAPI.getAllData()
        .then(res => {
          me.positions.data = res.data;
          me.positions.data.push(me.positions.optionDefault);
        })
        .catch(error => {
          this.toastMess = this.$statusCode.checkStatus(error.response);
          this.showToastMess();
        });
    },

    /**
     * Gọi api lấy tất cả phòng ban
     * Created by duylv 26/07/2021
     */
    getAllDataDepartment() {
      let me = this;
      DepartmentsAPI.getAllData()
        .then(res => {
          me.departments.data = res.data;
          me.departments.data.push(me.departments.optionDefault);
        })
        .catch(error => {
          this.toastMess = this.$statusCode.checkStatus(error.response);
          this.showToastMess();
        });
    },

    /**
     * Lấy mã nhân viên mới
     * Created by duylv 22/08/2021
     */
    getNewEmployeeCode() {
      var id = "NewEmployeeCode";
      EmployeesAPI.getDataById(id)
        .then(res => {
          this.formData.EmployeeCode = res.data;
        })
        .catch(error => {
          this.toastMess = this.$statusCode.checkStatus(error.response);
          this.showToastMess();
        });
    },

    /**
     *  Hàm sử lí mở poppup detail
     * Created by duylv 28/07/2021
     *  */
    openNewDetail() {
      this.formData = {};
      this.formMode = 0;
      this.getNewEmployeeCode();
      this.openFormDetail = true;
    },

    /**
     * Đóng form employee
     * Created by duylv 28/07/2021
     */
    closeDetail() {
      this.openFormDetail = false;
    },

    /**
     * dblClick row để mở detail
     * Created by duylv 28/07/2021
     */
    clickRowOpenDetail(row) {
      let me = this;
      // Lấy dữ liệu bằng api
      EmployeesAPI.getDataById(row.EmployeeId)
        .then(res => {
          this.formData = res.data;
          me.openFormDetail = true;
          me.formMode = 1;
        })
        .catch(error => {
          this.toastMess = this.$statusCode.checkStatus(error.response);
          this.showToastMess();
        });
    },

    /**
     * Mở popup delete
     * Created by duylv 28/07/2021
     */
    openPopup() {
      this.openPopupDelete = true;
      if (this.listDelete.length > 0 && this.listDelete.length > 1) {
        this.detailPopup.title = "Xóa nhân viên";
        this.detailPopup.description = `Bạn có muốn xóa các nhân viên ra khỏi danh sách không`;
      } else {
        this.detailPopup.title = "Xóa nhân viên";
        this.detailPopup.description = `Bạn có muốn xóa nhân viên ${this.listDelete[0].EmployeeCode} ra khỏi danh sách không`;
      }
    },

    /**
     * Gán danh sách xóa khi check vào hàng
     * Created by duylv 29/07/2021
     */
    getListDelete(listCheckDelete) {
      this.listDelete = listCheckDelete;
    },

    /**
     * Xóa danh sách dữ liệu theo id
     * Created by duylv - 28/07/2021
     */
    deleteListEmployee() {
      if (this.listDelete.length > 0)
        EmployeesAPI.deleteListId(this.listDelete)
          .then(res => {
            this.toastMess = this.$statusCode.checkStatus(res);

            this.filterEmployee(this.currentPage);

            this.showToastMess();

            this.openPopupDelete = false;
            this.listDelete = [];
          })
          .catch(error => {
            this.toastMess = this.$statusCode.checkStatus(error.response);
            this.showToastMess();
          });
    },

    /**
     * Ẩn hiện thông báo
     * Created by duylv - 28/07/2021
     */
    showToastMess() {
      this.openToast = true;
      setTimeout(() => {
        this.openToast = false;
      }, 5000);
    },

    // checkData(data) {
    //   if(this.formData = data){

    //   }
    // },

    /**
     * Thêm,Sửa Nhân viên
     * Created by duylv - 28/07/2021
     */
    saveEmployee(data) {
      if (this.formMode == 0) {
        EmployeesAPI.insertData(data)
          .then(res => {
            this.filterEmployee(this.currentPage);
            this.toastMess = this.$statusCode.checkStatus(res);
            this.showToastMess();
          })
          .catch(error => {
            this.toastMess = this.$statusCode.checkStatus(error.response);
            this.showToastMess();
          });
      }
      if (this.formMode == 1) {
        let id = data.EmployeeId;
        EmployeesAPI.updateDataById(id, data)
          .then(res => {
            this.filterEmployee(this.currentPage);
            this.toastMess = this.$statusCode.checkStatus(res);
            this.showToastMess();
            this.closeDetail();
          })
          .catch(error => {
            this.toastMess = this.$statusCode.checkStatus(error.response);
            this.showToastMess();
          });
      }
    }
  },
  watch: {
    /**
     * Theo dõi biến position khi thay đổi
     */
    positionSelected() {
      this.filterEmployee(1);
    },

    /**
     * Theo dõi biến department khi thay đổi
     */
    departmentSelected() {
      this.filterEmployee(1);
    },

    /**
     * Theo dõi biến khi pageSize  khi thay đổi
     */
    pageSize() {
      this.filterEmployee(1);
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheContent.css");
@import url("../../assets/css/base/Table.css");
</style>