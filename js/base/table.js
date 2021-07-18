function renderDataTable(idTableBody, dataTable) {
  let rowTable = "";
  dataTable.forEach((item, index) => {
    rowTable += `<tr data-row='${item.id}'><td>${index + 1}</td><td>${
      item.id
    }</td><td>${item.fullName}</td><td class="text-center">${
      item.general.name
    }</td><td class="text-center">${
      item.birthOfDay
    }</td><td class="text-center">${item.phone}</td><td>${item.email}</td><td>${
      item.employeePositon.name
    }</td><td>${item.department.name}</td><td class="text-right money">${
      item.salary
    }</td><td>${item.jobStatus.name}</td></tr>`;

    item.forEach;
  });
  idTableBody.innerHTML = rowTable;

  var rows = idTableBody.children;
  for (let i = 0; i < rows.length; i++) {
    rows[i].ondblclick = function () {
      $("#modal-info").classList.toggle("block");
      var dataId = rows[i].getAttribute("data-row");
      getDataById(dataId, data.listEmployee);
      money($("#salary"));
    };
  }
}
