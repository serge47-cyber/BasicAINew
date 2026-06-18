import { FullLesson, LessonBrief } from './types';
import { L1_L6 } from './lessons/l1_l6';
import { L7_L12 } from './lessons/l7_l12';
import { L13_L17 } from './lessons/l13_l17';

// Combine all three subsets to guarantee 100% material from L1 to L17 is loaded
export const allLessons: FullLesson[] = [
  ...L1_L6,
  ...L7_L12,
  ...L13_L17
];

export const syllabusList: LessonBrief[] = allLessons.map(lesson => ({
  id: lesson.id,
  num: lesson.num,
  title: lesson.title,
  description: lesson.id <= 6 
    ? 'Перші кроки: розуміння принципів роботи, відмінності від Google та написання точних запитів.'
    : lesson.id <= 12
    ? 'Практичне застосування: вибір правильних інструментів, навчання, творчість та ведення діалогів.'
    : 'Посилення професійних результатів: ШІ на роботі, переклади, безпека здоров\'я та управління особистими грошима.'
}));

export const detailedLessons: Record<number, FullLesson> = allLessons.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {} as Record<number, FullLesson>);
