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
  this.input_box = input_box;
  this.searched_data_box = searched_list;
}

AutoComplete.prototype = {

  NO_RESULT_TEXT: "No results found!",

  searchAndDisplayNames: function() {
    var data_to_search = this.input_box.value.trim(),
        search_query = new RegExp(data_to_search, 'i'),
        search_results = [];

    this.searched_data_box.innerHTML = "";

    for (var i = 0; i < UserData.NAMES.length; i++) {
      // if the characters entered by the user matches the user names provided
      if (search_query.test(UserData.NAMES[i]['name'])) {
        search_results.push(UserData.NAMES[i]['name']);
      }
    }
  
    // if searched_list is populated with names, we create the list else show 'no results' message
    (search_results.length) ? this.createSearchedList(search_results) : this.noSearchResults();
    this.showList();
  },

  showAllNames: function() {
    var names_array = [];

    for (var i in UserData.NAMES) {
      names_array.push(UserData.NAMES[i].name);
    }
    this.createSearchedList(names_array);
    this.showList();
  },

  createSearchedList: function(searched_list) {
    var list_item;

    for (var i = 0; i < searched_list.length; i++) {
      list_item = this.createListItem(searched_list[i]);
      this.searched_data_box.appendChild(list_item);
    }
  },

  createListItem: function(value) {
    var this_object = this,
        li = document.createElement('li');

    li.setAttribute('class', 'searched-child');
    li.innerText = value;
    li.onmousedown = function() {  this_object.input_box.value = this.innerHTML; };
    li.onmouseover = function() {  this.className = this.className + ' highlight'; };
    li.onmouseout = function() {  this.className = this.className.replace(/\bhighlight\b/,''); };
    return li;
  },
  
  noSearchResults: function() {
    this.searched_data_box.innerText = this.NO_RESULT_TEXT;
  },

  hideList: function() {
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
    if (search_box.value.match(/^\s+$/)) {
      autocomplete_object.noSearchResults();
    }
    else if (search_box.value.trim().length != 0) {
      autocomplete_object.searchAndDisplayNames();
    }
    else {
      searched_list.innerHTML = "";
      autocomplete_object.showAllNames();
    }  
  }

  search_box.onblur = function() {
    autocomplete_object.hideList();
  }
}