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

// Set the name(category) of the quiz
const cardHeaderElem = document.getElementById('card-header');
cardHeaderElem.innerText = `${localStorage.getItem('category')} Quiz`;

// Set current question number
const quesNum = document.getElementById('question-number');
quesNum.innerText = `${currentQuesIdx + 1} of ${localStorage.getItem('amount_of_questions')}`;

// Set question prompt
const quesPrompt = document.getElementById('question-prompt');
quesPrompt.innerHTML = `${getQuestionNum(currentQuesIdx).question}`;

// Set the available answers for the question
const radioLabels = document.getElementsByClassName('form-check-label');
for (let i = 0; i < radioLabels.length; i++) {
  radioLabels[i].innerHTML = getQuestionNum(currentQuesIdx).answers[i];
}

// When user clicks next button, increment current_question
const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', function() {
  if (currentQuesIdx < 9) {
    localStorage.setItem('current_question_idx', currentQuesIdx + 1);
    window.location.reload();
  }
});

// When user clicks next button, decrement current_question
const prevBtn = document.getElementById('prev-btn');
prevBtn.addEventListener('click', function() {
  if (currentQuesIdx > 0) {
    localStorage.setItem('current_question_idx', currentQuesIdx - 1);
    window.location.reload();
  }
});
