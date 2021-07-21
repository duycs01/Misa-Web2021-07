/**
 * Hàm Lấy data dropdown department và hiển thị
 * Create by: nvduy(19/7/2021)
 */
function departmentDropdown() {
  const urlDepartment = "http://cukcuk.manhnv.net/api/Department";

  try {
    // 1. Gọi api lấy tất cả dữ liệu
    const res = callRequest("GET", urlDepartment);

    // 2. Khi api trả response về thực hiện các chức năng
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Chuyển đổi chuỗi json
        const data = JSON.parse(this.responseText);

        // Hiển thị dữ liệu ra màn hình
        let optionItem = "";
        data.forEach((item) => {
          optionItem += `<div class="option-item" value='${item.DepartmentId}'><span class="icon"><i class="fas fa-check"></i></span>${item.DepartmentName}</div>`;
        });
        $("#option-department").innerHTML =
          optionItem + $("#option-department").innerHTML;
        $("#option-department-form").innerHTML =
          optionItem + $("#option-department-form").innerHTML;
        // Thực hiện bật tắt dropdown
        // - Truyền vào id của dropdown và id của hộp chứa dropdown item
        showDropdown("#select-department", "#option-department");
        showDropdown("#select-department-form", "#option-department-form");
        focusDropdown("#select-department", "#option-department");

        // Kiểm tra active của dropdown
        // - Truyền vào id của dropdown và id của hộp chứa dropdown item
        checkActive("#select-department", "#option-department");
        checkActive("#select-department-form", "#option-department-form");
      }
    };
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hàm Lấy data dropdown position và hiển thị
 * Create by: nvduy(19/7/2021)
 */
function positionDropdown() {
  const urlPosition = "http://cukcuk.manhnv.net/v1/Positions";

  // khai báo dropdown trong form

  try {
    // 1. Gọi api lấy tất cả dữ liệu
    const res = callRequest("GET", urlPosition);

    // 2. Khi api trả response về thực hiện các chức năng
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Chuyển đổi chuỗi json
        const data = JSON.parse(this.responseText);
        // Lấy dữ liệu Hiển thị ra màn hình
        let optionItem = "";
        data.forEach((item) => {
          optionItem += `<div class="option-item" value='${item.PositionId}'><span class="icon"><i class="fas fa-check"></i></span>${item.PositionName}</div>`;
        });

        // 2. Hiển thị dữ liệu ra giao diện
        // - Hiển thị dropdown ngoài màn hình chính
        $("#option-employeePositon").innerHTML =
          optionItem + $("#option-employeePositon").innerHTML;

        // - Hiển thị dropdown trong form
        $("#option-position-form").innerHTML =
          optionItem + $("#option-position-form").innerHTML;
        // Thực hiện bật tắt dropdown ngoài màn hình chính
        showDropdown("#select-employeePositon", "#option-employeePositon");

        // Thực hiện bật tắt dropdown trong form
        showDropdown("#select-position-form", "#option-position-form");
        // Kiểm tra active của dropdown ngoài màn hình chính
        checkActive("#select-employeePositon", "#option-employeePositon");

        // Kiểm tra active của dropdown  trong form
        checkActive("#select-position-form", "#option-position-form");
      }
    };
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hàm active các lựa chọn của dropdown
 * @param {idSelect} idSelect Id của dropdown
 * @param {idOption} idOption Id của hộp chứa dropdown item
 * Create by: nvduy(19/7/2021)
 */
function checkActive(idSelect, idOption) {
  // lấy những nút dropdown item
  const optionItem = $(idOption).children;
  // Lấy attribute của dropdown
  let selectText = $(`${idSelect} .text`);
  let attrSelect = selectText.getAttribute("value");
  let dataOption, active, valueActive, text;

  for (let i = 0; i < optionItem.length; i++) {
    // Lấy attribute của từng thẻ được chọn
    dataOption = optionItem[i].getAttribute("value");
    if (attrSelect == dataOption) {
      // Lấy ra thẻ có class active trong danh sách option
      active = $(`${idOption} .active`);

      // Xóa class active của thẻ đó
      active.classList.remove("active");

      // Nút thỏa mãn điều kiện if sẽ được thêm class active
      optionItem[i].className += " active";

      // Lấy attribute của thẻ được chọn
      valueActive = optionItem[i].getAttribute("value");

      // Sử lí khoảng trắng trước input
      text = optionItem[i].textContent.replaceAll("  ", "");

      // Gán text và value của option cho select
      if (selectText.tagName == "INPUT") {
        selectText.value = text;
        selectText.setAttribute("value", valueActive);
      } else {
        selectText.innerHTML = text;
        selectText.setAttribute("value", valueActive);
      }
    }
    optionItem[i].onclick = function () {
      // Lấy ra thẻ có class active trong danh sách option
      active = $(`${idOption} .active`);
      // Xóa class active của thẻ đó
      active.classList.remove("active");

      // Nút thỏa mãn điều kiện if sẽ được thêm class active
      optionItem[i].className += " active";

      // Lấy thẻ có chứa text của select dropdown
      // textContent = idSelect.getElementsByClassName("text");

      // Lấy attribute của thẻ được chọn
      valueActive = optionItem[i].getAttribute("value");

      // Sử lí khoảng trắng trước input
      text = optionItem[i].textContent.replaceAll("  ", "");
      // Gán text và value của option cho select
      if (selectText.tagName == "INPUT") {
        selectText.value = text;
        selectText.setAttribute("value", valueActive);
      } else {
        selectText.innerHTML = text;
        selectText.setAttribute("value", valueActive);
      }
    };
  }
}

/**
 *Hàm bật tắt dropdown
 * @param {*} idSelector Id của dropdown
 * @param {*} idShow Id của hộp chứa dropdown item
 * Create by: nvduy(19/7/2021)
 */
function showDropdown(idSelector, idShow) {
  // 1. Kiểm tra click
  let click = false;
  let icon = $(`${idSelector} i`);
  // 2. bắt sự kiện click vào dropdown
  $(idSelector).onclick = function (e) {
    // thay đổi trạng thái của click
    click = !click;
    console.log(e);
    //Thực hiện thay đổi khi click
    if (click && icon) {
      $(idShow).style = "display:block";
      $(idSelector).style = "border-color:#019160";
      icon.style = "transform: rotate(180deg)";
    } else if (!click && icon) {
      $(idShow).style = "display:none";
      $(idSelector).style = "border-color:#bbbbbb";
      icon.style = "transform: rotate(0deg)";
    }
    // 3.Bắt sự kiện click ra ngoài dropdown
    if (click && icon) {
      window.addEventListener("click", function (e) {
        if (e.target !== $(idSelector) && !$(idSelector).contains(e.target)) {
          click = !click;
          $(idShow).style = "display:none";
          $(idSelector).style = "border-color:#bbbbbb";
          icon.style = "transform: rotate(0deg)";
        }
      });
    }
  };
}

function focusDropdown(idSelector, idShow) {
  // 1. Kiểm tra focus
  let click = false;
  let icon = $(`${idSelector} i`);
  // 2. bắt sự kiện focus vào dropdown

  $(idSelector).addEventListener("focusin", function () {
    // thay đổi trạng thái của click
    click = !click;

    //Thực hiện thay đổi khi click
    if (click && icon) {
      $(idShow).style = "display:block";
      $(idSelector).style = "border-color:#019160";
      icon.style = "transform: rotate(180deg)";
    } else if (!click && icon) {
      $(idShow).style = "display:none";
      $(idSelector).style = "border-color:#bbbbbb";
      icon.style = "transform: rotate(0deg)";
    }
    // 3.Bắt sự kiện click ra ngoài dropdown
    if (click && icon) {
      $(idSelector).addEventListener("blur", function (e) {
        if (e.target !== $(idSelector) && !$(idSelector).contains(e.target)) {
          click = !click;
          $(idShow).style = "display:none";
          $(idSelector).style = "border-color:#bbbbbb";
          icon.style = "transform: rotate(0deg)";
        }
      });
    }
  });
}
