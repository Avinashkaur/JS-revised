var UserInput = function() {
  this.init();
}

UserInput.prototype = {

  init: function() {
    this.full_name = "";
  },

  promptInput: function(property) {
    var name = "";

    while (name.trim().length == 0) {
      name = prompt('Enter your ' + property, '');
      this.full_name = this.full_name + ' ' + name.trim();
    }
  },

  showName: function() {
    var message = document.getElementById('message');

    alert('Hello' + this.full_name);
    message.innerText = 'Welcome' + this.full_name;
  }
  
}

window.onload = function() {
  var user_input_object = new UserInput();

  user_input_object.promptInput('First Name');
  user_input_object.promptInput('Last Name');
  user_input_object.showName();
}