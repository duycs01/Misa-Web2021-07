class EmployeeCode extends Base {
  //#region [Hàm khởi tạo]
  constructor() {
    super(tableId, urlEmployee);
    // Tiêu đề trang
    this.titlePage = null;
    this.initEvent();
  }
  static modalId = "#modal-employee";

  //#endregion
  //#region [Hàm sử lí các event]
  initEvent() {
    let me = this;

    // Bắt sự kiện nút thêm nhân viên
    document.querySelector("#btn-add").addEventListener("click", function () {
      let modal = document.querySelector(EmployeeCode.modalId);
      modal.classList.add("block");
      EmployeeCode.resetData();
      me.getNewEmployeeCode();
      modal.setAttribute("form-mode", 1);
    });

    // Bắt sự kiện nút xóa nhân viên
    document.querySelector("#btn-delete").addEventListener("click", function () {
      let popup = document.querySelector('#popup-delete');
      popup.classList.add("block");
    });

    // Bắt sự kiện nút xác nhận xóa nhân viên
    document.querySelector("#btn-delete-accept").addEventListener("click", function () {
      debugger
      let popup = document.querySelector('#popup-delete');
      let inputChecked = document.querySelectorAll('input[type=checkbox]');
      for (let i = 0; i < inputChecked.length; i++) {
        if (inputChecked[i].checked) {
          let parentInput = inputChecked[i].parentNode.parentNode.parentNode
          let valueOfRow = parentInput.getAttribute('value')
          me.deleteDataById(valueOfRow)
          popup.classList.remove("block");
        }
      }
      // popup.classList.remove("block");

    });

    // Bắt sự kiện nút nút đóng form
    document.querySelector("#btn-close-form").addEventListener("click", function () {
      let modal = document.querySelector(EmployeeCode.modalId);
      modal.classList.remove("block");
    });

    // Bắt sự kiện nút nút đóng form
    document
      .querySelector("#btn-cancel-form")
      .addEventListener("click", function () {
        let modal = document.querySelector(EmployeeCode.modalId);
        modal.classList.remove("block");
      });


    // Bắt sự kiện nút nút đóng popup
    document.querySelector("#btn-close-popup").addEventListener("click", function () {
      let popup = document.querySelector('#popup-delete');
      popup.classList.remove("block");
    });


    // Bắt sự kiện nút nút đóng popup
    document
      .querySelector("#btn-cancel-popup")
      .addEventListener("click", function () {
        let popup = document.querySelector('#popup-delete');
        popup.classList.remove("block");
      });


    // Bắt sự kiện nút lưu
    document.querySelector("#btn-save").addEventListener("click", function () {
      let modal = document.querySelector(EmployeeCode.modalId);
      let formMode = modal.getAttribute("form-mode");

      if (formMode == 1) {
        me.insertData();
      }
      if (formMode == 0) {
        me.updataData();
      }
    });


    // Bắt sự kiện nút load data
    document
      .querySelector("#btn-refresh")
      .addEventListener("click", function () {
        console.log(2);

        me.loadData();
      });

    // bắt sự kiện kiểm tra các input chưa nhập
    Common.checkInputRequiredBlur();
    // bắt sự kiện kiểm tra các input chưa nhập
    Common.validateEmail();
    Common.validatePhone();

  }
  //#endregion

  //#region [Hàm sử lí form]

  /**
   * Hàm lấy mã nhân viên mới
   * Create by: nvduy(20/7/2021)
   */
  getNewEmployeeCode() {
    const url = "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode";
    try {
      let res = Common.callRequest("GET", url);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          document.querySelector("#txtEmployeeCode").value = data;
        }
      };
    } catch (error) {
      alert("Lấy mã thất bại! Vui lòng liên hệ Dev nvduy");
      console.log(error);
    }
  }

  /**
   * Hàm sử lí bật tắt modal
   * Create by: nvduy(20/7/2021)
   */
  ShowHideModal(selectorId, modalId) {
    let me = this;
    var selector = document.querySelector(selectorId);
    var modal = document.querySelector(modalId);

    selector.onclick = function () {
      modal.classList.toggle("block");
      EmployeeCode.resetData();
      me.getNewEmployeeCode();
    };
  }
  /**
   * Hàm sử lí resetData
   * Create by: nvduy(19/7/2021)
   */
  static resetData() {
    let employee = new EmployeeCode();
    let optionDepartmentItem = document.querySelector(
      "#option-department-form .active"
    );
    let optionPositionItem = document.querySelector(
      "#option-department-form .active"
    );
    let optionPositionItemValue = optionPositionItem.getAttribute("value");
    let optionDepartmentItemValue = optionDepartmentItem.getAttribute("value");

    document.querySelector("#txtEmployeeCode").value = "";
    document.querySelector("#txtFullName").value = "";
    document.querySelector("#txtBirthOfDay").value = "";
    document.querySelector("#select-gender .text").setAttribute("value", 1);
    document.querySelector("#txtIdentityNumber").value = "";
    document.querySelector("#txtIdentityPlace").value = "";
    document.querySelector("#txtIdentityDate").value = "";
    document.querySelector("#txtPhone").value = "";
    document.querySelector("#txtEmail").value = "";
    document
      .querySelector("#select-position-form .text")
      .setAttribute("value", optionPositionItemValue);
    document
      .querySelector("#select-department-form .text")
      .setAttribute("value", optionDepartmentItemValue);
    document.querySelector("#txtTaxCode").value = "";
    document.querySelector("#txtSalary").value = "";
    document.querySelector("#txtDayOfJoin").value = "";
    document
      .querySelector("#select-status-form .text")
      .setAttribute("value", 1);
    employee.dropdownForm();
  }

  /**
   * Hàm sử lí truyền dữ liệu vào form
   * Create by: nvduy(19/7/2021)
   */
  bindingData(data) {
    // Hàm sử lí tiền tệ
    let salary = Common.fomatMoney(data.Salary);
    let dateOfBirth = Common.fomatDateForm(data.DateOfBirth);
    let identityDate = Common.fomatDateForm(data.IdentityDate);
    let joinDate = Common.fomatDateForm(data.JoinDate);

    console.log(this.employeeData);
    EmployeeCode.employeeData.employeeId = data.EmployeeId;
    document.querySelector("#txtEmployeeCode").value = data.EmployeeCode;
    document.querySelector("#txtFullName").value = data.FullName;
    document.querySelector("#txtBirthOfDay").value = dateOfBirth;
    document
      .querySelector("#select-gender")
      .children[0].setAttribute("value", data.Gender);
    document.querySelector("#txtIdentityNumber").value = data.IdentityNumber;
    document.querySelector("#txtIdentityPlace").value = data.IdentityPlace;
    document.querySelector("#txtIdentityDate").value = identityDate;
    document.querySelector("#txtPhone").value = data.PhoneNumber;
    document.querySelector("#txtEmail").value = data.Email;
    document
      .querySelector("#select-position-form .text")
      .setAttribute("value", data.PositionId);
    document
      .querySelector("#select-department-form .text")
      .setAttribute("value", data.DepartmentId);
    document.querySelector("#txtTaxCode").value = data.PersonalTaxCode;
    document.querySelector("#txtSalary").value = salary;
    document.querySelector("#txtDayOfJoin").value = joinDate;
    document
      .querySelector("#select-status-form .text")
      .setAttribute("value", data.WorkStatus);
    this.dropdownForm();
  }

  /**
   * Hàm lấy dữ liệu từ form vào biến tạm
   * Create by: nvduy(20/7/2021)
   */
  static getFormData() {
    let employeeCodeValue = document.querySelector("#txtEmployeeCode").value;
    EmployeeCode.employeeData.EmployeeCode = employeeCodeValue;

    let fullNameValue = document.querySelector("#txtFullName").value;
    EmployeeCode.employeeData.FullName = fullNameValue;

    let dateOfBirthValue = document.querySelector("#txtBirthOfDay").value;
    EmployeeCode.employeeData.DateOfBirth = dateOfBirthValue;

    let textGender = document.querySelector("#select-gender .text");
    let genderValue = textGender.getAttribute("value");

    EmployeeCode.employeeData.Gender = genderValue;

    let identityNumberValue =
      document.querySelector("#txtIdentityNumber").value;
    EmployeeCode.employeeData.IdentityNumber = identityNumberValue;

    let identityPlaceValue = document.querySelector("#txtIdentityPlace").value;
    EmployeeCode.employeeData.IdentityPlace = identityPlaceValue;

    let identityDateValue = document.querySelector("#txtIdentityDate").value;
    EmployeeCode.employeeData.IdentityDate = identityDateValue;

    let phoneNumberValue = document.querySelector("#txtPhone").value;
    EmployeeCode.employeeData.PhoneNumber = phoneNumberValue;

    let emailValue = document.querySelector("#txtEmail").value;
    EmployeeCode.employeeData.Email = emailValue;

    let textPosition = document.querySelector("#select-position-form .text");
    let positionValue = textPosition.getAttribute("value");
    EmployeeCode.employeeData.PositionId = positionValue;

    let textDepartment = document.querySelector(
      "#select-department-form .text"
    );
    let departmentValue = textDepartment.getAttribute("value");
    EmployeeCode.employeeData.DepartmentId = departmentValue;

    let taxCodeValue = document.querySelector("#txtTaxCode").value;
    EmployeeCode.employeeData.PersonalTaxCode = taxCodeValue;

    let salaryValue = document.querySelector("#txtSalary").value;
    let fomatSalary = +salaryValue.replaceAll(".", "");
    EmployeeCode.employeeData.Salary = fomatSalary;

    let joinDateValue = document.querySelector("#txtDayOfJoin").value;
    EmployeeCode.employeeData.JoinDate = joinDateValue;

    let textOfSelect = document.querySelector("#select-status-form .text");
    let workStatusValue = +textOfSelect.getAttribute("value");
    EmployeeCode.employeeData.WorkStatus = workStatusValue;
  }
  //#endregion

  /**
       * Hàm kiểm tra active khi load dữ liệu
       * Create by: nvduy(19/7/2021)
       */
  checkActiveOnLoad(selectFromId, optionFromId) {
    Dropdown.btnDropdown(selectFromId, optionFromId);

    const selector = document.querySelector(selectFromId);
    const option = document.querySelector(optionFromId);
    let valueSelector = selector
      .querySelector(".text")
      .getAttribute("value");

    for (let i = 0; i < option.children.length; i++) {
      // lấy ra từng item của option
      let optionItem = option.children[i];
      // Lấy attribute của từng thẻ được chọn
      let dataOption = optionItem.getAttribute("value");
      // kiểm tra active khi load dữ liệu
      if (valueSelector == dataOption) {
        Dropdown.activeOptionItem(
          selector,
          option,
          optionItem
        );
      }
      option.children[i].addEventListener("click", function () {
        Dropdown.activeOptionItem(
          selector,
          option,
          optionItem
        );
      });
    }
  }
  /**
    * Hàm sử lí dropdown trong form
    * Create by: nvduy(19/7/2021)
    */
  dropdownForm() {
    const dropdownForm = [{
      selectId: "#select-gender",
      optionId: "#option-gender"
    }, {
      selectId: "#select-status-form",
      optionId: "#option-status-form"
    }, {
      selectId: "#select-department-form",
      optionId: "#option-department-form"
    }, {
      selectId: "#select-position-form",
      optionId: "#option-position-form"
    }]
    for (let i = 0; i < dropdownForm.length; i++) {
      this.checkActiveOnLoad(dropdownForm[i].selectId, dropdownForm[i].optionId)
    }
  }

  static employeeData = {
    CreatedDate: String,
    CreatedBy: String,
    ModifiedDate: String,
    ModifiedBy: String,
    EmployeeId: String,
    EmployeeCode: String,
    FirstName: String,
    LastName: String,
    FullName: String,
    Gender: Number,
    DateOfBirth: String,
    PhoneNumber: String,
    Email: String,
    Address: String,
    IdentityNumber: String,
    IdentityDate: String,
    IdentityPlace: String,
    JoinDate: String,
    MartialStatus: Number,
    EducationalBackground: Number,
    QualificationId: String,
    DepartmentId: String,
    PositionId: String,
    WorkStatus: Number,
    PersonalTaxCode: String,
    Salary: Number,
    PositionCode: String,
    PositionName: String,
    DepartmentCode: String,
    DepartmentName: String,
    QualificationName: String,
  };
}
document.addEventListener("DOMContentLoaded", function () {
  tableId = "#table-employee";
  urlEmployee = "http://cukcuk.manhnv.net/v1/Employees/";
  let table = new EmployeeCode();
  table.loadData(tableId, urlEmployee);
  dropdowns = [
    {
      selectId: "#select-employeePositon",
      optionId: "#option-employeePositon",
      urlDropdown: "http://cukcuk.manhnv.net/v1/Positions",
    },
    {
      selectId: "#select-department",
      optionId: "#option-department",
      urlDropdown: "http://cukcuk.manhnv.net/api/Department",
    },
    {
      selectId: "#select-position-form",
      optionId: "#option-position-form",
      urlDropdown: "http://cukcuk.manhnv.net/v1/Positions",
    },
    {
      selectId: "#select-department-form",
      optionId: "#option-department-form",
      urlDropdown: "http://cukcuk.manhnv.net/api/Department",
    },
  ];

  for (let i = 0; i < dropdowns.length; i++) {
    let drop = new Dropdown(dropdowns[i]);
    drop.loadDataDropdown();
  }
});
