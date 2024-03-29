const fs = require('fs');

const FILENAME = '../data/data.json';

function getQues() {
  if (!fs.existsSync(FILENAME)) {
    console.log(`${FILENAME} does not exist!`);
    return null;
  }

  const data = fs.readFileSync(FILENAME)
  const questions = JSON.parse(data);

  return questions
}

async function fetchNewQues() {
  const params = {
    amount: 10,
    category: 27, // 27=animals; for more info: https://opentdb.com/api_category.php
    difficulty: 'medium',
    type: 'multiple'
  }

  let questions = null;

  try {
    const url = 'https://opentdb.com/api.php?' + new URLSearchParams(params);
    const response = await fetch(url);

    if (!response.ok) { throw new Error('Could not fetch resource'); }

    const data = await response.json();

    questions = data.results.map(item => ({
      question: item['question'],
      correct_answer: item['correct_answer'],
      incorrect_answers: item.incorrect_answers
    }));

    fs.writeFileSync(FILENAME, JSON.stringify(questions));


  } catch (error) {
    console.log(error);
    throw error;
  }

  return questions;
}

module.exports = {
  getQues: getQues,
  fetchNewQues: fetchNewQues
}
