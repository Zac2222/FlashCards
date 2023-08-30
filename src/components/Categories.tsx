import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Categories = ({ selectedCategory, onCategoryChange }:Props) => {
  const categories = [
    { id: 10, name: 'Entertainment: Books' }, 
    { id: 11, name: 'Entertainment: Film' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 16, name: 'Entertainment: Board Games' },
    { id: 12, name: 'Entertainment: Music' },

  ];

  return (
    <FormControl mr={'-200px'} mb={'200px'} width={'200px'}>
      <FormLabel>Select Category</FormLabel>
      <Select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Any Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default Categories;
