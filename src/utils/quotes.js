import { getDayOfYear } from './dateUtils.js';

const QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "The best time to plant a tree was 20 years ago.",
    author: "Chinese Proverb"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The only person who can stop you is you, and the only person who can push you forward is you.",
    author: "Unknown"
  },
  {
    text: "Perfection is not just about control, it's also about letting go.",
    author: "Unknown"
  },
  {
    text: "Take risks: if you win, you will be happy; if you lose, you will be wise.",
    author: "Unknown"
  },
  {
    text: "We are not makers of history. We are made by history.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller"
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison"
  },
  {
    text: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
  {
    text: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "Twenty years from now, you will be more disappointed by the things you didn't do.",
    author: "Mark Twain"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The only guarantee for failure is to stop trying.",
    author: "Unknown"
  },
  {
    text: "Productivity is never an accident. It is always the result of commitment, intention, and focused effort.",
    author: "Unknown"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Dreams don't work unless you do.",
    author: "John C. Maxwell"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  }
];

export const getQuoteOfDay = () => {
  const dayOfYear = getDayOfYear(new Date());
  return QUOTES[dayOfYear % QUOTES.length];
};
