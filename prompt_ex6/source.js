var fullname = "";
var UserInput = function(value) {
  var name = "";
  while (name.trim().length == 0) {
    name = prompt("Enter your " + value, "");
    fullname = fullname + " " + name.trim();
  }  
}
var ShowName = function() {
  alert("Hello" + fullname);
  document.getElementById('message').innerText = "Welcome" + fullname;
}
UserInput('First Name');
UserInput('Last Name');
ShowName();