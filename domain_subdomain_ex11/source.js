var domainSubDomain = function() {

  var urlregex = /^(https?:\/\/)?((([A-z0-9]+)\.)*)([A-z0-9]+\.[A-z]{2,4})$/;
  var url = document.getElementById("url").value;
  var urlvalue = url.trim();

  if ((urlvalue.length != 0) && (urlregex.test(urlvalue))) {
    var sub = RegExp.$2;
    var subdomain = sub.substr(0, sub.length-1);
    if (subdomain.length == 0) {
      alert("Domain: " + RegExp.$5);
    }
    else {
      alert("Domain: " + RegExp.$5 + ", Subdomain: " + subdomain);
    }
    return true;
  }
  else { return false; }
} 