var CheckAllOrNone = {

	check: function(value) {
		var elements = document.getElementsByClassName('color');
		for (var i = 0; i < elements.length; i++) {
			elements[i].checked = value;
		}
	}
	
}