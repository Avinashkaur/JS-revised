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
    var new_row = new TableRow(this.data_table);
    new_row.create(this.row_id);
    this.row_id++;
  },

  deleteRow: function(row) {
    this.data_table.removeChild(row);
  }

}

var TableRow = function(table) {
  this_object = this;
  this.table = table;
}

TableRow.prototype = {

  create: function(row_id) {
    this.row = this.createAndAppendElement('tr', this.table, { 'data-row-id' : row_id });
    this.createCells();
  },

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
    this.save_button.onclick = function() {
      var required_fields_status = Validations.checkRequiredField(this_object.input_name);
      var email_field_status = Validations.checkEmail(this_object.input_email);
      if (required_fields_status && email_field_status) {
        this_object.save();
        this_object.updateValue();
      }
      
    }
    
    this.edit_link = this.createAndAppendElement('a', this.action_cell, { 'href' : 'javaScript:void(0)', 'style' : 'display:none' });
    this.edit_link.innerText = 'Edit';
    this.edit_link.onclick = function() {
      this_object.edit();
    }

    this.delete_link = this.createAndAppendElement('a', this.action_cell, { 'href' : 'javaScript:void(0)', 'style' : 'display:none' });
    this.delete_link.innerText = 'Delete';
    this.delete_link.onclick = function() {
      this_object.delete();
    }
  },

  save: function() {
    this.hideAndShowElements({ 'show' : [ this.label_name, this.label_email, this.edit_link, this.delete_link ], 'hide' : [ this.input_name, this.input_email, this.save_button ]});
  },

  edit: function() {
    this.hideAndShowElements({ 'show' : [ this.input_name, this.input_email, this.save_button ], 'hide' : [ this.label_name, this.label_email, this.edit_link, this.delete_link ]});
  },

  delete: function() {
    DynamicTable.deleteRow(this.row);
  },

  updateValue: function() {
    this.label_name.innerText = this.input_name.value;
    this.label_email.innerText = this.input_email.value;
  },

  hideAndShowElements: function(elements_object) {
    for (var key in elements_object) {     
      for (var i = 0; i < elements_object[key].length; i++) {
        if (key == 'show') {
          elements_object[key][i].style.display = 'block';
        } 
        else if (key == 'hide') {
          elements_object[key][i].style.display = 'none';
        }
      }
    }
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
  
  DynamicTable.init();

  add_row_button.addEventListener('click', function() {
    DynamicTable.createRow();
  });

}