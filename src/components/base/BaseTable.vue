<template>
  <div class="table">
    <table id="table-employee">
      <thead id="table-title">
        <tr prop-id="EmployeeId">
          <th
            prop-name="#"
            class="text-center"
          >#</th>
          <th prop-name="EmployeeCode">Mã nhân viên</th>
          <th prop-name="FullName">Họ và tên</th>
          <th
            class="text-center"
            prop-name="Gender"
          >Giới tính</th>
          <th
            class="text-center"
            prop-name="DateOfBirth"
          >Ngày sinh</th>
          <th
            class="text-center"
            prop-name="PhoneNumber"
          >Điện thoại</th>
          <th prop-name="Email">Email</th>
          <th prop-name="DepartmentName">Chức vụ</th>
          <th prop-name="PositionName">Phòng ban</th>
          <th prop-name="Salary">Mức lương cơ bản</th>
          <th prop-name="WorkStatus">Tình trạng công việc</th>
        </tr>
      </thead>
      <tbody id="table-body">
        <tr
          v-for="item in data"
          :key="item.EmployeeId"
          :value="item.EmployeeId"
        >
          <td>
            <div class="check-box"><input type="checkbox"><span class="checkmark"></span></div>
          </td>
          <td>{{item.EmployeeCode}}</td>
          <td>{{item.FullName}}</td>
          <td style="text-align: center;">{{item.Gender}}</td>
          <td style="text-align: center;">{{item.DateOfBirth}}</td>
          <td>{{item.PhoneNumber}}</td>
          <td>{{item.Email}}</td>
          <td>{{item.PositionName}}</td>
          <td>{{item.DepartmentName}}</td>
          <td style="text-align: right;">{{item.Salary}}</td>
          <td>{{item.WorkStatus}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    data: Array
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/Table.css");
</style>