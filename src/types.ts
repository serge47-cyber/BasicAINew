export type RoleType = 'curious' | 'pragmatic'; // curious = Допитливий (explorer), pragmatic = Прагматик (practitioner)

export type RouteMode = 'full' | 'quick'; // full = 17 lessons, quick = 5 key lessons (1, 2, 4, 6, 10)

export interface LessonBrief {
  id: number;
  num: string;
  title: string;
  description: string;
}

export interface ChoiceOption {
  t: string;
  v: 'correct' | 'wrong' | 'partial';
  fb: string;
}

export interface ScenarioItem {
  q: string;
  cor?: 'A' | 'B';
  chk?: boolean; // L3 checks
  safe?: boolean; // L6 checks
  ai?: boolean; // L2 checks
  ok?: boolean; // L4 checks
  a?: string;
  b?: string;
  exp?: string;
  best?: string; // L7 specific
  why?: string; // L7 specific
  good?: string; // L15 specific
  bad?: string; // L15 specific
}

export interface TemplateItem {
  icon: string;
  title: string;
  text: string;
}

export interface ScenarioCard {
  id: string;
  icon: string;
  title: string;
  desc: string;
  steps: { label: string; prompt: string }[];
}

export interface ReflectionItem {
  q: string;
  opts: string[];
  fbs: string[];
}

export interface LessonDetail {
  hook: string;
  hookSub: string;
  think?: string;
  ch1?: ChoiceOption[];
  expTitle?: string;
  expSub?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  ruleTitle?: string;
  ruleText?: string;
  can?: string[];
  cant?: string[];
  scens?: ScenarioItem[];
  pTitle?: string;
  pSub?: string;
  promptTitle?: string;
  promptSub?: string;
  promptTitle1?: string;
  promptSub1?: string;
  promptTitle2?: string;
  promptSub2?: string;
  ccA?: string;
  ccB?: string;
  fb4c?: string;
  fb4w?: string;
  aiText?: string;
  ch3?: ChoiceOption[];
  ch4?: ChoiceOption[];
  ch5?: ChoiceOption[];
  ccA1?: string;
  ccB1?: string;
  fb1c?: string;
  fb1w?: string;
  ccA2?: string;
  ccB2?: string;
  tmpls?: TemplateItem[];
  scenarios?: ScenarioCard[];
  reflections?: ReflectionItem[];
  quiz?: { q: string; opts: string[]; correct: number };
}

export interface FullLesson {
  id: number;
  num: string;
  title: string;
  curious: LessonDetail; // Дослідник/Допитливий
  pragmatic: LessonDetail; // Практик/Прагматик
}
