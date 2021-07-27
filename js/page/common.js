class Common {
  constructor() { }
  /**
   * Hàm gọi api
   * @param {*} method
   * @param {*} url
   * @param {*} body
   * @returns
   */
  static callRequest(method, urlServer, body) {
    const xhr = new XMLHttpRequest();
    try {
      xhr.open(method, urlServer);
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
  static fomatMoney(num, col) {
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
  static fomatDate(date, col) {
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
  static fomatDateForm(date) {
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
      dateString = `${year}-${date}-${month}`;
      return dateString;
    }
  }
  /**
   * Hàm sử lí trạng thái làm việc
   * @param {*} status Truyền vào trạng thái 1,2,3
   * @returns Trả ra text tương ứng
   * Create by: nvduy(20/7/2021)
   */
  static fomatWorkStatusToName(status) {
    if (status)
      switch (status) {
        case 1:
          return "Đang làm việc";
          break;
        case 2:
          return "Đang thử việc";
          break;
        default:
          return "Đã nghỉ việc";
          break;
      }
  }

  /**
   * Hàm sử lí giới tính
   * Create by: nvduy(20/7/2021)
   */
  static fomatGenderToName(gender, col) {
    if (col) {
      col.style = "text-align:center";
    }
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
  static checkInputRequiredBlur() {
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
  static checkInputRequired() {
    let check = false;
    // tôi nghĩ là do cái này
    var inputRequireds = document.querySelectorAll("input[required]");
    for (let i = 0; i < inputRequireds.length; i++) {
      let inputRequired = inputRequireds[i];
      check = Common.alertInput(inputRequired, check);
    }
    return check;
  }

  /**
   * Hàm hiện thị thông báo input
   * Create by: nvduy(20/7/2021)
   */
  static alertInput(input, check) {
    let label = document.querySelector(`label[for="${input.id}"]`);
    if (input.required && input.value == "" && !check) {
      label.setAttribute('data-content', 'Trường này không được để trống!')
      label.classList.add("tooltip-input-required");
      input.classList.add("border-red");
      input.focus();
      check = true;
    }
    else {
      label.classList.remove("tooltip-input-required");
      input.classList.remove("border-red");
      label.setAttribute('data-content', '')
    }

    return check;
  }

  static alertInputEmail(input, check) {
    let label = document.querySelector(`label[for="${input.id}"]`);

    if (input.type == 'email' && !check) {
      label.setAttribute('data-content', 'Email không đúng định dạng!')
      label.classList.add("tooltip-input-required");
      input.classList.add("border-red");
      input.focus();
      check = true;
    }
    else {
      label.classList.remove("tooltip-input-required");
      input.classList.remove("border-red");
      label.setAttribute('data-content', '')
    }
  }
  static alertInputPhone(input, check) {
    let label = document.querySelector(`label[for="${input.id}"]`);

    if (input.type == 'text' && !check) {
      label.setAttribute('data-content', 'Số điện thoại không đúng định dạng!')
      label.classList.add("tooltip-input-required");
      input.classList.add("border-red");
      input.focus();
      check = true;
    }
    else {
      label.classList.remove("tooltip-input-required");
      input.classList.remove("border-red");
      label.setAttribute('data-content', '')
    }
  }
  /**
   * Hàm kiểm tra định dạng email
   */
  static validateEmail() {
    let testInput
    // chỗ này tôi lấy những thằng có type là email
    var inputEmail = document.querySelector("input[type=email]");
    inputEmail.addEventListener("blur", function () {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (inputEmail.value) {
        testInput = Common.alertInputEmail(inputEmail, re.test(String(inputEmail.value).toLowerCase()));
      }
    })
    return testInput
  }

  static validatePhone() {
    let testInput = false
    var inputPhone = document.querySelector("input[type=phone]");
    inputPhone.addEventListener("blur", function () {
      debugger
      let phoneNumber = inputPhone.value

      if (!Number.isNaN(phoneNumber)) {
        return Common.alertInputPhone(inputPhone, testInput);
      }
    })
  }
}