function init() {
  renderDropdown($("#option-department"), data.department);
  renderDropdown($("#option-employeePositon"), data.employeePositon);
  renderDropdown($("#option-general"), data.general);
  renderDropdown($("#option-department-id"), data.department);
  renderDropdown($("#option-position-id"), data.employeePositon);
  renderDropdown($("#option-status-id"), data.jobStatus);

  renderDataTable($("#table-body"), data.listEmployee);

  checkActive($("#select-department"), $("#option-department"));
  checkActive($("#select-employeePositon"), $("#option-employeePositon"));
  checkActive($("#select-general"), $("#option-general"));
  checkActive($("#select-department-id"), $("#option-department-id"));
  checkActive($("#select-position-id"), $("#option-position-id"));
  checkActive($("#select-status-id"), $("#option-status-id"));

  showDropdown($("#select-department"), $("#option-department"));
  showDropdown($("#select-employeePositon"), $("#option-employeePositon"));
  showDropdown($("#select-general"), $("#option-general"));
  showDropdown($("#select-department-id"), $("#option-department-id"));
  showDropdown($("#select-position-id"), $("#option-position-id"));
  showDropdown($("#select-status-id"), $("#option-status-id"));

  //** Hàm mở modal ở nút thêm nhân viên*/
  showModal($("#btn-add"), $("#modal-info"));

  //** Hàm tắt modal ở nút close trong modal  */
  showModal($("#btn-close"), $("#modal-info"));

  $("#search").oninput = function () {
    console.log("call");
    search();
  };
  for (let i = 0; i < $(".money").length; i++) {
    money($(".money")[i]);
  }
}

// textDepa[0].onchange = function () {
//   search();
// };
// textPosi[0].onchange = function () {
//   search();
// };

function getDataById(id, data) {
  data.forEach((item) => {
    if (item.id == id) {
      bindingData(item);
    }
  });
}

function bindingData(data) {
  $("#id").value = data.id;
  $("#fullName").value = data.fullName;
  $("#birthOfDay").value = data.birthOfDay;
  $("#select-general").children[0].setAttribute("data-id", data.general.id);
  $("#CMTND").value = data.CMTND;
  $("#addressOfCMTND").value = data.addressOfCMTND;
  $("#dayOfCMTND").value = data.dayOfCMTND;
  $("#phone").value = data.phone;
  $("#email").value = data.email;
  $("#select-position-id").children[0].setAttribute("data-id", data.general.id);
  $("#select-department-id").children[0].setAttribute(
    "data-id",
    data.department.id
  );
  $("#taxCode").value = data.taxCode;
  $("#salary").value = data.salary;
  $("#dayOfJoin").value = data.dayOfJoin;
  $("#select-status-id").children[0].setAttribute("data-id", data.jobStatus.id);
}
function resetData() {
  $("#id").value = "";
  $("#fullName").value = "";
  $("#birthOfDay").value = "";
  $("#select-general").children[0].setAttribute("data-id", 0);
  $("#CMTND").value = "";
  $("#addressOfCMTND").value = "";
  $("#dayOfCMTND").value = "";
  $("#phone").value = "";
  $("#email").value = "";
  $("#select-position-id").children[0].setAttribute("data-id", "");
  $("#select-department-id").children[0].setAttribute("data-id", "");
  $("#taxCode").value = "";
  $("#salary").value = "";
  $("#dayOfJoin").value = "";
  $("#select-status-id").children[0].setAttribute("data-id", "");
}
function search() {
  // value của nút input chuyển thành chữ không in hoa
  var valInp = $("#search").value.toLowerCase();

  // lấy cái input text của dropdown
  var textDepa = $("#select-department").getElementsByClassName("text");

  // lấy cái input text của dropdown
  var textPosi = $("#select-employeePositon").getElementsByClassName("text");

  // lấy id của thằng input selectc
  var dataDepa = textDepa[0].getAttribute("data-id");

  // lấy id của thằng input selectc
  var dataPosi = textPosi[0].getAttribute("data-id");

  var dataSearch;

  //trả ra 1 mảng những kết quả tìm được
  dataSearch = data.listEmployee.filter((item) => {
    // tạo biến kiểm tra
    let itemSearch = false;

    if (!itemSearch) {
      //biến kiểm tra bằng true
      itemSearch = item.id.toLowerCase().indexOf(valInp) > -1;
    }
    if (!itemSearch) {
      itemSearch = item.fullName.toLowerCase().indexOf(valInp) > -1;
    }
    if (!itemSearch) {
      itemSearch = item.phone.toLowerCase().indexOf(valInp) > -1;
    }
    console.log(itemSearch);
    return itemSearch;
  });

  if (dataDepa && dataPosi) {
    dataSearch = dataSearch.filter((item) => {
      let itemSearch = false;
      if (
        dataDepa == item.department.id &&
        dataPosi == item.employeePositon.id
      ) {
        itemSearch = true;
      }
      return itemSearch;
    });
  } else if (dataDepa || dataPosi) {
    dataSearch = dataSearch.filter((item) => {
      let itemSearch = false;
      if (
        dataDepa == item.department.id ||
        dataPosi == item.employeePositon.id
      ) {
        itemSearch = true;
      }
      return itemSearch;
    });
  }
  renderDataTable($("#table-body"), dataSearch);
}
