function disableRadios(checkedRadio) {
  saveAnswer(currentQuesIdx, checkedRadio.value);
}

function saveAnswer(questionIndex, answer) {
  let answers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
  answers[questionIndex] = answer;
  localStorage.setItem('quiz_answers', JSON.stringify(answers));
}

function calculateScore() {
  const answers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
  const questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];
  let score = 0;
  questions.forEach((question, index) => {
    if (answers[index] === question.correct_answer) {
      score++;
    }
  });
  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.innerText = `Your final score is: ${score} out of ${questions.length}`;

  const takeAnotherQuizButton = document.getElementById("newquiz-btn");
  takeAnotherQuizButton.classList.remove('d-none');
}

let currentQuesIdx = +localStorage.getItem('current_question_idx') || 0;

function setQuestion() {
  const currentQuestion = getQuestionNum(currentQuesIdx);
  const isSubmitted = (localStorage.getItem('isSubmitted') === 'true');
  document.getElementById('card-header').innerHTML = `${localStorage.getItem('category')} Quiz`;
  document.getElementById('question-number').innerText = `${currentQuesIdx + 1} of ${localStorage.getItem('amount_of_questions')}`;
  document.getElementById('question-prompt').innerHTML = currentQuestion.question;

  Array.from(document.getElementsByClassName('form-check-input')).forEach((radio, index) => {
    const label = document.querySelectorAll('.form-check-label')[index];
    label.innerHTML = currentQuestion.answers[index];
    label.style.color = '';
    if (isSubmitted && currentQuestion.answers[index] == currentQuestion.correct_answer)
      label.style.color = 'green';
    radio.value = currentQuestion.answers[index];
    radio.checked = false;
    radio.disabled = false;
    if (isSubmitted)
      radio.disabled = true;
  });

  const savedAnswers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
  if (savedAnswers.hasOwnProperty(currentQuesIdx)) {
    const savedAnswer = savedAnswers[currentQuesIdx];
    Array.from(document.getElementsByClassName('form-check-input')).forEach(radio => {
      radio.checked = (radio.value === savedAnswer);
    });
  }

  updateNavigationButtons();
}

function getQuestionNum(index) {
  const questions = JSON.parse(localStorage.getItem('triviaQuestions'));
  return questions[index];
}

function updateNavigationButtons() {
  const amountOfQuestions = parseInt(localStorage.getItem('amount_of_questions'));
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  if (currentQuesIdx === amountOfQuestions - 1) {
    submitBtn.classList.remove('d-none');
    nextBtn.classList.add('d-none');
  } else {
    submitBtn.classList.add('d-none');
    nextBtn.classList.remove('d-none');
  }
}

document.getElementById('next-btn').addEventListener('click', function() {
  if (currentQuesIdx < localStorage.getItem('amount_of_questions') - 1) {
    currentQuesIdx++;
    localStorage.setItem('current_question_idx', currentQuesIdx);
    setQuestion();
  }
});

document.getElementById('prev-btn').addEventListener('click', function() {
  if (currentQuesIdx > 0) {
    currentQuesIdx--;
    localStorage.setItem('current_question_idx', currentQuesIdx);
    setQuestion();
  }
});

document.getElementById('submit-btn').addEventListener('click', function() {
  localStorage.setItem('isSubmitted', true);
  calculateScore();
  setQuestion();
});

document.getElementById('newquiz-btn').addEventListener('click', function () {
  window.location.href = 'index.html';
});

setQuestion();
