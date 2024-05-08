import { Test } from '../test.type';

const javascriptFundamentals: Test = {
  id: 'js-fund-001',
  name: 'JavaScript Fundamentals',
  description:
    "A test designed to gauge a candidate's fundamental knowledge of JavaScript.",
  difficulty: 2,
  questions: [
    {
      id: 'JS_fund_001_000',
      question: {
        type: 'code',
        runTests: true,
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
    {
      id: 'JS_fund_001_004',
      question: {
        type: 'multipleChoice',
        text: 'What does the "this" keyword refer to in JavaScript?',
        options: [
          {
            text: 'It refers to the current function.',
            correct: false,
          },
          {
            text: 'It refers to the global object.',
            correct: false,
          },
          {
            text: 'It refers to the object that is currently executing the function.',
            correct: true,
          },
          {
            text: 'It refers to the object where the function was defined.',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'JS_fund_001_005',
      question: {
        type: 'openQuestion',
        text: 'What is the difference between "==" and "===" operators in JavaScript?',
      },
    },
    {
      id: 'JS_fund_001_006',
      question: {
        type: 'code',
        runTests: true,
        sandpackType: 'vanilla',
        text: 'Write a function to remove duplicates from an array.',
        filesToShow: ['index.js'],
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
export default function removeDuplicates(arr) {
  // Write your code here
  return arr;
}

removeDuplicates([1, 2, 2, 3, 4, 4, 5]);
`,
            active: true,
          },
          'index.test.js': {
            code: `
import removeDuplicates from './index';

describe('removeDuplicates', () => {
  test('should remove duplicates from array', () => {
    expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('should return empty array if input is empty', () => {
    expect(removeDuplicates([])).toEqual([]);
  });
});
`,
            hidden: true,
          },
        },
      },
    },
    {
      id: 'JS_fund_001_007',
      question: {
        type: 'multipleChoice',
        text: 'What is the purpose of the "use strict" directive in JavaScript?',
        options: [
          {
            text: 'To enforce secure coding practices.',
            correct: false,
          },
          {
            text: 'To enable the strict mode which catches common coding mistakes and "unsafe" actions.',
            correct: true,
          },
          {
            text: 'To allow usage of modern JavaScript features.',
            correct: false,
          },
          {
            text: 'To disable certain JavaScript features for performance optimization.',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'JS_fund_001_008',
      question: {
        type: 'openQuestion',
        text: 'What are the differences between "undefined" and "null" in JavaScript?',
      },
    },
    {
      id: 'JS_fund_001_009',
      question: {
        type: 'code',
        runTests: true,
        sandpackType: 'vanilla',
        text: 'Write a function that doubles each element in an array and returns the result.',
        filesToShow: ['index.js'],
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
export default function doubleArray (arr) {
  // Write your code here
  return arr;
}

doubleArray([1, 2, 3]);

`,
            active: true,
          },
          'index.test.js': {
            code: `
import doubleArray from './index';

describe('doubleArray', () => {
  test('should double each element in the array', () => {
    expect(doubleArray([1, 2, 3])).toEqual([2, 4, 6]);
  });

  test('should return an empty array if input is empty', () => {
    expect(doubleArray([])).toEqual([]);
  });
});
`,
            hidden: true,
          },
        },
      },
    },
    {
      id: 'JS_fund_001_010',
      question: {
        type: 'multipleChoice',
        text: 'What is the purpose of the "defer" attribute in a script tag?',
        options: [
          {
            text: 'To defer the execution of the script until after the document has been parsed.',
            correct: true,
          },
          {
            text: 'To specify an external JavaScript file to be used in the HTML document.',
            correct: false,
          },
          {
            text: 'To specify that the script should be executed asynchronously.',
            correct: false,
          },
          {
            text: 'To ensure that the script is executed before any other scripts in the document.',
            correct: false,
          },
        ],
      },
    },
  ],
};

export default javascriptFundamentals;
