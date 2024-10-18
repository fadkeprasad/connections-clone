import React, { useState, useEffect } from 'react';
import WordGrid from './WordGrid';
import useGameLogic from './useGameLogic';
import Confetti from 'react-confetti';

const groupsData = [
  {
    theme: "Things Abha is",
    words: ['Beautiful', 'Strong', 'Smart', 'Caring'],
    color: '#FF6347'
  },
  {
    theme: "People Abha loves",
    words: ['Sadhana Mehta', 'Abhas Mehta', 'Prasad Fadke', 'Bhaskar Mehta'],
    color: '#4682B4'
  },
  {
    theme: "Where Abha worked and studied",
    words: ['Rutgers', 'MSU', 'Merck', 'AbbView & CVS'],
    color: '#32CD32'
  },
  {
    theme: "Places Abha loves",
    words: ['Exchange Place', 'Naala', '516 Orange St - 3', '38725 Lexington St'],
    color: '#DA70D6'
  }
];

const shuffledWords = groupsData.flatMap(group => group.words).sort(() => Math.random() - 0.5);

const App: React.FC = () => {
  const { selectedWords, correctGroups, onSelectWord, validateGroup } = useGameLogic(groupsData);

  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false);
  const [incorrectMessage, setIncorrectMessage] = useState(false);
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
      setShake(true);
      setIncorrectMessage(true);
      setTimeout(() => {
        setShake(false);
        setIncorrectMessage(false);
      }, 1000);
    }
  };

  const getWordColor = (word: string) => {
    const correctGroup = correctGroups.find(group => group.words.includes(word));
    if (correctGroup) {
      return correctGroup.color;
    }
    return selectedWords.includes(word) ? '#FFD700' : 'white';
  };

  return (
    <div
      className={`app-container ${shake ? 'shake' : ''}`}
      style={{ padding: '20px', textAlign: 'center' }}
    >
      {gameOver && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <h1 style={{ fontSize: '100px', marginTop: '250px', color: '#FFD700' }}>
            Happy Birthday Abha!
          </h1>
        </>
      )}

      {!gameOver && (
        <>
          <h1 style={{ color: '#FFD700' }}>Abha's Connections</h1>
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
          {incorrectMessage && (
            <h2
              style={{
                color: 'red',
                position: 'fixed',
                bottom: '20px',
                width: '100%',
                textAlign: 'center',
                animation: 'fadeOut 1s forwards',
              }}
            >
              INCORRECT!
            </h2>
          )}
            <div style={{ marginTop: '30px' }}>
              {correctGroups.map((group, index) => (
                <h3 key={index} style={{ color: group.color }}>
                  {group.theme}
                </h3>
              ))}
            </div>
        </>
      )}
    </div>
  );
};

export default App;
