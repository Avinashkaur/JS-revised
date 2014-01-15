var ArithmeticTest = function() {
  this.question = document.getElementById('question');
  this.answer = document.getElementById('answer');
  this.timer_label = document.getElementById('timer');
  this.init();
}

ArithmeticTest.prototype = {

  init: function() {
    this.timer = 10;
    this.total_questions = 10;
    this.current = 0;
    this.score = 0;
    this.quiz_data = [];
    this.show_time;
    this.correct = 0;
    this.unattempted = 0;
    // invoke methods
    this.generateQuestions();
    this.showQuestion();   
  },

  getRandomNumber: function() {
    return Math.floor(Math.random() * 20);
  },

  getRandomOperator: function() {
    var operators = ['+', '-', '*', '/'],
        random_number = Math.floor((Math.random() * 10) % 4);
    return operators[random_number];
  },

  generateQuestions: function() {
    for (var i = 0; i < this.total_questions; i++) {
      this.quiz_data[i] = {
        "operand1" : this.getRandomNumber(),
        "operator" : this.getRandomOperator(),
        "operand2" : this.getRandomNumber(),
        "useranswer" : "",
        "testanswer" : ""
      }
    }
  },

  showQuestion: function() {
    var ques_string = this.quiz_data[this.current].operand1 + this.quiz_data[this.current].operator + this.quiz_data[this.current].operand2;

    this.answer.focus();
    this.resetTimer();
    this.answer.value = "";
    this.question.innerText = ques_string;
    this.quiz_data[this.current].testanswer = parseFloat(eval(ques_string), 10).toFixed(2);        
  },

  submitAnswer: function() {
    this.quiz_data[this.current].useranswer = this.answer.value.trim();
    this.calculateAndDisplayScore();
    this.current++;
    if (this.current < this.total_questions) {
      this.showQuestion();  
    }
    else {
      this.displayResult();
    }        
  },

  calculateAndDisplayScore: function() {
    var show_score = document.getElementById('score');

    if (parseFloat(this.quiz_data[this.current].useranswer, 10).toFixed(2) == this.quiz_data[this.current].testanswer) {
      this.score = this.score + 1;
      this.correct = this.correct + 1;
    }
    else if (this.quiz_data[this.current].useranswer == "") {
      this.unattempted = this.unattempted + 1;
    }
    show_score.innerText = this.score;
  },

  resetTimer: function() {
    var this_object = this;
    
    clearInterval(this.show_time);
    this.timer = 10;
    this.show_time = setInterval(function() { 
      this_object.clearTimer();
    }, 1000);
  },

  clearTimer: function() {
    if ((this.timer <= 10) && (this.timer > 0)) {
      this.timer = this.timer - 1;
      this.timer_label.innerText = "Time Left: " + this.timer + " seconds";
    }
    else {
      clearInterval(this.show_time);
      this.submitAnswer();                
    }
  },

  displayResult: function() {
    var summary = "";

    this.timer_label.style.display = "none";
    this.answer.style.display = "none";
    document.getElementById('nextbutton').style.display = "none";
    document.getElementById('score').style.display = "none";
    
    this.question.innerText = "Your score: " + this.correct;
    document.getElementById('wrong').innerText = "Wrong: " + (this.total_questions - (this.correct + this.unattempted));
    document.getElementById('unattempted').innerText = "Unattempted: " + this.unattempted;

    for (var i = 0; i < this.quiz_data.length; i++) {
      if (this.quiz_data[i].useranswer != this.quiz_data[i].testanswer) {
        summary = summary + "Question:" + (i + 1) + " Correct answer: " + this.quiz_data[i].testanswer + "<br>";
      }
    }
    document.getElementById('show').innerHTML = summary;
  }

}

window.onload = function() {
  var next_button = document.getElementById('nextbutton');
  var quiz = new ArithmeticTest();

  next_button.addEventListener('click', function() { 
    quiz.submitAnswer();
  }, false);

  document.getElementById('answer').addEventListener('keypress', function(event_object) {
    if (event_object.keyCode == 13) {
      next_button.click();
    }
  });

}