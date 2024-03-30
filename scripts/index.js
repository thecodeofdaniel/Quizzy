const takeQuizBtn = document.getElementById('take-quiz-btn');

// Fetch new questions
takeQuizBtn.addEventListener('click', async function(event) {
  event.preventDefault();
  fetchNewQuestions(27, 'easy');
  // wait 1 second for the data to be set in localStorage
  await new Promise(resolve => setTimeout(resolve, 1000));
  // navigate to requested page
  window.location.href = event.target.href;
});
