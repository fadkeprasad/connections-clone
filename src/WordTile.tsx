import React from 'react';

interface WordTileProps {
  word: string;
  isSelected: boolean;
  onClick: () => void;
}

const WordTile: React.FC<WordTileProps> = ({ word, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid black',
        padding: '20px',
        backgroundColor: isSelected ? '#ADD8E6' : '#fff',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      {word}
    </div>
  );
};

export default WordTile;
