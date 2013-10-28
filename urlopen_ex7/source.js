var InputUrl = function() {
  var url = "";
  while(url.trim().length == 0) {
  	url = prompt("Enter the url" , "");
  	if (url.trim().length != 0) { 
  		window.open(url, "_blank", "width = 400 height = 450 resizable = no scrollable = no status = no toolbar = no ");
  		break; 
  	}
  	alert("You cannot enter blank url");
  }  
}
InputUrl();