// to set value of other lists other than the checked list
var OtherLists = {

  temp_array: [],

  unCheckAndHide: function(object) {
    if (OtherLists.temp_array.length != 0) {
      OtherLists.temp_array.pop().init();
    }
    OtherLists.temp_array.push(object);
  }

}

var SelectChildBoxes = function(selected_checkbox) {
  this.checkbox = selected_checkbox;
  
  // invoke method
  this.setList();
  this.init();
  this.bindEvents(this);

}

SelectChildBoxes.prototype = {

  init: function() {
    this.checkbox.checked = false;
    this.showHideChildElements();
  },

  setList: function() {
    var attribute = this.checkbox.getAttribute('data-property');
    this.child_list = document.getElementById(attribute);
    this.child_list_elements = this.child_list.getElementsByClassName('child');
  },

  bindEvents: function(this_object) {
    this.checkbox.onclick = function() {
      this_object.checkUncheckChildElements(this_object);
      this_object.showHideChildElements();
    }
  },

  checkUncheckChildElements: function(object) {
    for (var i = 0; i < this.child_list_elements.length; i++) {
      this.child_list_elements[i].checked = this.checkbox.checked;
    }
    if (this.checkbox.checked) {
      this.checkbox.scrollIntoView(true);
      OtherLists.unCheckAndHide(object);
    }    
  },

  showHideChildElements: function() {
    this.child_list.style.display = (this.checkbox.checked) ? "block" : "none";
  },

}

window.onload = function() {
  var parent_checkboxes = document.getElementsByClassName('parent'),
      child_lists = document.getElementsByClassName('child-list');
 
  for (var i = 0; i < parent_checkboxes.length; i++) {
    new SelectChildBoxes(parent_checkboxes[i]);
  }
}