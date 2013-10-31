function User(name, age) {
	this.name = name;
	this.age = parseInt(age, 10);
}

User.prototype.compare = function(object) {
	if (this.age > object.age) {
		alert(this.name + " is older than " + object.name);
	}
	else {
		alert(object.name + " is older than " + this.name);
	}
};

window.onload=function(){
	var user1 = new User("Sahil", "22");
	var user2 = new User("Karan", 26);
	user1.compare(user2);
}