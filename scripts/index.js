async function fetchCategories() {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    const categories = data.trivia_categories;
    localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error("Error fetching trivia categories:", error);
    throw error; // Re-throw the error to propagate it
  }
}

async function getCategories() {
  // If categories data wasn't fetched already
  if (!localStorage.getItem("categories")) {
    try {
      await fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Create the options for selecting category
  const selectElement = document.getElementById("category-select");
  const categories = JSON.parse(localStorage.getItem("categories"));
  categories.forEach((category) => {
    // only include categories that work
    if (category.id !== 13 && category.id !== 19 && category.id !== 24) {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectElement.appendChild(option);
    }
  });
}

// Fetch questions based on user selection
document.getElementById('take-quiz-btn').addEventListener("click", async function (event) {
  // Prevent redirection to new quiz.html page
  event.preventDefault();

  // Grab the selected category and difficulty
  const category = document.getElementById("category-select").value;
  const difficulty = document.getElementById("difficulty-select").value;

  document.getElementById('spinner').classList.remove("d-none");
  try {
    // Call fetchNewQuestions to set data in localStorage
    fetchNewQuestions(category, difficulty);

    // Wait for 2 secs until data is set
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to the requested page
    window.location.href = './quiz.html';

  } catch (error) {
    console.error('Error fetching questions', error);
  }
});

getCategories();
