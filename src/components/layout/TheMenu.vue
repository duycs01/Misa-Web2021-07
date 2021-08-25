<template>
  <div class="menu">
    <!-- <a v-for="menuItem in menu" :key="menuItem.text" href="#" class="menu-item">
      <span class="icon" v-html="menuItem.icon"> </span>
      <span class="text" v-text="menuItem.text"></span>
    </a>-->
    <router-link to="customer" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/dashboard.png" alt="dashboard" />
      </span>
      <span class="text">Mua hàng</span>
    </router-link>
    <router-link to="customer" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/dashboard.png" alt="dashboard" />
      </span>
      <span class="text">Danh sách khách hàng</span>
    </router-link>
    <router-link to="employee" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/report.png" alt="report" />
      </span>
      <span class="text">Báo cáo</span>
    </router-link>
    <a href="#" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/dashboard.png" alt="dashboard" />
      </span>
      <span class="text">Mua hàng</span>
    </a>
    <router-link to="employee" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/dic-employee.png" alt="employee" />
      </span>
      <span class="text">Danh sách nhân viên</span>
    </router-link>
    <a href="#" class="menu-item">
      <span class="icon">
        <img src="../../assets/icon/setting.png" alt="setting" />
      </span>
      <span class="text">Thiết lập hệ thống</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          text: "Tổng quan",
          icon: `<img src="../../assets/icon/dashboard.png" alt="dashboard" />`
        },
        {
          text: "Báo cáo",
          icon: `<img src="../../assets/icon/report.png" alt="report" />`
        },
        {
          text: "Mua hàng",
          icon: `<img src="../../assets/icon/dashboard.png" alt="dashboard" />`
        },
        {
          text: "Danh sách nhân viên",
          icon: `<img src="../../assets/icon/dic-employee.png" alt="employee" />`
        },
        {
          text: "Thiết lập hệ thống",
          icon: `<img src="../../assets/icon/setting.png" alt="setting" />`
        }
      ]
    };
  }
};
</script>
<style scoped>
@import url("../../assets/css/layout/TheMenu.css");
</style>