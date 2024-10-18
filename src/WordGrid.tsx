import React from 'react';

interface WordGridProps {
  words: string[];
  onSelectWord: (word: string) => void;
  getWordColor: (word: string) => string;
}

const WordGrid: React.FC<WordGridProps> = ({ words, onSelectWord, getWordColor }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {words.map((word, index) => (
        <div
          key={index}
          onClick={() => onSelectWord(word)}
          style={{
            padding: '10px',
            textAlign: 'center',
            backgroundColor: getWordColor(word),
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
