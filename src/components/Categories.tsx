import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Categories = ({ selectedCategory, onCategoryChange }:Props) => {
  const categories = [
    { id: 9, name: 'Books' }, 
    { id: 10, name: 'Film' },
    { id: 11, name: 'Video Games' },
    { id: 12, name: 'Board Games' },
    { id: 13, name: 'Music' },

  ];

  return (
    <FormControl mb={1} width={'200px'}>
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
