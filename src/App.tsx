import React, { useState, useEffect } from 'react';
import WordGrid from './WordGrid';
import useGameLogic from './useGameLogic';
import Confetti from 'react-confetti';

const groups = [
  ['Beautiful', 'Strong', 'Smart', 'Caring'],
  ['Sadhana Mehta', 'Abhas Mehta', 'Prasad Fadke', 'Bhaskar Mehta'],
  ['Rutgers', 'MSU', 'Merck', 'AbbView & CVS'],
  ['Exchange Place', 'Naala', '516 Orange St - 3', 'Tower 1/304 Monalisa'],
];

// Flatten and shuffle words ONCE
const shuffledWords = groups.flat().sort(() => Math.random() - 0.5);

const App: React.FC = () => {
  const { selectedWords, correctGroups, onSelectWord, validateGroup } =
    useGameLogic(groups);

  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false); // Control shake animation
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
      setShake(true); // Trigger shake animation
      setTimeout(() => setShake(false), 500); // Stop shaking after 500ms
    }
  };

  const getWordColor = (word: string) => {
    for (let i = 0; i < correctGroups.length; i++) {
      if (correctGroups[i].includes(word)) {
        return ['#FF6347', '#4682B4', '#32CD32', '#DA70D6'][i]; // Unique colors per group
      }
    }
    return selectedWords.includes(word) ? '#FFD700' : 'white'; // Gold for selected words
  };

  return (
    <div className={`app-container ${shake ? 'shake' : ''}`} style={{ padding: '20px', textAlign: 'center' }}>
      {gameOver && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <h1 style={{ fontSize: '100px', marginTop: '250px' }}>Happy Birthday Abha!</h1>
        </>
      )}

      {!gameOver && (
        <>
          <h1>Abha's Connections</h1>
          <WordGrid
            words={shuffledWords}
            onSelectWord={onSelectWord}
            getWordColor={getWordColor}
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
        </>
      )}
    </div>
  );
};

export default App;
