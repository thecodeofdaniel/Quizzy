function disabledRadios(checkedRadio) {
  var radios = document.getElementsByName(checkedRadio.name);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i] !== checkedRadio) {
      radios[i].disabled = checkedRadio.checked;
    }
  }
}

// The index for which the user is currently on
let currentQuesIdx = +localStorage.getItem('current_question_idx');

// Elements in quiz.html
const cardHeaderElem = document.getElementById('card-header');
const quesNum = document.getElementById('question-number');
const quesPrompt = document.getElementById('question-prompt');
const radioLabels = document.getElementsByClassName('form-check-label');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');


function setQuestion() {
  cardHeaderElem.innerText = `${localStorage.getItem('category')} Quiz`;
  quesNum.innerText = `${currentQuesIdx + 1} of ${localStorage.getItem('amount_of_questions')}`;
  quesPrompt.innerHTML = `${getQuestionNum(currentQuesIdx).question}`;
  for (let i = 0; i < radioLabels.length; i++) {
    radioLabels[i].innerHTML = getQuestionNum(currentQuesIdx).answers[i];
  }
}

setQuestion();

// When user clicks next button, increment current_question
nextBtn.addEventListener('click', function() {
  if (currentQuesIdx < 9) {
    currentQuesIdx += 1
    localStorage.setItem('current_question_idx', currentQuesIdx);
    setQuestion();
  }
});

// When user clicks next button, decrement current_question
prevBtn.addEventListener('click', function() {
  if (currentQuesIdx > 0) {
    currentQuesIdx -= 1
    localStorage.setItem('current_question_idx', currentQuesIdx);
    setQuestion();
  }
});
