var Regex = {
  NUMBER: /^([+-]?\d+([eE]\+?\-?\d+)?)(\.\d+)?$/
}

var MatchNumeric = function() {
  this.init();
}

MatchNumeric.prototype = {

  init: function() {
    this.user_input = document.getElementById('user-input');
  },

  checkInput: function() {
    var input_value = Number(this.user_input.value.trim()),
        status = false;

    if (Regex.NUMBER.test(input_value)) {
      this.setResultField(true);
      status = true;
    }
    else {
      this.alertUserForInvalidInput();
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
      object = new MatchNumeric();

  user_form.onsubmit = function() {
    return object.checkInput();
  }
}