//** Hàm hiển thị dữ liệu dropdown */
function renderDropdown(idOption, dataOption) {
  let optionItem = "";
  dataOption.forEach((item) => {
    optionItem += `<div class="option-item" value='${item.id}'><span class="icon"><i class="fas fa-check"></i></span>${item.name}</div>`;
  });

  idOption.innerHTML = optionItem;
  idOption.children[idOption.children.length - 1].className += " active";
}

//** Hàm active item */
function checkActive(idSelect, idOption) {
  // lấy những nút ở option
  var optionItem = idOption.children;

  for (let i = 0; i < optionItem.length; i++) {
    optionItem[i].onclick = function () {
      //lấy thằng đang active
      var active = idOption.getElementsByClassName("active");
      // xóa active của nó
      active[0].className = active[0].className.replace("active", "");

      // nút đang click sẽ được active
      optionItem[i].className += " active";

      // lấy text của thằng dropdown
      var textContent = idSelect.getElementsByClassName("text");

      // lấy attribute id của thằng dropdown
      var valueActive = active[0].getAttribute("value");

      if (textContent[0].tagName == "INPUT") {
        textContent[0].value = active[0].textContent;
        textContent[0].setAttribute("data-id", valueActive);
        search();
      } else {
        textContent[0].innerHTML = active[0].textContent;
        textContent[0].setAttribute("data-id", valueActive);
        search();
      }
    };
  }
}
