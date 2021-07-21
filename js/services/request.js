function callRequest(method, url, body) {
  const xhr = new XMLHttpRequest();
  try {
    xhr.open(method, url);

    xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
    xhr.setRequestHeader("access-control-allow-credentials", true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader(
      "Access-Control-Allow-Methods",
      "DELETE, POST, GET, OPTIONS"
    );
    xhr.setRequestHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    var data = JSON.stringify(body);
    xhr.send(data);
  } catch (ex) {
    console.log(ex);
  }
  return xhr;
}
