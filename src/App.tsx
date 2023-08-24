import React, { useEffect, useState } from 'react';
import './App.css';
import FlashCards from './components/FlashCards';

interface TriviaCategory {
  id: number;
  name: string;
}

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState<TriviaCategory[]>([]); // Define type for categories
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  return (
    <div>
      <FlashCards/>
    </div>
  );
}

export default App;
