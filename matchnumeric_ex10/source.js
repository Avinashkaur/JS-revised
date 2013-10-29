var checkInput = function() {
	var inputElement = document.getElementById('number');
  var numberregex = /^([+-]?\d+([eE]\+?\-?\d+)?)(\.\d+)?$/;
	if (numberregex.test(inputElement.value.trim())) { return true; }
	else { return false; }
}

var validateForm = function() {
	var resultvalue = checkInput();
	var resultelement = document.getElementById('result');
	resultelement.value = resultvalue;
	if (resultvalue) { return true; }
	else { return false; }
}