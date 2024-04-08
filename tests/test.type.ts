type QuestionOption = {
  text: string;
  correct: boolean;
};

type MultipleChoiceQuestion = {
  type: 'multipleChoice';
  text: string;
  options: QuestionOption[];
  code?: string;
};

type OpenQuestion = {
  type: 'openQuestion';
  text: string;
};

type TestCase = {
  input: string;
  output: string
}

type CodeQuestion = {
  type: 'code';
  text: string;
  testCases: TestCase[]
};

type Question = {
  id: string;
  question: MultipleChoiceQuestion | OpenQuestion | CodeQuestion;
};

export type Test = {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  questions: Question[];
};