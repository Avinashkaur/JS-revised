var CheckAllOrNone = {
  
  checkUncheck: function(value, div_id) {
    var options_div = document.getElementById(div_id);
    var checkboxes = options_div.getElementsByTagName('input')
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = (checkboxes[i].getAttribute('class') == "color") ? value : false;
     }
  }

}