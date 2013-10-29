var Validations = {

	init: function() {
    return Validations.requiredFields() && Validations.checkLimit();
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