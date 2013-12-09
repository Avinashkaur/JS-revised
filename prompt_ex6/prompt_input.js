var UserInput = function(first_name, last_name) {
  this.init(first_name, last_name);
}

UserInput.prototype = {

  init: function(first_name, last_name) {
    this.first_name = this.promptInput(first_name);
    this.last_name = this.promptInput(last_name);
  },

  promptInput: function(property) {
    var name = "";
    while (name == null || name.trim() == '') {
      name = prompt('Enter your ' + property, '');
    }
    return name.trim();
  },

  showName: function() {
    var welcome_message_element = document.getElementById('message');
    alert('Hello ' + this.first_name + ' ' + this.last_name);
    welcome_message_element.innerText = 'Welcome ' + this.first_name + ' ' + this.last_name;
  }
  
}

window.onload = function() {
  var user_input_object = new UserInput('First name', 'Last Name');
  user_input_object.showName();
}