var Calculator = {
  
  init: function() {
  	displayvalue = document.getElementById("resultfield");
  	operatorregex = /[+-/*]/;
  	memoryarray = "";
  },
  
	display: function(userinput) {
		if ((userinput.match(/\d+/) || userinput.match(/[+-/*.]/))) {
			displayvalue.value = displayvalue.value + userinput; 
		}	
	},

	replaceoperator: function(operator) { 
    var lastdigit = Calculator.getlastdigit();
		if (operatorregex.test(lastdigit)) {
			displayvalue.value = displayvalue.value.replace(lastdigit, operator);
		}
		else {
			Calculator.display(operator);
		}
	},

  getlastdigit: function() {
  	var value = displayvalue.value;
  	var lastdigit = value.substr(value.length - 1, value.length);
  	return lastdigit;
  },

  clear: function() {
  	displayvalue.value = "";
  },

  signed: function() {
	  var tempstring = displayvalue.value, temparr = "", poppednumber, signednum;
	  var i = (tempstring.length - 1);
	  while ( (i >= 0) && (!(operatorregex.test(tempstring[i]))) ) {
	    temparr += tempstring[i];
	    i--; 
	  }
	  poppednumber = temparr.split('').reverse().join('');
	  signednum = '(-' + poppednumber + ')';
	  displayvalue.value = displayvalue.value.replace(poppednumber, signednum);
	
  },

  memory: function(operator) {
  	if (memoryarray.length != 0) {
  		memoryarray = memoryarray + operator + displayvalue.value;
  	}
  	else {
  		memoryarray = displayvalue.value;
  	}
  	displayvalue.value = "";
  },

  clearmemory: function() {
    memoryarray = "";
  },

  memoryresult: function() {
  	displayvalue.value = memoryarray;
  },

	evaluate: function() {
		var result;
		try {
			result = eval(displayvalue.value);
			displayvalue.value = (result == undefined || result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY || isNaN(result) ) ? "" : result ; 			
		}
		catch (exception) {
			Calculator.clear();
		}	
	}

}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

Calculator.init();