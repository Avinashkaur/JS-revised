var CheckAllOrNone = function(div_id) {
  this.init(div_id);
}

CheckAllOrNone.prototype = {

  init: function(div_id){
    this.options_div = document.getElementById(div_id);
    this.checkboxes = this.options_div.getElementsByClassName('color');
  },
  setOptions: function(value) {
    for (var i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].checked = value;
    }
  }

}

window.onload = function() {

  var check_button = document.getElementById('check-all');
  var uncheck_button = document.getElementById('check-none');
  
  check_button.addEventListener('click', function() {
    check_object = new CheckAllOrNone('select-color');
    check_object.setOptions(true)
  }, false);

  uncheck_button.addEventListener('click', function() {
    check_object.setOptions(false)
  }, false);

}