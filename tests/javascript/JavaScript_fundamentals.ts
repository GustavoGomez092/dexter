import { Test } from '../test.type';

const javascriptIntermedium: Test = {
  id: 'js-inter-001',
  name: 'JavaScript Intermedium',
  description:
    "A test designed to gauge an intermediate candidate's knowledge of JavaScript.",
  difficulty: 2,
  questions: [
    {
      id: 'JS_fund_001_000',
      question: {
        type: 'code',
        sandpackType: 'vanilla',
        text: 'Create a function that gets a word as an argument and returns the word reversed.',
        filesToShow: [ 'index.js' ],
        mainFile: 'index.js',
        code: {
          'index.html': {
            code: `
<!DOCTYPE html>
<html>

<head>
  <title>Dexter Sandbox</title>
  <meta charset="UTF-8" />
</head>

<body>
  <h1>This challenge does not require HTML</h1>
  <script src="index.js"></script>
</body>

</html>`,
hidden: true,
          },
          'styles.css': {
          code: `
* {
  font-family: Arial, sans-serif;
}`,
hidden: true,
          },
          'index.js': {
          code: `
import "./styles.css";
// DO NOT change the name of the function,
// else the tests will fail

export default function reverseWord(word) {
// Write your code here

return word
}

reverseWord("welcome");

`,
active: true,
          },
          'index.test.js': {
          code: `
import reverseWord from './index';

describe('reverseWord 1', () => {
  test('should reverse the word', () => {
    expect(reverseWord('test')).toBe('tset');
  });
});

describe('reverseWord 2', () => {
  test('should reverse the word', () => {
    expect(reverseWord('hello')).toBe('olleh');
  });
});

describe('reverseWord 3', () => {
  test('should reverse the word', () => {
    expect(reverseWord('world')).toBe('dlrow');
  });
});
`,
hidden: true,

          },
          'package.json': {
          code: `
{
  "dependencies": {},
  "main": "/index.js",
  "devDependencies": {}
}`,
hidden: true,
          },
      },
      },
    },
    {
      id: 'JS_fund_001_001',
      question: {
        type: 'multipleChoice',
        text: 'What is a Closure in JavaScript?',
        options: [
          {
            text: 'A closure is a function having access to the parent scope, even after the parent function has closed.',
            correct: true,
          },
          {
            text: 'A closure is a function that encapsulates its own variables and functions, and does not have access to the parent scope.',
            correct: false,
          },
          {
            text: 'A closure is a function that does not have access to its own scope.',
            correct: false,
          },
          {
            text: 'A closure is a function that can only be called once.',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'JS_fund_001_002',
      question: {
        type: 'openQuestion',
        text: 'Explain the concept of Prototypal Inheritance in JavaScript.',
      },
    },
    {
      id: 'JS_fund_001_003',
      question: {
        type: 'multipleChoice',
        text: 'What is the output of the following code?',
        mainFile: 'index.js',
        code: {'index.js': {
          code: `
function foo() {
  var a = 3;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz();

`,
        }},
        options: [
          {
            text: '3',
            correct: true,
          },
          {
            text: 'undefined',
            correct: false,
          },
          {
            text: 'ReferenceError: a is not defined',
            correct: false,
          },
          {
            text: 'null',
            correct: false,
          },
        ],
      },
    },
  ],
};

export default javascriptIntermedium;
