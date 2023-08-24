import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'


const FlashCards = () => {
  return (
    <div className='centerContainer'>
      <Card align='center' borderRadius={30} className='cardAdjust'>
        <CardHeader>
          <Heading size='lg'>Question #1</Heading>
        </CardHeader>
        
        <CardBody fontSize={'30px'}>
          <Text fontSize={'50px'}>when did the who and why did they do it there?</Text>
          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Flex direction="column" alignItems="center" mr={'300px'}>
              <Text>A: who</Text>
              <Text>B: what</Text>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Text>C: when</Text>
              <Text>D: where</Text>
            </Flex>
          </Flex>
        </CardBody>
        
        <CardFooter>
          <Button colorScheme='blue'>View here</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FlashCards

