import React, { useState, useEffect } from 'react';
import WordGrid from './WordGrid';
import useGameLogic from './useGameLogic';
import Confetti from 'react-confetti';

const groups = [
  ['apple', 'banana', 'cherry', 'grape'],
  ['car', 'train', 'plane', 'boat'],
  ['red', 'blue', 'green', 'yellow'],
  ['dog', 'cat', 'mouse', 'rabbit'],
];

// Flatten and shuffle words ONCE
const shuffledWords = groups.flat().sort(() => Math.random() - 0.5);

const App: React.FC = () => {
  const { selectedWords, correctGroups, onSelectWord, validateGroup } =
    useGameLogic(groups);

  const [gameOver, setGameOver] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (correctGroups.length === 4) {
      setGameOver(true);
    }
  }, [correctGroups]);

  const handleValidate = () => {
    if (selectedWords.length === 4) {
      validateGroup();
    } else {
      alert('Select 4 words!');
    }
  };

  // Function to determine if a word belongs to a validated group
  const isWordInValidatedGroup = (word: string) =>
    correctGroups.some(group => group.includes(word));

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {gameOver && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <h1 style={{ fontSize: '100px', marginTop: '100px' }}>
            Happy Birthday Abha!
          </h1>
        </>
      )}

      {!gameOver && (
        <>
          <h1>NYT Connections Clone</h1>
          <WordGrid
            words={shuffledWords}
            selectedWords={selectedWords}
            onSelectWord={onSelectWord}
            isWordInValidatedGroup={isWordInValidatedGroup}
          />
          <button
            onClick={handleValidate}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
          <div style={{ marginTop: '20px' }}>
            <h2>Correct Groups: {correctGroups.length}</h2>
            {correctGroups.map((group: string[], index: number) => (
              <p key={index}>{group.join(', ')}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
