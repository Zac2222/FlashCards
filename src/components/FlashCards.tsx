import { Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, Heading, Select, Spacer, Text } from '@chakra-ui/react';
import { fetchTriviaQuestions } from '../services/apiServices'; 
import { useEffect, useState } from 'react';
import Categories from './Categories';
import QuestionAmount from './QuestionAmount';
import he from 'he'; //show an error but it all works so like, im not sure, but i need this here because its a library for decoding text

const FlashCards = () => {
  const [questions, setQuestions] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [numQuestions, setNumQuestions] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');


  


  useEffect(() => {
    async function getQuestion() { //getting the questions aswell as decoding everything, loads the questions aswell as multiple choice answers
      try {
        const triviaData = await fetchTriviaQuestions(numQuestions, selectedCategory);
        const decodedQuestion = he.decode(triviaData.question); //from here down decoding answers to remove the weird symbols
        const decodedAnswers = triviaData.incorrect_answers.map((answer: string) => he.decode(answer));
        const decodedCorrectAnswer = he.decode(triviaData.correct_answer);
      
        setQuestions(decodedQuestion);
        setAnswers([...decodedAnswers, decodedCorrectAnswer].sort());
        setCorrectAnswer(decodedCorrectAnswer);
        
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion();
  }, [numQuestions, currentQuestionIndex, selectedCategory]);

   //showing the answer or the question
  const toggleCard = () => {
    setShowingAnswer((prevState) => !prevState);
  };

  // handles how many questions are displayed when the user selects a number
  const handleNumQuestionsChange = (value: number) => {
    setNumQuestions(value);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowingAnswer(false); 
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowingAnswer(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question from the stored array

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  //handles the category change when selecting a category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    console.log(selectedCategory);
  };


  return (
    <div className='centerContainer'>

      <Categories selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      
      <QuestionAmount numQuestions={numQuestions} onNumQuestionsChange={handleNumQuestionsChange} />


      <Card align={'center'} borderRadius={30} className='cardAdjust' width={'70%'}>
        <CardHeader>
          <Heading size='lg'>Question {currentQuestionIndex + 1}</Heading>
        </CardHeader>
        
        <CardBody fontSize={'30px'}>
          <Flex direction="column" alignItems="center" mb={showingAnswer ? 4 : 0}>
            <Text fontSize={'24px'} fontWeight="bold" mb={4}>
              {/* knowing to show either the answer or the question */}
              {showingAnswer ? correctAnswer : questions} 
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Flex direction="column" alignItems="center" mr={'300px'}>
              {/* gets the answers from the api and applies them to the flashcard */}
              {answers.slice(0, 2).map((answer, index) => (
                // honestly having a hard time understanding how the charcode works but this is what i found
                <Text key={index}>{String.fromCharCode(65 + index)}: {answer}</Text>
              ))}
            </Flex>
            <Flex direction="column" alignItems="center">
              {answers.slice(2).map((answer, index) => (
                <Text key={index}>{String.fromCharCode(67 + index)}: {answer}</Text>
              ))}
            </Flex>
          </Flex>
        </CardBody>
        
        <CardFooter>
          <Button colorScheme='blue' onClick={toggleCard}>
            {showingAnswer ? 'Show Question' : 'Show Answer'}
          </Button>
        </CardFooter>
        <Flex mt={5}>
          <Button mr={5} width={'300px'} colorScheme="blue" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
    
          <Button mr={5} width={'300px'} colorScheme="blue" onClick={goToNextQuestion} disabled={currentQuestionIndex === numQuestions - 1}>
            Next
          </Button>
        </Flex>

      </Card>
    </div>
  );
}

export default FlashCards;



