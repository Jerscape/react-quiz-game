export const loadQuestions = async (
  //should be 10, reduced to 3 for testing
  amount = 3, 
  category = 9,
  difficulty = 'easy',
  type = 'multiple'
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  try {
    const res = await fetch(url);
    const { results } = await res.json();
    return convertQuestionsFromAPI(results);
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it in the Game component
  }
};


const convertQuestionsFromAPI = (rawQuestions) => {
  console.log("conver question triggered")
  return rawQuestions.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question,
      answerChoices: [...loadedQuestion.incorrect_answers]
    };

    formattedQuestion.answer = Math.floor(Math.random() * 4)
   
    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      loadedQuestion.correct_answer
    );

    return formattedQuestion
  })

}

