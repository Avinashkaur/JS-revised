var MaxThreeSelected = function() {
  this.init();
}

MaxThreeSelected.prototype = {

  init: function() {
    this.options_array = document.getElementsByClassName('day');
    this.checked_array = [];
    this.uncheck_all_option = document.getElementById('uncheck');
  },

  getCheckedOptions: function(element) {
    this.uncheck_all_option.checked = false;
    this.checked_array = [];
    for ( var i = 0; i < this.options_array.length; i++) {
      if (this.options_array[i].checked) {
        this.checked_array.push(this.options_array[i].value);
      }
    }
    this.checkLimitAndAlert(element);
  },

  checkLimitAndAlert: function(element) {
    if (this.checked_array.length > 3) {
      var updated_array = this.removeElement(this.checked_array, element);
      alert("You cannot check more than 3 values. You have already selected " + updated_array);
      element.checked = false;
    }
  },

  removeElement: function(checked_array, element) {
    var index = this.checked_array.indexOf(element.value);
    this.checked_array.splice(index, 1);
    return this.checked_array;
  },

  uncheckAll: function() {
    for ( var i = 0; i < this.options_array.length; i++) {
      this.options_array[i].checked = false;
    }
  }

}

window.onload = function() {
  var selection_object = new MaxThreeSelected(),
      options_array = document.getElementsByClassName('day'),
      uncheck_all = document.getElementById('uncheck');

  uncheck_all.addEventListener('click', function() {
    selection_object.uncheckAll();
  })

  for ( var i = 0; i < options_array.length; i++) {
    options_array[i].addEventListener('click', function() {
      selection_object.getCheckedOptions(this);
    }, false);
  }
}