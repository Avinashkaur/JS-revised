// to uncheck and hide all the lists on page load
var SetValueForAllLists = {

  init: function(checkboxes, child_lists) {
    this.checkboxes = checkboxes;
    this.child_lists = child_lists;

    // invoke methods
    SetValueForAllLists.uncheckParentCheckboxes();
    SetValueForAllLists.hide();
  },

  uncheckParentCheckboxes: function() {
    for (var i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].checked = false;
    }
  },

  hide: function() {
    for (var i = 0; i < this.child_lists.length; i++) {
      this.child_lists[i].style.display = 'none';
    }
  }

}

// to set value of other lists other than the checked list
var SetValueForOtherLists = {

  temp_array: [],

  unCheckAndHideOtherLists: function(parent_checkbox) {
    var popped_element,
        list_object = new SelectChildBoxes(parent_checkbox);

    if (SetValueForOtherLists.temp_array.length != 0) {
      popped_element = SetValueForOtherLists.temp_array.pop();
    }

    if (popped_element) {
      popped_element.checked = false;
      list_object.checkUncheckChildElements(popped_element);
      list_object.showHideChildElements(popped_element);
    }
    SetValueForOtherLists.temp_array.push(parent_checkbox);
  }

}

var SelectChildBoxes = function(selected_checkbox) {
  this_object = this;

  selected_checkbox.onclick = function() {
    this_object.checkUncheckChildElements(this);
    this_object.showHideChildElements(this);
  }
}

SelectChildBoxes.prototype = {

  checkUncheckChildElements: function(parent_checkbox) {
    var attribute = parent_checkbox.getAttribute('data-property');
    var child_list = document.getElementById(attribute);
    var child_list_elements = child_list.getElementsByClassName('child');
    
    for (var i = 0; i < child_list_elements.length; i++) {
      child_list_elements[i].checked = parent_checkbox.checked;
    }
    if (parent_checkbox.checked) {
      parent_checkbox.scrollIntoView(true);
      SetValueForOtherLists.unCheckAndHideOtherLists(parent_checkbox);
    }    
  },

  showHideChildElements: function(parent_checkbox) {
    var attribute = parent_checkbox.getAttribute('data-property');
    var child_list = document.getElementById(attribute);
    
    child_list.style.display = (parent_checkbox.checked) ? "block" : "none";
  },

}

window.onload = function() {
  var parent_checkboxes = document.getElementsByClassName('parent'),
      child_lists = document.getElementsByClassName('child-list');
  
  SetValueForAllLists.init(parent_checkboxes, child_lists);

  for (var i = 0; i < parent_checkboxes.length; i++) {
    var select_object = new SelectChildBoxes(parent_checkboxes[i]);
  }
}