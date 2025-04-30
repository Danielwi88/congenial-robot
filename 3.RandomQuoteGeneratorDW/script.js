'use strict';
// array that store list of quotes and their author
const quotes = [
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    text: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
  },
  {
    text: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
  },
  {
    text: 'You are never too old to set another goal or to dream a new dream.',
    author: 'C.S. Lewis',
  },
  {
    text: 'Your time is limited, so don’t waste it living someone else’s life.',
    author: 'Steve Jobs',
  },
];

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('newQuote');

// Function to generate a random quote

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  //update the quote text and author in the Element HTML
  quoteText.textContent = `'${randomQuote.text}'`;
  quoteAuthor.textContent = `'- ${randomQuote.author}'`;
}

// Event listener for the new quote button

newQuoteButton.addEventListener('click', generateQuote);

// Initial quote generation

generateQuote();
