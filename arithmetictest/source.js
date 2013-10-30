var ArithmeticTest = {

	init: function() {
		window.open('test.html', '_blank', "resizable = no scrollable = no toolbar = no");
		question = document.getElementById('question');
		answer = document.getElementById('answer');
		totalquestions = 4;
		current = 0;
		JSONarray = [];
	},

	getrandomnumber: function() {
		return Math.floor(Math.random() * 20);
	},

	getrandomoperator: function() {
		var operators = ['+', '-', '*', '/'];
		var randomnumber = Math.floor((Math.random() * 10) % 4);
		return operators[randomnumber];
	},

	createJSON: function() {
		for (var i = 0; i < totalquestions; i++) {
			JSONarray[i] = {
				"operand1" : ArithmeticTest.getrandomnumber(),
				"operator" : ArithmeticTest.getrandomoperator(),
				"operand2" : ArithmeticTest.getrandomnumber(),
				"useranswer" : "",
				"testanswer" : ""
			}
		}
	},

	showquestion: function() {
		question.text = "";
		var quesstring = JSONarray[current].operand1 + JSONarray[current].operator + JSONarray[current].operand2;
		question.text = quesstring;
		JSONarray[current].testanswer = eval(quesstring).toFixed(2);	
	},

	submitanswer: function() {
		var answer = document.getElementById('answer');
		JSONarray[current].useranswer = parseFloat(answer.value.trim()).toFixed(2);
		console.log(JSONarray[current]);
		current++;
		if (current == totalquestions) {
      // ArithmeticTest.calculateresult();
      alert("completed");
		}
		else {
			ArithmeticTest.showquestion();
		}	
	},



}
ArithmeticTest.init();
ArithmeticTest.createJSON();
ArithmeticTest.showquestion();