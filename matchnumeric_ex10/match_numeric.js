var UserInput = function() {
  this.init();
}

UserInput.prototype = {

  init: function() {
    this.user_input = document.getElementById('user-input');
  },

  isNumeric: function() {
    var input_value = Number(this.user_input.value.trim()),
        status;

    if (isNaN(input_value)) {
      this.alertUserForInvalidInput();
      status = false;
    }
    else {
      this.setResultField(true);
      status = true;
    }
    return status;
  },

  setResultField: function(value) {
    document.getElementById('input-result').value = value;
  },

  alertUserForInvalidInput: function() {
    alert("Please enter a numeric value!");
    this.setResultField(false);
    this.user_input.focus();
  }

}

window.onload = function() {
  var user_form = document.getElementById('user-form'),
      object = new UserInput();

  user_form.onsubmit = function() {
    return object.isNumeric();
  }
}