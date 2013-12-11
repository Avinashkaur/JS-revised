var MoveCountries = function() {
  this.init();
}

MoveCountries.prototype = {

  init: function() {

  },

  getSelectedOptionsAndMove: function(source_list, target_list) {
    var selected_option;

    while(source_list.selectedIndex != -1) {
      selected_option = source_list.options[source_list.selectedIndex];
      document.createElement('option').value = selected_option.value;
      target_list.options.add(selected_option, null);
    }
  },
  
}

window.onload = function() {
  var move_options_object = new MoveCountries(),
      add_button = document.getElementById('add-button'),
      remove_button = document.getElementById('remove-button'),
      add_list = document.getElementById('add-listbox'),
      remove_list = document.getElementById('remove-listbox');

  add_button.addEventListener('click', function() {
    move_options_object.getSelectedOptionsAndMove(add_list, remove_list);
  }, false);

  remove_button.addEventListener('click', function() {
    move_options_object.getSelectedOptionsAndMove(remove_list, add_list);
  }, false);
}