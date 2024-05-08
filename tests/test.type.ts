export type Code = {
  [key: string]: sandPackOptions;
};

type sandPackOptions = {
  code: string;
  active?: boolean;
  hidden?: boolean;
}

type QuestionOption = {
  text: string;
  correct: boolean;
};

type MultipleChoiceQuestion = {
  type: 'multipleChoice';
  text: string;
  options: QuestionOption[];
  mainFile?: string|'';
  code?: Code;
};

type OpenQuestion = {
  type: 'openQuestion';
  text: string;
  code?: Code;
  mainFile?: string|'';
};

type CodeQuestion = {
  type: 'code';
  runTests: boolean;
  text: string;
  sandpackType: string;
  mainFile: string|'';
  filesToShow: string[];
  code: Code;
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
