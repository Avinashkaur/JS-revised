var SelectCheckBox = function(item) {

	var element = item.id;
	var array = document.getElementsByClassName(element);
	for (var i = 0; i < array.length; i++) {
		if (item.checked) {
		  array[i].style.display = 'block';
		  array[i].checked = true;
		}
		else {
			array[i].style.display = 'none';
			array[i].checked = false;
		}
	}
	item.scrollIntoView(true);
}

var HideList = function() {
	var list = document.getElementsByClassName('child_list');
	for (var i = 0; i < list.length; i++) {
		list[i].style.display = 'none';
	}
}