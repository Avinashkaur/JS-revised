var moveCountries = function(list1, list2) {
	
	while(list1.selectedIndex != -1) {
		newoption = list1.options[list1.selectedIndex];
    newnode = document.createElement('option');
    newnode.value = newoption.value;
		list2.options.add(newoption, null);
	}

}