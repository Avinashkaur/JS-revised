var ArithmeticTest = {

	init: function() {

		var question = document.getElementById('question');
		var answer = document.getElementById('answer');
		// var timerlabel = document.getElementById('timer');
		timer = 10;
		current = 0;
		score = 0;
		JSONarray = [];
		showtime = 0;
		correct = 0;
		unattempted = 0;
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
		for (var i = 0; i < 4; i++) {
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
		ArithmeticTest.resettimer();
    answer.disabled = false;
		
		// question.innerText = "";
		answer.value = "";
		var quesstring = JSONarray[current].operand1 + JSONarray[current].operator + JSONarray[current].operand2;
		question.innerText = quesstring;
		JSONarray[current].testanswer = eval(quesstring).toFixed(2);	
	},

	calculatescore: function() {
    var showscore = document.getElementById('score');
    // showscore.innerText = "";

		if(JSONarray[current].useranswer == JSONarray[current].testanswer) {
			score = score + 1;
			correct = correct + 1;
		}
		// else if (JSONarray[current].useranswer.trim() == "") {
		// 	unattempted = unattempted + 1;
		// }
		showscore.innerText = score;
	},

	resettimer: function() {
    clearInterval(showtime);
    timer = 10;
    showtime = setInterval(function() { ArithmeticTest.cleartimer()},1000);
	},

	cleartimer: function() {
		var timerlabel = document.getElementById('timer');
		
		if ((timer <= 10) && (timer > 0)) {
			timer = timer - 1;
			timerlabel.innerText = "Time Left: " + timer + " seconds";
			
		}
		else {
			clearInterval(showtime);
			unattempted = unattempted + 1;
			answer.disabled = true;
			ArithmeticTest.submitanswer();		
		}

	},

	submitanswer: function() {
		
		JSONarray[current].useranswer = parseFloat(answer.value.trim()).toFixed(2);

		if (JSONarray[current].useranswer.length == 0) { unattempted = unattempted + 1;}
		ArithmeticTest.calculatescore();
		current++;
		if (current < 4) {
      ArithmeticTest.showquestion();
      
		}
		else {
			ArithmeticTest.displayresult();
		}	
	},

	displayresult: function() {
		document.getElementById('timer').style.display = "none";
    document.getElementById('nextbutton').style.display = "none";
    document.getElementById('score').style.display = "none";

    answer.style.display = "none";
    question.innerHTML = "Your score: " + correct;
    document.getElementById('wrong').innerText = "Wrong: " + (4 - (correct + unattempted));
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
ArithmeticTest.init();
ArithmeticTest.createJSON();
ArithmeticTest.showquestion();
