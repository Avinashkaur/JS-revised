var Regex = {

  URL: /^((https?|ftp):\/\/)?(www\.)?(([A-z0-9]+\.)*)([A-z0-9]+\.[A-z]{2,4})(\/(.)*)?$/

}

var DomainSubdomain = function() {
}

DomainSubdomain.prototype = {

  displayDomainSubdomain: function(element) {
    var url = element.value.trim()

    if (url.match(Regex.URL)) {
      this.domain = RegExp.$6;
      this.subdomain = this.getSubDomain();
      this.displayUrlInfo();
    }
    else {
      alert("Not a valid URL");
    }
  },

  getSubDomain: function() {
    var subdomain =  RegExp.$4.replace(/\.$/, '');
    return subdomain || "";
  },

  displayUrlInfo: function() {
    if (this.subdomain.length != 0) {
      alert("Subdomain: " + this.subdomain + "\n Domain: " + this.domain);
    }
    else {
      alert("Domain: " + this.domain);
    }
    
  }

}

window.onload = function() {
  var input_box = document.getElementById('url'),
      user_form = document.getElementById('email-form'),
      form_object = new DomainSubdomain(input_box);

  user_form.onsubmit = function() {
    form_object.displayDomainSubdomain(input_box);
    return false;
  }
}
