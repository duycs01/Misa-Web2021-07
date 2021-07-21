//** Hàm viết tắt cú pháp lấy id và class */
var $ = function (e) {
  if (e.includes("#")) {
    return document.querySelector(e);
  }

  return document.querySelectorAll(e);
};
