const DEFAULT_DATA = [
  { id: '1', type: 'word', difficulty: 'beginner', content: 'cat' },
  { id: '2', type: 'word', difficulty: 'beginner', content: 'dog' },
  { id: '3', type: 'word', difficulty: 'beginner', content: 'sun' },
  { id: '4', type: 'word', difficulty: 'beginner', content: 'pen' },
  { id: '5', type: 'word', difficulty: 'beginner', content: 'book' },
  { id: '6', type: 'word', difficulty: 'beginner', content: 'cup' },
  { id: '7', type: 'word', difficulty: 'beginner', content: 'red' },
  { id: '8', type: 'word', difficulty: 'beginner', content: 'blue' },
  { id: '9', type: 'word', difficulty: 'beginner', content: 'school' },
  { id: '10', type: 'word', difficulty: 'beginner', content: 'teacher' },
  { id: '11', type: 'word', difficulty: 'beginner', content: 'keyboard' },
  { id: '12', type: 'sentence', difficulty: 'intermediate', content: 'Typing is a useful skill for every student.' },
  { id: '13', type: 'sentence', difficulty: 'intermediate', content: 'Practice daily to improve your typing speed.' },
  { id: '14', type: 'sentence', difficulty: 'intermediate', content: 'Computers are used in education and business.' },
  { id: '15', type: 'paragraph', difficulty: 'advanced', content: 'Information and Communication Technology plays an important role in modern education. Students use computers to learn new skills and complete assignments efficiently.' }
];

export const initializeStorage = () => {
  if (!localStorage.getItem('typingContent')) {
    localStorage.setItem('typingContent', JSON.stringify(DEFAULT_DATA));
  }
};

export const getTypingContent = () => {
  const data = localStorage.getItem('typingContent');
  return data ? JSON.parse(data) : [];
};

export const saveTypingContent = (contentItem) => {
  const data = getTypingContent();
  const index = data.findIndex(item => item.id === contentItem.id);
  if (index >= 0) {
    data[index] = contentItem;
  } else {
    data.push(contentItem);
  }
  localStorage.setItem('typingContent', JSON.stringify(data));
};

export const deleteTypingContent = (id) => {
  const data = getTypingContent();
  const newData = data.filter(item => item.id !== id);
  localStorage.setItem('typingContent', JSON.stringify(newData));
};
