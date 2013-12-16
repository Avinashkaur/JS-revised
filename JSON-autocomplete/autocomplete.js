var UserData = {

  NAMES: [{ "name": "Luigi Damiano" },
    { "name": "Zenith Coboro" },
    { "name": "Zig Ziglar" },
    { "name": "Steve Costner" },
    { "name": "Bill Grazer" },
    { "name": "Timothy Frazer" },
    { "name": "Boris Becker" },
    { "name": "Glenn Gladwich" },
    { "name": "Jim Jackson" },
    { "name": "Aaron Kabin" },
    { "name": "Roy Goldwin" },
    { "name": "Jason Goldberg" },
    { "name": "Tim Ferris" },
    { "name": "Buck Singham" },
    { "name": "Malcom Gladwell" },
    { "name": "Joy Rabura" },
    { "name": "Vid Luther" },
    { "name": "Tom Glicken" },
    { "name": "Ray Baxter" },
    { "name": "Ari Kama" },
    { "name": "Kenichi Suzuki" },
    { "name": "Rick Olson" }
    ]

};

var AutoComplete = function(input_box, searched_list) {
  this.init(input_box, searched_list);
}

AutoComplete.prototype = {

  NO_RESULT_TEXT: "No results found!",

  init: function(input_box, searched_list) {
    this.input_box = input_box;
    this.searched_data_box = searched_list;
  },
  
  searchNames: function(key) {
    var data_to_search = this.input_box.value.trim(),
        search_query = new RegExp(data_to_search, 'i'),
        names = UserData.NAMES,
        searched_list = [];

    this.searched_data_box.innerHTML = "";

    for (var i = 0; i < names.length; i++) {
      // if the characters entered by the user matches the user names provided
      if (search_query.test(names[i][key])) {
        searched_list.push(names[i][key]);
      }
    }
  
    // if searched_list is populated with names, we create the list else show 'no results' message
    (searched_list.length) ? this.createSearchedList(searched_list) : this.noSearchResults();
    
  },

  createSearchedList: function(searched_list) {
    var list_item;

    for (var i = 0; i < searched_list.length; i++) {
      list_item = this.createListItem(searched_list[i]);
      this.searched_data_box.appendChild(list_item);
    }
    this.showList();
  },

  createListItem: function(value) {
    var this_object = this,
        li = document.createElement('li');

    li.setAttribute('class', 'searched-child');
    li.innerText = value;
    li.onmousedown = function() {  this_object.onMouseDown(this); };
    li.onmouseover = function() {  this_object.onMouseOver(this); };
    li.onmouseout = function() {  this_object.onMouseOut(this); };
    return li;
  },

  onMouseOver: function(element) {
    element.className = element.className + ' highlight';
  },

  onMouseOut: function(element) {
    element.className = element.className.replace(/\bhighlight\b/,'');
  },

  onMouseDown: function(element) {
    this.input_box.value = element.innerHTML;
  },
  
  noSearchResults: function() {
    this.searched_data_box.innerHTML = this.NO_RESULT_TEXT;
  },

  listBlur: function() {
    this.searched_data_box.style.display = 'none';
  },

  showList: function() {
    this.searched_data_box.style.display = 'block';
  }

}

window.onload = function() {
  var search_box = document.getElementById('search-user'),
      searched_list = document.getElementById('searched-list'),
      autocomplete_object = new AutoComplete(search_box, searched_list);
  
  search_box.onkeyup = function() {
    if (search_box.value.trim().length != 0) {
      autocomplete_object.searchNames('name');
    }
    else {
      autocomplete_object.showList();
    }  
  }

  search_box.onblur = function() {
    autocomplete_object.listBlur();
  }
}