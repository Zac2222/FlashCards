import { useState } from 'react';
import { Card, CardBody, Flex, Text } from '@chakra-ui/react';

interface Props {
    question: string;
    answer: string;
}

const FlipCard = ({ question, answer }:Props) => {
  const [flipped, setFlipped] = useState(false);

  const toggleCard = () => {
    setFlipped((prevFlipped) => !prevFlipped); //checks if the answer is flipped or not
  };

  return (
    <Card align='center' borderRadius={30} className={`cardAdjust ${flipped ? 'flipped' : ''}`} onClick={toggleCard}>
      <CardBody fontSize={'30px'}>
        <Text fontSize={'24px'} fontWeight='bold' mb={4}>
          {/* changes the display based on if its flipped */}
          {flipped ? answer : question} 
        </Text>
      </CardBody>
    </Card>
  );
};

export default FlipCard;
