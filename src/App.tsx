import React, { useEffect, useState } from 'react';
import './App.css';

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
      
    </div>
  );
}

export default App;
