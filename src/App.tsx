import React from 'react';
import WordGrid from './WordGrid';
import useGameLogic from './useGameLogic';

const groups = [
  ['apple', 'banana', 'cherry', 'grape'],
  ['car', 'train', 'plane', 'boat'],
  ['red', 'blue', 'green', 'yellow'],
  ['dog', 'cat', 'mouse', 'rabbit'],
];

const App: React.FC = () => {
  const words = groups.flat();
  const { selectedWords, correctGroups, onSelectWord, validateGroup } =
    useGameLogic(groups);

  const handleValidate = () => {
    if (selectedWords.length === 4) {
      validateGroup();
    } else {
      alert('Select 4 words!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>NYT Connections Clone</h1>
      <WordGrid
        words={words}
        selectedWords={selectedWords}
        onSelectWord={onSelectWord}
      />
      <button onClick={handleValidate} style={{ marginTop: '20px' }}>
        Validate Group
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2>Correct Groups: {correctGroups.length}</h2>
        {correctGroups.map((group, index) => (
          <p key={index}>{group.join(', ')}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
