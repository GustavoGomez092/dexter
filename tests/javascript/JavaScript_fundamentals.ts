import { Test } from "../test.type";

const javascriptFundamentals:Test = {
  id: 'js-fund-001',
  name: 'JavaScript Fundamentals',
  description: 'A test designed to gauge a candidate\'s knowledge of JavaScript fundamentals.',
  difficulty: 1,
  questions: [
    {
      id: 'JS_fund_001_001',
      question: {
        type: 'multipleChoice',
        text: 'What is Hoisting?',
        options: [
          {
            text:  'Hoisting in JavaScript is the process of moving all variable and function initializations to the top of their containing scope.',
            correct: false
          },
          {
            text: 'Hoisting in JavaScript is a behavior in which variable and function declarations are moved to the top of their containing scope.',
            correct: false
          },
          { 
            text: 'Hoisting in JavaScript is a process where the JavaScript interpreter moves all variable and function declarations and values to the top of your code.', 
            correct: false 
          },
          {
            text: 'Hoisting is the process of lifting heavy objects in JavaScript.',
            correct: false
          }
        ]
      }
    },
    {
      id: 'JS_fund_001_002',
      question: {
        type: 'openQuestion',
        text: 'What is the difference between `==` and `===`?',
      }
    },
    {
      id: 'JS_fund_001_003',
      question: {
        type: 'code',
        text: 'write a function that takes a string as an argument and returns the string reversed.',
        testCases: [
          {
            input: 'hello',
            output: 'olleh'
          },
          {
            input: 'world',
            output: 'dlrow'
          }
        ]
      }
    },
    {
      id: 'JS_fund_001_004',
      question: {
        type: 'code',
        text: 'write a function that takes a string as an argument and returns the string reversed.',
        testCases: [
          {
            input: 'hello',
            output: 'olleh'
          },
          {
            input: 'world',
            output: 'dlrow'
          }
        ]
      }
    }
  ]
}

export default javascriptFundamentals;