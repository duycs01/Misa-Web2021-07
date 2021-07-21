/**
 * Hàm sử lí nút toggle
 * Create by: nvduy(20/7/2021)
 */
function btnToggle() {
  let click = false;
  let menu = $(".menu");
  let content = $(".content");
  $("#toggle").onclick = function () {
    click = !click;
    if (click) {
      menu[0].classList.add("menu-toggle");
      content[0].classList.add("menu-toggle");
    } else {
      content[0].classList.remove("menu-toggle");
      menu[0].classList.remove("menu-toggle");
    }
  };
}

/**
 * Hàm sử lí sự kiện nút lưu
 * Create by: nvduy(20/7/2021)
 */
$("#btn-save").onclick = function () {
  var control = $("#btn-save").getAttribute("control");
  console.log(control);
  switch (control) {
    // Nếu attribute của nút là add thì request add
    case "add":
      insertEmployee();
      break;
    // Nếu attribute của nút là edit thì request edit
    case "edit":
      updateEmployeeById();
      break;

    default:
      break;
  }
};
$("#btn-refresh").onclick = function () {
  tableEmployee();
};
