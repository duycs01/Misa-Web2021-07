function init() {
  departmentDropdown();
  positionDropdown();
  tableEmployee();
  btnToggle();

  //** Hàm mở modal ở nút thêm nhân viên*/
  ShowHideModal($("#btn-add"), $("#modal-info"));

  //** Hàm tắt modal ở nút close trong modal  */
  ShowHideModal($("#btn-close"), $("#modal-info"));
  ShowHideModal($("#btn-cancel"), $("#modal-info"));
  new EmployeeCode();
}
