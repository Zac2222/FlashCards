import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props {
  numQuestions: number;
  onNumQuestionsChange: (value: number) => void;
}

const QuestionAmount = ({ numQuestions, onNumQuestionsChange }:Props) => {
  return (
    <FormControl mt={'150px'} width={'200px'}>
      <FormLabel>Select number of questions</FormLabel>
      <Select value={numQuestions} onChange={(e) => onNumQuestionsChange(parseInt(e.target.value))}>
        <option value={1}>1 question</option>
        <option value={2}>2 question</option>
        <option value={3}>3 question</option>
        <option value={4}>4 question</option>
        <option value={5}>5 question</option>
        <option value={6}>6 questions</option>
        <option value={7}>7 questions</option>
        <option value={8}>8 questions</option>
        <option value={9}>9 questions</option>
        <option value={10}>10 questions</option>
        <option value={11}>11 questions</option>
        <option value={12}>12 questions</option>
        <option value={13}>13 questions</option>
        <option value={14}>14 questions</option>
        <option value={15}>15 questions</option>
      </Select>
    </FormControl>
  );
};

export default QuestionAmount;
