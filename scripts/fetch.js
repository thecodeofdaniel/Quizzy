function fetchNewQuestions(category, difficulty) {

  // parameters for API call
  const params = {
    amount: 10,
    category: category,
    difficulty: difficulty,
    type: 'multiple'
  }

  // Creating URL for API call
  const url = 'https://opentdb.com/api.php?' + new URLSearchParams(params);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Grab the type (category) of questions
      const category = data.results[0].category;

      // Grab specific data from the results
      const triviaQuestions = data.results.map(item => {
        // Combine correct and incorrect answers, and shuffle them
        const answers = [...item['incorrect_answers'], item['correct_answer']];
        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]];
        }

        return {
          question: item['question'],
          correct_answer: item['correct_answer'],
          answers: answers
        };
    });

      // Store data in local storage
      localStorage.setItem('triviaQuestions', JSON.stringify(triviaQuestions));
      localStorage.setItem('category', category);
      localStorage.setItem('amount_of_questions', params.amount);
      localStorage.setItem('current_question_idx', 0);
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}
