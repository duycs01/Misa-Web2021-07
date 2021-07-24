function tableEmployee() {
  const urlDepartment = "http://cukcuk.manhnv.net/v1/Employees";
  const idTableBody = $("#table-body");
  try {
    // 1. Gọi api lấy tất cả dữ liệu
    const res = CallRequest("GET", urlDepartment);

    // 2. Khi api trả response về thực hiện các chức năng
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // convert json
        const data = JSON.parse(this.responseText);
        console.log(data);

        // Hiển thị dữ liệu ra màn hình
        let rowTable = "";
        data.forEach((item, index) => {
          let Salary = money(item.Salary);
          let DateOfBirth = fomatDate(item.DateOfBirth);
          let WorkStatus = workStatus(item.WorkStatus);

          rowTable += `<tr data-row='${item.EmployeeId}'><td>${
            index + 1
          }</td><td>${item.EmployeeCode}</td><td>${
            item.FullName
          }</td><td class="text-center">${
            item.GenderName
          }</td><td class="text-center date">${DateOfBirth}</td><td class="text-center">${
            item.PhoneNumber
          }</td><td>${item.Email}</td><td>${item.PositionName}</td><td>${
            item.DepartmentName
          }</td><td class="text-right money">${Salary}</td><td>${WorkStatus}</td></tr>`;
        });
        idTableBody.innerHTML = rowTable;
        var rows = idTableBody.children;
        if (rows) {
          for (let i = 0; i < rows.length; i++) {
            rows[i].ondblclick = function (e) {
              $("#modal-info").classList.toggle("block");
              var dataId = rows[i].getAttribute("data-row");
              $("#btn-save").setAttribute("control", "edit");
              getEmployeeById(dataId);
            };
          }
        }
      }
    };
  } catch (error) {
    console.log(error);
  }
}

function renderDataTable(idTableBody, dataTable) {}
