import React from 'react';

interface WordTileProps {
  word: string;
  isSelected: boolean;
  onClick: () => void;
}

const randomAlignment = () => {
  const rotate = Math.floor(Math.random() * 30) - 15; // Rotate between -15 to +15 degrees
  const translateX = Math.floor(Math.random() * 10) - 5; // Shift X-axis randomly
  const translateY = Math.floor(Math.random() * 10) - 5; // Shift Y-axis randomly

  return `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`;
};

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
        transform: randomAlignment(), // Apply random alignment
        transition: 'transform 0.3s', // Smooth transition for transform changes
      }}
    >
      {word}
    </div>
  );
};

export default WordTile;
