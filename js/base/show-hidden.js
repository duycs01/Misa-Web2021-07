//** Hàm mở modal
function showDropdown(idSelector, idShow) {
  var click = false;
  var icon = idSelector.getElementsByTagName("i");

  idSelector.onclick = function () {
    click = !click;
    if (click && icon) {
      idShow.style = "display:block";
      idSelector.style = "border-color:#019160";
      icon[0].style = "transform: rotate(180deg)";
    } else if (!click && icon) {
      idShow.style = "display:none";
      idSelector.style = "border-color:#bbbbbb";
      icon[0].style = "transform: rotate(0deg)";
    }
  };
  if (!click && icon[0]) {
    window.addEventListener("click", function (e) {
      if (e.target !== idSelector && !idSelector.contains(e.target)) {
        click = !click;
        idShow.style = "display:none";
        idSelector.style = "border-color:#bbbbbb";
        icon[0].style = "transform: rotate(0deg)";
      }
    });
  }
}

function showModal(idSelector, idShow) {
  idSelector.onclick = function () {
    idShow.classList.toggle("block");
    resetData();
  };
}
