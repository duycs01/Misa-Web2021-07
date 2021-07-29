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
        <div class="icon">MB</div>
        <div class="select-bank">
          <div class="select">
            <span class="text">Chi nhánh MISA miền Bắc</span>
            <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
          </div>
          <!-- <div class="option"></div> -->
        </div>
      </div>
      <div class="user">
        <div class="bell"><i class="far fa-bell"></i></div>
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
export default {};
</script>
<style scoped>
@import url("../../assets/css/layout/TheHeader.css");
</style>