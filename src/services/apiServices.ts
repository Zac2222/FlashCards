import axios from "axios";
import he from "he"; // Import the HTML Entities library for decoding purposes (questions returned with a bunch of symbols in them)

const apiClient = axios.create({
  baseURL: 'https://opentdb.com/api.php?type=multiple',
});

export async function fetchTriviaQuestions(numQuestions: number, selectedCategory: string) {
  try {
    const response = await apiClient.get('', {
      params: {
        amount: numQuestions, //fetching the number of questions and category from the api
        category: selectedCategory,
      },
    });

    const decodedQuestion = {
      ...response.data.results[0],
      question: he.decode(response.data.results[0].question), // Decode the question text
    };

    return decodedQuestion;
  } catch (error) {
    throw new Error('Error fetching trivia question: ' + error);
  }
}

