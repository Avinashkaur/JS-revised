var Products = {

  DETAILS:  [
    {"name": "1", "url": "images/1.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "1"},
    {"name": "2", "url": "images/2.jpg", "color": "Red", "brand": "BRAND B", "sold_out": "0"},
    {"name": "3", "url": "images/3.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"},
    {"name": "4", "url": "images/4.jpg", "color": "Red", "brand": "BRAND A", "sold_out": "1"},
    {"name": "5", "url": "images/5.jpg", "color": "Blue", "brand": "BRAND B", "sold_out": "0"},
    {"name": "6", "url": "images/6.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"},
    {"name": "7", "url": "images/7.jpg", "color": "Red", "brand": "BRAND C", "sold_out": "1"},
    {"name": "8", "url": "images/8.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"},
    {"name": "9", "url": "images/9.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"},
    {"name": "10", "url": "images/10.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"},
    {"name": "11", "url": "images/11.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"},
    {"name": "12", "url": "images/12.jpg", "color": "Yellow", "brand": "BRAND D", "sold_out": "0"},
    {"name": "13", "url": "images/13.jpg", "color": "Blue", "brand": "BRAND A", "sold_out": "0"},
    {"name": "14", "url": "images/14.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"},
    {"name": "15", "url": "images/15.jpg", "color": "Green", "brand": "BRAND B", "sold_out": "0"},
    {"name": "16", "url": "images/16.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"},
    {"name": "17", "url": "images/17.jpg", "color": "Green", "brand": "BRAND A", "sold_out": "1"},
    {"name": "18", "url": "images/18.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "1"},
    {"name": "19", "url": "images/19.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"},
    {"name": "20", "url": "images/20.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}
  ]
};

var Store = function() {
  this.init();
}

Store.prototype = {

  init: function() {
    this.products = Products.DETAILS;
    this.products_display = document.getElementById('products-display');
    this.showProducts(this.products);
  },

  showProducts: function(items_array) {
    this.products_display.innerHTML = "";
    for (var key in items_array) {
      this.createAndAppendElement('img', this.products_display, { 'src' : items_array[key].url, 'class' : 'item-image' });
    }
  },

  createAndAppendElement: function(element, parent_element, attributes) {
    var new_element = document.createElement(element);
    attributes = attributes || {};

    for (var attr in attributes) {
      new_element.setAttribute(attr, attributes[attr]);
    }
    parent_element.appendChild(new_element);
    return new_element;
  },

  sortAndDisplayItems: function(property) {
    var compare = function(a,b) {
      if (a[property] < b[property])
        return -1;
      if (a[property] > b[property])
        return 1;
      return 0;
    }
    this.showProducts(this.products.sort(compare));
  }

}

window.onload = function() {
  var store_object = new Store(),
      sort_by_options_element = document.getElementById('sort-options'),
      selected_option;

  sort_by_options_element.onchange = function() {
    selected_option =  this.options[this.selectedIndex].getAttribute('data-value');
    store_object.sortAndDisplayItems(selected_option);
  }
}