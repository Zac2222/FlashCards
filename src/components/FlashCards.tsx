import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import { fetchTriviaQuestion } from '../services/apiServices'; 
import { useEffect, useState } from 'react';

const FlashCards = () => {
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showingAnswer, setShowingAnswer] = useState(false);

  useEffect(() => {
    async function getQuestion() {
      try {
        const triviaData = await fetchTriviaQuestion();
        setQuestion(triviaData.question);
        setAnswers([...triviaData.incorrect_answers, triviaData.correct_answer].sort());
        setCorrectAnswer(triviaData.correct_answer);
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion();
  }, []);

  const toggleCard = () => {
    setShowingAnswer((prevState) => !prevState);
  };

  return (
    <div className='centerContainer'>
      <Card align='center' borderRadius={30} className='cardAdjust'>
        <CardHeader>
          <Heading size='lg'>Question #1</Heading>
        </CardHeader>
        
        <CardBody fontSize={'30px'}>
          <Flex direction="column" alignItems="center" mb={showingAnswer ? 4 : 0}>
            <Text fontSize={'24px'} fontWeight="bold" mb={4}>
              {showingAnswer ? correctAnswer : question}
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
      </Card>
    </div>
  );
}

export default FlashCards;



