var LimitSelectedOptions = function(uncheck_all_option) {
  this.init(uncheck_all_option);
};


LimitSelectedOptions.prototype = {

  MAXIMUM_OPTIONS: 3,

  init: function(uncheck_all_option) {
    this.checked_array = [];
    this.uncheck_all_option = uncheck_all_option;
  },

  getCheckedOptions: function(element) {
    this.uncheck_all_option.checked = false;
    
    if (element.checked) {
      this.checked_array.push(element.value);
      this.checkLimitAndAlert(element);
    }
    else {
      this.removeElement(element);
    }
  },

  checkLimitAndAlert: function(element) {
    if (this.checked_array.length > this.MAXIMUM_OPTIONS) {
      alert("You cannot check more than " + this.MAXIMUM_OPTIONS + " values. You have already selected " + this.removeElement(element));
      element.checked = false;
    }

  },

  removeElement: function(element) {
    var index = this.checked_array.indexOf(element.value);
    this.checked_array.splice(index, 1);
    return this.checked_array;
  },

  uncheckAll: function(options_array) {
    var options_array_length = options_array.length;

    for (var i = 0; i < options_array_length; i++) {
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
      selection_object.getCheckedOptions(this);
    }, false);
  }
}