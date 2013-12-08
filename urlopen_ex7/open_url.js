var InputAndOpenUrl = function() {
  this.init();
}

InputAndOpenUrl.prototype = {

  init: function() {
    this.url = '';
    
    // invoke methods
    this.inputUrl();
  },

  inputUrl: function() {
    var url_length = 0;

    while (url_length == 0) {
      this.url = prompt('Enter the url', '');
      url_length = this.url.trim().length;
      if (url_length != 0) {
        this.openUrl();
        break;
      }
      alert("You cannot enter blank url");
    }
  },

  openUrl: function() {
    window.open(this.url, "_blank", "width = 400 height = 450 resizable = no scrollable = no status = no toolbar = no ");
  }

}

window.onload = function() {
  var input_object = new InputAndOpenUrl();
}