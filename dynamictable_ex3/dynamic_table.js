var DynamicTableRow = function(count) {
  this.init(count);
}

DynamicTableRow.prototype = {

  init: function(count) {
    this.data_table = document.getElementById('data-grid').tBodies[0];
    this.counter = count;
    this.showRow();
  },

  showRow: function() {
    this.new_row = this.createRow();
    this.createRowCells();
  },

  createRow: function() {
    var row = this.createAndAppendElement('tr', this.data_table, { 'data-row' : this.counter });
    return row;
  },

  createRowCells: function() {
    this.createNameCell();
    this.createEmailCell();
    this.createActionCell();  
  },

  createNameCell: function() {
    this.name_cell = this.createAndAppendElement('td', this.new_row);
    this.name_input = this.createAndAppendElement('input', this.name_cell, { 'type' : 'text', 'data-name' : this.counter });
    this.name_input_label = this.createAndAppendElement('span', this.name_cell, { 'data-uname' : this.counter });
  },

  createEmailCell: function() {
    this.email_cell = this.createAndAppendElement('td', this.new_row);
    this.email_input = this.createAndAppendElement('input', this.email_cell, { 'type' : 'text', 'data-email' : this.counter });
    this.email_input_label = this.createAndAppendElement('span', this.email_cell, { 'data-uemail' : this.counter });
  },

  createActionCell: function() {
    this.action_cell = this.createAndAppendElement('td', this.new_row);
    var this_object = this;
    
    this.save_button = this.createAndAppendElement('input', this.action_cell, { 'type' : 'button', 'data-save' : this.counter, 'value' : 'Save' });
    this.save_button.onclick = function() {
      this_object.saveRow(this_object.counter, { 'hide' : [ 'name', 'email', 'save' ], 'show' : [ 'uname', 'uemail', 'edit', 'delete' ] }); 
    }
   
    this.edit_button = this.createAndAppendElement('input', this.action_cell, { 'type' : 'button', 'data-edit' : this.counter, 'value' : 'Edit', 'style' : 'display:none' });
    this.edit_button.onclick = function() {
      this_object.editRow(this_object.counter, { 'hide' : [ 'uname', 'uemail', 'edit', 'delete' ], 'show' : [ 'name', 'email', 'save' ] }); 
    }

    this.delete_button = this.createAndAppendElement('input', this.action_cell, { 'type' : 'button', 'data-delete' : this.counter, 'value' : 'Delete', 'style' : 'display:none' });
    this.delete_button.onclick = function() {
      this_object.removeRow(this_object.counter);
    }

  },

  saveRow: function(element_id, elements_object) {
    this.hideAndShowElements(element_id, elements_object);
    this.name_input_label.innerText = this.name_input.value;
    this.email_input_label.innerText = this.email_input.value;
  },

  editRow: function(element_id, elements_object) {    
    this.hideAndShowElements(element_id, elements_object);
  },

  removeRow: function(row_number) {
    this.data_table.removeChild(document.querySelector("[data-row='" + row_number + "']"));
  },

  hideAndShowElements: function(element_id, elements_object) {
    for (var key in elements_object) {     
      for (var i = 0; i < elements_object[key].length; i++) {
        if (key == 'hide') {
          this.hideElement("[data-" + elements_object[key][i] + "='" + element_id + "']");
        }
        else if (key == 'show') {
          this.showElement("[data-" + elements_object[key][i] + "='" + element_id + "']");
        } 
      }
    }
  },

  hideElement: function(element_attribute) {
    document.querySelector(element_attribute).style.display = 'none';
  },

  showElement: function(element_attribute) {
    document.querySelector(element_attribute).style.display = 'block';
  },

  createAndAppendElement: function(element_type, parent_element, attributes) {
    var new_element = document.createElement(element_type);
    attributes = attributes || {};
    parent_element.appendChild(new_element);

    for (var key in attributes) {
      new_element.setAttribute(key, attributes[key]);
    }
    return new_element;
  }

}

window.onload = function() {
  var add_row_button = document.getElementById('add-row');
  var count = 0;

  add_row_button.addEventListener('click', function() {
    new DynamicTableRow(count);
    count++;
  }, false);

}