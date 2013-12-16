var Regex = {

  URL: /^((https?|ftp):\/\/)?(www\.)?((([A-z0-9]+)\.)*)([A-z0-9]+\.[A-z]{2,4})/

}

var DomainSubdomain = function(input_box) {
  this.init(input_box);
}

DomainSubdomain.prototype = {

  init: function(input_box) {
    this.getDomainSubdomain(input_box);
  },

  getDomainSubdomain: function(element) {
    var url = element.value.trim()

    if (url.match(Regex.URL)) {
      this.domain = RegExp.$7;
      this.subdomain = this.getSubDomain();
      this.displayUrlInfo();
    }
    else {
      alert("Not a valid URL");
    }
  },

  getSubDomain: function() {
    var trimmed_subdomain =  RegExp.$4.replace(/\.$/, '');
    return trimmed_subdomain || "No subdomain";
  },

  displayUrlInfo: function() {
    alert("Subdomain: " + this.subdomain + "\n Domain: " + this.domain);
  }

}

window.onload = function() {
  var input_box = document.getElementById('url'),
      user_form = document.getElementById('email-form');

  user_form.onsubmit = function() {
    new DomainSubdomain(input_box);
    return false;
  }
}
