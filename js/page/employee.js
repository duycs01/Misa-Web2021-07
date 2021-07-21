function init() {
  departmentDropdown();
  positionDropdown();
  tableEmployee();
  btnToggle();

  //** Hàm mở modal ở nút thêm nhân viên*/
  showModal($("#btn-add"), $("#modal-info"));

  //** Hàm tắt modal ở nút close trong modal  */
  showModal($("#btn-close"), $("#modal-info"));
}
