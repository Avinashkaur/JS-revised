var CheckAllOrNone = function(div_id) {
  this.init(div_id);
}

CheckAllOrNone.prototype = {

  init: function(div_id) {
    this.options_div = document.getElementById(div_id);
    this.checkboxes = this.options_div.getElementsByClassName('color');
  },
  
  setCheckboxStatus: function(value) {
    for (var i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].checked = value;
    }
  }

}

window.onload = function() {

  var check_all_button = document.getElementById('check-all');
  var uncheck_all_button = document.getElementById('check-none');
  var check_object = new CheckAllOrNone('select-color');
  
  check_all_button.addEventListener('click', function() {
    check_object.setCheckboxStatus(true)
  }, false);

  uncheck_all_button.addEventListener('click', function() {
    check_object.setCheckboxStatus(false)
  }, false);

}