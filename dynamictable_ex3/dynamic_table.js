// Class for defining all the regular expressions
var Regex = {

  EMAIL: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]{2,}(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,

}

//Class for defining all the validations
var Validations = {

  checkRequiredField: function(required_field) {
    if (required_field.value.trim() == '') {
      alert('You cannot leave name blank');
      required_field.focus();
      return false;
    }
    else {
      return true;
    }
  },

  checkEmail: function(email_field) {
    if (Regex.EMAIL.test(email_field.value.trim())) {
      return true;
    }
    else {
      alert('Invalid Email!');
      email_field.focus();
      return false;
    }
  }

}

// class for dynamic table
var DynamicTable = {

  row_id: 0,

  init: function() {
    this.data_table = document.getElementById('data-grid').tBodies[0];
  }, 

  createRow: function() {
    TableRow.create(this.data_table, this.row_id);
    this.row_id++;
  },

  deleteRow: function(row) {
    row.remove();
  }

}

// constructor for table row class
var TableRow = function(table, row_id) {
  this.table = table;
  this.row = this.createAndAppendElement('tr', this.table, { 'data-row-id' : row_id });
  
  this_object = this;
  this.array_to_display = [ this.label_name, this.label_email, this.edit_link, this.delete_link ];
  this.array_to_edit = [ this.input_name, this.input_email, this.save_button ];
  // invoke methods
  this.createCells();
}

//class method that will create row object
TableRow.create = function(table, row_id) {
  new TableRow(table, row_id);
}

TableRow.prototype = {
  
  createCells: function() {
    this.createNameCell();
    this.createEmailCell();
    this.createActionCell();
  },

  createNameCell: function() {
    this.name_cell = this.createAndAppendElement('td', this.row);
    this.input_name = this.createAndAppendElement('input', this.name_cell, { 'type' : 'text' });
    this.label_name = this.createAndAppendElement('span', this.name_cell, { 'style' : 'display:none' });
  },

  createEmailCell: function() {
    this.email_cell = this.createAndAppendElement('td', this.row);
    this.input_email = this.createAndAppendElement('input', this.email_cell, { 'type' : 'text' });
    this.label_email = this.createAndAppendElement('span', this.email_cell, { 'style' : 'display:none' });
  },

  createActionCell: function() {
    var this_object = this;

    this.action_cell = this.createAndAppendElement('td', this.row);
    this.save_button = this.createAndAppendElement('input', this.action_cell, { 'type' : 'button', 'value' : 'Save' });
    
    this.edit_link = this.createAndAppendElement('a', this.action_cell, { 'href' : 'javaScript:void(0)', 'style' : 'display:none' });
    this.edit_link.innerText = 'Edit';

    this.delete_link = this.createAndAppendElement('a', this.action_cell, { 'href' : 'javaScript:void(0)', 'style' : 'display:none' });
    this.delete_link.innerText = 'Delete';

    // saving elements of that we need to hide and show in arrays
    this.updated_elements_array = [ this.label_name, this.label_email, this.edit_link, this.delete_link ];
    this.elements_to_update_array = [ this.input_name, this.input_email, this.save_button ];

    this.save_button.onclick = function() {
      var required_fields_status = Validations.checkRequiredField(this_object.input_name);
      var email_field_status = Validations.checkEmail(this_object.input_email);
      if (required_fields_status && email_field_status) {
        this_object.updateValue();
        this_object.save();
      }
    }
    
    this.edit_link.onclick = function() {
      this_object.edit();
    }
    
    this.delete_link.onclick = function() {
      this_object.delete();
    }
  },

  save: function() {
    this.hideElements(this.elements_to_update_array);
    this.showElements(this.updated_elements_array);
  },

  edit: function() {
    this.showElements(this.elements_to_update_array);
    this.hideElements(this.updated_elements_array);
  },

  hideElements: function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].style.display = 'none';
    }
  },

  showElements: function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].style.display = 'block';
    }
  },

  delete: function() {
    DynamicTable.deleteRow(this.row);
  },

  updateValue: function() {
    this.label_name.innerText = this.input_name.value;
    this.label_email.innerText = this.input_email.value;
  },
  
  //attributes are passed as an object with 'key' as the attribute and 'value' as the attribute value
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
  
  DynamicTable.init();

  add_row_button.addEventListener('click', function() {
    DynamicTable.createRow();
  });

}