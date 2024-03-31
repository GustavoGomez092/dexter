import { Test } from "../test.type"

const javascriptIntermedium: Test = {
  id: "js-inter-001",
  name: "JavaScript Intermedium",
  description:
    "A test designed to gauge an intermediate candidate's knowledge of JavaScript.",
  difficulty: 2,
  questions: [
    {
      id: "JS_inter_001_001",
      question: {
        type: "multipleChoice",
        text: "What is a Closure in JavaScript?",
        options: [
          {
            text: "A closure is a function having access to the parent scope, even after the parent function has closed.",
            correct: true,
          },
          {
            text: "A closure is a function that encapsulates its own variables and functions, and does not have access to the parent scope.",
            correct: false,
          },
          {
            text: "A closure is a function that does not have access to its own scope.",
            correct: false,
          },
          {
            text: "A closure is a function that can only be called once.",
            correct: false,
          },
        ],
      },
    },
    {
      id: "JS_inter_001_002",
      question: {
        type: "openQuestion",
        text: "Explain the concept of Prototypal Inheritance in JavaScript.",
      },
    },
    {
      id: "JS_inter_001_003",
      question: {
        type: "multipleChoice",
        text: "What is the output of the following code?",
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
        options: [
          {
            text: "3",
            correct: true,
          },
          {
            text: "undefined",
            correct: false,
          },
          {
            text: "ReferenceError: a is not defined",
            correct: false,
          },
          {
            text: "null",
            correct: false,
          },
        ],
      },
    },
  ],
}

export default javascriptIntermedium
