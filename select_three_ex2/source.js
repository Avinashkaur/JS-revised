var MaxThreeChecked = {

	getcheckedelements: function(element) {
    document.getElementById("uncheck").checked = false;
    var checkeditems = document.getElementsByClassName('day');
    var total = checkeditems.length, daysarray = [];
  
		for(var i = 0; i < total; i++) {
			if (checkeditems[i].checked) {
        daysarray.push(checkeditems[i].getAttribute("value"));
			}
		}

    MaxThreeChecked.checklimit(daysarray, element); 
	},

  checklimit: function(daysarray, element) {
    var daytoremove, length = daysarray.length;
    
    if (length > 3) {
      daytoremove = element.getAttribute("value");
      MaxThreeChecked.removeitem(daysarray, daytoremove);
      alert("Only 3 days can be selected. You have already selected " + daysarray);
      element.checked = false;

    }
  },

  removeitem: function(array, item) {
    var index = array.indexOf(item);
    array.splice(index, 1);
  },

  uncheckall: function(element) {
    var checkeditems = document.getElementsByClassName('day');
    for (i = 0; i < checkeditems.length; i++) {
      checkeditems[i].checked = false;
    }
  }
  
}