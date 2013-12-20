var SelectChildBoxes = function() {
  this.init();
}

SelectChildBoxes.prototype = {

  init: function() {
    this.hideChildList('child-list');
  },

  // hideChildList: function(element_class) {
  //   var child_lists = document.getElementsByClassName(element_class);

  //   for (var i = 0; i < child_lists.length; i++) {
  //     child_lists[i].style.display = 'none';
  //     // setting the checked state of the corresponding checkbox to false 
  //     document.querySelector("[data-property='" + child_lists[i].id + "']").checked = false;
  //   }
  // },

  // showChildList: function(element, attribute) {
  //   //attribute of the checked checkbox
  //   var element_id = element.getAttribute(attribute),
  //   // getting that element that has the same value of id as the attribute of the checkbox
  //       list_to_show = document.getElementById(element_id);

  //   //hiding all the child lists
  //   this.hideChildList('child-list');
    
  //   // set checked property of clicked checkbox and show the child list
  //   this.checkAndShowParentElement(element, list_to_show)
    
  //   // finally check all the child checkboxs in list
  //   this.checkChildElements(list_to_show);

  //   list_to_show.scrollIntoView(true);

  // },

  // checkAndShowParentElement: function(parent_element, child_list) {
  //   parent_element.checked = true;
  //   child_list.style.display = 'block';
  // },

  // checkChildElements: function(parent_element) {
  //   var child_elements = parent_element.getElementsByClassName('child');
    
  //   for (var i = 0; i < child_elements.length; i++) {
  //     child_elements[i].checked = true;
  //   }
  // }

}

window.onload = function() {
  var select_object = new SelectChildBoxes();
      parent_names = document.getElementsByClassName('parent');

  for (var i = 0; i < parent_names.length; i++) {
    parent_names[i].addEventListener('click', function() {
      if (this.checked) {
        select_object.showChildList(this, 'data-property');
      }
      else {
        select_object.hideChildList('child-list');
      }
    }, false);  
  }
}