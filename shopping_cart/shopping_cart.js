// All products json
var Products = {
  
  DETAILS: [ 
    { 
      "imageurl" : "images/1.jpg", 
      "Caption" : "Apple MacBook Pro MA464LL/A 15.4 Notebook PC",
      "category" : "Category: Computers",
      "quantity" : 1,
      "Description" : "The Intel Core Duo powering MacBook Pro is actually two processors built into a single chip.",
      "price" : 2299.99,
      "subtotal" : 0.00,
      "state" : false
    }, 
    { 
      "imageurl" : "images/2.jpg",
      "Caption" : "Sony VAIO 11.1", 
      "category" : "Category: Computers",
      "quantity" : 1,
      "Description" : "Weighing in at just an amazing 2.84 pounds and offering a sleek, durable carbon-fibre case in charcoal black. And with 4 to 10 hours of standard battery life, it has the stamina to power you through your most demanding applications", 
      "price" : 2699.99,
      "subtotal" : 0.00,
      "state" : false
    },
    { 
      "imageurl" : "images/3.jpg", 
      "Caption" : "Canon Digital Rebel XT 8MP Digital SLR Camera",
      "category" : "Category: Cameras", 
      "quantity" : 1,
      "Description" : "Canon EOS Digital Rebel XT SLR adds resolution, speed, extra creative control, and enhanced comfort in the hand to one of the smallest and lightest digital cameras in its class", 
      "price" : 550.00,
      "subtotal" : 0.00,
      "state" : false
    }
  ]
}


// shopping cart starts

var ShoppingCart = function() {
  this.init();
}

ShoppingCart.prototype = {

  init: function() {
    this.items_list = document.getElementById('itemslist');
    this.total_items = document.getElementById('numberofitems');
    this.sum_total = document.getElementById('totalprice');
    this.shopped_items = [];
    this.cart_item = 0;
    this.sum_total.disabled = true;
  },

  showAndHideSection: function(hidden_section, visible_section) {
    hidden_section.style.display = "none";
    visible_section.style.display = "block";
    this.showProducts();
  },

  createAndAppendElement: function(element_type, class_name, parent_element) {
    var element = document.createElement(element_type);
    element.setAttribute('class', class_name);  
    parent_element.appendChild(element);
    return element;
  },

  showProducts: function() {
    var items = Products.DETAILS;
    this.items_list.innerHTML = "";

    for ( var i = 0; i < items.length; i++) {
      // creating row and cells for an item
      var new_row = this.createAndAppendElement('li', 'listitem', this.items_list),
          image_cell = this.createAndAppendElement('span', 'imagecell', new_row),
          info_cell = this.createAndAppendElement('span', 'infocell', new_row),
          quantity_cell = this.createAndAppendElement('span', 'quantitycell', new_row),
          add_button_cell = this.createAndAppendElement('span', 'addToCartCell', new_row),
          this_object = this;

      // creating elements for cells in a row
      
      //for image cell
      this.createAndAppendElement('img', 'prod_image', image_cell).setAttribute('src', items[i].imageurl);
      //for product description cell
      this.createAndAppendElement('span', 'caption_label', info_cell).innerText = items[i].Caption;
      this.createAndAppendElement('span', 'categorylabel', info_cell).innerText = items[i].category;
      this.createAndAppendElement('p', 'describe', info_cell).innerText = items[i].Description;
      this.createAndAppendElement('span', 'pricelabel', info_cell).innerText = "Price:";
      this.createAndAppendElement('span', 'itemprice', info_cell).innerText = items[i].price;
      //for quantity cell
      this.createAndAppendElement('span', '', quantity_cell).innerText = "Quantity";
      var quantity_box = this.createAndAppendElement('input', 'quantitybox', quantity_cell);
      quantity_box.type = 'text';
      // quantity_box.value = items[i].quantity;
      quantity_box.id = 'i' + i;
      quantity_box.value = 1;
      quantity_box.name = i;
      quantity_box.onchange = function() { this_object.changeQuantity(this);} 

      // for add to cart button cell
      var number_of_item = quantity_box.value;
      var add_to_cart_button = this.createAndAppendElement('input', 'addToCartButton', add_button_cell);
      add_to_cart_button.type = "button";
      add_to_cart_button.value = "Add to Cart";
      add_to_cart_button.id = i;
      add_to_cart_button.onclick = function(){ this_object.addToCart(this, number_of_item) };
           
    }
  },

  addToCart: function(add_button) {
    var item_number = add_button.id,
        current_item = Products.DETAILS[item_number];
        number_of_item = document.getElementById('i' + item_number);
    
    if (!(Products.DETAILS[item_number].state) && (number_of_item.value > 0)) {
      this.shopped_items[this.cart_item] = {
        "imageurl" : current_item.imageurl,
        "Caption" : current_item.Caption,
        "category" : current_item.category,
        "price" : current_item.price.toFixed(2),
        "productno" : item_number,
        "quantity" : current_item.quantity,
        "subtotal" : (current_item.quantity * current_item.price)
      }
      var selected_items = this.shopped_items.length;
      current_item.state = true;     
      this.total_items.innerHTML = selected_items;
      this.cart_item++;
    } 
    else if (number_of_item.value > 0) {
      for (var i = 0; i < this.shopped_items.length; i++) {
        if (this.shopped_items[i].productno == item_number) {
          this.shopped_items[i].quantity = parseInt(this.shopped_items[i].quantity) + parseInt(current_item.quantity);
          this.shopped_items[i].subtotal = (this.shopped_items[i].quantity * this.shopped_items[i].price).toFixed(2);
        }
      }
    }
    else {
      alert("You can add only a positive number for quantity!");
      number_of_item.value = 1;     
    }
    this.displayTotal();
  },

  changeQuantity: function(number) {
    Products.DETAILS[number.name].quantity = number.value;
  },

  displayCart: function() {
    var cart = document.getElementById('cart'),
        this_object = this;
    
    cart.innerHTML = "";

    for (var i = 0; i < this.shopped_items.length; i++) {

      // creating row and cells for a shopped item
      var shopped_item = this.createAndAppendElement('li', 'showListItem', cart),
          product_cell = this.createAndAppendElement('span', 'showProductCell', shopped_item),
          price_cell = this.createAndAppendElement('span', 'showPriceCell', shopped_item),
          quantity_cell = this.createAndAppendElement('span', 'showQuantityCell', shopped_item),
          subtotal_cell = this.createAndAppendElement('span', 'showSubtotalCell', shopped_item),
          remove_button_cell = this.createAndAppendElement('span', 'removeButtonCell', shopped_item);
      
      // creating elements for cells in a row

      this.createAndAppendElement('img', 'showImage', product_cell).setAttribute('src', this.shopped_items[i].imageurl);
      this.createAndAppendElement('span', 'showCaption', product_cell).innerText = this.shopped_items[i].Caption;
      
      this.createAndAppendElement('span', '', price_cell).innerText = this.shopped_items[i].price;

      var item_quantity = this.createAndAppendElement('input', 'showQuantity', quantity_cell);
      item_quantity.type = 'text';
      item_quantity.id = i;
      item_quantity.value = this.shopped_items[i].quantity;
      item_quantity.onchange = function() { this_object.updateCart(this) };
      
      this.createAndAppendElement('span', '', subtotal_cell).innerText = this.shopped_items[i].subtotal;

      var remove_button = this.createAndAppendElement('input', '', remove_button_cell);
      remove_button.type = 'button';
      remove_button.value = 'Remove';
      remove_button.setAttribute('row' , i);
      remove_button.onclick = function() { this_object.removeItem(this)};
    }
  },

  updateCart: function(new_number) {
    var new_number_value = parseInt(new_number.value, 10);
    if (new_number_value > 0) {
      this.shopped_items[new_number.id].quantity = new_number_value;
      this.shopped_items[new_number.id].subtotal = (this.shopped_items[new_number.id].quantity * this.shopped_items[new_number.id].price).toFixed(2);
    }
    else {
      alert("You cannot enter quantity less than 1");
    }
    this.displayCart();
    this.displayTotal();
  },

  removeItem: function(row) {
    var selected_row = row.parentNode.parentNode,
        updated_state,
        selected_attribute = row.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute("src");
    
    selected_row.parentNode.removeChild(selected_row);

    for (var i = 0; i < this.shopped_items.length; i++) {
      if(this.shopped_items[i].imageurl.match(selected_attribute)) {
        updated_state = this.shopped_items[i].productno;
        this.shopped_items.splice(i , 1);
      }
    }
    Products.DETAILS[updated_state].state = false;
    this.total_items.innerText = this.shopped_items.length;
    this.displayTotal();
    this.cart_item--;
  },

  displayTotal: function() {
    var sum = 0;
    for (var i = 0; i < this.shopped_items.length; i++) {
      sum = sum + parseFloat(this.shopped_items[i].subtotal, 10);
    }
    this.sum_total.value = sum.toFixed(2);
  }

}

window.onload = function() {
  var cart_object = new ShoppingCart(),
      products_page = document.getElementById('items'),
      cart_page = document.getElementById('cart-section'),
      products_tab = document.getElementById('product_link'),
      cart_tab = document.getElementById('cart_link'); 

  cart_object.showAndHideSection(cart_page, products_page);

  products_tab.addEventListener('click', function() {
    cart_object.showAndHideSection(cart_page, products_page);
  }, false);

  cart_tab.addEventListener('click', function() {
    cart_object.showAndHideSection(products_page, cart_page);
    cart_object.displayCart();
  }, false);

}