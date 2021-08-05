<template>
  <div class="header">
    <div class="header-left">
      <div class="toggle" id="toggle">
        <img src="../../assets/img/toggle.png" alt="toggle" />
      </div>
      <div class="logo">
        <img src="../../assets/img/cukcuk-logo.png" alt="logo" />
      </div>
    </div>
    <div class="header-right">
      <div class="bank">
        <BaseDropdown
          v-if="BankBranch.data.length"
          :tabindex="`22`"
          :select="BankBranch.select"
          :options="BankBranch.data"
          :optionDefault="BankBranch.data[0]"
        ></BaseDropdown>
      </div>
      <div class="user">
        <div class="bell">
          <i class="far fa-bell"></i>
        </div>
        <div class="avatar-user">
          <img src="../../assets/icon/avatar-default.png" alt="avatar" />
        </div>
        <div class="name-user">Mai Anh Bảo</div>
        <div class="option-user">
          <img src="../../assets/icon/option.png" alt="option" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BankBranch: {
        data: [
          {
            BankBranchName: "Chi nhánh MISA miền Bắc",
            BankBranchId: "MISA-001"
          },
          {
            BankBranchName: "Chi nhánh MISA miền Trung",
            BankBranchId: "MISA-002"
          },
          {
            BankBranchName: "Chi nhánh MISA miền Nam",
            BankBranchId: "MISA-003"
          },
          {
            BankBranchName: "Chi nhánh MISA miền Tây",
            BankBranchId: "MISA-004"
          }
        ],
        select: {
          name: "BankBranchName",
          value: "BankBranchId"
        }
      }
    };
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheHeader.css");
</style>