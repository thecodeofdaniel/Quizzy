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

async function setCategories() {
  if (!localStorage.getItem("categories")) {
    try {
      await fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const selectElement = document.getElementById("category-select");
  const categories = JSON.parse(localStorage.getItem("categories"));
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectElement.appendChild(option);
  });
}

// Fetch new questions
takeQuizBtn.addEventListener('click', async function(event) {
  event.preventDefault();
  fetchNewQuestions(27, 'easy');
  // wait 1 second for the data to be set in localStorage
  await new Promise(resolve => setTimeout(resolve, 1000));
  // navigate to requested page
  window.location.href = event.target.href;
});
