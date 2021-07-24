class Common {
  constructor() {}
  /**
   * Hàm gọi api
   * @param {*} method
   * @param {*} url
   * @param {*} body
   * @returns
   */
  CallRequest(method, urlServer, body) {
    const xhr = new XMLHttpRequest();
    try {
      xhr.open(method, urlServer);
      console.log(urlServer);
      xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
      xhr.setRequestHeader("access-control-allow-credentials", true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader(
        "Access-Control-Allow-Methods",
        "DELETE, POST, GET, OPTIONS"
      );
      xhr.setRequestHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      );
      var data = JSON.stringify(body);
      xhr.send(data);
    } catch (ex) {
      console.log(ex);
    }
    return xhr;
  }

  /**
   * Hàm định dạng tiền tệ
   * @param {Number} money Số tiền kiểu int
   * @returns Chuỗi đã được định dạng
   * Create by: nvduy(20/7/2021)
   */
  FomatMoney(num, col) {
    if (col) {
      col.style = "text-align:right;";
    }
    if (num) {
      return num.toLocaleString("de-DE");
    }
  }

  /**
   * Hàm sử lí định dạng ngày tháng
   * @param {Date} date Ngày tháng năm
   * @returns Chuỗi đã được định dạng
   * Create by: nvduy(20/7/2021)
   */
  FomatDate(date, col) {
    if (col) {
      col.style = "text-align:center;";
    }
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
  FomatDateForm(date) {
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
   * Hàm sử lí trạng thái làm việc
   * @param {*} status Truyền vào trạng thái 1,2,3
   * @returns Trả ra text tương ứng
   * Create by: nvduy(20/7/2021)
   */
  FomatWorkStatus(status) {
    if (status)
      switch (status) {
        case 0:
          return "Đang làm việc";
          break;
        case 1:
          return "Chưa làm việc";
          break;
        case 2:
          return "Đang thử việc";
          break;
        case 3:
          return "Sắp làm việc";
          break;
        case 4:
          return "Sẽ làm việc";
          break;
        case 5:
          return "Nhân viên chính thức";
          break;
        case 6:
          return "Đã nghỉ việc";
          break;

        default:
          return "Đã nghỉ việc";
          break;
      }
  }
  /**
   * Hàm sử lí giới tính
   * @param {*} status Truyền vào giới tính 0,1,2
   * @returns Trả ra text tương ứng
   * Create by: nvduy(20/7/2021)
   */
  FomatGender(gender, col) {
    if (col) {
      col.style = "text-align:center";
    }
    if (gender)
      switch (gender) {
        case 0:
          return "Nữ";
          break;
        case 1:
          return "Nam";
          break;
        default:
          return "Chưa xác định";
          break;
      }
  }

  /**
   * Hàm bắt sự kiện tab kiểm tra tất cả input required
   * Create by: nvduy(20/7/2021)
   */
  checkInputRequiredBlur() {
    let me = this;
    var inputRequireds = document.querySelectorAll("input[required]");

    for (let i = 0; i < inputRequireds.length; i++) {
      let check = false;
      inputRequireds[i].addEventListener("blur", function () {
        me.alertInput(this, check);
      });
    }
  }

  /**
   * Hàm kiểm tra tất cả input required
   * Create by: nvduy(20/7/2021)
   */
  checkInputRequired() {
    let check = false;
    var inputRequireds = document.querySelectorAll("input[required]");
    for (let i = 0; i < inputRequireds.length; i++) {
      let inputRequired = inputRequireds[i];
      check = this.alertInput(inputRequired, check);
    }
    return check;
  }

  /**
   * Hàm hiện thị thông báo input
   * Create by: nvduy(20/7/2021)
   */
  alertInput(input, check) {
    let label = document.querySelector(`label[for="${input.id}"]`);
    if (input.value == "" && check == false) {
      label.className += " tooltip";
      input.className += " border-red";
      input.focus();
      check = true;
    } else {
      label.classList.remove("tooltip");
      input.classList.remove("border-red");
    }
    return check;
  }

  /**
   * Hàm kiểm tra định dạng email
   */
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
