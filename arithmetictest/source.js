var question = document.getElementById('question');
var answer = document.getElementById('answer');
var timerlabel = document.getElementById('timer');
var timer = 10, totalquestions = 10;
var current = 0, score = 0, JSONarray = [], showtime, correct = 0, unattempted = 0;

var ArithmeticTest = {

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
    answer.disabled = false;
    ArithmeticTest.resettimer();
		answer.value = "";
		var quesstring = JSONarray[current].operand1 + JSONarray[current].operator + JSONarray[current].operand2;
		question.innerText = quesstring;
		JSONarray[current].testanswer = parseFloat(eval(quesstring), 10).toFixed(2);	
	},

	submitanswer: function() {
		answer.disabled = true;
		JSONarray[current].useranswer = answer.value.trim();
		ArithmeticTest.calculatescore();
		current++;
		if (current < totalquestions) {
      ArithmeticTest.showquestion();  
		}
		else {
			ArithmeticTest.displayresult();
		}	
	},

	calculatescore: function() {
    var showscore = document.getElementById('score');
		if (parseFloat(JSONarray[current].useranswer, 10).toFixed(2) == JSONarray[current].testanswer) {
			score = score + 1;
			correct = correct + 1;
		}
		else if (JSONarray[current].useranswer == "") {
			unattempted = unattempted + 1;
		}
		showscore.innerText = score;
	},

	resettimer: function() {
    clearInterval(showtime);
    timer = 10;
    showtime = setInterval(function() { ArithmeticTest.cleartimer()},1000);
	},

	cleartimer: function() {
		if ((timer <= 10) && (timer > 0)) {
			console.log(timer);
			timer = timer - 1;
			timerlabel.innerText = "Time Left: " + timer + " seconds";
		}
		else {
			answer.disabled = true;
			clearInterval(showtime);
			ArithmeticTest.submitanswer();		
		}

	},

	displayresult: function() {
		timerlabel.style.display = "none";
    document.getElementById('nextbutton').style.display = "none";
    document.getElementById('score').style.display = "none";

    answer.style.display = "none";
    question.innerHTML = "Your score: " + correct;
    document.getElementById('wrong').innerText = "Wrong: " + (totalquestions - (correct + unattempted));
    document.getElementById('unattempted').innerText = "Unattempted: " + unattempted;
    var summary = "";

    for (var i = 0; i < JSONarray.length; i++) {
    	if (JSONarray[i].useranswer != JSONarray[i].testanswer) {
    		summary = summary + "Question:" + (i + 1) + " Correct answer: " + JSONarray[i].testanswer + "<br>";
    	}
    }
    document.getElementById('show').innerHTML = summary;
	}

}
 
ArithmeticTest.createJSON();
ArithmeticTest.showquestion();