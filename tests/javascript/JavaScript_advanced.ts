import { Test } from "../test.type"

const javascriptAdvanced: Test = {
  id: "js-adv-001",
  name: 'JavaScript Advanced',
  description: 'A test designed to gauge an advanced candidate\'s knowledge of JavaScript.',
  difficulty: 3,
  questions: [
    {
      id: "JS_adv_001_001",
      question: {
        type: 'multipleChoice',
        text: 'What is the Event Loop in JavaScript?',
        options: [
          {
            text: 'The Event Loop is a queue of callback functions.',
            correct: false
          },
          {
            text: 'The Event Loop is a loop that the JavaScript interpreter enters when it\'s not executing any code.',
            correct: false
          },
          {
            text: 'The Event Loop is a process in the JavaScript engine that handles external events and converts them into callback invocations.',
            correct: true
          },
          {
            text: 'The Event Loop is a special type of loop in JavaScript that can handle asynchronous code.',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_002",
      question: {
        type: 'openQuestion',
        text: 'Explain how `this` keyword works in JavaScript.',
      }
    },
    {
      id: "JS_adv_001_003",
      question: {
        type: 'multipleChoice',
        text: 'What is the output of the following code?',
        code: `
        function foo() {
          this.a = 3;
        }
        var obj = new foo();
        var bar = new foo();
        bar.a = 4;
        console.log(obj.a);
        `,
        options: [
          {
            text: '3',
            correct: true
          },
          {
            text: '4',
            correct: false
          },
          {
            text: 'undefined',
            correct: false
          },
          {
            text: 'ReferenceError: a is not defined',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_004",
      question: {
        type: 'multipleChoice',
        text: 'What is a Promise in JavaScript?',
        options: [
          {
            text: 'A Promise is a proxy for a value not necessarily known when the promise is created.',
            correct: true
          },
          {
            text: 'A Promise is a data type that represents a possible value, or the reason for an exception.',
            correct: false
          },
          {
            text: 'A Promise is a function that returns a value.',
            correct: false
          },
          {
            text: 'A Promise is an object that contains a value.',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_005",
      question: {
        type: 'multipleChoice',
        text: 'What is the output of the following code?',
        code: `
        var a = 1;
        function foo() {
          console.log(a);
          var a = 2;
        }
        foo();
        `,
        options: [
          {
            text: '1',
            correct: false
          },
          {
            text: '2',
            correct: false
          },
          {
            text: 'undefined',
            correct: true
          },
          {
            text: 'ReferenceError: a is not defined',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_006",
      question: {
        type: 'openQuestion',
        text: 'Explain how async/await works in JavaScript.',
      }
    },
    {
      id: "JS_adv_001_007",
      question: {
        type: 'multipleChoice',
        text: 'What is the output of the following code?',
        code: `
        console.log(2 + "2");
        console.log(2 - "1");
        `,
        options: [
          {
            text: '22 and 1',
            correct: true
          },
          {
            text: '4 and 1',
            correct: false
          },
          {
            text: '22 and 3',
            correct: false
          },
          {
            text: '4 and 3',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_008",
      question: {
        type: 'openQuestion',
        text: 'What is the difference between null and undefined?',
      }
    },
    {
      id: "JS_adv_001_009",
      question: {
        type: 'multipleChoice',
        text: 'What is the output of the following code?',
        code: `
        console.log(typeof null);
        console.log(typeof undefined);
        `,
        options: [
          {
            text: 'object and undefined',
            correct: true
          },
          {
            text: 'null and undefined',
            correct: false
          },
          {
            text: 'object and object',
            correct: false
          },
          {
            text: 'null and null',
            correct: false
          }
        ]
      }
    },
    {
      id: "JS_adv_001_010",
      question: {
        type: 'code',
        text: 'Write a function in JavaScript that takes an array of numbers and returns the sum of its elements.',
        testCases: [
          {
            input: '[1, 2, 3, 4, 5]',
            output: '15'
          },
          {
            input: '[10, 20, 30, 40, 50]',
            output: '150'
          }
        ]
      }
    }
  ]
};

export default javascriptAdvanced;