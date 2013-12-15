var Regex = {

  OPERATOR: /[+-/*]/,
  NUMBER: /\d+/,
  DECIMAL: /\./

}

var Calculator = function() {
  this.init();
}

Calculator.prototype = {
  
  init: function() {
    this.display_value = document.getElementById("result-field");
    this.memory_array = "";
    // invoke methods
    this.disableScreen();
  },

  disableScreen: function() {
    this.display_value.disabled = true;
  },
  
  displayInput: function(user_input) {
    if ((user_input.match(Regex.NUMBER) || user_input.match(Regex.OPERATOR))) {
      this.display_value.value = this.display_value.value + user_input; 
    } 
  },

  replaceOperator: function(operator) { 
    var last_digit = this.getLastDigit();

    if (Regex.OPERATOR.test(last_digit)) {
      this.display_value.value = this.display_value.value.replace(last_digit, operator);
    }
    else {
      this.displayInput(operator);
    }
  },

  addDecimal: function() {
    var last_digit = this.getLastDigit();

    if (Regex.NUMBER.test(last_digit)) {
      this.display_value.value = this.display_value.value + '.';
    }
  },

  getLastDigit: function() {
    var value = this.display_value.value,
        last_digit = value.slice(-1);

    return last_digit;
  },

  clearValue: function() {
    this.display_value.value = "";
  },

  addSignedNumber: function() {
    var temp_string = this.display_value.value, 
        temp_arr = "",
        popped_number, 
        signed_num,
        i = (temp_string.length - 1);
    
    // traverse through the each character of string till we encounter an operator or the string
    while ((i >= 0) && (Regex.DECIMAL.test(temp_string[i]) || Regex.NUMBER.test(temp_string[i]))) {
      temp_arr += temp_string[i];
      i--; 
    }
    popped_number = temp_arr.split('').reverse().join('');
    signed_num = '(-' + popped_number + ')';
    this.display_value.value = this.display_value.value.replace(popped_number, signed_num);
  },

  memoryFunction: function(operator) {
    if (this.memory_array.length != 0) {
      this.memory_array = this.memory_array + operator + this.display_value.value;
    }
    else {
      this.memory_array = this.display_value.value;
    }
    this.display_value.value = "";
  },

  clearMemory: function() {
    this.memory_array = "";
  },

  memoryResult: function() {
    this.display_value.value = this.memory_array;
  },

  evaluateInput: function() {
    var result;
    try {
      result = eval(this.display_value.value);
      this.display_value.value = (result == undefined || result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY || isNaN(result) ) ? "Error!" : result ;      
    }
    catch (exception) {
      this.clearValue();
    } 
  }

}

window.onload = function() {
  var calculator_object = new Calculator(),
      numbers_keys = document.getElementsByClassName('numbers'),
      operator_keys = document.getElementsByClassName('operators'),
      signed_key = document.getElementById('signed-key'),
      clear_key = document.getElementById('clear'),
      memory_keys = document.getElementsByClassName('memory-keys'),
      memory_clear = document.getElementById('memory-clear'),
      memory_result = document.getElementById('memory-result'),
      decimal_button = document.getElementById('decimal'),
      equal_to_button = document.getElementById('equal-to');

  // for numerical keys
  for (var i = 0; i < numbers_keys.length; i++) {
    numbers_keys[i].addEventListener('click', function() {
      calculator_object.displayInput(this.value.trim());
    }, false);
  }
  // for operator keys
  for (var i = 0; i < operator_keys.length; i++) {
    operator_keys[i].addEventListener('click', function() {
      calculator_object.replaceOperator(this.value.trim());
    }, false);
  }
  // for memory keys
  for (var i = 0; i < memory_keys.length; i++) {
    memory_keys[i].addEventListener('click', function() {
      calculator_object.memoryFunction(this.getAttribute('data-value'));
    }, false)
  };
  //key to add signed numbers
  signed_key.addEventListener('click', function() {
    calculator_object.addSignedNumber();
  }, false);
  //key to clear value on screen
  clear_key.addEventListener('click', function() {
    calculator_object.clearValue();
  }, false);
  // key to clear memory
  memory_clear.addEventListener('click', function() {
    calculator_object.clearMemory();
  }, false);
  // key to show result from memory
  memory_result.addEventListener('click', function() {
    calculator_object.memoryResult();
  }, false);
  // key to evaluate result on screen
  equal_to_button.addEventListener('click', function() {
    calculator_object.evaluateInput();
  }, false);
  // key to add decimal value
  decimal_button.addEventListener('click', function() {
    calculator_object.addDecimal();
  }, false)

}