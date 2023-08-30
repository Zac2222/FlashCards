import { Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, Heading, Select, Spacer, Text } from '@chakra-ui/react';
import { fetchTriviaQuestions } from '../services/apiServices'; 
import { useEffect, useState } from 'react';
import Categories from './Categories';
import QuestionAmount from './QuestionAmount';

const FlashCards = () => {
  const [questions, setQuestions] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [numQuestions, setNumQuestions] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');


  


  useEffect(() => {
    async function getQuestion() {
      try {
        const triviaData = await fetchTriviaQuestions(numQuestions, selectedCategory);
        setQuestions(triviaData.question);
        setAnswers([...triviaData.incorrect_answers, triviaData.correct_answer].sort());
        setCorrectAnswer(triviaData.correct_answer);
        
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion();
  }, [numQuestions, currentQuestionIndex, selectedCategory]);

  const toggleCard = () => {
    setShowingAnswer((prevState) => !prevState);
  };

  const handleNumQuestionsChange = (value: number) => {
    setNumQuestions(value);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowingAnswer(false); // Reset showingAnswer when navigating
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowingAnswer(false); // Reset showingAnswer when navigating
    }
  };

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question from the stored array

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

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
              {showingAnswer ? correctAnswer : questions}
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Flex direction="column" alignItems="center" mr={'300px'}>
              {answers.slice(0, 2).map((answer, index) => (
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



