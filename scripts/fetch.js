function fetchQuestionsFromAPI(category, difficulty) {

  const params = {
    amount: 10,
    category: category, // 27=animals; for more info: https://opentdb.com/api_category.php
    difficulty: difficulty,
    type: 'multiple'
  }

  const url = 'https://opentdb.com/api.php?' + new URLSearchParams(params);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // THIS SECTION SETS LOCAL STORAGE
      amount_of_questions = params.amount;
      category = data.results[0].category;
      current_question = 0;
      score = 0;

      questions = data.results.map(item => ({
        question: item['question'],
        correct_answer: item['correct_answer'],
        incorrect_answers: item.incorrect_answers
      }));

      localStorage.setItem('triviaQuestions', JSON.stringify(questions));
      localStorage.setItem('category', category);
      localStorage.setItem('amount_of_questions', amount_of_questions);
      localStorage.setItem('current_question', 0);
      localStorage.setItem('score', 0);
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

function getStoredQuestions() {
  const storedQuestions = localStorage.getItem('triviaQuestions');

  if (!storedQuestions)
    return null;
  else
    return JSON.parse(storedQuestions);
}

function printLocalStorageItems() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
  }
}
