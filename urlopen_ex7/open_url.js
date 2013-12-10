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

    do {
      this.url = prompt('Enter the url', '').trim();
      if (this.url) {
        this.openUrl();
        break;
      }
      alert("You cannot enter blank url");
    } while (!this.url);

  },

  openUrl: function() {
    window.open(this.url, "_blank", "width = 400 height = 450 resizable = no scrollable = no status = no toolbar = no ");
  }

}

window.onload = function() {
  var input_object = new InputAndOpenUrl();
}