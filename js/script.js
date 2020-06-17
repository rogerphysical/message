function prom() {
  var named = prompt("請輸入您的暱稱", "匿名發言者");
  if (named != null) {
    document.getElementById("ritian").innerHTML = named;
  }
}
function save_data() {
  var data = document.getElementById('mes');
  if(data.value != "") {
    var d = new Date();
    var named = document.getElementById('ritian').innerHTML;
    var time = d.getFullYear() + "-" + zero(d.getMonth() + 1) + "-" + zero(d.getDate()) + " " + zero(d.getHours()) + ":" + zero(d.getMinutes()) + ":" + zero(d.getSeconds());
    var datas = {"time": time, "who": named, "con": data.value};
    var datas_json = JSON.stringify(datas);
    localStorage.setItem("message_"+d.getTime(), datas_json);
    data.value = "";
    write_data();
  }
  else {
    alert("留言不能為φ！");
  }
}
function zero(num) {
  if(num < 10) {
    num = "0" + num;
  }
  return num;
}
function write_data() {
  var dataHtml = "";
  var datas = "";
  // var com = document.getElementById("comment");
  // com.innerHTML = "";
  for(var i = 0; i < localStorage.length; i++) {
    var item = localStorage.key(i);
    if (item.substr(0, 8) === "message_") {
      datas = localStorage.getItem(item);
      var datas_c = JSON.parse(datas);
      dataHtml += "<div class=\"comment\"><div class=\"comment1\">" + datas_c.who + "</div><div class=\"comment2\">" + datas_c.time + "</div><div class=\"comment3\">" + datas_c.con + "</div></div>";
    }
    
    // var newdiv = document.createElement('div');
    // newdiv.setAttribute('class','comment');
    // newdiv.innerHTML = "<div>" + datas_c.who + "</div>" + "<div>" + datas_c.time + "</div>" + "<div>" + datas_c.con + "</div>";
    // com.appendChild(newdiv);
    
  }
  document.getElementById("comment").innerHTML = dataHtml;
}
function delete_data() {
  var judge = confirm("確定清空留言嗎?");
  if (judge == true) {
    for(var i = localStorage.length-1; i >= 0 ; i--) {
      var item = localStorage.key(i);
      if (item.substr(0, 8) === "message_") {
        localStorage.removeItem(item);
      }
    }
    write_data();
  }
}
window.onload = function() {
	write_data();
}