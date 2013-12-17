var Validations = function() {
}

Validations.prototype = {

  checkRequiredFields: function() {
    var required_elements = document.getElementsByClassName('required');
    var status = true;
    for (var i = 0; i < required_elements.length; i++) {
      if (required_elements[i].value.trim().length == 0) {
        alert("You cannot have " + required_elements[i].name + " blank.");
        status = false;
      }
    }
    return status;  
  },

  checkLimit: function() {
    var element = document.getElementById('about'),
        status = true,
        number_of_characters = element.value.trim().length;

    if (number_of_characters < 50) {
      alert("You have to enter minimum of 50 characters!");
      element.focus();
      status = false;
    } 
    return status;
  },

  checkNotificationOption: function() {
    var status = true,
        notification_checkbox = document.getElementById('notify');
    
    if (!(notification_checkbox.checked)) {
      alert('Please tick the notification');
      notification_checkbox.focus();
      status = false;
    }  
    return status;
  },

  checkValidations: function() {
    var status = false,
        required_status = this.checkRequiredFields(),
        limit_status = this.checkLimit(),
        notification_status = this.checkNotificationOption();

    status = required_status && limit_status && notification_status;
    return status;
  }

}

window.onload = function() {
  var validations_object = new Validations(),
      user_form = document.getElementById('user-form'),
      about_me = document.getElementById('about');

  user_form.onsubmit = function() {
    return validations_object.checkValidations();
  }
}