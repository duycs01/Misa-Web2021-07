/**
 * Hàm sử lí bật tắt modal
 * @param {idSelector} idSelector Id nút bấm sự kiện
 * @param {idShow} idShow Id modal hiển thị
 * Create by: nvduy(20/7/2021)
 */
function ShowHideModal(idSelector, idShow) {
  idSelector.onclick = function () {
    idShow.classList.toggle("block");
    $("#btn-save").setAttribute("control", "add");
    resetData();
    getNewEmployeeCode();
    let check = true;
    for (let i = 0; i < $("input[required]").length; i++) {
      let input = $("input[required]")[i];
      check = alertInput(input, check);
    }
  };
}

/**
 * Hàm định dạng tiền tệ
 * @param {Number} money Số tiền kiểu int
 * @returns Chuỗi đã được định dạng
 * Create by: nvduy(20/7/2021)
 */
function money(money) {
  if (money !== null) {
    return money.toLocaleString("de-DE");
  }
}

/**
 * Hàm sử lí định dạng ngày tháng
 * @param {Date} date Ngày tháng năm
 * @returns Chuỗi đã được định dạng
 * Create by: nvduy(20/7/2021)
 */
function fomatDate(date) {
  if (date !== null) {
    var dateString = "";
    var newDate = new Date(date);
    var date = newDate.getDay();
    var month = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    dateString = `${date}/${month}/${year}`;
    return dateString;
  }
}

/**
 * Hàm sử lí định dạng ngày tháng
 * @param {Date} date Ngày tháng năm
 * @returns Chuỗi đã được định dạng
 * Create by: nvduy(20/7/2021)
 */
function fomatDateForm(date) {
  if (date !== null) {
    var dateString = "";
    var newDate = new Date(date);
    var date = newDate.getDay();
    var month = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    dateString = `${year}-${month}-${date}`;
    return dateString;
  }
}

/**
 *
 * @param {*} data Dữ liệu truyền vào input
 * Create by: nvduy(20/7/2021)
 * TODO: chưa làm xong
 */
function search(data) {
  // value của nút input chuyển thành chữ không in hoa
  var valInp = $("#search").value.toLowerCase();

  // lấy cái input text của dropdown
  var textDepa = $("#select-department .text");

  // lấy cái input text của dropdown
  var textPosi = $("#select-employeePositon .text");

  // lấy id của thằng input selectDepaent
  var dataDepa = textDepa[0].getAttribute("value");

  // lấy id của thằng input selectPositon
  var dataPosi = textPosi[0].getAttribute("value");

  var dataSearch;

  //trả ra 1 mảng những kết quả tìm được
  dataSearch = data.filter((item) => {
    // tạo biến kiểm tra
    let itemSearch = false;

    if (!itemSearch) {
      //biến kiểm tra bằng true
      itemSearch = item.EmployeeId.toLowerCase().indexOf(valInp) > -1;
    }
    if (!itemSearch) {
      itemSearch = item.FullName.toLowerCase().indexOf(valInp) > -1;
    }
    if (!itemSearch) {
      itemSearch = item.Phone.toLowerCase().indexOf(valInp) > -1;
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
