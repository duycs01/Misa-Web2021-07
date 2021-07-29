<template>
  <div class="pagination">
    <div class="total">Hiển thị 0 - 10/100 nhân viên</div>
    <div class="current-page">
      <button class="prev-all">
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button class="prev"><i class="fas fa-angle-left"></i></button>
      <button class="page">
        <span class="number">1</span>
      </button>
      <button class="page">
        <span class="number">2</span>
      </button>
      <button class="page">
        <span class="number">3</span>
      </button>
      <button class="page">
        <span class="number">4</span>
      </button>
      <button class="next"><i class="fas fa-angle-right"></i></button>
      <button class="next-all">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>
    <div class="per-page">10 nhân viên/trang</div>
  </div>
</template>
<style scoped>
@import url("../../assets/css/base/Pagination.css");
</style>