import { useState } from 'react';

const useGameLogic = (groups: string[][]) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [correctGroups, setCorrectGroups] = useState<string[][]>([]);

  const onSelectWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const validateGroup = () => {
    const isValidGroup = groups.some((group) =>
      group.every((word) => selectedWords.includes(word))
    );

    if (isValidGroup) {
      setCorrectGroups([...correctGroups, selectedWords]);
      setSelectedWords([]);
    } else {
      alert('Incorrect group! Try again.');
      setSelectedWords([]);
    }
  };

  return { selectedWords, correctGroups, onSelectWord, validateGroup };
};

export default useGameLogic;
