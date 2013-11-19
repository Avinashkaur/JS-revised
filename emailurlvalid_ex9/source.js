var Validations = {
  
	init: function() {
		return Validations.requiredFields() && Validations.checkLimit() && Validations.checkEmail() && Validations.checkUrl();	
	},

	requiredFields: function() {
		var elements = document.getElementsByClassName('required');
		for(var i = 0; i < elements.length; i++) {
			var value = elements[i].value.trim();
			if (value == 0) {
				alert("You cannot leave " + elements[i].name + " blank");
				elements[i].focus();
				return false;
			}
		}
		return true;
	},

	checkLimit: function() {
		var element = document.getElementById('about');
		var size = element.value.trim().length;
		if (size < 50) {
			alert("You should enter minimum of 50 characters!");
			element.focus();
			return false;
		}
		else { return true; }
	},

  checkEmail: function() {
  	var element = document.getElementById('email');
  	var emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	if (emailregex.test(element.value)) {
  		return true;
  	}
  	else {
  		alert("Invalid email address");
  		return false;
  	}
  },

  checkUrl: function() {
  	var element = document.getElementById('url');
  	var urlregex = /((ftp|http|https|gopher):\/\/)?((www)\.)?(\w+)(\.)(\w*)(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
    if (urlregex.test(element.value)) {
  		return true;
  	}
  	else {
  		alert("Invalid URL");
  		return false;
  	}
  },

	disableButton: function() {
		document.getElementById('submit-button').disabled = true;
	},
	
  enableButton: function(element) {
		if (element.checked) {
			document.getElementById('submit-button').disabled = false;
		}
		else {
			Validations.disableButton();
		}
	}

}