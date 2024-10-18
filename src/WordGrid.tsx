import React from 'react';

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onSelectWord: (word: string) => void;
  isWordInValidatedGroup: (word: string) => boolean;
}

const WordGrid: React.FC<WordGridProps> = ({
  words,
  selectedWords,
  onSelectWord,
  isWordInValidatedGroup,
}) => {
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
      {words.map((word) => (
        <div
          key={word}
          onClick={() => onSelectWord(word)}
          style={{
            padding: '10px',
            textAlign: 'center',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: isWordInValidatedGroup(word)
              ? '#90EE90' // Light green for validated groups
              : selectedWords.includes(word)
              ? '#D3D3D3' // Light gray for selected words
              : 'white',
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
