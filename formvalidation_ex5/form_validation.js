var Validations = function() {
  this.init();
}

Validations.prototype = {

  MAX_CHARACTERS: 50,

  init: function() {
    this.required_elements = document.getElementsByClassName('required');
    this.about_me_element = document.getElementById('about');
    this.notification_checkbox = document.getElementById('notify');
  },

  checkRequiredFields: function() {
    var status = true;
    for (var i = 0; i < this.required_elements.length; i++) {
      if (this.required_elements[i].value.trim().length == 0) {
        alert("You cannot have " + this.required_elements[i].name + " blank.");
        status = false;
      }
    }
    return status;  
  },

  checkLimit: function() {
    var status = true,
        number_of_characters = this.about_me_element.value.trim().length;

    if (number_of_characters < this.MAX_CHARACTERS) {
      alert("You have to enter minimum of " + this.MAX_CHARACTERS + " characters!");
      this.about_me_element.focus();
      status = false;
    } 
    return status;
  },

  checkNotificationOption: function() {
    var status = true;
    
    if (!(this.notification_checkbox.checked)) {
      alert('Please tick the notification');
      this.notification_checkbox.focus();
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