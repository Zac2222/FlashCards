
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});

export async function fetchTriviaQuestion(numQuestions: number) {
  try {
    const response = await apiClient.get('', {
      params: {
        amount: numQuestions, // Change this to the desired number of questions
 
      },
    });
    return response.data.results[0]; // Assuming the API returns an array of results
  } catch (error) {
    throw new Error('Error fetching trivia question: ' + error);
  }
}
