'use strict';


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const arithEl = document.querySelector('.arith');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const inputAnswer = document.querySelector('.btn--answer');
const inputQuizNo = document.querySelector('.btn--noOfQuiz');
const numberRange = document.querySelector('.btn--range');
const instructions = document.querySelector('.instructions');
let noOfQuiz = 20 , number1 , number2 , answer,totalScore,solution , previousAnswer , randomRange;
let number1Array = [];
let number2Array = [];
let answerGiven = [];
let rightAnswer = [];

const init = function () {
  
  answer=0;
  totalScore = 0;
  document.getElementById(`current--0`).textContent = totalScore;
  number1 = Math.floor(Math.random()*randomRange)+1;
  number2 = Math.floor(Math.random()*randomRange)+1;
  number1Array.push(number1);
  number2Array.push(number2);
  score0El.textContent = number1;
  score1El.textContent = number2;
  previousAnswer = number1-number2;
  rightAnswer.push(previousAnswer);
};




btnRoll.addEventListener('click', function () {
  
  if (noOfQuiz>0) {
    solution=0;
    number1 = Math.floor(Math.random()*randomRange)+1;
    number2 = Math.floor(Math.random()*randomRange)+1;
    number1Array.push(number1);
    number2Array.push(number2);
    score0El.textContent = number1;
    score1El.textContent = number2;
   
    document.getElementById('myAnswer').value=null;
    let arith = Math.trunc(Math.random() * 4) + 1;
    
    switch(arith){
      case 1:
          solution = Math.floor(number1/number2);
          break;
      case 2:
          solution = Math.floor(number1-number2);
          break;
      case 3:
          solution = Math.floor(number1*number2);
          break;
      case 4:
          solution = Math.floor(number1+number2);
    }
    
    arithEl.src = `arith-${arith}.png`;
    answerGiven.push(answer);
    if (previousAnswer==answer) {
   
      totalScore++;
      document.getElementById(
        `current--0`
      ).textContent = totalScore;
    }
    previousAnswer = solution;
    rightAnswer.push(solution);
    noOfQuiz--;
  }
  if(noOfQuiz==0){
    player0El.remove();
    player1El.remove();
    arithEl.remove();
    btnNew.remove();
    inputAnswer.remove();
    inputQuizNo.remove();
    btnRoll.remove();
    numberRange.remove();
    instructions.remove();
    let answerData = "";
    for(let a=0;a<number1Array.length-1;a++){
      answerData +=`<tr>
      <td>${number1Array[a]}</td>
      <td>${number2Array[a]}</td>
      <td>${answerGiven[a]}</td>
      <td>${rightAnswer[a]}</td>
    </tr>`;
  }

    let answerHtml = `<table>
    <tr>
      <th>Number1</th>
      <th>Number2</th>
      <th>YourAnswer</th>
      <th>CorrectAnswer</th>
    </tr>
    ${answerData}
  </table>`;

  answerHtml += `<div class="current"><p class="current-label">Total Score</p><p class="current-score" id="current--0">${totalScore}</p></div>`;

    

    document.querySelector('.answers').insertAdjacentHTML('afterbegin',answerHtml);
    
  }
  
});



inputAnswer.addEventListener('input',function(e){
  answer = e.target.value;
 
});


inputQuizNo.addEventListener('input',function(e){
  noOfQuiz = e.target.value;
});

numberRange.addEventListener('input',function(e){
  randomRange = e.target.value;
});


btnNew.addEventListener('click', init);
