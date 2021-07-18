function money(money) {
  var text;
  if (money.tagName == "INPUT") {
    text = +money.value;
    money.value = text.toLocaleString("de-DE");
  } else {
    text = +money.innerText;
    money.innerText = text.toLocaleString("de-DE");
  }
}
