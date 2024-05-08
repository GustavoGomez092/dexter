import { Test } from '../test.type';

const reactFundamentals: Test = {
  id: 'react-fund-001',
  name: 'React.js Fundamentals',
  description: "Test your knowledge of React.js fundamentals with this challenging quiz.",
  difficulty: 3,
  questions: [
    {
      id: 'React_fund_001_000',
      question: {
        type: 'code',
        runTests: false,
        sandpackType: 'vite-react',
        text: 'Create a React component called `Greeting` that displays a greeting message with the user\'s name passed as a prop.',
        filesToShow: ['Greeting.js'],
        mainFile: 'Greeting.jsx',
        code: {
          'Greeting.jsx': {
            code: `
// Write your component in the editor window

`,
            active: true,
          },
          'App.jsx': {
            code: `
import React from 'react';

function App() {
  return (
    <div className="App">
      <p>Your component goes here</p>
    </div>
  );
}

export default App;
`,
            hidden: false,
          },
            'vite.config.js': {
              code: `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

            `,
            hidden: true,
            },
        },
      },
    },
    {
      id: 'React_fund_001_001',
      question: {
        type: 'multipleChoice',
        text: 'Which hook is used to change the state in a React component?',
        options: [
          {
            text: 'useEstate()',
            correct: false,
          },
          {
            text: 'createState()',
            correct: false,
          },
          {
            text: 'useState()',
            correct: true,
          },
          {
            text: 'modifyState()',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'React_fund_001_002',
      question: {
        type: 'openQuestion',
        text: 'Explain the purpose of the `key` prop in React lists.',
      },
    },
    {
      id: 'React_fund_001_003',
      question: {
        type: 'multipleChoice',
        text: 'Which React hook is the one responsible for storing a mutable value that does not cause a re-render when updated?',
        options: [
          {
            text: 'useState()',
            correct: false,
          },
          {
            text: 'useRef()',
            correct: true,
          },
          {
            text: 'useEffect()',
            correct: false,
          },
          {
            text: 'useReducer()',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'React_fund_001_004',
      question: {
        type: 'code',
        runTests: false,
        sandpackType: 'vite-react',
        text: 'Create a React functional component called `Counter` that increments a count state when a button is clicked.',
        filesToShow: ['Counter.jsx'],
        mainFile: 'Counter.jsx',
        code: {
          'Counter.jsx': {
            code: `
// Write your component in the editor window

`,
            active: true,
          },
          'App.jsx': {
            code: `
import React from 'react';

function App() {
  return (
    <div className="App">
      <p>Your component goes here</p>
    </div>
  );
}

export default App;
`,
            hidden: false,
          },
          'vite.config.js': {
            code: `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
});

          `,
          hidden: true,
          },
        },
      },
    },
    {
      id: 'React_fund_001_005',
      question: {
        type: 'multipleChoice',
        text: 'Which method is used to conditionally render content in React?',
        options: [
          {
            text: 'if statement',
            correct: false,
          },
          {
            text: 'renderIf()',
            correct: false,
          },
          {
            text: 'Conditional rendering is done directly within JSX using ternary operator or logical && operator.',
            correct: true,
          },
          {
            text: 'show()',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'React_fund_001_006',
      question: {
        type: 'openQuestion',
        text: 'What is JSX in React and why is it used?',
      },
    },
    {
      id: 'React_fund_001_007',
      question: {
        type: 'code',
        runTests: false,
        sandpackType: 'vite-react',
        text: 'Create a React component called `Toggle` that toggles between "ON" and "OFF" when a button is clicked.',
        filesToShow: ['Toggle.jsx'],
        mainFile: 'Toggle.jsx',
        code: {
          'Toggle.jsx': {
            code: `
// Write your component in the editor window

`,
            active: true,
          },
          'App.jsx': {
            code: `
import React from 'react';

function App() {
  return (
    <div className="App">
      <p>Your component goes here</p>
    </div>
  );
}

export default App;
`,
            hidden: false,
          },
          'vite.config.js': {
            code: `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
});

          `,
          hidden: true,
          },
        },
      },
    },
    {
      id: 'React_fund_001_008',
      question: {
        type: 'multipleChoice',
        text: 'What is the purpose of React Router?',
        options: [
          {
            text: 'To manage state in React applications.',
            correct: false,
          },
          {
            text: 'To handle user authentication in React applications.',
            correct: false,
          },
          {
            text: 'To enable navigation between different views/components in a React application.',
            correct: true,
          },
          {
            text: 'To improve performance of React applications.',
            correct: false,
          },
        ],
      },
    },
    {
      id: 'React_fund_001_009',
      question: {
        type: 'openQuestion',
        text: 'Explain the concept of props drilling in React and how it can be mitigated.',
      },
    },
    {
      id: 'React_fund_001_010',
      question: {
        type: 'code',
        runTests: false,
        sandpackType: 'vite-react',
        text: 'Create a React component called `Form` that captures user input from a text input field and displays it below the input field when a button is clicked.',
        filesToShow: ['Form.jsx'],
        mainFile: 'Form.jsx',
        code: {
          'Form.jsx': {
            code: `
// Write your component in the editor window

`,
            active: true,
          },
          'App.jsx': {
            code: `
import React from 'react';

function App() {
  return (
    <div className="App">
      <p>Your component goes here</p>
    </div>
  );
}

export default App;
`,
            hidden: false,
          },
          'vite.config.js': {
            code: `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
});

          `,
          hidden: true,
          },
        },
      },
    },
  ],
};

export default reactFundamentals;