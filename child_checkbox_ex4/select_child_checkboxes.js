// to set value of other lists other than the checked list
var OtherLists = {

  objects_array: [],

  uncheckAndHide: function(list_object) {
    if (OtherLists.objects_array.length != 0) {
      OtherLists.objects_array.pop().init();
    }
    OtherLists.objects_array.push(list_object);
  }

}

var ItemsList = function(selected_checkbox) {
  this.checkbox = selected_checkbox;
  
  // invoke method
  this.setList();
  this.init();
  this.bindEvents();

}

ItemsList.prototype = {

  init: function() {
    this.checkbox.checked = false;
    this.showHideChildElements();
  },

  setList: function() {
    var attribute = this.checkbox.getAttribute('data-property');
    this.child_list = document.getElementById(attribute);
    this.child_list_elements = this.child_list.getElementsByClassName('child');
  },

  bindEvents: function() {
    var this_object = this;
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
      OtherLists.uncheckAndHide(object);
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
    new ItemsList(parent_checkboxes[i]);
  }
}