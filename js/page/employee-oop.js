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
      modal.classList.toggle("block");
      EmployeeCode.resetData();
      me.getNewEmployeeCode();
      modal.setAttribute("form-mode", 1);
    });

    // Bắt sự kiện nút nút đóng form
    document.querySelector("#btn-close").addEventListener("click", function () {
      let modal = document.querySelector(EmployeeCode.modalId);
      modal.classList.toggle("hidden");
    });
    // Bắt sự kiện nút nút đóng form
    document
      .querySelector("#btn-cancel")
      .addEventListener("click", function () {
        let modal = document.querySelector(EmployeeCode.modalId);
        modal.classList.toggle("hidden");
      });

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

    // bắt sự kiện kiểm tra các input chưa nhập
    this.checkInputRequiredBlur();
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
      let res = this.CallRequest("GET", url);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = this.responseText;
          console.log(this.responseText);
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

    let Gender = employee.FomatGender(1);
    let WorkStatus = employee.FomatWorkStatus(2);
    document.querySelector("#txtEmployeeCode").value = "";
    document.querySelector("#txtFullName").value = "";
    document.querySelector("#txtBirthOfDay").value = "";
    document
      .querySelector("#select-gender")
      .children[0].setAttribute("value", Gender);
    document.querySelector("#txtIdentityNumber").value = "";
    document.querySelector("#txtIdentityPlace").value = "";
    document.querySelector("#txtIdentityDate").value = "";
    document.querySelector("#txtPhone").value = "";
    document.querySelector("#txtEmail").value = "";
    document
      .querySelector("#select-position-form")
      .children[0].setAttribute("value", "");
    document
      .querySelector("#select-department-form")
      .children[0].setAttribute("value", "");
    document.querySelector("#txtTaxCode").value = "";
    document.querySelector("#txtSalary").value = "";
    document.querySelector("#txtDayOfJoin").value = "";
    document
      .querySelector("#select-status-form")
      .children[0].setAttribute("value", WorkStatus);
    employee.DropdownForm();
  }

  /**
   * Hàm sử lí truyền dữ liệu vào form
   * Create by: nvduy(19/7/2021)
   */
  bindingData(data) {
    // Hàm sử lí tiền tệ
    let salary = this.FomatMoney(data.Salary);
    let DateOfBirth = this.FomatDateForm(data.DateOfBirth);
    let IdentityDate = this.FomatDateForm(data.IdentityDate);
    let JoinDate = this.FomatDateForm(data.JoinDate);
    let Gender = this.FomatGender(data.Gender);
    let WorkStatus = this.FomatWorkStatus(data.WorkStatus);

    console.log(this.employeeData);
    EmployeeCode.employeeData.employeeId = data.EmployeeId;
    document.querySelector("#txtEmployeeCode").value = data.EmployeeCode;
    document.querySelector("#txtFullName").value = data.FullName;
    document.querySelector("#txtBirthOfDay").value = DateOfBirth;
    document
      .querySelector("#select-gender")
      .children[0].setAttribute("value", Gender);
    document.querySelector("#txtIdentityNumber").value = data.IdentityNumber;
    document.querySelector("#txtIdentityPlace").value = data.IdentityPlace;
    document.querySelector("#txtIdentityDate").value = IdentityDate;
    document.querySelector("#txtPhone").value = data.PhoneNumber;
    document.querySelector("#txtEmail").value = data.Email;
    document
      .querySelector("#select-position-form")
      .children[0].setAttribute("value", data.PositionId);
    document
      .querySelector("#select-department-form")
      .children[0].setAttribute("value", data.DepartmentId);
    document.querySelector("#txtTaxCode").value = data.PersonalTaxCode;
    document.querySelector("#txtSalary").value = salary;
    document.querySelector("#txtDayOfJoin").value = JoinDate;
    document
      .querySelector("#select-status-form")
      .children[0].setAttribute("value", WorkStatus);
    console.log(document.querySelector("#select-status-form").children[0]);
    this.DropdownForm();
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
   * Hàm sử lí dropdown trong form
   * Create by: nvduy(19/7/2021)
   */
  DropdownForm() {
    let drop = new Dropdown([]);
    drop.btnDropdown("#select-gender", "#option-gender");
    drop.btnDropdown("#select-status-form", "#option-status-form");

    const selectGender = document.querySelector("#select-gender");
    const optionGender = document.querySelector("#option-gender");
    let valueSelectGender = selectGender
      .querySelector(".text")
      .getAttribute("value");

    for (let i = 0; i < optionGender.children.length; i++) {
      // lấy ra từng item của option
      let optionItem = optionGender.children[i];
      // Lấy attribute của từng thẻ được chọn
      let dataOption = optionItem.getAttribute("value");
      // kiểm tra active khi load dữ liệu
      if (valueSelectGender == dataOption) {
        drop.ActiveOptionItem(
          selectGender,
          optionGender,
          optionGender.children[i]
        );
      }
      optionGender.children[i].addEventListener("click", function () {
        drop.ActiveOptionItem(
          selectGender,
          optionGender,
          optionGender.children[i]
        );
      });
    }

    const selectWorkStatus = document.querySelector("#select-status-form");
    const optionWorkStatus = document.querySelector("#option-status-form");

    let valueSelectWorkStatus = selectWorkStatus
      .querySelector(".text")
      .getAttribute("value");
    for (let i = 0; i < optionWorkStatus.children.length; i++) {
      // lấy ra từng item của option
      let optionItem = optionWorkStatus.children[i];
      // Lấy attribute của từng thẻ được chọn
      let dataOption = optionItem.getAttribute("value");
      // kiểm tra active khi load dữ liệu
      if (valueSelectWorkStatus == dataOption) {
        drop.ActiveOptionItem(
          selectWorkStatus,
          optionWorkStatus,
          optionWorkStatus.children[i]
        );
      }
      optionWorkStatus.children[i].addEventListener("click", function () {
        drop.ActiveOptionItem(
          selectWorkStatus,
          optionWorkStatus,
          optionWorkStatus.children[i]
        );
      });
    }
    const selectDepartment = document.querySelector("#select-department-form");
    const optionDepartment = document.querySelector("#option-department-form");
    let valueselectDepartment = selectDepartment
      .querySelector(".text")
      .getAttribute("value");
    for (let i = 0; i < optionDepartment.children.length; i++) {
      // lấy ra từng item của option
      let optionItem = optionDepartment.children[i];
      // Lấy attribute của từng thẻ được chọn
      let dataOption = optionItem.getAttribute("value");
      // kiểm tra active khi load dữ liệu
      if (valueselectDepartment == dataOption) {
        drop.ActiveOptionItem(
          selectDepartment,
          optionDepartment,
          optionDepartment.children[i]
        );
      }
      optionDepartment.children[i].addEventListener("click", function () {
        drop.ActiveOptionItem(
          selectDepartment,
          optionDepartment,
          optionDepartment.children[i]
        );
      });
    }

    const selectPositon = document.querySelector("#select-position-form");
    const optionPositon = document.querySelector("#option-position-form");
    let valueSelectPositon = selectPositon
      .querySelector(".text")
      .getAttribute("value");
    for (let i = 0; i < optionPositon.children.length; i++) {
      // lấy ra từng item của option
      let optionItem = optionPositon.children[i];
      // Lấy attribute của từng thẻ được chọn
      let dataOption = optionItem.getAttribute("value");
      // kiểm tra active khi load dữ liệu
      if (valueSelectPositon == dataOption) {
        drop.ActiveOptionItem(
          selectPositon,
          optionPositon,
          optionPositon.children[i]
        );
      }
      optionPositon.children[i].addEventListener("click", function () {
        drop.ActiveOptionItem(
          selectPositon,
          optionPositon,
          optionPositon.children[i]
        );
      });
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
