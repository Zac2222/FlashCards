
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});

export async function fetchTriviaQuestion() {
  try {
    const response = await apiClient.get('', {
      params: {
        amount: 1, // Change this to the desired number of questions
        // Add more parameters here if needed (category, difficulty, etc.)
      },
    });
    return response.data.results[0]; // Assuming the API returns an array of results
  } catch (error) {
    throw new Error('Error fetching trivia question: ' + error);
  }
}
