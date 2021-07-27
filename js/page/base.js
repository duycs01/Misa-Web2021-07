class Base extends Common {
  constructor(tableId, urltable) {
    super();
    this.tableId = tableId;
    this.urltable = urltable;
    // this.loadData();
  }
  /**
   * Hàm tạo bảng và load dữ liệu
   * Create by: nvduy(19/7/2021)
   */
  loadData() {
    let me = this;
    if (me.tableId == null) {
      console.log("Thêm tableID");
      return;
    }
    try {
      //   gọi api lấy dữ liệu
      let res = Common.callRequest("GET", me.urltable);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let a = document.querySelector(`${me.tableId} #table-body`);
          console.log("before", a);
          a.innerHTML = "";
          console.log("after", a);

          //2.Sử lí dữ liệu
          // convert json
          const entities = JSON.parse(this.responseText);

          // 2.1 Duyệt tưng đối tượng
          entities.forEach((entity) => {
            // xác định các cột dữ liệu - bao nhiêu cột
            let columns = document.querySelectorAll(`${me.tableId} th`);

            // Lấy prop-id của hàng phần head table
            let rowOfHeadTable = document.querySelector(`${me.tableId} tr`);
            let propId = rowOfHeadTable.getAttribute("prop-id");

            // xác định dữ liệu mỗi cột sẽ tương ứng với thông tin nào
            let trHTML = document.createElement("TR");
            trHTML.setAttribute("value", entity[propId]);

            // Thêm dữ liệu vào từng cột
            columns.forEach((col) => {
              const propName = col.getAttribute("prop-name");

              let value = entity[propName];
              let tdHTML = document.createElement("TD");
              switch (propName) {
                case "DateOfBirth":
                  value = Common.fomatDate(value, tdHTML);
                  break;
                case "Salary":
                  value = Common.fomatMoney(value, tdHTML);
                  break;
                case "Gender":
                  value = Common.fomatGenderToName(value, tdHTML);
                  break;
                case "WorkStatus":
                  value = Common.fomatWorkStatusToName(value);
                  break;
                case "#":
                  trHTML.innerHTML = `<td><div class="check-box"><input type="checkbox"><span class="checkmark"></span></div></tr>`
                  break;
                default:
                  break;
              }
              if (propName !== '#') {
                tdHTML.append(value);
                trHTML.append(tdHTML);
              }
            });

            // Hiển thị giá trị ra màn hình
            let tbodyHTML = document.createElement("TBODY");
            tbodyHTML.append(trHTML);
            trHTML.ondblclick = function () {
              let modal = document.querySelector(EmployeeCode.modalId);
              modal.classList.toggle("block");
              var dataId = trHTML.getAttribute("value");
              me.getDataById(dataId);
              modal.setAttribute("form-mode", 0);
            };
            document.querySelector(`${me.tableId} tbody`).append(trHTML);
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Hàm lấy dữ liệu nhân viên và hiển thị lên form
   * @param {*} id Id nhân viên cần lấy
   * Create by: nvduy(19/7/2021)
   */
  getDataById(id) {
    let me = this;
    try {
      // 1. Gọi api lấy dữ liệu
      let res = Common.callRequest("GET", this.urltable + id);
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const data = JSON.parse(this.responseText);
          // Hiển thị dữ liệu ra form
          me.bindingData(data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Hàm thêm dữ liệu
   * Create by: nvduy(19/7/2021)
   */
  insertData() {
    let me = this;
    let check = Common.checkInputRequired();
    if (!check) {
      EmployeeCode.getFormData();
      try {
        let res = Common.callRequest(
          "POST",
          me.urltable,
          EmployeeCode.employeeData
        );
        res.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 201) {
            let data = JSON.parse(this.responseText);
            console.log(data);
            if (data) {
              alert("Thêm thành công");
              EmployeeCode.resetData();
              me.loadData();
            }
          }
        };
      } catch (error) {
        alert("Đã thêm thất bại! Vui lòng liên hệ Dev");
        console.log(error);
      }
    }
  }

  /**
   * Hàm sửa dữ liệu nhân viên
   * Create by: nvduy(20/7/2021)
   */
  updataData() {
    let me = this;
    let check = Common.checkInputRequired();
    if (!check) {
      EmployeeCode.getFormData();
      try {
        let res = Common.callRequest(
          "PUT",
          me.urltable + EmployeeCode.employeeData.employeeId,
          EmployeeCode.employeeData
        );
        res.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            if (data) {
              alert("Đã sửa thành công");
              EmployeeCode.resetData();
              me.loadData();
            }
          }
        };
      } catch (error) {
        alert("Đã sửa thất bại! Vui lòng liên hệ Dev");
        console.log(error);
      }
    }
  }

  /**
   * Hàm xóa dữ liệu nhân viên
   * Create by: nvduy(20/7/2021)
   */
  deleteDataById(id) {
    let me = this;

    try {
      let res = Common.callRequest(
        "DELETE",
        me.urltable + id,
      );
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          if (data) {
            alert("Đã xóa thành công");
            me.loadData();
          }
          else {
            alert("Đã xóa thất bại! Vui lòng liên hệ Dev");
          }
        }
      };
    } catch (error) {
      alert("Đã sửa thất bại! Vui lòng liên hệ Dev");
      console.log(error);
    }
  }
}

class Dropdown extends Common {
  constructor(dropdown) {
    super();
    this.selectId = dropdown.selectId;
    this.optionId = dropdown.optionId;
    this.urlDropdown = dropdown.urlDropdown;
    // this.loadDataDropdown();
  }

  /**
   * Hàm Lấy data dropdown position và hiển thị
   * Create by: nvduy(19/7/2021)
   */
  loadDataDropdown() {
    let me = this;

    // khai báo dropdown trong form

    try {
      // 1. Gọi api lấy tất cả dữ liệu
      const res = Common.callRequest("GET", me.urlDropdown);
      // Lấy dữ liệu Hiển thị ra màn hình

      // 2. Khi api trả response về thực hiện các chức năng
      res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Chuyển đổi chuỗi json
          const dataDropdown = JSON.parse(this.responseText);

          let select = document.querySelector(`${me.selectId}`);
          let options = document.querySelector(`${me.optionId}`);
          let propId = select.getAttribute("prop-id");
          let propName = select.getAttribute("prop-name");
          const icon = `<span class="icon">
                  <i class="fas fa-check"></i>
                </span>`;

          // bắt sự kiện ẩn hiện dropdown
          Dropdown.btnDropdown(me.selectId, me.optionId);

          // 2.1 Duyệt từng phần tử hiển thị ra màn hình
          dataDropdown.forEach((item) => {
            let optionItem = document.createElement("DIV");
            optionItem.className = "option-item";
            optionItem.setAttribute("value", item[propId]);

            // 2.2 Hiển thị dữ liệu ra giao diện
            optionItem.innerHTML = icon + item[propName];
            options.insertBefore(optionItem, options.childNodes[0]);
            // 2.3 Bắt sự kiện click khi nhấn vào option item
            if (optionItem) {
              optionItem.addEventListener("click", function () {
                Dropdown.activeOptionItem(select, options, optionItem);
              });
            }
          });

          // Bắt sự kiện click khi nhấn vào option mặc định ở cuối
          let lastIndexOptionItem =
            options.children[options.children.length - 1];
          lastIndexOptionItem.addEventListener("click", function () {
            Dropdown.activeOptionItem(select, options, lastIndexOptionItem);
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  }


  /**
   *Hàm bật sử lí click dropdown
   * @param {*} selectId Id của select dropdown
   * @param {*} optionId Id của option chứa option item
   * Create by: nvduy(19/7/2021)
   */
  static btnDropdown(selectId, optionId) {
    let me = this;
    // 1. Kiểm tra click
    let click = false;
    let select = document.querySelector(selectId);
    // 2. bắt sự kiện click vào dropdown

    select.addEventListener("focusin", function () {
      // thay đổi trạng thái của click
      click = !click;
      //Thực hiện thay đổi khi click
      if (click) {
        Dropdown.showHideDropdown(selectId, optionId, true);
      } else {
        Dropdown.showHideDropdown(selectId, optionId, false);
      }
      // 3.Bắt sự kiện click ra ngoài dropdown
      if (click) {
        console.log(click);
        window.addEventListener("click", function (e) {
          if (e.target !== select && !select.contains(e.target) && click) {
            Dropdown.showHideDropdown(selectId, optionId, false);
            click = !click;
          }
        });
      }
    });
    // if (click) {
    //   window.addEventListener("onkeyup", function (e) {
    //     if ((e.key === "Enter" && click) || (e.keyCode === 13 && click)) {
    //       me.hidedrop(selectId, optionId);
    //       click = !click;
    //     }
    //   });
    // }
  }

  /**
   * Hàm sử lí ẩn hiện dropdown khi click
   * Create by: 19/7/2020 nvduy
   */
  static showHideDropdown(selectId, optionId, click) {
    let select = document.querySelector(selectId);
    let icon = document.querySelector(`${selectId} i`);
    let option = document.querySelector(optionId);
    if (click) {
      option.style = "display:block";
      select.style = "border-color:#019160";
      icon.style = "transform: rotate(180deg)";
    } else {
      option.style = "display:none";
      select.style = "border-color:#bbbbbb";
      icon.style = "transform: rotate(0deg)";
    }
  }

  /**
   * Hàm sử lí active option item dropdown
   * Create by: 19/7/2020 nvduy
   */
  static activeOptionItem(select, option, optionItem) {
    let textOfSelect = select.querySelector(".text");
    let optionActive = option.querySelector(".active");

    optionActive.classList.remove("active");
    optionItem.className += " active";

    let valueOptionItem = optionItem.getAttribute("value");

    if (textOfSelect.tagName == "INPUT") {
      textOfSelect.value = optionItem.innerText;
      textOfSelect.setAttribute("value", valueOptionItem);
    } else {
      textOfSelect.innerHTML = optionItem.innerText;
      textOfSelect.setAttribute("value", valueOptionItem);
    }
  }
}
