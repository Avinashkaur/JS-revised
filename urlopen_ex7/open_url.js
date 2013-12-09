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
    var trimmed_url;

    do {
      this.url = prompt('Enter the url', '');
      trimmed_url = this.getTrimmedUrl();
      if (trimmed_url) {
        this.openUrl();
        break;
      }
      alert("You cannot enter blank url");
    } while (!trimmed_url);

  },

  getTrimmedUrl: function() {
    return this.url.trim();
  },

  openUrl: function() {
    window.open(this.url, "_blank", "width = 400 height = 450 resizable = no scrollable = no status = no toolbar = no ");
  }

}

window.onload = function() {
  var input_object = new InputAndOpenUrl();
}