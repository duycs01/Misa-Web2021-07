<template>
  <div class="content">
    <div class="title">
      <div class="name-table">Danh sách nhân viên</div>
      <div class="flex gap-4">
        <BaseButton
          :text="'Thêm nhân viên'"
          :iconLeft="true"
        >
          <template v-slot:icon>
            <img
              src="../../assets/icon/add.png"
              alt="add"
            />
          </template>
        </BaseButton>
        <BaseButton
          :text="'Xóa nhân viên'"
          :iconLeft="true"
          class="bg-red"
        >
          <template v-slot:icon>
            <i class="fas fa-trash-alt"></i>
          </template>
        </BaseButton>
      </div>
    </div>
    <div class="control">
      <div class="search input-icon">
        <label
          for="search"
          class="icon"
        >
          <img
            src="/content/icon/search.png"
            alt="search"
          />
        </label>
        <input
          id="search"
          type="search"
          class="input"
          placeholder="Tìm kiếm theo mã, tên hoặc số điện thoại"
          tabindex="0"
        />
      </div>
      <div class="filter-department">
        <BaseDropdown
          :selected="departments.select"
          :value="departments.value"
        >
          <ItemDropdown
            v-for="item in departments.data"
            :key="item.DepartmentId"
            :class="departments.value==item.DepartmentId?'active':''"
            :value="item.DepartmentId"
            :option="item.DepartmentName"
            @click.native="checkedItem({departments:item})"
          >
          </ItemDropdown>
          <ItemDropdown
            :class="departments.value=='0'?'active':''"
            :value="'0'"
            :option="'Tất cả phòng ban'"
            @click.native="checkedItem({departments:''})"
          >
          </ItemDropdown>
        </BaseDropdown>
      </div>
      <div class="filter-employeePositon">
        <BaseDropdown
          :selected="positions.select"
          :value="positions.value"
        >
          <ItemDropdown
            v-for="item in positions.data"
            :key="item.PositionId"
            :class="positions.value==item.PositionId? 'active':''"
            :value="item.PositionId"
            :option="item.PositionName"
            @click.native="checkedItem({positions:item})"
          >
          </ItemDropdown>
          <ItemDropdown
            :class="positions.value=='0'? 'active':''"
            :value="'0'"
            :option="'Tất cả vị trí'"
            @click.native="checkedItem({positions:''})"
          >
          </ItemDropdown>
        </BaseDropdown>
      </div>
      <button
        class="btn-refresh"
        id="btn-refresh"
      >
        <img
          src="/content/icon/refresh.png"
          alt="refresh"
        />
      </button>
    </div>
    <Table :data="employees.data" />

    <Pagination />

  </div>
</template>
<script>
import BaseButton from "../../components/base/BaseButton.vue";
import BaseDropdown from "../../components/base/baseDropdown/BaseDropdown.vue";
import Table from "../../components/base/BaseTable.vue";
import ItemDropdown from "../../components/base/baseDropdown/ItemDropdown.vue";
import EmployeesAPI from "../../apis/components/EmployeesAPI";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";
import Pagination from "../../components/base/BasePagination.vue";

export default {
  components: {
    BaseButton,
    BaseDropdown,
    ItemDropdown,
    Table,
    Pagination
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
        data: []
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
      }
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
          console.log("alo", item.positions);
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
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheContent.css");
</style>