const express = require('express');
const app = express();
const PORT = 5000; // or any port you prefer

// Quiz data
const quizData = [
  {
    questionText: 'Which cities are in Italy?',
    options: ['Rome', 'Paris', 'Florence', 'Berlin'],
    answers: ['Rome', 'Florence'],
  },
  {
    questionText: 'Which of the following are programming languages?',
    options: ['Python', 'HTML', 'C++', 'Photoshop'],
    answers: ['Python', 'C++'],

  },
  {
    questionText: 'Choose the correct country flags in the image',
    options: ['Argentina', 'India', 'Brazil', 'Russia'],
    img : "https://m.media-amazon.com/images/I/61ks5eGEucL._UF1000,1000_QL80_.jpg",
    answers: ['India', 'Russia'],
  },
  {
    questionText: 'Which elements are noble gases?',
    options: ['Helium', 'Oxygen', 'Neon', 'Nitrogen'],
    answers: ['Helium', 'Neon'],
  },
  {
    questionText: 'Which artists were part of the Renaissance?',
    options: ['Leonardo da Vinci', 'Van Gogh', 'Michelangelo', 'Picasso'],
    answers: ['Leonardo da Vinci', 'Michelangelo'],
  }
];

app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
