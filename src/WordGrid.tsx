import React from 'react';
import WordTile from './WordTile';

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onSelectWord: (word: string) => void;
}

const WordGrid: React.FC<WordGridProps> = ({ words, selectedWords, onSelectWord }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {words.map((word) => (
        <WordTile
          key={word}
          word={word}
          isSelected={selectedWords.includes(word)}
          onClick={() => onSelectWord(word)}
        />
      ))}
    </div>
  );
};

export default WordGrid;
