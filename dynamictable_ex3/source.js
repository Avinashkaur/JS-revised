var count = 0;

var DynamicTable = function() {
  var table = document.getElementById('dataGrid');
  var newrow = table.insertRow(-1);
  count++;
  newrow.id = count;

  var newcell1 = document.createElement('td');
  var newcell2 = document.createElement('td');
  var newcell3 = document.createElement('td');

  var textbox1 = document.createElement('input');
  var textbox2 = document.createElement('input');
  var savebutton = document.createElement('input');
  var editbutton = document.createElement('input');
  var deletebutton = document.createElement('input');

  textbox1.type = "text";
  textbox2.type = "text";
  savebutton.type = "button";
  savebutton.value = "Save";
  editbutton.type = "button";
  editbutton.value = "Edit";
  deletebutton.type = "button";
  deletebutton.value = "Delete";
  deletebutton.id = count;

  newcell1.appendChild(textbox1);
  newcell2.appendChild(textbox2);
  newcell3.appendChild(savebutton);

  newrow.appendChild(newcell1);
  newrow.appendChild(newcell2);
  newrow.appendChild(newcell3);

  savebutton.onclick = function() {
    
    var text1 = textbox1.value;
    var text2 = textbox2.value;

    var value1 = document.createTextNode(text1);
    var value2 = document.createTextNode(text2);
    newcell1.replaceChild(value1, textbox1);
    newcell2.replaceChild(value2, textbox2);
    newcell3.replaceChild(editbutton, savebutton);
    newcell3.appendChild(deletebutton);


    editbutton.onclick = function() {
      textbox1.value = text1;
      textbox2.value = text2;

      newcell1.replaceChild(textbox1, value1);
      newcell2.replaceChild(textbox2, value2);
      newcell3.replaceChild(savebutton, editbutton);
      newcell3.removeChild(deletebutton);

    }

  };

  deletebutton.onclick = function() {
    var rowtodelete = document.getElementById(this.id);
    table.tBodies[0].removeChild(rowtodelete); 
  }
};