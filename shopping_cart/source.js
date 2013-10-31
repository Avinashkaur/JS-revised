var JSONObjectArray = [ 
  { 
    "imageurl" : "images/1.jpg" , 
    "Caption" : "Apple MacBook Pro MA464LL/A 15.4 Notebook PC" ,
    "category" : "Category: Computers" ,
    "quantity" : "1" ,
    "Description" : "The Intel Core Duo powering MacBook Pro is actually two processors built into a single chip." ,
    "price" : "2299.99" ,
    "subtotal" : "",
    "state" : false
  } , 
  { 
    "imageurl" : "images/2.jpg" ,
    "Caption" : "Sony VAIO 11.1" , 
    "category" : "Category: Computers" ,
    "quantity" : "1" ,
    "Description" : "Weighing in at just an amazing 2.84 pounds and offering a sleek, durable carbon-fibre case in charcoal black. And with 4 to 10 hours of standard battery life, it has the stamina to power you through your most demanding applications" , 
    "price" : "2699.99",
    "subtotal" : "" ,
    "state" : false
  } ,
  { 
    "imageurl" : "images/3.jpg" , 
    "Caption" : "Canon Digital Rebel XT 8MP Digital SLR Camera" ,
    "category" : "Category: Cameras" , 
    "quantity" : "1" ,
    "Description" : "Canon EOS Digital Rebel XT SLR adds resolution, speed, extra creative control, and enhanced comfort in the hand to one of the smallest and lightest digital cameras in its class" , 
    "price" : "550.00",
    "subtotal" : "",
    "state" : false
  }
];
var totalitems = document.getElementById('numberofitems');
var JSONCartArray = [], count = 0, sum = 0, selected_items = 0;
var sumtotal = document.getElementById('totalprice');
var productlist = document.getElementById('itemslist');
var shoppingcartlist = document.getElementById('cart');
var contentpage = document.getElementsByClassName('content_page');
sumtotal.disabled = true;
var cart_subtotal = document.createElement('label');

var ShoppingCart = {


  load: function() {
    contentpage[1].style.display = 'none';
    contentpage[0].style.display = 'block';
    productlist.innerHTML = "";

    for ( i = 0; i < JSONObjectArray.length; i++) {
      var newrow = ShoppingCart.insertitem('li' , 'listitem' , productlist);
      var cell1 = ShoppingCart.insertitem('div' , "imagecell" , newrow);
      var cell2 = ShoppingCart.insertitem('div' , "infocell" , newrow);
      var cell3 = ShoppingCart.insertitem('div' , "quantitycell" , newrow);
      var cell4 = ShoppingCart.insertitem('div' , "addToCartCell" , newrow);

      ShoppingCart.insertitem('img', 'prod_image', cell1).setAttribute('src', JSONObjectArray[i].imageurl);
      ShoppingCart.insertitem('label', 'caption_label', cell2).innerHTML = JSONObjectArray[i].Caption;
      ShoppingCart.insertitem('label', 'categorylabel', cell2).innerHTML = JSONObjectArray[i].category;
      ShoppingCart.insertitem('p', 'describe', cell2).innerHTML = JSONObjectArray[i].Description;
      ShoppingCart.insertitem('label', 'pricelabel', cell2).appendChild(document.createTextNode('Price: '));
      ShoppingCart.insertitem('label', 'itemprice', cell2).innerHTML = JSONObjectArray[i].price;
    
      ShoppingCart.insertitem('label', '',cell3).appendChild(document.createTextNode('Quantity'));
      var quantity_box = ShoppingCart.insertitem('input' , 'quantitybox', cell3);
      quantity_box.setAttribute('type' , 'text');
      quantity_box.setAttribute('onchange' , 'ShoppingCart.changequantity(this)');
      quantity_box.setAttribute('name' , i);
      quantity_box.value = JSONObjectArray[i].quantity;

      var addtocart_button = ShoppingCart.insertitem('input', 'addToCartButton', cell4);
      addtocart_button.setAttribute('type' , 'button');
      addtocart_button.setAttribute('value' , 'Add To Cart');
      addtocart_button.setAttribute('id' , i);
      addtocart_button.setAttribute('onclick' , 'ShoppingCart.addtocart(this)');
    }
  },

  insertitem: function(elementType , classname, parentItem) {
    var newitem = document.createElement(elementType);
    newitem.setAttribute("class" , classname);
    parentItem.appendChild(newitem);
    return newitem;
  },

  changequantity: function(number) {
    JSONObjectArray[number.name].quantity = number.value;
  },

  addtocart: function(addButton) {
    var counter = addButton.id;
    if(!(JSONObjectArray[counter].state)) {
      JSONCartArray[count] = {
        "imageurl" : JSONObjectArray[counter].imageurl,
        "Caption" : JSONObjectArray[counter].Caption,
        "category" : JSONObjectArray[counter].category,
        "price" : JSONObjectArray[counter].price,
        "productno" : counter,
        "quantity" : JSONObjectArray[counter].quantity,
        "subtotal" : (JSONObjectArray[counter].quantity * JSONObjectArray[counter].price).toFixed(2)
      };
      JSONObjectArray[counter].state = true;
      selected_items = JSONCartArray.length;
      totalitems.innerHTML = selected_items;
      count++;
    }
    else {
      for(var i = 0; i < JSONCartArray.length; i++) {
        if(JSONCartArray[i].productno == counter) {
          JSONCartArray[i].quantity = JSONObjectArray[counter].quantity;
          JSONCartArray[i].subtotal = (JSONObjectArray[counter].quantity * JSONObjectArray[counter].price).toFixed(2);
        }
      }
    }
    ShoppingCart.displaytotal();
  },

  updatecart: function(newnumber) {
    var newnumbervalue = newnumber.value;
    JSONCartArray[newnumber.id].quantity = newnumbervalue;
    JSONCartArray[newnumber.id].subtotal = (JSONCartArray[newnumber.id].quantity * JSONCartArray[newnumber.id].price).toFixed(2);
    ShoppingCart.displaycart();
    ShoppingCart.displaytotal();

  },

  displaycart: function() {
    contentpage[0].style.display = 'none';
    contentpage[1].style.display = 'block';
    shoppingcartlist.innerHTML = "";
    for (var i = 0; i < JSONCartArray.length; i++ ) {
      var shoppeditem = ShoppingCart.insertitem('li', 'showListItem', shoppingcartlist);

      var cell1 = ShoppingCart.insertitem('div', 'showProductCell', shoppeditem);
      var cell2 = ShoppingCart.insertitem('div', 'showPriceCell', shoppeditem);
      var cell3 = ShoppingCart.insertitem('div', 'showQuantityCell', shoppeditem);
      var cell4 = ShoppingCart.insertitem('div', 'showSubtotalCell', shoppeditem);
      var cell5 = ShoppingCart.insertitem('div', 'removeButtonCell', shoppeditem);
      
      var smallimg = ShoppingCart.insertitem('img', 'showImage', cell1);
      smallimg.setAttribute('src' , JSONCartArray[i].imageurl);
      ShoppingCart.insertitem('label', 'showCaption', cell1).innerHTML = JSONCartArray[i].Caption;

      ShoppingCart.insertitem('label', '', cell2).innerHTML = JSONCartArray[i].price;
      var cartquantity = ShoppingCart.insertitem('input', 'showQuantity', cell3);
      cartquantity.setAttribute('type','text');
      cartquantity.setAttribute('id' , i);
      cartquantity.setAttribute('value',JSONCartArray[i].quantity);
      cartquantity.setAttribute('onchange' , 'ShoppingCart.updatecart(this)');

      ShoppingCart.insertitem('label', '', cell4).innerHTML = JSONCartArray[i].subtotal;

      var removebutton = ShoppingCart.insertitem('input', '', cell5);
      removebutton.setAttribute('type','button');
      removebutton.setAttribute('value','Remove');
      removebutton.setAttribute('row' , i);
      removebutton.setAttribute('onclick' , 'ShoppingCart.removeitem(this)');
    }
  },

  removeitem: function(removerow) {
    var selectedrow = removerow.parentNode.parentNode;
    selectedrow.parentNode.removeChild(selectedrow);
    var updatedState;
    var selectedattribute = removerow.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute("src");
    for (var i = 0; i < JSONCartArray.length; i++) {
      if(JSONCartArray[i].imageurl.match(selectedattribute)) {
        updatedState = JSONCartArray[i].productno;
        JSONCartArray.splice(i , 1);
      }
    }
    JSONObjectArray[updatedState].state = false;
    totalitems.innerHTML = JSONCartArray.length;
    ShoppingCart.displaytotal();
    count--;
  },

  displaytotal: function() {
    sum = 0;
    for (var i = 0; i < JSONCartArray.length; i++) {
    sum = (parseFloat(sum,10) + parseFloat(JSONCartArray[i].subtotal, 10)).toFixed(2);
    }
    sumtotal.value = sum;

  }
}
ShoppingCart.load();
ShoppingCart.displaytotal();