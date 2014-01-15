var Regex = {

  NUMBER: /^\d+$/,
  OPERATOR: /[+-/*]/,
  DECIMAL: /\./

}

var Calculator = function() {
  this.init();
}

Calculator.prototype = {

  input_string: '',

  DEFAULT_VALUE: '0',

  ERROR_TEXT: "Not A Number!",

  init: function() {
    this.number_field = document.getElementById('number-field');
    this.operator_field = document.getElementById('operator-field');
    this.memory_array = '';
    this.new_entry = false;
    this.replace_operator = false;
    this.number_field.innerText = this.DEFAULT_VALUE;
  },

  displayNumber: function(user_input) {
    //for entering second operand, the number field and operator field should be cleared
    if ((this.operator_field.innerText.length != 0) && this.input_string) {
      this.clearDisplay();
      this.displayOperator('');
    }
    //if the number field shows a result of some expression, then the display is cleared, 
    //so that new expression can be inserted
    if (this.new_entry) {
      this.clearDisplay();
    }
    this.number_field.innerText += user_input;
    this.replace_operator = false;
    this.new_entry = false;
  },

  addOperator: function(user_input) {
    var last_digit = this.getLastDigit(this.input_string);
    // for showing operator sign in operator field
    this.displayOperator(user_input);

    if (Regex.OPERATOR.test(last_digit) && this.replace_operator) {
      this.input_string = this.input_string.replace(new RegExp(last_digit), user_input);
    }
    else {
      this.input_string += this.number_field.innerText + user_input; 
    }
    this.replace_operator = true;
  },

  displayOperator: function(user_input) {
    this.operator_field.innerText = user_input;
  },

  getLastDigit: function(user_string) {
    var last_digit = user_string.slice(-1);
    return last_digit;
  },

  negation: function() {
    var value = this.number_field.innerText;
    
    if (value) {
      if (value.charAt(0).match('-')) {
        value = value.substr(1);
      }
      else {
        value = value.replace(new RegExp(value), '-' + value);
      }
    }
    this.number_field.innerText = value;
  },

  calculateResult: function() {
    var value = eval(this.input_string + this.number_field.innerText);
    
    if (value == undefined || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY || isNaN(value)) {
      this.number_field.innerText = this.ERROR_TEXT;
    }
    else {
      this.number_field.innerText = value;
    }
    this.input_string = '';
    this.new_entry = true;
  },

  clearDisplay: function() {
    this.number_field.innerText = '';
  },

  memoryFunction: function(operator) {
    this.memory_array = this.memory_array + operator + this.number_field.innerText;
    this.clearDisplay();
  },

  clearMemory: function() {
    this.memory_array = '';
  },

  memoryResult: function() {
    if (this.memory_array) {
      this.number_field.innerText = eval(this.memory_array);
    }
    this.new_entry = true;
  },

}

window.onload = function() {
  var calculator_object = new Calculator(),
      number_keys = document.getElementsByClassName('numbers'),
      equal_button = document.getElementById('equal-to'),
      signed_button = document.getElementById('signed-key'),
      memory_keys = document.getElementsByClassName('memory-keys'),
      memory_clear = document.getElementById('memory-clear'),
      memory_result = document.getElementById('memory-result'),
      clear_key = document.getElementById('clear'),
      operator_keys = document.getElementsByClassName('operators');

  for (var i = 0; i < number_keys.length; i++) {
    number_keys[i].addEventListener('click', function() {
      calculator_object.displayNumber(this.value);
    });
  }

  for (var i = 0; i < operator_keys.length; i++) {
    operator_keys[i].addEventListener('click', function() {
      calculator_object.addOperator(this.value);
    });
  }

  equal_button.addEventListener('click', function() {
    calculator_object.calculateResult();
  });
  
  signed_button.addEventListener('click', function() {
    calculator_object.negation();
  });

  for (var i = 0; i < memory_keys.length; i++) {
    memory_keys[i].addEventListener('click', function() {
      calculator_object.memoryFunction(this.getAttribute('data-value'));
    });
  }
  
  memory_result.addEventListener('click', function() {
    calculator_object.memoryResult();
  });

  memory_clear.addEventListener('click', function() {
    calculator_object.clearMemory();
    calculator_object.clearDisplay();
  });

  clear_key.addEventListener('click', function() {
    calculator_object.clearDisplay();
    calculator_object.input_string = '';
  });

}