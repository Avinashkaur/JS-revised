var Regex = {

  EMAIL: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  URL: /((ftp|http|https|gopher):\/\/)?((www)\.)?(\w+)(\.)(\w*)(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i

}

var Validations = function() {
  this.init();
}

Validations.prototype = {

  init: function() {  
  },

  checkPattern: function(element, regex) {
    var user_input = element.value.trim(),
        status = true;
    
    if (!(regex.test(user_input))) {
      alert("Please enter a valid " + element.id + " address.");
      element.focus();
      status = false;
    } 
    return status;
  }

}

window.onload = function() {
  var validations_object = new Validations(),
      user_form = document.getElementById('user-form'),
      email_input = document.getElementById('email'),
      url_input = document.getElementById('url');

  user_form.onsubmit = function() {
    var email_status = validations_object.checkPattern(email_input, Regex.EMAIL),
        url_status = validations_object.checkPattern(url_input, Regex.URL);

    return  email_status && url_status; 
           
  }

  email_input.onchange = function() {
    validations_object.checkPattern(email_input, Regex.EMAIL);
  }

  url_input.onchange = function() {
    validations_object.checkPattern(url_input, Regex.URL);
  }

} 