
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://opentdb.com/api.php?type=multiple',
});

export async function fetchTriviaQuestions(numQuestions: number, selectedCategory: string) {
  try {
    const response = await apiClient.get('', {
      params: {
        amount: numQuestions,
        category: selectedCategory,
 
      },
    });
    return response.data.results[0]; // Api returns an array of questions
  } catch (error) {
    throw new Error('Error fetching trivia question: ' + error);
  }
}
