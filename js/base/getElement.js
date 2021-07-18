//** Hàm viết tắt cú pháp lấy id và class */
var $ = function (e) {
    if (e.includes("#")) {
      var str = e.split("#");
      return document.getElementById(str[1]);
    }
    if (e.includes(".")) {
      var str = e.split(".");
      return document.getElementsByClassName(str[1]);
    }
  };