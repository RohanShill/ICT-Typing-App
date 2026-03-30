import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Trophy, AlertCircle } from 'lucide-react';
import { getTypingContent } from '../utils/storage';

export default function TypingTest() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const TIME_LIMIT = state?.timeLimit || 60;
  
  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isStarted, setIsStarted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const inputRef = useRef(null);
  
  // Audio refs (optional bonus feature)
  const successSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'));
  const errorSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'));

  const fetchAndSetText = useCallback(() => {
    if (!state) return;
    const contents = getTypingContent();
    const filtered = contents.filter(c => c.type === state.type && c.difficulty === state.difficulty);
    
    let fullText = '';
    if (filtered.length > 0) {
      if (state.type === 'word') {
        fullText = filtered.map(item => item.content).sort(() => 0.5 - Math.random()).join(' ');
        if (fullText.length < 300) {
           fullText = Array(10).fill(fullText).join(' ');
        }
      } else {
        const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
        fullText = randomItem.content;
      }
    } else {
      fullText = "The quick brown fox jumps over the lazy dog. Please add more content in the admin panel.";
    }
    setTextToType(fullText);
  }, [state]);

  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }
    
    fetchAndSetText();
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state, navigate, fetchAndSetText]);

  const endTest = useCallback(() => {
    setIsStarted(false);
    
    // Calculate metrics based on actual elapsed time instead of total allocated time
    const userChars = userInput.length;
    let correctChars = 0;
    
    for (let i = 0; i < userChars; i++) {
        if (userInput[i] === textToType[i]) {
            correctChars++;
        }
    }

    const accuracy = userChars > 0 ? ((correctChars / userChars) * 100).toFixed(0) : 0;
    
    // Fix: If user finishes early, calculate based on the actual time elapsed, min 1 second
    const timeElapsedSeconds = TIME_LIMIT - timeLeft;
    const actualMinutes = Math.max(timeElapsedSeconds, 1) / 60; 
    const wpm = Math.round((userChars / 5) / actualMinutes);
    
    navigate('/result', { 
        state: { 
            wpm, 
            accuracy, 
            mistakes,
            ...state
        } 
    });
  }, [userInput, textToType, TIME_LIMIT, timeLeft, mistakes, state, navigate]);

  useEffect(() => {
    let interval;
    if (isStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted, timeLeft, endTest]);

  const handleInput = (e) => {
    if (!isStarted && e.target.value.length > 0) {
      setIsStarted(true);
    }
    
    const value = e.target.value;
    
    // Mistake detection for sound effects (Bonus)
    if (value.length > userInput.length) {
       const charTyped = value[value.length - 1];
       const expectedChar = textToType[value.length - 1];
       if (charTyped !== expectedChar) {
           setMistakes(m => m + 1);
       }
    }
    
    setUserInput(value);
    
    // If complete text is typed before time
    if (value.length >= textToType.length) {
        endTest();
    }
  };

  const renderText = () => {
    return textToType.split('').map((char, index) => {
      let colorClass = 'text-slate-500';
      let bgClass = '';
      let isCurrent = userInput.length === index;
      
      if (index < userInput.length) {
        const isCorrect = userInput[index] === char;
        colorClass = isCorrect ? 'text-emerald-400 glow-text' : 'text-rose-400 bg-rose-900/40 rounded-sm';
      }

      if (isCurrent) {
          bgClass = 'bg-slate-800 border-b-2 border-indigo-400';
      }

      return (
        <span key={index} className={`${colorClass} ${bgClass} text-2xl font-mono leading-relaxed transition-all duration-75`}>
          {char}
        </span>
      );
    });
  };

  // Real-time calculations
  const currentWpm = useMemo(() => {
    if (!isStarted || TIME_LIMIT - timeLeft === 0) return 0;
    const timeElapsedMinutes = (TIME_LIMIT - timeLeft) / 60;
    return Math.round((userInput.length / 5) / timeElapsedMinutes);
  }, [userInput, timeLeft, isStarted, TIME_LIMIT]);

  return (
    <div className="max-w-4xl mx-auto mt-8 animate-in fade-in duration-300">
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-1"><Timer size={16}/> Time</span>
            <span className={`text-3xl font-bold font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-800 dark:text-white'}`}>{timeLeft}s</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy size={16}/> WPM</span>
            <span className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{currentWpm}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-1"><AlertCircle size={16}/> Errors</span>
            <span className="text-3xl font-bold font-mono text-rose-500">{mistakes}</span>
        </div>
      </div>

      <div className="relative bg-[#0d1117] rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col hover:border-indigo-500/50 transition-colors duration-300 min-h-[300px]">
        {/* Terminal Header */}
        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 font-medium">student@ict-master: ~/{state.type === 'word' ? 'vocabulary' : state.type}</span>
            <div className="w-4 h-4"></div> {/* spacer for centering */}
        </div>
        
        <div className="p-6 md:p-8 pb-12 flex-1 relative cursor-text" onClick={() => inputRef.current?.focus()}>
            {!isStarted && userInput.length === 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-400 text-sm md:text-base font-mono animate-pulse bg-emerald-900/20 border border-emerald-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-nowrap z-10">
                    &gt; Start typing to initialize...
                </div>
            )}
            
            <div className="break-words select-none text-left relative z-0" style={{ wordBreak: 'break-word' }}>
                {renderText()}
            </div>

            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                className="opacity-0 fixed top-0 left-0 w-1 h-1 -z-10 pointer-events-none text-[16px]"
                autoFocus
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
            />
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
          <button 
            onClick={() => {
                setUserInput('');
                setTimeLeft(TIME_LIMIT);
                setIsStarted(false);
                setMistakes(0);
                fetchAndSetText(); // Fetch fresh new text!
                if (inputRef.current) inputRef.current.focus();
            }}
            className="px-6 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium border border-transparent dark:border-slate-700"
          >
              Restart Manually
          </button>
      </div>

    </div>
  );
}
