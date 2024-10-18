import { useState } from 'react';

interface GroupData {
  theme: string;
  words: string[];
  color: string;
}

const useGameLogic = (groupsData: GroupData[]) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [correctGroups, setCorrectGroups] = useState<GroupData[]>([]);

  const onSelectWord = (word: string) => {
    setSelectedWords(prev =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : prev.length < 4 ? [...prev, word] : prev
    );
  };

  const validateGroup = () => {
    const selectedGroup = groupsData.find(group =>
      selectedWords.every(word => group.words.includes(word)) &&
      selectedWords.length === group.words.length
    );

    if (selectedGroup && !correctGroups.some(g => g.theme === selectedGroup.theme)) {
      setCorrectGroups(prev => [...prev, selectedGroup]);
      setSelectedWords([]);
    } else {
      setSelectedWords([]);
    }
  };

  return { selectedWords, correctGroups, onSelectWord, validateGroup };
};

export default useGameLogic;