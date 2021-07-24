/**
 * Hàm lấy dữ liệu nhân viên và hiển thị lên form
 * @param {*} id Id nhân viên cần lấy
 * Create by: nvduy(19/7/2021)
 */
function getEmployeeById(id) {
  const urlEmployee = "http://cukcuk.manhnv.net/v1/Employees/";

  try {
    // 1. Gọi api lấy dữ liệu
    let res = CallRequest("GET", urlEmployee + id);
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        // Hiển thị dữ liệu ra form
        employeeData = data;
        bindingData(employeeData);
      }
    };
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hàm lấy dữ liệu nhân viên và hiển thị lên form
 * @param {*} id Id nhân viên cần lấy
 * Create by: nvduy(20/7/2021)
 */
function updateEmployeeById() {
  const url = "http://cukcuk.manhnv.net/v1/Employees/";
  let check = checkInputRequired();
  if (!check) {
    getFormData();
    try {
      let res = CallRequest("PUT", url + employeeData.employeeId, employeeData);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          if (data) {
            alert("Đã sửa thành công");
          }
          resetData();
          tableEmployee();
        }
      };
    } catch (error) {
      alert("Đã sửa thất bại! Vui lòng liên hệ Dev");
      console.log(error);
    }
  }
}

function insertEmployee() {
  const url = "http://cukcuk.manhnv.net/v1/Employees";
  let check = checkInputRequired();
  if (!check) {
    getFormData();
    try {
      let res = CallRequest("POST", url, employeeData);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
          let data = JSON.parse(this.responseText);
          console.log(data);
          if (data) alert("Thêm thành công");
          resetData();
          tableEmployee();
        }
      };
    } catch (error) {
      alert("Đã thêm thất bại! Vui lòng liên hệ Dev");
      console.log(error);
    }
  }
}

function getNewEmployeeCode() {
  const url = "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode";
  try {
    let res = CallRequest("GET", url);
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = this.responseText;
        console.log(this.responseText);
        $("#txtEmployeeCode").value = data;
      }
    };
  } catch (error) {
    alert("Lấy mã thất bại! Vui lòng liên hệ Dev nvduy");
    console.log(error);
  }
}

// Hàm hiển thị dữ liệu vào form
function bindingData(data) {
  // Hàm sử lí tiền tệ
  debugger;
  console.log($("#select-status-form").children[0]);

  let salary = money(data.Salary);
  let DateOfBirth = fomatDateForm(data.DateOfBirth);
  let IdentityDate = fomatDateForm(data.IdentityDate);
  let JoinDate = fomatDateForm(data.JoinDate);
  console.log(DateOfBirth);
  console.log(IdentityDate);
  console.log(JoinDate);

  employeeData.employeeId = data.EmployeeId;
  $("#txtEmployeeCode").value = data.EmployeeCode;
  $("#txtFullName").value = data.FullName;
  $("#txtBirthOfDay").value = DateOfBirth;
  $("#select-gender").children[0].setAttribute("value", data.Gender);
  $("#txtIdentityNumber").value = data.IdentityNumber;
  $("#txtIdentityPlace").value = data.IdentityPlace;
  $("#txtIdentityDate").value = IdentityDate;
  $("#txtPhone").value = data.PhoneNumber;
  $("#txtEmail").value = data.Email;
  $("#select-position-form").children[0].setAttribute("value", data.PositionId);
  $("#select-department-form").children[0].setAttribute(
    "value",
    data.DepartmentId
  );
  $("#txtTaxCode").value = data.PersonalTaxCode;
  $("#txtSalary").value = salary;
  $("#txtDayOfJoin").value = JoinDate;
  $("#select-status-form").children[0].setAttribute("value", data.WorkStatus);
  console.log($("#select-status-form").children[0]);

  dropdownOfForm();
}

// Xóa trắng dữ liệu form
function resetData() {
  $("#txtEmployeeCode").value = "";
  $("#txtFullName").value = "";
  $("#txtBirthOfDay").value = "";
  $("#select-gender").children[0].setAttribute("value", 2);
  $("#txtIdentityNumber").value = "";
  $("#txtIdentityPlace").value = "";
  $("#txtIdentityDate").value = "";
  $("#txtPhone").value = "";
  $("#txtEmail").value = "";
  $("#select-position-form").children[0].setAttribute("value", "");
  $("#select-department-form").children[0].setAttribute("value", "");
  $("#txtTaxCode").value = "";
  $("#txtSalary").value = "";
  $("#txtDayOfJoin").value = "";
  $("#select-status-form").children[0].setAttribute("value", 1);
  dropdownOfForm();
}

// Hàm lấy dữ liệu từ form
function getFormData() {
  debugger;
  let val = $("#txtSalary").value;
  let workStatus = +$("#select-status-form").children[0].getAttribute("value");
  let salary = +val.replaceAll(".", "");
  employeeData.EmployeeCode = $("#txtEmployeeCode").value;
  employeeData.FullName = $("#txtFullName").value;
  employeeData.DateOfBirth = $("#txtBirthOfDay").value;
  employeeData.Gender = $("#select-gender").children[0].getAttribute("value");
  employeeData.IdentityNumber = $("#txtIdentityNumber").value;
  employeeData.IdentityPlace = $("#txtIdentityPlace").value;
  employeeData.IdentityDate = $("#txtIdentityDate").value;
  employeeData.PhoneNumber = $("#txtPhone").value;
  employeeData.Email = $("#txtEmail").value;
  employeeData.PositionId = $("#select-position-form").children[0].getAttribute(
    "value"
  );
  employeeData.DepartmentId = $(
    "#select-department-form"
  ).children[0].getAttribute("value");
  employeeData.PersonalTaxCode = $("#txtTaxCode").value;
  employeeData.Salary = salary;
  employeeData.JoinDate = $("#txtDayOfJoin").value;
  employeeData.WorkStatus = workStatus;
}
// Hàm bắt buộc nhập
// kiểm tra dữ lệu bắt buộc nhập

// $("#txtEmployee").blur = function () {
//   let value = $("#txtEmployee").value;
//   if(value =='')
// };

// Hàm fomat number trong input
$("#txtSalary").oninput = function () {
  let salary = $("#txtSalary").value;
  let num = +salary.replaceAll(".", "");
  let fomat = money(num);
  console.log(fomat);
  $("#txtSalary").value = fomat;
};

function dropdownOfForm() {
  // Thực hiện bật tắt dropdown trong form
  showDropdown("#select-gender", "#option-gender");
  showDropdown("#select-status-form", "#option-status-form");
  showDropdown("#select-position-form", "#option-position-form");
  showDropdown("#select-department-form", "#option-department-form");

  // Kiểm tra active của dropdown trong form
  checkActive("#select-gender", "#option-gender");
  checkActive("#select-status-form", "#option-status-form");
  checkActive("#select-department-form", "#option-department-form");
  checkActive("#select-position-form", "#option-position-form");
}

for (let i = 0; i < $("input[required]").length; i++) {
  let check = false;

  $("input[required]")[i].addEventListener("blur", function () {
    alertInput(this, check);
  });
}

function checkInputRequired() {
  let check = false;
  for (let i = 0; i < $("input[required]").length; i++) {
    let input = $("input[required]")[i];
    check = alertInput(input, check);
  }
  return check;
}
function alertInput(input, check) {
  let label = $(`label[for="${input.id}"]`);
  if (input.value == "" && check == false) {
    label[0].className += " tooltip";
    input.className += " border-red";
    input.focus();
    check = true;
  } else {
    label[0].classList.remove("tooltip");
    input.classList.remove("border-red");
  }
  return check;
}
