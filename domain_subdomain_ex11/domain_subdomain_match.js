var Regex = {

  URL: /^((https?|ftp):\/\/)?(www\.)?((([A-z0-9]+)\.)*)([A-z0-9]+\.[A-z]{2,4})$/

}

var DomainSubdomain = function() {
  this.init();
}

DomainSubdomain.prototype = {

  init: function() {

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
      user_form = document.getElementById('email-form'),
      form_object = new DomainSubdomain();

  user_form.onsubmit = function() {
    form_object.getDomainSubdomain(input_box);
    return false;
  }
}
