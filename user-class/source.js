function User(name, age) {
	this.name = name;
	this.age = age;
}

User.prototype.compare = function(object) {

	if (this.age > object.age) {
		alert(this.name + " is older than " + object.name);
	}
	else {
		alert(object.name + " is older than " + this.name);
	}

};

var user1 = new User();
user1.name = "Sahil";
user1.age = 28;
var user2 = new User();
user2.name = "Karan";
user2.age = 26;
user1.compare(user2);