var LimitSelectedOptions = function(uncheck_all_option) {
  this.init(uncheck_all_option);
};


LimitSelectedOptions.prototype = {

  MAXIMUM_OPTIONS: 3,

  init: function(uncheck_all_option) {
    this.checked_array = [];
    this.uncheck_all_option = uncheck_all_option;
  },

  checkSelectedOptions: function(element) {
    var value;

    if (element.checked) {
      this.uncheck_all_option.checked = false;
      value = this.checkLimitAndAlert();
      (value) ? this.checked_array.push(element.value) : element.checked = false;
    }
    else {
      this.removeElement(element);
    }
  },

  removeElement: function(element) {
    //fallback for indexOf in IE
    if (navigator.appName == 'Microsoft Internet Explorer') {
      for(i in this.checked_array) {
        if (this.checked_array[i] == element.value) {
          this.checked_array.splice(i, 1);
        }
      }
    }
    else {
      var index = this.checked_array.indexOf(element.value);
      this.checked_array.splice(index, 1);
    }
  },

  checkLimitAndAlert: function() {
    if (this.checked_array.length == this.MAXIMUM_OPTIONS) {
      alert("you have already entered " + this.checked_array);
      return false;
    }
    return true;
  },

  uncheckAll: function(options_array) {      
    for (var i = 0; i < options_array.length; i++) {
      options_array[i].checked = false;
    }
    this.checked_array = [];
  }

}

window.onload = function() {
  var options_array = document.getElementsByClassName('day'),
      uncheck_all_option = document.getElementById('uncheck'),
      selection_object = new LimitSelectedOptions(uncheck_all_option);

  uncheck_all_option.addEventListener('click', function() {
    if (this.checked) {
      selection_object.uncheckAll(options_array);
    }
  }, false);

  for (var i = 0; i < options_array.length; i++) {
    options_array[i].addEventListener('click', function() {
      selection_object.checkSelectedOptions(this);
    }, false);
  }
}