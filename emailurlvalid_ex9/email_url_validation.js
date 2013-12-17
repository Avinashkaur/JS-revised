var Regex = {

  EMAIL: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]{2,}(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
  URL: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

}

var Validations = function() {
}

Validations.prototype = {

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