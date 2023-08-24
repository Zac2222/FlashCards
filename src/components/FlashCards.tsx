import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import { fetchTriviaQuestion } from '../services/apiServices'; 
import { useEffect, useState } from 'react';

const FlashCards = () => {
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    async function getQuestion() {
      try {
        const triviaData = await fetchTriviaQuestion();
        setQuestion(triviaData.question);
        setAnswers([...triviaData.incorrect_answers, triviaData.correct_answer].sort()); // Include correct and incorrect answers, sorted
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion();
  }, []);

  return (
    <div className='centerContainer'>
      <Card align='center' borderRadius={30} className='cardAdjust'>
        <CardHeader>
          <Heading size='lg'>Question #1</Heading>
        </CardHeader>
        
        <CardBody fontSize={'30px'}>
          <Text fontSize={'24px'} fontWeight="bold" mb={4}>{question}</Text>
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
          <Button colorScheme='blue'>View here</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FlashCards;


