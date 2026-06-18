import React, { useState } from 'react';
import { 
  Search, Brain, Compass, Sparkles, Shield, Lock, FileText, 
  UserSquare2, HelpCircle, Eye, RefreshCw, PenTool, CheckSquare, 
  HelpCircleIcon, CheckCircle2, ChevronRight, Copy, Check, Calculator, 
  Globe2, HeartPulse, BadgeDollarSign, Laptop, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WidgetProps {
  lessonId: number;
  role: 'curious' | 'pragmatic';
  onTaskPassed: () => void;
}

export const PlaygroundWidget: React.FC<WidgetProps> = ({ lessonId, role, onTaskPassed }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onTaskPassed();
    });
  };

  // 1. Google vs ШІ
  if (lessonId === 1) {
    const questions = [
      { id: 1, text: 'Знайти номер телефону гарячої лінії вашого банку', answer: 'google', fb: 'Правильно! Конкретні контакти та офіційні номери телефонів найкраще шукати безпосередньо в Google.' },
      { id: 2, text: 'Потрібно придумати 5 казок про пригоди лісового їжачка', answer: 'ai', fb: 'Вірно! Створення казок, генерація ідей та творчі тексти — фірмова зона ШІ.' },
      { id: 3, text: 'Дізнатися, які документи потрібні для оформлення машини', answer: 'ai', fb: 'Так! ШІ детально структурує список необхідних кроків звичайної процедури.' },
      { id: 4, text: 'Перевірити розклад рейсів Київ-Варшава на сьогодні', answer: 'google', fb: 'Чудово! Реальні дані на сьогодні, розклади та квитки — це надійно через пошук або офіційні сайти.' }
    ];
    return <WidgetL1 questions={questions} onTaskPassed={onTaskPassed} />;
  }

  // 2. Що вміє і не вміє
  if (lessonId === 2) {
    const tasks = [
      { id: 1, text: 'Фізично замісити тісто для пиріжків на кухні', res: 'cannot', fb: 'ШІ не має рук — це фізичний світ!' },
      { id: 2, text: 'Написати комерційну пропозицію для продажу сонячних панелей', res: 'can', fb: 'Вірно, ШІ чудово пише комерційні пропозиції.' },
      { id: 3, text: 'Перекласти статтю з української мови на розмовну польську', res: 'can', fb: 'Саме так, ШІ блискуче перекладає.' },
      { id: 4, text: 'Відремонтувати зламаний фізичний велосипед', res: 'cannot', fb: 'Потрібні реальні інструменти й руки.' }
    ];
    return <WidgetL2 tasks={tasks} onTaskPassed={onTaskPassed} />;
  }

  // 3. Галюцинація
  if (lessonId === 3) {
    return <WidgetL3 onTaskPassed={onTaskPassed} />;
  }

  // 4. Prompt Constructor
  if (lessonId === 4) {
    return <WidgetL4 onTaskPassed={onTaskPassed} handleCopy={handleCopy} copied={copied} />;
  }

  // 5. Повседневні справи
  if (lessonId === 5) {
    return <WidgetL5 onTaskPassed={onTaskPassed} handleCopy={handleCopy} copied={copied} />;
  }

  // 6. Безпека даних
  if (lessonId === 6) {
    return <WidgetL6 onTaskPassed={onTaskPassed} />;
  }

  // 7. Інструменти
  if (lessonId === 7) {
    return <WidgetL7 onTaskPassed={onTaskPassed} />;
  }

  // 8. Репетитор
  if (lessonId === 8) {
    return <WidgetL8 onTaskPassed={onTaskPassed} />;
  }

  // 9. Фейки й Deepfake
  if (lessonId === 9) {
    return <WidgetL9 onTaskPassed={onTaskPassed} />;
  }

  // 10. Покроковий діалог
  if (lessonId === 10) {
    return <WidgetL10 onTaskPassed={onTaskPassed} />;
  }

  // 11. Мій перший AI-сценарій
  if (lessonId === 11) {
    return <WidgetL11 onTaskPassed={onTaskPassed} />;
  }

  // 12. Творчість
  if (lessonId === 12) {
    return <WidgetL12 onTaskPassed={onTaskPassed} />;
  }

  // 13. ШІ на роботі
  if (lessonId === 13) {
    return <WidgetL13 onTaskPassed={onTaskPassed} />;
  }

  // 14. ШІ і мова
  if (lessonId === 14) {
    return <WidgetL14 onTaskPassed={onTaskPassed} />;
  }

  // 15. ШІ і здоров'я
  if (lessonId === 15) {
    return <WidgetL15 onTaskPassed={onTaskPassed} />;
  }

  // 16. ШІ і гроші
  if (lessonId === 16) {
    return <WidgetL16 onTaskPassed={onTaskPassed} />;
  }

  // 17. Фінал
  if (lessonId === 17) {
    return <WidgetL17 role={role} onTaskPassed={onTaskPassed} />;
  }

  return null;
};

/* --- WIDGET RENDERERS --- */

// L1 Widget
const WidgetL1: React.FC<{ questions: any[]; onTaskPassed: () => void }> = ({ questions, onTaskPassed }) => {
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [doneCount, setDoneCount] = useState(0);

  const handlePick = (choice: string) => {
    setSelected(choice);
    if (choice === questions[curr].answer) {
      const next = doneCount + 1;
      setDoneCount(next);
      if (next === questions.length) {
        onTaskPassed();
      }
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (curr < questions.length - 1) setCurr(curr + 1);
  };

  const q = questions[curr];
  const finished = doneCount === questions.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
        <span>Крок {curr + 1} з {questions.length}</span>
        <span className="text-emerald-400">Правильно: {doneCount}/{questions.length}</span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
        <p className="text-base text-white font-bold">{q.text}</p>
      </div>

      {!selected ? (
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handlePick('google')} 
            className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-100 font-bold transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-sky-400" /> Google Пошук
          </button>
          <button 
            onClick={() => handlePick('ai')} 
            className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-100 font-bold transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Brain className="w-4 h-4 text-amber-400" /> Штучний Інтелект (ШІ)
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${selected === q.answer ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'}`}>
            <p className="font-bold mb-1">{selected === q.answer ? '✓ Супер!' : '✗ Спробуйте ще раз!'}</p>
            <p>{q.fb}</p>
          </div>
          {selected === q.answer ? (
            <button 
              onClick={finished ? undefined : handleNext} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              {finished ? '🎉 Всі завдання класифіковано!' : 'Далі →'}
            </button>
          ) : (
            <button 
              onClick={() => setSelected(null)} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              Спробувати знову
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// L2 Widget
const WidgetL2: React.FC<{ tasks: any[]; onTaskPassed: () => void }> = ({ tasks, onTaskPassed }) => {
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(0);

  const handlePick = (choice: string) => {
    setSelected(choice);
    if (choice === tasks[curr].res) {
      const next = done + 1;
      setDone(next);
      if (next === tasks.length) {
        onTaskPassed();
      }
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (curr < tasks.length - 1) setCurr(curr + 1);
  };

  const t = tasks[curr];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
        <span>Крок {curr + 1} з {tasks.length}</span>
        <span className="text-amber-400">Пройдено: {done}/{tasks.length}</span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">Сценарій</p>
        <p className="text-base text-white font-bold mt-1">«{t.text}»</p>
      </div>

      {!selected ? (
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handlePick('can')} 
            className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 transition-all font-bold cursor-pointer text-xs"
          >
            ✓ ШІ впорається
          </button>
          <button 
            onClick={() => handlePick('cannot')} 
            className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 transition-all font-bold cursor-pointer text-xs"
          >
            ✗ Краще інакше / Фізичний світ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${selected === t.res ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'}`}>
            <p>{t.fb}</p>
          </div>
          {selected === t.res ? (
            <button 
              onClick={done === tasks.length ? undefined : handleNext} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              {done === tasks.length ? '🎉 Задача вирішена!' : 'Наступний пункт →'}
            </button>
          ) : (
            <button 
              onClick={() => setSelected(null)} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              Спробувати ще раз
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// L3 Widget
const WidgetL3: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [checked, setChecked] = useState<number | null>(null);

  const opts = [
    { text: 'Нільс Бор ніколи не народився.', score: false, comment: 'Ні, Нільс Бор народився у 1885 році.' },
    { text: 'Квантова педагогіка — це вигаданий термін, а цитата про уяву належить Ейнштейну!', score: true, comment: 'Чудовий аналітичний погляд! Так, речення виглядає дуже правдоподібно, але термін вигаданий ШІ («галюцинація»), а відому цитату про уяву сказав Альберт Ейнштейн.' },
    { text: 'Подія була у 1953 році, а не в 1952.', score: false, comment: 'Ні, дата є найменшою проблемою, сама зустріч у такому контексті є вигадкою.' }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
        <p className="text-xs font-bold text-amber-400 mb-1">Фрагмент тексту ШІ:</p>
        <p className="text-xs text-slate-300 italic">"Як зазначав видатний фізик Нільс Бор у лекції 1952 року: «Уява важливіша за знання, бо знання обмежене, а уява охоплює весь світ». Саме цей висновок ліг у фундамент сучасної квантової педагогіки."</p>
      </div>

      <p className="text-xs font-bold text-slate-300">Питання: Де тут галюцинація штучного інтелекту?</p>

      <div className="space-y-2">
        {opts.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => {
              setChecked(i);
              if (opt.score) onTaskPassed();
            }} 
            className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
              checked === i 
                ? opt.score 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {checked !== null && (
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${opts[checked].score ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/20 border-rose-500/30 text-rose-300'}`}>
          {opts[checked].comment}
        </div>
      )}
    </div>
  );
};

// L4 Widget
const WidgetL4: React.FC<{ onTaskPassed: () => void; handleCopy: (txt: string) => void; copied: boolean }> = ({ onTaskPassed, handleCopy, copied }) => {
  const [role, setRole] = useState('копірайтер');
  const [task, setTask] = useState('написати оголошення');
  const [tone, setTone] = useState('дружній');

  const generatedPrompt = `Ти — ${role}. Будь ласка, спробуй ${task}. Твій стиль має бути ${tone}, без зайвої води, чітко у вигляді 3 тез.`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">1. Роль</label>
          <select 
            value={role} 
            onChange={e => { setRole(e.target.value); onTaskPassed(); }}
            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
          >
            <option value="маркетолог">📈 Маркетолог</option>
            <option value="вчитель школи">🎒 Вчитель</option>
            <option value="юрист">⚖️ Юрист</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">2. Задача</label>
          <select 
            value={task} 
            onChange={e => { setTask(e.target.value); onTaskPassed(); }}
            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
          >
            <option value="створити рекламу товару">Створити рекламу</option>
            <option value="пояснити тему простою мовою">Пояснити тему</option>
            <option value="написати ділову скаргу">Написати скаргу</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">3. Тон</label>
          <select 
            value={tone} 
            onChange={e => { setTone(e.target.value); onTaskPassed(); }}
            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
          >
            <option value="енергійний, з смайлами">Енергійний</option>
            <option value="строгий та академічний">Академічний</option>
            <option value="ніжний та спокійний">Спокійний</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Ваш ідеальний промпт-шаблон:</p>
        <p className="text-xs font-mono text-slate-300 break-words leading-relaxed">{generatedPrompt}</p>
        <button 
          onClick={() => handleCopy(generatedPrompt)}
          className="mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Скопійовано!' : 'Копіювати промпт'}
        </button>
      </div>
    </div>
  );
};

// L5 Widget
const WidgetL5: React.FC<{ onTaskPassed: () => void; handleCopy: (txt: string) => void; copied: boolean }> = ({ onTaskPassed, handleCopy, copied }) => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const scenarioTasks = [
    { id: 1, title: '🍳 Побутове меню', text: 'У мене в холодильнику є куряче філе, помідор, трохи сметани та сир. Склади швидкий рецепт вечері. Напиши покроково за 5 хвилин.' },
    { id: 2, title: '✈️ Подорож вихідного дня', text: 'Склади мені план відпустки у Карпатах на суботу та неділю. Початок з Ворохти, мандрівки пішки, бюджет обмежений. Розрахуй час.' },
    { id: 3, title: '💌 Лист подяки лікарю', text: 'Напиши ввічливий лист подяки сімейному лікарю за чуйне ставлення під час моєї хвороби на грип. Тон щиросердечний, 4 речення.' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Виберіть корисну повсякденну задачу, щоб згенерувати ідеальний готовий запит:</p>
      
      <div className="grid grid-cols-3 gap-2">
        {scenarioTasks.map(st => (
          <button 
            key={st.id} 
            onClick={() => { setSelectedTask(st.id); onTaskPassed(); }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
              selectedTask === st.id 
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
            }`}
          >
            {st.title}
          </button>
        ))}
      </div>

      {selectedTask && (
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-[fadeIn_0.2s_ease-out]">
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Готовий запит для копіювання:</p>
          <p className="text-xs italic text-slate-300 leading-relaxed font-mono">"{scenarioTasks.find(s => s.id === selectedTask)?.text}"</p>
          <button 
            onClick={() => handleCopy(scenarioTasks.find(s => s.id === selectedTask)!.text)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold mt-2 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Скопійовано!' : 'Скопіювати й відкрити ШІ'}
          </button>
        </div>
      )}
    </div>
  );
};

// L6 Widget
const WidgetL6: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [checked, setChecked] = useState<number | null>(null);

  const entries = [
    { text: '«Напиши офіційного листа про оренду, моє ім\'я та прізвище — Андрій Іванов»', safe: true, fb: 'Безпечно! Загальні імена без паспортних даних та паролів є цілком прийнятними для написання листів ШІ.' },
    { text: '«Ось фото моєї паспорту та ідентифікаційного коду, розпізнай цифри»', safe: false, fb: 'Небезпечно! Персональні коди, паспорти та банківські карти є конфіденційними. Потрапляння у загальні бази навчання — ризик!' },
    { text: '«Перевір мій вихідний код фірми на предмет помилок та безпеки»', safe: false, fb: 'Для комерційних таємниць краще мати Enterprise-акаунти. Публічні сервіси навчаються на коді.' }
  ];

  const [curr, setCurr] = useState(0);
  const [complete, setComplete] = useState(0);

  const handleSelect = (isSafe: boolean) => {
    setChecked(isSafe ? 1 : 0);
    const item = entries[curr];
    if (isSafe === item.safe) {
      const next = complete + 1;
      setComplete(next);
      if (next === entries.length) {
        onTaskPassed();
      }
    }
  };

  const handleNext = () => {
    setChecked(null);
    if (curr < entries.length - 1) setCurr(curr + 1);
  };

  const t = entries[curr];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
        <span>Крок {curr + 1} з {entries.length}</span>
        <span className="text-emerald-400">Правильно: {complete}/{entries.length}</span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
        <p className="text-xs font-bold text-slate-400 mb-1">Проаналізуйте запит до ШІ:</p>
        <p className="text-xs font-mono text-slate-200 italic break-words">{t.text}</p>
      </div>

      {checked === null ? (
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleSelect(true)} 
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold text-xs cursor-pointer"
          >
            🛡️ Безпечно
          </button>
          <button 
            onClick={() => handleSelect(false)} 
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-rose-500/30 rounded-xl text-rose-400 font-bold text-xs cursor-pointer"
          >
            ⚠️ Критично
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${checked === (t.safe ? 1 : 0) ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'}`}>
            <p className="font-bold mb-1">{checked === (t.safe ? 1 : 0) ? '✓ Правильно!' : '✗ Помилка!'}</p>
            <p>{t.fb}</p>
          </div>
          {checked === (t.safe ? 1 : 0) ? (
            <button 
              onClick={complete === entries.length ? undefined : handleNext} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              {complete === entries.length ? '🎉 Ви чудово орієнтуєтесь у безпеці даних!' : 'Далі →'}
            </button>
          ) : (
            <button 
              onClick={() => setChecked(null)} 
              className="w-full p-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-white font-bold cursor-pointer"
            >
              Спробувати знову
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// L7 Widget
const WidgetL7: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [solved, setSolved] = useState<Record<number, boolean>>({});

  const matches = [
    { id: 1, task: 'Згенерувати красиву заставку для комп\'ютера', correct: 'Midjourney', desc: 'Midjourney — неперевершений інструмент для генерації реалістичних та художніх зображень.' },
    { id: 2, task: 'Проаналізувати фінансовий звіт компанії у форматі PDF на 50 сторінок', correct: 'Claude', desc: 'Claude має унікально велике вікно контексту для обробки великих документів за один раз.' },
    { id: 3, task: 'Створити красиву колискову мелодію за текстовим запитом за 10 секунд', correct: 'Suno', desc: 'Suno генерує прекрасні пісні з вокалом та супроводом за вашим описом.' },
  ];

  const tools = ['Midjourney', 'Claude', 'Suno'];

  const handleMatch = (id: number, tool: string) => {
    const item = matches.find(m => m.id === id)!;
    if (tool === item.correct) {
      const next = { ...solved, [id]: true };
      setSolved(next);
      if (Object.keys(next).length === matches.length) {
        onTaskPassed();
      }
    } else {
      alert('Спробуйте ще раз! Зверніть увагу на спеціалізацію інструментів.');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Match-гра: Знайдіть асистента для кожної специфічної задачі:</p>
      
      <div className="space-y-3">
        {matches.map(m => (
          <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <span className="text-slate-200 font-bold">{m.task}</span>
            {solved[m.id] ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">✓ {m.correct}</span>
            ) : (
              <div className="flex gap-1.5 justify-end">
                {tools.map(t => (
                  <button 
                    key={t} 
                    onClick={() => handleMatch(m.id, t)}
                    className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 text-slate-300 font-bold transition-all text-[11px] cursor-pointer"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// L8 Widget
const WidgetL8: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [style, setStyle] = useState<string | null>(null);

  const stylesText: Record<string, string> = {
    child: '💬 Розумний репетитор: "Уяви, що інфляція — це коли всі твої улюблені іграшки в магазині раптом починають коштувати більше цукерок, тому на той самий карманний бюджет ти можеш купити лише одну машинку замість трьох."',
    academic: '💬 Розумний репетитор: "Інфляція — це стійке зростання загального рівня цін на товари та послуги протягом тривалого періоду часу, що веде до зниження купівельної спроможності грошової одиниці."',
    business: '💬 Розумний репетитор: "Інфляція для бізнесу — це зміна маржинальності. Ваші операційні витрати та закупівля сировини дорожчають, тому потрібно регулярно оптимізувати ціни та кошторис для збереження ROI."'
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Оберіть режим роботи вашого ШІ-репетитора для теми "Інфляція":</p>
      
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => { setStyle('child'); onTaskPassed(); }}
          className={`p-2 bg-slate-900 border rounded-xl text-xs font-bold transition-all cursor-pointer ${style === 'child' ? 'border-sky-400 text-sky-400' : 'border-slate-800 text-slate-300'}`}
        >
          👶 Дитині 8 років
        </button>
        <button 
          onClick={() => { setStyle('academic'); onTaskPassed(); }}
          className={`p-2 bg-slate-900 border rounded-xl text-xs font-bold transition-all cursor-pointer ${style === 'academic' ? 'border-sky-400 text-sky-400' : 'border-slate-800 text-slate-300'}`}
        >
          🎓 Академічний
        </button>
        <button 
          onClick={() => { setStyle('business'); onTaskPassed(); }}
          className={`p-2 bg-slate-900 border rounded-xl text-xs font-bold transition-all cursor-pointer ${style === 'business' ? 'border-sky-400 text-sky-400' : 'border-slate-800 text-slate-300'}`}
        >
          💼 Бізнес-метафора
        </button>
      </div>

      {style && (
        <div className="p-3.5 bg-slate-950 border border-sky-500/20 rounded-xl text-xs leading-relaxed text-sky-300 italic animate-[fadeIn_0.2s_ease-out]">
          {stylesText[style]}
        </div>
      )}
    </div>
  );
};

// L9 Widget
const WidgetL9: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const clues = [
    { id: 1, label: '👦 Людина на відео взагалі не кліпає очима більше 3 хвилин розмови', score: true, fb: 'Супер! Це класична ознака машинного дипфейку — ранні моделі погано відтворюють мікрорухи очей.' },
    { id: 2, label: '🧥 Бренд сорочки здається занадто неякісним', score: false, fb: 'Ні, неякісний одяг є звичайною ознакою у житті, але не дипфейку.' },
    { id: 3, label: '📐 6 пальців на руці людини на фотографії', score: true, fb: 'Чудово! Генеративні художні моделі часто мають проблеми з правильною анатомією кінцівок та пальців.' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Виберіть характерні ознаки підробленого ШІ-відео або фото:</p>
      
      <div className="space-y-2">
        {clues.map((clue, idx) => (
          <button 
            key={clue.id} 
            onClick={() => {
              setSelected(idx);
              if (clue.score) onTaskPassed();
            }}
            className={`w-full text-left p-3 border rounded-xl text-xs transition-all cursor-pointer ${
              selected === idx 
                ? clue.score 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' 
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300' 
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {clue.label}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${clues[selected].score ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-300' : 'bg-rose-950/10 border-rose-500/20 text-rose-300'}`}>
          {clues[selected].fb}
        </div>
      )}
    </div>
  );
};

// L10 Widget
const WidgetL10: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [stage, setStage] = useState(0);

  const conversation = [
    { role: 'user', text: 'Порад дещо цікаве почитати на вихідних.' },
    { role: 'ai', text: 'Рекомендую три напрямки: наукова фантастика, історична біографія або детективи. Що ближче тобі?' },
    { role: 'user', text: 'Давай фантастику. Тільки напиши коротко назву та головну суть однією фразою.' },
    { role: 'ai', text: '1. «Дюна» — боротьба за пустельну планету з цінним ресурсом.\n2. «Солярис» — зустріч космонавтів з розумним океаном-планетою.' }
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">Симуляція правильного покрокового діалогу з ШІ:</p>
      
      <div className="p-3 bg-slate-950 rounded-xl space-y-2.5 max-h-48 overflow-y-auto border border-slate-850">
        {conversation.slice(0, stage + 2).map((item, idx) => (
          <div key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${item.role === 'user' ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none' : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800'}`}>
              <span className="block text-[9px] font-black uppercase mb-0.5 opacity-60">{item.role === 'user' ? 'Ви' : 'ChatGPT'}</span>
              <p className="whitespace-pre-line">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {stage < 2 && (
        <button 
          onClick={() => {
            const next = stage + 2;
            setStage(next);
            if (next >= 2) {
              onTaskPassed();
            }
          }}
          className="w-full p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl cursor-pointer"
        >
          Зробити крок у розмові та уточнити бажане →
        </button>
      )}
    </div>
  );
};

// L11 Widget
const WidgetL11: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [complete, setComplete] = useState(false);

  return (
    <div className="text-center space-y-3">
      <p className="text-xs text-slate-300">Ваш перший персональний сценарій налаштовано!</p>
      <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl max-w-sm mx-auto text-xs text-slate-400 space-y-2">
        <p className="font-bold text-amber-400">Мобільна автоматизація подорожей:</p>
        <p>1. Складання чек-листа речей.</p>
        <p>2. Розрахунок часу та оптимального маршруту.</p>
        <p>3. Пошук дешевих квитків.</p>
      </div>
      <button 
        onClick={() => { setComplete(true); onTaskPassed(); }}
        className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${complete ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'}`}
      >
        {complete ? '✓ Сценарій запущений' : 'Запустити Сценарій'}
      </button>
    </div>
  );
};

// L12 Widget
const WidgetL12: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [topic, setTopic] = useState('');
  const [poem, setPoem] = useState('');

  const poems: Record<string, string> = {
    кава: `☕ Горнятко кави зранку на столі,\nШІ підкаже рішення нові на цій землі.\nЩоб день летів приємно й без тривог,\nРішення та цілі обираєм вдвох!`,
    осінь: `🍁 Осінь золотом малює ліс,\nВітер шепче казку між беріз.\nШІ напише вірш для нас із вами,\nЗігріваючи душевними словами!`,
    штучний: `🤖 Штучний розум вчиться кожен час,\nАле серце б'ється тільки в нас.\nВін малює, пише, творить дива,\nЗбережемо мрії та палкі слова!`
  };

  const handleCompose = () => {
    const key = topic.toLowerCase().trim();
    if (key.includes('кав')) {
      setPoem(poems.кава);
    } else if (key.includes('осін')) {
      setPoem(poems.осінь);
    } else {
      setPoem(poems.штучний);
    }
    onTaskPassed();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">Введіть одне ключове слово для поезії:</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="наприклад: кава, осінь, штучний" 
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="flex-grow p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
          />
          <button 
            onClick={handleCompose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg cursor-pointer"
          >
            Згенерувати риму
          </button>
        </div>
      </div>

      {poem && (
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 text-xs italic text-slate-300 whitespace-pre-line leading-relaxed text-center animate-[fadeIn_0.5s_ease-out]">
          {poem}
        </div>
      )}
    </div>
  );
};

// L13 Widget
const WidgetL13: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [val, setVal] = useState(12);

  const savings = Math.round(val * 0.7); // 70% економії на листах та рутині
  const mon = savings * 4;

  return (
    <div className="space-y-4 text-center">
      <p className="text-xs text-slate-400">Розрахуйте, скільки робочого часу на тиждень ви витрачаєте на заповнення емейлів та звітів:</p>
      
      <div className="max-w-xs mx-auto space-y-2">
        <input 
          type="range" 
          min="2" 
          max="40" 
          value={val}
          onChange={e => {
            setVal(parseInt(e.target.value));
            onTaskPassed();
          }}
          className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="text-sm font-black text-white font-mono">{val} годин на тиждень</div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 max-w-sm mx-auto space-y-1 animate-pulse">
        <div className="text-xs font-bold text-emerald-400">📈 Ефект від автоматизації ШІ:</div>
        <div className="text-base font-black text-white text-center">Заощаджено {savings} годин на тиждень</div>
        <div className="text-[11px] text-slate-500 italic">Це приблизно {mon} годин на місяць (майже 4 дні вільного часу!)</div>
      </div>
    </div>
  );
};

// L14 Widget
const WidgetL14: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [v, setVal] = useState('');
  const [show, setShow] = useState(false);

  const checkText = () => {
    setShow(true);
    const key = v.toLowerCase().trim();
    if (key.includes('morning') && (key.includes('how') || key.includes('are') || key.includes('going'))) {
      onTaskPassed();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Завдання: Перекладіть фразу «Доброго ранку, як справи?» на англійську мову:</p>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Good morning, how are you?..." 
          value={v}
          onChange={e => setVal(e.target.value)}
          className="flex-grow p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
        />
        <button 
          onClick={checkText}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-450 text-slate-950 font-black text-xs rounded-lg cursor-pointer"
        >
          Перевірити
        </button>
      </div>

      {show && (
        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 text-xs">
          {v.toLowerCase().includes('morning') ? (
            <p className="text-emerald-400 font-bold">✓ Чудово! Ваш перевод зафіксовано. ШІ допоможе відшліфувати вимову.</p>
          ) : (
            <p className="text-amber-400 italic">Спробуйте розпочати з "Good morning...". Натисніть "Перевірити" для проходження.</p>
          )}
        </div>
      )}
    </div>
  );
};

// L15 Widget
const WidgetL15: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [ok, setOk] = useState<boolean | null>(null);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-950 border border-rose-500/20 rounded-xl text-center space-y-1">
        <p className="text-[11px] font-black text-rose-400 uppercase tracking-widest">Критична ситуація</p>
        <p className="text-xs text-slate-300 font-semibold italic">«ШІ впевнено порадив мені пити екзотичний трав'яний відвар від болю в серці замість візиту до кардіолога.»</p>
      </div>

      <p className="text-xs font-bold text-slate-400 text-center">Чи безпечно використати пораду ШІ?</p>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <button 
          onClick={() => { setOk(false); onTaskPassed(); }}
          className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs font-bold border border-emerald-500/20 text-emerald-400 cursor-pointer"
        >
          Ні, вкрай небезпечно!
        </button>
        <button 
          onClick={() => setOk(true)}
          className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs font-bold border border-rose-500/20 text-rose-400 cursor-pointer"
        >
          Так, це ок
        </button>
      </div>

      {ok !== null && (
        <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-350 text-center leading-relaxed">
          {!ok ? (
            <span className="text-emerald-400 font-bold block mb-1">Вірно! Лікування гострих станів — лише через лікаря. ШІ не є терапевтом.</span>
          ) : (
            <span className="text-rose-400 font-bold block mb-1">Помилка! Це небезпечно при інфарктах чи хронічних хворобах. Не ризикуйте здоров\'ям.</span>
          )}
        </div>
      )}
    </div>
  );
};

// L16 Widget
const WidgetL16: React.FC<{ onTaskPassed: () => void }> = ({ onTaskPassed }) => {
  const [sorted, setSorted] = useState<Record<string, string>>({});

  const items = [
    { name: 'Оплата за комунальні платіжки', value: 'комунальні' },
    { name: 'Купівля квитків на дитяче кіно у неділю', value: 'розваги' },
    { name: 'Замовлення продуктів у супермаркеті', value: 'продукти' }
  ];

  const categories = ['комунальні', 'розваги', 'продукти'];

  const handleAssign = (name: string, value: string) => {
    const next = { ...sorted, [name]: value };
    setSorted(next);
    const solvedCount = Object.keys(next).filter(k => {
      const item = items.find(i => i.name === k)!;
      return next[k] === item.value;
    }).length;
    if (solvedCount === items.length) {
      onTaskPassed();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Розподіліть витрати для складання місячного бюджету ШІ:</p>
      
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.name} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs animate-[fadeIn_0.3s_ease-out]">
            <span className="text-slate-200 font-semibold">{item.name}</span>
            {sorted[item.name] === item.value ? (
              <span className="text-emerald-400 font-bold">✓ Розподілено</span>
            ) : (
              <div className="flex gap-1.5 justify-end">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => handleAssign(item.name, cat)}
                    className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 text-slate-300 font-bold transition-all text-[11px] cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// L17 Widget
const WidgetL17: React.FC<{ role: string; onTaskPassed: () => void }> = ({ role, onTaskPassed }) => {
  const [complete, setComplete] = useState(false);

  return (
    <div className="text-center space-y-4 max-w-sm mx-auto">
      <div className="p-5 bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto text-xl">🏆</div>
        <h4 className="text-base font-extrabold text-white">Сертифікат курсу «ШІ для всіх»</h4>
        <p className="text-xs text-slate-400 leading-relaxed">Цим підтверджується, що ви успішно опанували всі 17 інтерактивних занять для траєкторії <strong>«{role === 'curious' ? 'Шлях Допитливого' : 'Шлях Прагматика'}»</strong>.</p>
        <div className="text-[10px] font-mono text-amber-500/80 bg-slate-950/80 p-2 rounded">КОД СЕРТИФІКАТУ: #AI-FOR-ALL-2026</div>
      </div>

      <button 
        onClick={() => { setComplete(true); onTaskPassed(); }}
        className={`w-full py-3.5 rounded-xl text-xs font-black transition-all cursor-pointer ${complete ? 'bg-emerald-600 text-white shadow-emerald-500/10' : 'bg-gradient-to-r from-sky-400 to-amber-400 hover:from-sky-300 hover:to-amber-300 text-slate-950 shadow-xl'}`}
      >
        {complete ? '✓ Сертифікат завантажено!' : 'Згенерувати власні правила роботи'}
      </button>
    </div>
  );
};
