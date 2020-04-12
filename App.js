import React from 'react';
import './App.css';
import cats from './Cats';

import AutoCompletedText from './AutoCompleteText';

function App() {
  const fetchResults = async (value) => {
    let suggestions = [];
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    suggestions = cats.sort().filter(v => v.indexOf(value) > -1)
    return suggestions;
  }
  return (
    <div className="App">
        <AutoCompletedText fetchResults = { fetchResults } />
    </div>
  );
}

export default App;
