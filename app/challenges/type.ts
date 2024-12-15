export type Level = 'Easy' | 'Moderate' | 'Hard';
export type Language = 'js' | 'py';
export type TestCaseType = 'number' | 'string';

export interface TestCase {
  type: TestCaseType;
  name: string;
  value: string | number;
  output: any;
  weight: number;
}


export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  level: Level;
  code: {
    language?: Language;
    functionName?: string;
    content?: string;
  };
  tests: TestCase[];
  createdAt: string;
}
