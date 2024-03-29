// Loads the questions when uses presses take quiz btn
const takeQuizBtn = document.getElementById('take-quiz-btn');
takeQuizBtn.addEventListener('click', function() {
  fetchQuestionsFromAPI(27, 'easy');
});
