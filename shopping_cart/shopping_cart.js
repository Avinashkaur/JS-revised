// products json
var Products = {

  DETAILS: {
    "1" : {
      "imageurl" : "images/1.jpg",
      "caption" : "Apple MacBook Pro MA464LL/A 15.4 Notebook PC",
      "category" : "Category: Computers",
      "description" : "The Intel Core Duo powering MacBook Pro is actually two processors built into a single chip.",
      "price" : 2299.99
    },
    "2" : {
      "imageurl" : "images/2.jpg",
      "caption" : "Sony VAIO 11.1",
      "category" : "Category: Computers",
      "description" : "Weighing in at just an amazing 2.84 pounds and offering a sleek, durable carbon-fibre case in charcoal black. And with 4 to 10 hours of standard battery life, it has the stamina to power you through your most demanding applications",
      "price" : 2699.99
    },
    "3" : {
      "imageurl" : "images/3.jpg",
      "caption" : "Canon Digital Rebel XT 8MP Digital SLR Camera",
      "category" : "Category: Cameras",
      "description" : "Canon EOS Digital Rebel XT SLR adds resolution, speed, extra creative control, and enhanced comfort in the hand to one of the smallest and lightest digital cameras in its class",
      "price" : 550.00
    }
  }
};

var Regex = {

  NUMBER: /^[1-9]\d*$/

};

// shopping cart starts

var ShoppingCart = function() {
  this.init();
};

ShoppingCart.prototype = {

  DEFAULT_QUANTITY: 1,

  init: function() {
    this.items_list = document.getElementById('products-list');
    this.shopped_items = {};
    this.total_items = document.getElementById('number-of-items');
    this.cart = document.getElementById('cart-list');

    // invoke methods
    this.createProductsToShow();
  },

  showAndHideSection: function(section_to_hide, section_to_show) {
    section_to_hide.style.display = "none";
    section_to_show.style.display = "block";
  },

  createAndAppendElement: function(element_type, parent_element, attributes_object) {
    attributes_object = attributes_object || {};
    var element = document.createElement(element_type);

    parent_element.appendChild(element);
    for (var attr in attributes_object) {
      element.setAttribute(attr, attributes_object[attr]);
    }
    return element;
  },

  createProductsToShow: function() {
    var products = Products.DETAILS;

    for (var key in products) {
      var new_row = this.createAndAppendElement('li', this.items_list, { 'class' : 'list-item' }),
          image_cell = this.createAndAppendElement('span', new_row, { 'class' : 'image-cell' }),
          info_cell = this.createAndAppendElement('span', new_row, { 'class' : 'info-cell' }),
          quantity_cell = this.createAndAppendElement('span', new_row, { 'class' : 'quantity-cell' }),
          add_button_cell = this.createAndAppendElement('span', new_row, { 'class' : 'button-cell' }),
          this_object = this,
          quantity_box,
          add_to_cart_button;
    
      // for image cell
      this.createAndAppendElement('img', image_cell, { 'class' : 'prod-image', 'src' : products[key].imageurl });
      
      //for product detail cell
      this.createProductDetailsCell(info_cell, products[key]);
      
      //for quantity cell
      this.createAndAppendElement('span', quantity_cell).innerText = "Quantity";
      quantity_box = this.createAndAppendElement('input', quantity_cell, { 'class' : 'quantity-box', 'type' : 'text', 'id' : 'i' + key, 'value' : 1, "name" : key });
      
      //for add to cart button cell
      add_to_cart_button = this.createAndAppendElement('input', add_button_cell, { 'class' : 'add-to-cart-button', 'type' : 'button', 'value' : 'Add To Cart', 'id' : key });
      add_to_cart_button.onclick = function() { this_object.checkQuantity(this) }
    }
  },

  createProductDetailsCell: function(info_cell, item) {
    this.createAndAppendElement('span', info_cell, { 'class' : 'caption-label' }).innerText = item.caption;
    this.createAndAppendElement('span', info_cell, { 'class' : 'category-label' }).innerText = item.category;
    this.createAndAppendElement('p', info_cell, { 'class' : 'describe' }).innerText = item.description;
    this.createAndAppendElement('span', info_cell, { 'class' : 'price-label' }).innerText = "Price:";
    this.createAndAppendElement('span', info_cell, { 'class' : 'item-price' }).innerText = item.price;   
  },

  checkQuantity: function(add_button) {
    var quantity_box = document.getElementById('i' + add_button.id),
        number_of_items = Number(quantity_box.value);
   
    if (Regex.NUMBER.test(number_of_items)) {
      this.addToCart(add_button, number_of_items);
    }
    else {
      this.alertForWrongInputQuantityAndSetDefaultValue(quantity_box, this.DEFAULT_QUANTITY);
    }
  },

  addToCart: function(add_button, number_of_items) {
    var item_id = add_button.id,
        cart_array_length = Object.keys(this.shopped_items).length;
    
    // checks if item is already added to the cart
    if (this.shopped_items[item_id] != undefined) { 
      this.shopped_items[item_id].quantity = this.shopped_items[item_id].quantity + number_of_items;
      this.updateItemQuantityInCart(item_id);   
    }
    // if item is not present, new row is created
    else {
      this.addNewItemToCart(item_id, number_of_items);
      this.updateTotalQuantity();
    }
    this.updateNetTotal();
  },

  addNewItemToCart: function(item_id, number_of_items) {
    // updating cart object 
    this.shopped_items[item_id] = Products.DETAILS[item_id];
    this.shopped_items[item_id].quantity = number_of_items;
    this.shopped_items[item_id].subtotal = this.shopped_items[item_id].quantity * this.shopped_items[item_id].price;

    // creating new product entry in cart to display
    var shopped_item = this.createAndAppendElement('li', this.cart, { 'class' : 'show-list-item', 'id' : 'cart' + item_id }),
        product_cell = this.createAndAppendElement('span', shopped_item, { 'class' : 'show-product-cell' }),
        price_cell = this.createAndAppendElement('span', shopped_item, { 'class' : 'show-price-cell' }),
        quantity_cell = this.createAndAppendElement('span', shopped_item, { 'class' : 'show-quantity-cell' }),
        subtotal_cell = this.createAndAppendElement('span', shopped_item, { 'class' : 'show-subtotal-cell' }),
        remove_button_cell = this.createAndAppendElement('span', shopped_item, { 'class' : 'remove-bitton-cell' }),
        this_object = this, remove_button, quantity_box;

    // for product details cell
    this.createAndAppendElement('img', product_cell, { 'class' : 'show-image', 'src' : this.shopped_items[item_id].imageurl });
    this.createAndAppendElement('span', product_cell, { 'class' : 'show-caption' }).innerText = this.shopped_items[item_id].caption;
    
    // for price cell
    this.createAndAppendElement('span', price_cell).innerText = this.shopped_items[item_id].price;
    
    // for quantity box cell
    quantity_box = this.createAndAppendElement('input', quantity_cell, { 'class' : 'show-quantity', 'type' : 'text', 'data-id' : item_id, 'id' : 's' + item_id, 'value' : this.shopped_items[item_id].quantity });
    quantity_box.onchange = function() { this_object.checkQuantityOnChange(this, 'data-id'); }
    
    // for subtotal cell
    this.createAndAppendElement('span', subtotal_cell, { 'id' : 'subtotal' + item_id }).innerText = this.shopped_items[item_id].subtotal.toFixed(2);
    
    // remove button
    remove_button = this.createAndAppendElement('input', remove_button_cell, { 'type' : 'button', 'value' : 'Remove', 'data-row' : item_id });
    remove_button.onclick = function() { this_object.confirmToRemoveRow(this) };
  },

  checkQuantityOnChange: function(quantity_box, attribute) {
    var quantity_box_value = Number(quantity_box.value),
        item_id = quantity_box.getAttribute(attribute);

    if (Regex.NUMBER.test(quantity_box_value)) {
      this.shopped_items[item_id].quantity = quantity_box_value;
      this.updateSubtotal(item_id, quantity_box_value);
      this.updateNetTotal();
    }
    else {
      this.alertForWrongInputQuantityAndSetDefaultValue(quantity_box, this.shopped_items[item_id].quantity);
    }
  },

  alertForWrongInputQuantityAndSetDefaultValue: function(quantity_box, default_value) {
    alert("You cannot add zero or invalid quantity!");
    quantity_box.focus();
    quantity_box.value = default_value;
  },
   
  updateItemQuantityInCart: function(item_id) {
    //if the item is already added to the cart, update only the quantity of the corresponding
    //item row in cart
    var quantity_box_to_update = document.getElementById('s' + item_id);

    quantity_box_to_update.value = this.shopped_items[item_id].quantity;
    this.updateSubtotal(item_id, this.shopped_items[item_id].quantity);
  },
  
  updateTotalQuantity: function() {
    this.total_items.innerText = Object.keys(this.shopped_items).length;
  },

  updateSubtotal: function(item_id, number_of_items) {
    var subtotal_span = document.getElementById('subtotal' + item_id);

    this.shopped_items[item_id].subtotal = number_of_items * this.shopped_items[item_id].price;
    subtotal_span.innerText = this.shopped_items[item_id].subtotal.toFixed(2);
  },

  updateNetTotal: function() {
    var sum = 0,
        net_total_box = document.getElementById('total-amount');

    for (var key in this.shopped_items) {
      sum = sum + this.shopped_items[key].subtotal;
    }
    net_total_box.value = sum.toFixed(2);
  },

  confirmToRemoveRow: function(element) {
    var user_confirmation = confirm('Are you sure you want to remove this item from cart?');

    if (user_confirmation) {
      this.removeRow(element);
    }

  },

  removeRow: function(element) {
    var item_id = element.getAttribute('data-row'),
        row_to_remove = document.getElementById('cart' + item_id);

    delete this.shopped_items[item_id];
    document.getElementById('cart-list').removeChild(row_to_remove);

    this.updateNetTotal();
    this.updateTotalQuantity();
  }
  
}

window.onload = function() {
  var cart_object = new ShoppingCart(),
      products_tab = document.getElementById('products-display'),
      cart_tab = document.getElementById('cart-display'),
      products_link = document.getElementById('product_link'),
      cart_link = document.getElementById('cart_link'); 

  products_link.addEventListener('click', function() {
    cart_object.showAndHideSection(cart_tab, products_tab);
  }, false);

  cart_link.addEventListener('click', function() {
    cart_object.showAndHideSection(products_tab, cart_tab);
  }, false);

}