/**
 * Hàm Lấy data dropdown department và hiển thị
 * Create by: nvduy(19/7/2021)
 */
function departmentDropdown() {
  const urlDepartment = "http://cukcuk.manhnv.net/api/Department";

  try {
    // 1. Gọi api lấy tất cả dữ liệu
    const res = CallRequest("GET", urlDepartment);

    // 2. Khi api trả response về thực hiện các chức năng
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Chuyển đổi chuỗi json
        const data = JSON.parse(this.responseText);

        // Hiển thị dữ liệu ra màn hình
        let optionItem = "";
        data.forEach((item) => {
          optionItem += `<div class="option-item"tabindex='16'><span class="icon"><i class="fas fa-check"></i></span>${item.DepartmentName}</div>`;
        });
        $("#option-department").innerHTML =
          optionItem + $("#option-department").innerHTML;
        $("#option-department-form").innerHTML =
          optionItem + $("#option-department-form").innerHTML;
        // Thực hiện bật tắt dropdown
        // - Truyền vào id của dropdown và id của hộp chứa dropdown item
        showDropdown("#select-department", "#option-department");
        showDropdown("#select-department-form", "#option-department-form");

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
    const res = CallRequest("GET", urlPosition);

    // 2. Khi api trả response về thực hiện các chức năng
    res.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Chuyển đổi chuỗi json
        const data = JSON.parse(this.responseText);
        // Lấy dữ liệu Hiển thị ra màn hình
        let optionItem = "";
        data.forEach((item, index) => {
          optionItem += `<div class="option-item" value='${item.PositionId}' tabindex='14'><span class="icon"><i class="fas fa-check"></i></span>${item.PositionName}</div>`;
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
  const optionItems = $(idOption).children;
  // Lấy attribute của dropdown
  let selectText = $(`${idSelect} .text`);
  let attrSelect = selectText.getAttribute("value");
  let dataOption, optionItem;
  // Lấy ra thẻ có class active trong danh sách option
  for (let i = 0; i < optionItems.length; i++) {
    // lấy ra từng item của option
    optionItem = optionItems[i];
    // Lấy attribute của từng thẻ được chọn
    dataOption = optionItem.getAttribute("value");
    // kiểm tra active khi load dữ liệu
    if (attrSelect == dataOption) {
      ActiveOptionItem(idOption, optionItem, selectText);
    }
    // Bắt sự kiện active khi chọn option item
    optionItems[i].onclick = function () {
      ActiveOptionItem(idOption, this, selectText);
    };
    let a = false;
    optionItems[i].addEventListener("focusin", function () {
      ActiveOptionItem(idOption, this, selectText);
    });
  }
}

// Hàm sử lí active
function ActiveOptionItem(idOption, optionItem, selectText) {
  let active = $(`${idOption} .active`);
  let valueOptionItem, text;

  // Xóa class active của thẻ đó
  active.classList.remove("active");

  // Nút thỏa mãn điều kiện if sẽ được thêm class active
  optionItem.className += " active";

  // Lấy attribute của thẻ được chọn
  valueOptionItem = optionItem.getAttribute("value");

  // Sử lí khoảng trắng trước input
  text = optionItem.textContent.replaceAll("  ", "");

  // Gán text và value của option cho select
  if (selectText.tagName == "INPUT") {
    selectText.value = text;
    selectText.setAttribute("value", valueOptionItem);
  } else {
    selectText.innerHTML = text;
    selectText.setAttribute("value", valueOptionItem);
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

  // 2. bắt sự kiện click vào dropdown
  // $(idSelector).onclick = function () {
  //   // thay đổi trạng thái của click
  //   click = !click;

  //   //Thực hiện thay đổi khi click
  //   if (click) {
  //     showDrop(idSelector, idShow);
  //   } else {
  //     hidedrop(idSelector, idShow);
  //   }
  //   // 3.Bắt sự kiện click ra ngoài dropdown
  //   if (click) {
  //     window.addEventListener("click", function (e) {
  //       if (
  //         e.target !== $(idSelector) &&
  //         !$(idSelector).contains(e.target) &&
  //         click
  //       ) {
  //         hidedrop(idSelector, idShow);
  //         click = !click;
  //       }
  //     });
  //   }
  // };
  $(idSelector).addEventListener("focusin", function () {
    // thay đổi trạng thái của click
    click = !click;
    //Thực hiện thay đổi khi click
    if (click) {
      showDrop(idSelector, idShow);
    } else {
      hidedrop(idSelector, idShow);
    }
    // 3.Bắt sự kiện click ra ngoài dropdown
    if (click) {
      window.addEventListener("click", function (e) {
        if (
          e.target !== $(idSelector) &&
          !$(idSelector).contains(e.target) &&
          click
        ) {
          hidedrop(idSelector, idShow);
          click = !click;
        }
      });
    }
  });
  if (click) {
    window.addEventListener("onkeyup", function (e) {
      if ((e.key === "Enter" && click) || (e.keyCode === 13 && click)) {
        hidedrop(idSelect, idOption);
        click = !click;
      }
    });
  }

  // // 3.Bắt sự kiện focusout ra ngoài dropdown
  // $(idSelector).addEventListener("focusout", function () {
  //   console.log("outfocus", click);
  //   click = !click;

  //   if (!click) {
  //     hidedrop(idSelect, idOption, icon);
  //   }
  // });
}

function showDrop(idSelector, idShow) {
  let icon = $(`${idSelector} i`);

  $(idShow).style = "display:block";
  $(idSelector).style = "border-color:#019160";
  icon.style = "transform: rotate(180deg)";
}
function hidedrop(idSelector, idShow) {
  let icon = $(`${idSelector} i`);

  $(idShow).style = "display:none";
  $(idSelector).style = "border-color:#bbbbbb";
  icon.style = "transform: rotate(0deg)";
}
