var buttons = document.getElementsByClassName("button");
var activeSheet = document.getElementById("active-stylesheet");

if(localStorage.getItem("lastActiveSheet")){
  activeSheet.setAttribute("href", localStorage.getItem("lastActiveSheet"));
}

for(var i=0; i<buttons.length; i++){
  buttons[i].addEventListener('click', switchStyle);
}

function switchStyle() {
  var selectedSheet = this.getAttribute('data-stylesheet');
  activeSheet.setAttribute("href", selectedSheet);
  localStorage.setItem("lastActiveSheet", selectedSheet);
}